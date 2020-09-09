import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import store from './src/store';
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  HeaderBackButton,
} from '@react-navigation/stack';

import { Main, Home } from './src/screens';
import { Records } from './src/screens/index';

const Stack = createStackNavigator();
export default (props) => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="HomeScreen"
            component={Home}
            options={{
              title: 'Home',
              headerStyle: {
                backgroundColor: '#fafafa',
              },
            }}
          />
          <Stack.Screen
            name="Game"
            component={Main}
            options={
              {
                // headerLeft: null,
              }
            }
          />
          <Stack.Screen
            name="Records"
            component={Records}
            options={({ navigation }) => ({
              headerLeft: () => (
                <HeaderBackButton
                  onPress={() => {
                    navigation.navigate('HomeScreen');
                  }}
                />
              ),
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};
