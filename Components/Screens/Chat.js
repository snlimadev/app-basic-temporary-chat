import { useState, useEffect, useMemo, useRef } from 'react';
import { ScrollView, View, BackHandler, Keyboard, AppState } from 'react-native';
import * as Notifications from 'expo-notifications';
import { Input, Icon, Dialog } from '@rneui/themed';

import styles from '../../css/styles';
import {
  handleWebSocketEvents, createOrJoinRoom, sendMessage, handleChatMessages,
  extendIdleTime, registerForPushNotificationsAsync, schedulePushNotification
} from '../Functions';
import InstructionsCard from '../InstructionsCard';
import ChatCards from '../ChatCards';

// Configure push notifications / Configura notificações push
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function Chat(props) {
  const [message, setMessage] = useState('');
  const [focusedInput, setFocusedInput] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loadingVisible, setLoadingVisible] = useState(true);
  const [readyState, setReadyState] = useState('CONNECTING');
  const [chatMessages, setChatMessages] = useState([]);
  const [idleMessage, setIdleMessage] = useState('');
  const [idleTimeoutCounter, setIdleTimeoutCounter] = useState(0);
  const [notification, setNotification] = useState(false);
  const [notificationTitle, setNotificationTitle] = useState('');
  const [notificationBody, setNotificationBody] = useState('');

  const ws = useMemo(() => new WebSocket('wss://api-basic-temporary-chat.glitch.me'), []);
  const scrollViewRef = useRef(null);
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const notificationListener = useRef(null);
  const { action, user, roomCode, maxClients } = props.route.params;
  const navigate = props.navigation.navigate;

  //#region Local functions / Funções locais
  const handleCreateOrJoinRoom = () => {
    createOrJoinRoom(action, user, roomCode, maxClients, ws);
    setLoadingVisible(false);
  };

  const handleSendMessage = () => {
    sendMessage(message, setMessage, ws, readyState);
    setIdleTimeoutCounter(0);
  };

  const updateChatMessages = (e) => {
    handleChatMessages(e, setChatMessages, user, setNotificationTitle, setNotificationBody, navigate);
  };

  const sendIdleMessage = () => {
    sendMessage(idleMessage, setIdleMessage, ws, readyState);
    setIdleTimeoutCounter(idleTimeoutCounter + 1);
  };

  const handleBackPress = () => {
    props.navigation.navigate('Home');
    return true;
  };

  const scrollToBottom = () => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  };
  //#endregion

  //#region useEffect hooks
  useEffect(() => {
    handleWebSocketEvents(ws, setReadyState, handleCreateOrJoinRoom, updateChatMessages, navigate);

    return () => {
      if (ws && readyState === 'OPEN') {
        ws.close();
      }
    };
  }, [readyState]);

  useEffect(() => {
    (message.trim()) ? setButtonDisabled(false) : setButtonDisabled(true);
  }, [message]);

  useEffect(() => {
    const interval = setInterval(() => {
      extendIdleTime(idleTimeoutCounter, setIdleTimeoutCounter, sendIdleMessage, navigate);
    }, 60000);

    return () => {
      clearInterval(interval);
    };
  }, [idleTimeoutCounter]);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, [props.navigation]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', scrollToBottom);

    return () => {
      keyboardDidShowListener.remove();
    };
  }, []);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      (appState.current === 'active') && Notifications.dismissAllNotificationsAsync();
    });

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    registerForPushNotificationsAsync();

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
    };
  }, []);

  useEffect(() => {
    if (notificationTitle && notificationBody && appState.current === 'background') {
      schedulePushNotification(notificationTitle, notificationBody);
    }
  }, [notificationTitle, notificationBody]);
  //#endregion

  return (
    <>
      <ScrollView
        ref={scrollViewRef}
        onContentSizeChange={scrollToBottom}
        contentContainerStyle={styles.chatContainer}
      >
        <InstructionsCard roomCode={roomCode} />

        <ChatCards chatMessages={chatMessages} />
      </ScrollView>

      <View>
        <Input
          placeholder='Send a message'
          value={message}
          onChangeText={setMessage}
          renderErrorMessage={false}
          multiline={true}
          onContentSizeChange={scrollToBottom}
          onFocus={() => setFocusedInput(true)}
          onBlur={() => setFocusedInput(false)}
          containerStyle={styles.messageContainer}
          inputContainerStyle={[
            (focusedInput) && styles.focusedInput,
            styles.messageInput
          ]}
          rightIcon={
            <Icon
              name='paper-airplane'
              type='octicon'
              color={(buttonDisabled) ? 'lightgray' : '#00A2E8'}
              onPress={handleSendMessage}
              disabled={buttonDisabled}
              containerStyle={{ paddingHorizontal: 0 }}
            />
          }
        />
      </View>

      <Dialog isVisible={loadingVisible}>
        <Dialog.Title title='CONNECTING...' />
        <Dialog.Loading />
      </Dialog>
    </>
  );
}