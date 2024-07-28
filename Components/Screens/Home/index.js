import { ScrollView } from 'react-native';
import { Text, Button } from '@rneui/themed';

import styles from '../../../css/styles';

export default function Home(props) {
  return (
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
  );
}