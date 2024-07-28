import { useState, useEffect } from 'react';

import FormFields from '../FormFields';

export default function JoinRoom(props) {
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
    (roomCode.trim() && userName.trim()) ? setButtonDisabled(false) : setButtonDisabled(true);
  }, [roomCode, userName]);

  return (
    <FormFields
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