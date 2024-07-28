import { showMessage } from 'react-native-flash-message';

//#region Function to handle Web Socket events / Função para lidar com os eventos do Web Socket
export function handleWebSocketEvents(ws, setReadyState, handleCreateOrJoinRoom, updateChatMessages, navigate) {
  if (ws) {
    ws.onopen = () => {
      setReadyState('OPEN');
      handleCreateOrJoinRoom();
    };

    ws.onclose = () => {
      setReadyState('CLOSED');
      navigate('Home');
    };

    ws.onerror = () => {
      showMessage({
        message: 'Connection to the server lost',
        description: 'Please check your internet connection and try again later.',
        type: 'danger',
        icon: 'danger',
        duration: 5000
      });
    };

    ws.onmessage = (e) => {
      updateChatMessages(e);
    };
  }
}
//#endregion

//#region Function to create or join a chat room / Função para criar ou entrar em uma sala de chat
export function createOrJoinRoom(action, user, roomCode, maxClients, ws) {
  const messageData = {
    action: action,
    user: user,
    roomCode: roomCode,
    maxClients: maxClients
  };

  ws.send(JSON.stringify(messageData));
};
//#endregion

//#region Function to send messages / Função para enviar mensagens
export function sendMessage(textMessage, setTextMessage, ws, readyState) {
  if (readyState === 'OPEN') {
    const messageData = {
      text: textMessage
    };

    if (ws) {
      ws.send(JSON.stringify(messageData));
    }

    setTextMessage('');
  }
};
//#endregion

//#region Function to handle chat messages / Função para lidar com as mensagens do chat
export function handleChatMessages(e, setMessages, user, setNotificationTitle, setNotificationBody, navigate) {
  try {
    const messageData = JSON.parse(e.data);
    const sender = messageData.sender;
    const time = messageData.time;
    const message = messageData.message;
    const event = messageData.event;

    if ((sender && time && message) || event) {
      setMessages(prevMessages => [...prevMessages, {
        sender: sender,
        time: time,
        message: message,
        event: event
      }]);

      if (sender !== user && !event) {
        setNotificationTitle(`New message from ${sender}`);
        setNotificationBody(message);
      }
    } else if (messageData.error) {
      showMessage({
        message: 'Error',
        description: messageData.error,
        type: 'danger',
        icon: 'danger',
        duration: 5000
      });

      navigate('Home');
    }
  } catch (error) {
    console.log('Failed to parse message data: ', error);
  }
}
//#endregion

//#region Extend idle time from 3 to 10 minutes / Aumenta o tempo de inatividade de 3 para 10 minutos
export function extendIdleTime(idleTimeoutCounter, setIdleTimeoutCounter, sendIdleMessage, navigate) {
  if (idleTimeoutCounter < 8) {
    sendIdleMessage();
  } else if (idleTimeoutCounter < 9) {
    showMessage({
      message: 'Warning',
      description: 'Your session will expire in 60 seconds due to inactivity.',
      type: 'warning',
      icon: 'warning',
      duration: 5000
    });

    setIdleTimeoutCounter(idleTimeoutCounter + 1);
  } else {
    showMessage({
      message: 'Error',
      description: 'Your session expired due to inactivity.',
      type: 'danger',
      icon: 'danger',
      duration: 5000
    });

    navigate('Home');
  }
}
//#endregion
