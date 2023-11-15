import { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { Text, Button } from '@rneui/base';

import styles from '../../../css/styles';
import { changeTheme } from '../../Functions';

export default function Home(props) {
  const [themeBgColor, setThemeBgColor] = useState(styles.lightThemeBgColor);
  const [themeTextColor, setThemeTextColor] = useState(styles.lightThemeTextColor);

  useEffect(() => {
    changeTheme(props.isDarkMode, setThemeBgColor, setThemeTextColor);
  }, [props.isDarkMode]);

  return (
    <ScrollView
      contentContainerStyle={[styles.containerScrollView, styles.pvSmall, styles.phSmall]}
      style={themeBgColor}
    >
      <Text h2 h2Style={[styles.textCenter, styles.pbSmall, themeTextColor]}>
        Welcome to Basic - Temporary Chat!
      </Text>

      <Text h4 h4Style={[styles.textCenter, styles.pbMedium, themeTextColor]}>
        Just create a room, share the room code with your friends and start chatting!
      </Text>

      <Button
        title='CREATE A ROOM'
        buttonStyle={styles.roundedBorder}
        containerStyle={styles.pbSmall}
        onPress={() => props.navigation.navigate('Create Room')}
      />

      <Button
        title='JOIN A ROOM'
        buttonStyle={styles.roundedBorder}
        containerStyle={styles.pbMedium}
        onPress={() => props.navigation.navigate('Join Room')}
      />
    </ScrollView>
  );
}