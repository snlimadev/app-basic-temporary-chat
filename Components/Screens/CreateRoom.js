import { useState, useEffect } from 'react';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

import FormFields from '../FormFields';

const BANNER_ID = 'ca-app-pub-4878437225305198/6693285912';

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
    <>
      <FormFields
        setMaxRoomSize={setMaxRoomSize}
        userName={userName}
        setUserName={setUserName}
        buttonText='CREATE'
        buttonAction={handleCreateRoom}
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