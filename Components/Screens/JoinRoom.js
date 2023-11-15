import { useState, useEffect } from 'react';

import styles from '../../css/styles';
import { changeTheme } from '../Functions';
import FormFields from '../FormFields';

export default function JoinRoom(props) {
  const [themeBgColor, setThemeBgColor] = useState(styles.lightThemeBgColor);
  const [themeTextColor, setThemeTextColor] = useState(styles.lightThemeTextColor);
  const [roomCode, setRoomCode] = useState('');
  const [userName, setUserName] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const handleJoinRoom = () => {
    props.navigation.navigate('Chat', {
      action: 'join',
      user: userName,
      roomCode: roomCode
    });
  };

  useEffect(() => {
    changeTheme(props.isDarkMode, setThemeBgColor, setThemeTextColor);
  }, [props.isDarkMode]);

  useEffect(() => {
    (roomCode.trim() && userName.trim()) ? setButtonDisabled(false) : setButtonDisabled(true);
  }, [roomCode, userName]);

  return (
    <FormFields
      themeBgColor={themeBgColor}
      themeTextColor={themeTextColor}
      roomCode={roomCode}
      setRoomCode={setRoomCode}
      userName={userName}
      setUserName={setUserName}
      buttonText='JOIN'
      buttonAction={handleJoinRoom}
      buttonDisabled={buttonDisabled}
    />
  );
}