import { useState } from 'react';
import { View, Share } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { Text, Button, Card } from '@rneui/base';
import { Tooltip } from '@rneui/themed';

import styles from '../css/styles';

export default function InstructionsCard(props) {
  const [showToopTip, setShowToopTip] = useState(false);

  const roomCodeToShare = `Room code for Basic - Temporary Chat is ${props.roomCode}`

  //#region Local functions / Funções locais
  const copy = async () => {
    try {
      await Clipboard.setStringAsync(roomCodeToShare);
      setShowToopTip(true);
      setTimeout(() => setShowToopTip(false), 2000);
    } catch (error) {
      alert(error.message);
    }
  };

  const share = async () => {
    try {
      await Share.share({
        message: roomCodeToShare
      });
    } catch (error) {
      alert(error.message);
    }
  };
  //#endregion

  return (
    <View style={props.themeBgColor}>
      <Card containerStyle={[props.themeBgColor, styles.roundedBorder]}>
        <Text style={[styles.cardHeader, styles.fwBold, styles.labelColor, styles.textCenter, styles.pbTiny]}>
          INSTRUCTIONS
        </Text>

        <Text selectable style={[props.themeTextColor, styles.textCenter, styles.pvTiny]}>
          Please be aware this is a temporary chat room
          that disappears after the last person leaves.
          Also, your session will expire if you don't send any messages
          for 10 minutes or keep the app in the background for over 3 minutes.
        </Text>

        <Tooltip
          visible={showToopTip}
          onOpen={() => setShowToopTip(true)}
          onClose={() => setShowToopTip(false)}
          popover={<Text style={styles.darkThemeTextColor}>Copied</Text>}
          withPointer={false}
        />

        <Button
          title='COPY ROOM CODE'
          icon={{
            name: 'copy',
            type: 'font-awesome',
            size: 15,
            color: '#00A2E8',
          }}
          type='outline'
          size='sm'
          containerStyle={styles.pvTiny}
          buttonStyle={styles.roundedBorder}
          onPress={copy} />

        <Button
          title='SHARE ROOM CODE'
          icon={{
            name: 'share-alt',
            type: 'font-awesome',
            size: 15,
            color: '#00A2E8',
          }}
          type='outline'
          size='sm'
          buttonStyle={styles.roundedBorder}
          onPress={share} />
      </Card>
    </View>
  );
}