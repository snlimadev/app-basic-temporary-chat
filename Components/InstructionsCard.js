import { View, Share } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { Text, Button, Card } from '@rneui/themed';
import { showMessage } from 'react-native-flash-message';

import styles from '../css/styles';

export default function InstructionsCard(props) {
  const roomCodeToShare = `Room code for Basic - Temporary Chat is ${props.roomCode}`

  //#region Local functions / Funções locais
  const copy = async () => {
    try {
      await Clipboard.setStringAsync(roomCodeToShare);

      showMessage({
        message: 'Copied',
        type: 'info',
        icon: 'info'
      });
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
    <View>
      <Card>
        <Text style={[styles.cardHeader, styles.fwBold, styles.labelColor, styles.textCenter]}>
          INSTRUCTIONS
        </Text>

        <Text selectable style={[styles.cardBody, styles.textCenter]}>
          Please be aware this is a temporary chat room
          that disappears after the last person leaves.
          Also, your session will expire if you don't send any messages
          for 10 minutes or keep the app in the background for over 3 minutes.
        </Text>

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
          containerStyle={{ paddingVertical: 0 }}
          onPress={share} />
      </Card>
    </View>
  );
}