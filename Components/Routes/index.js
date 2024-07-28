import { useState } from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Icon, useTheme } from '@rneui/themed';
import styles from '../../css/styles';

import Home from '../Screens/Home';
import CreateRoom from '../Screens/CreateRoom';
import JoinRoom from '../Screens/JoinRoom';
import Chat from '../Screens/Chat';

const Stack = createStackNavigator();

const CustomTitle = (props) => (
  <Text selectable style={[styles.topBarCustomTitle, styles.fwBold]}>
    {props.title}
  </Text>
);

export default function Routes() {
  const [themeIcon, setThemeIcon] = useState('moon');
  const { theme, updateTheme } = useTheme();

  const toggleDarkMode = () => {
    updateTheme((theme) => ({
      mode: theme.mode === 'light' ? 'dark' : 'light',
    }));
    setThemeIcon((themeIcon === 'moon') ? 'sunny' : 'moon');
  };

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#00A2E8' },
          headerTitleAlign: 'center',
          headerTitleStyle: { color: 'white' },
          headerTintColor: 'white',
          headerRight: () => (
            <Icon
              name={themeIcon}
              type='ionicon'
              color='white'
              onPress={toggleDarkMode}
            />
          )
        }}
      >
        <Stack.Screen name='Home' component={Home} />

        <Stack.Screen name='Create Room' component={CreateRoom} />

        <Stack.Screen name='Join Room' component={JoinRoom} />

        <Stack.Screen
          name='Chat'
          component={Chat}
          options={(props) => ({
            headerTitle: () => <CustomTitle title={`Room ${props.route.params.roomCode}`} />,
            headerLeft: () => (
              <Icon
                name={'home'}
                type='ionicon'
                color='white'
                onPress={() => props.navigation.navigate('Home')}
              />
            )
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}