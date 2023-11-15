import { useState, useEffect } from 'react';

import styles from '../../css/styles';
import { changeTheme } from '../Functions';
import FormFields from '../FormFields';

export default function CreateRoom(props) {
  const [themeBgColor, setThemeBgColor] = useState(styles.lightThemeBgColor);
  const [themeTextColor, setThemeTextColor] = useState(styles.lightThemeTextColor);
  const [maxRoomSize, setMaxRoomSize] = useState();
  const [userName, setUserName] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const handleCreateRoom = () => {
    const roomCode = Math.floor(100000 + Math.random() * 900000).toString();

    props.navigation.navigate('Chat', {
      action: 'create',
      user: userName,
      roomCode: roomCode,
      maxClients: maxRoomSize
    });
  };

  useEffect(() => {
    changeTheme(props.isDarkMode, setThemeBgColor, setThemeTextColor);
  }, [props.isDarkMode]);

  useEffect(() => {
    (userName.trim()) ? setButtonDisabled(false) : setButtonDisabled(true);
  }, [userName]);

  return (
    <FormFields
      themeBgColor={themeBgColor}
      themeTextColor={themeTextColor}
      setMaxRoomSize={setMaxRoomSize}
      userName={userName}
      setUserName={setUserName}
      buttonText='CREATE'
      buttonAction={handleCreateRoom}
      buttonDisabled={buttonDisabled}
    />
  );
}