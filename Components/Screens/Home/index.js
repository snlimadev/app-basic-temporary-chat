import { useState, useCallback } from 'react';
import { ScrollView } from 'react-native';
import { Text, Button } from '@rneui/themed';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
import { useFocusEffect } from '@react-navigation/native';

import styles from '../../../css/styles';

const BANNER_ID = 'ca-app-pub-4878437225305198/8858041564';

export default function Home(props) {
  const [shouldShowBanner, setShouldShowBanner] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setShouldShowBanner(true);

      return () => {
        setShouldShowBanner(false);
      };
    }, [])
  );

  return (
    <>
      <ScrollView contentContainerStyle={styles.containerScrollView}>
        <Text h4 h4Style={styles.textCenter}>
          Welcome to Basic - Temporary Chat!
        </Text>

        <Text style={[styles.fwBold, styles.textCenter]}>
          Just create a room, share the room code with your friends and start chatting!
        </Text>

        <Button
          title='CREATE A ROOM'
          onPress={() => props.navigation.navigate('Create Room')}
        />

        <Button
          title='JOIN A ROOM'
          onPress={() => props.navigation.navigate('Join Room')}
        />
      </ScrollView>

      {(shouldShowBanner) && (
        <BannerAd
          unitId={(__DEV__) ? TestIds.BANNER : BANNER_ID}
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true
          }}
        />
      )}
    </>
  );
}