import { useState, useEffect } from 'react';

import FormFields from '../FormFields';

export default function CreateRoom(props) {
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
    (userName.trim()) ? setButtonDisabled(false) : setButtonDisabled(true);
  }, [userName]);

  return (
    <FormFields
      setMaxRoomSize={setMaxRoomSize}
      userName={userName}
      setUserName={setUserName}
      buttonText='CREATE'
      buttonAction={handleCreateRoom}
      buttonDisabled={buttonDisabled}
    />
  );
}