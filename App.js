import { useState } from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Icon } from '@rneui/themed';
import FlashMessage from 'react-native-flash-message';
import styles from './css/styles';

import Home from './Components/Screens/Home';
import CreateRoom from './Components/Screens/CreateRoom';
import JoinRoom from './Components/Screens/JoinRoom';
import Chat from './Components/Screens/Chat';

const Stack = createStackNavigator();

const CustomTitle = (props) => (
  <Text selectable style={[styles.topBarText, styles.topBarCustomTitle, styles.fwBold]}>
    {props.title}
  </Text>
);

export default function App() {
  const [isDarkMode, setDarkMode] = useState(false);
  const [themeIcon, setThemeIcon] = useState('moon');

  const toggleDarkMode = () => {
    setDarkMode(!isDarkMode);
    setThemeIcon((themeIcon === 'moon') ? 'sunny' : 'moon');
  };

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: styles.topBarColor,
            headerTitleAlign: 'center',
            headerTitleStyle: styles.topBarText,
            headerTintColor: 'white',
            headerRight: () => (
              <Icon
                name={themeIcon}
                type='ionicon'
                color='white'
                containerStyle={styles.prTiny}
                onPress={toggleDarkMode}
                style={[styles.pvSmall, styles.phSmall]}
              />
            )
          }}
        >
          <Stack.Screen name='Home'>
            {(props) => <Home {...props} isDarkMode={isDarkMode} />}
          </Stack.Screen>

          <Stack.Screen name='Create Room'>
            {(props) => <CreateRoom {...props} isDarkMode={isDarkMode} />}
          </Stack.Screen>

          <Stack.Screen name='Join Room'>
            {(props) => <JoinRoom {...props} isDarkMode={isDarkMode} />}
          </Stack.Screen>

          <Stack.Screen
            name='Chat'
            options={(props) => ({
              headerTitle: () => <CustomTitle title={`Room ${props.route.params.roomCode}`} />,
              headerLeft: () => (
                <Icon
                  name={'home'}
                  type='ionicon'
                  color='white'
                  containerStyle={styles.plTiny}
                  onPress={() => props.navigation.navigate('Home')}
                  style={[styles.pvSmall, styles.phSmall]}
                />
              )
            })}
          >
            {(props) => <Chat {...props} isDarkMode={isDarkMode} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>

      <FlashMessage position='top' />
    </>
  );
}