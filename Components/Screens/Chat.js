import { useState, useEffect, useMemo, useRef } from 'react';
import { ScrollView, View, BackHandler, Keyboard, AppState } from 'react-native';
import * as Notifications from 'expo-notifications';
import { Input, Icon } from '@rneui/base';
import { Dialog } from '@rneui/themed';

import styles from '../../css/styles';
import { changeTheme, handleWebSocketEvents, createOrJoinRoom, sendMessage, handleChatMessages, extendIdleTime } from '../Functions';
import InstructionsCard from '../InstructionsCard';
import ChatCards from '../ChatCards';

//#region Handle push notifications / Lida com as notificações por push
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

async function schedulePushNotification(notificationTitle, notificationBody) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: notificationTitle,
      body: notificationBody.replace(/\\n/g, '\n'),
    },
    trigger: null,
  });
}
//#endregion

export default function Chat(props) {
  const [themeBgColor, setThemeBgColor] = useState(styles.lightThemeBgColor);
  const [themeTextColor, setThemeTextColor] = useState(styles.lightThemeTextColor);
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
    changeTheme(props.isDarkMode, setThemeBgColor, setThemeTextColor);
  }, [props.isDarkMode]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      appState.current = nextAppState;
      setAppStateVisible(appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
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
        contentContainerStyle={[styles.chatContainer, styles.pbSmall]}
        style={themeBgColor}
      >
        <InstructionsCard
          themeBgColor={themeBgColor}
          themeTextColor={themeTextColor}
          roomCode={roomCode}
        />

        <ChatCards
          themeBgColor={themeBgColor}
          themeTextColor={themeTextColor}
          chatMessages={chatMessages}
        />
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
          containerStyle={[themeBgColor, styles.messageContainer, styles.pvTiny]}
          inputStyle={themeTextColor}
          inputContainerStyle={[
            (focusedInput) && styles.focusedInput,
            styles.inputStyle,
            styles.roundedBorder,
            styles.plSmall
          ]}
          rightIcon={
            <Icon
              name='paper-airplane'
              type='octicon'
              color={(buttonDisabled) ? 'lightgray' : '#2089DC'}
              style={[styles.pvTiny, styles.phSmall]}
              onPress={handleSendMessage}
              disabled={buttonDisabled}
              disabledStyle={themeBgColor}
            />
          }
        />
      </View>

      <Dialog
        isVisible={loadingVisible}
        onBackdropPress={() => setLoadingVisible(false)}
      >
        <Dialog.Title title='CONNECTING...' titleStyle={styles.textCenter} />
        <Dialog.Loading />
      </Dialog>
    </>
  );
}