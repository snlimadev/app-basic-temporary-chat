import { useState, useEffect } from 'react';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

import FormFields from '../FormFields';

const BANNER_ID = 'ca-app-pub-4878437225305198/5059542562';

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
    <>
      <FormFields
        roomCode={roomCode}
        setRoomCode={setRoomCode}
        userName={userName}
        setUserName={setUserName}
        buttonText='JOIN'
        buttonAction={handleJoinRoom}
        buttonDisabled={buttonDisabled}
      />

      <BannerAd
        unitId={(__DEV__) ? TestIds.BANNER : BANNER_ID}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true
        }}
      />
    </>
  );
}