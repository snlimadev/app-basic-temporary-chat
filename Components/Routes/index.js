import { useState } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Icon } from '@rneui/base';
import { useTheme } from '@rneui/themed';

import Home from '../Screens/Home';
import CreateRoom from '../Screens/CreateRoom';
import JoinRoom from '../Screens/JoinRoom';
import Chat from '../Screens/Chat';

const Stack = createNativeStackNavigator();

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
      <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: theme.colors.primary },
            headerTitleAlign: 'center',
            headerTitleStyle: { color: 'white' },
            headerTintColor: 'white',
            headerRight: () => (
              <Icon
                name={themeIcon}
                type='ionicon'
                color='white'
                onPress={toggleDarkMode}
                style={{ padding: 4 }}
                containerStyle={{ borderRadius: 20 }}
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
              headerTitle: `Room ${props.route.params.roomCode}`,
              headerLeft: () => (
                <Icon
                  name='home'
                  type='ionicon'
                  color='white'
                  onPress={() => props.navigation.navigate('Home')}
                  style={{ padding: 4 }}
                  containerStyle={{ borderRadius: 20 }}
                />
              )
            })}
          />
        </Stack.Navigator>
      </View>
    </NavigationContainer>
  );
}