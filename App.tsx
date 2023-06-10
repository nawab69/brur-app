/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { BlurView } from '@react-native-community/blur';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
  StatusBar,
} from 'react-native';
import { routes } from './src/constant';
import { Routes } from './src/screens';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PortalProvider } from '@gorhom/portal';
import { ToastProvider } from 'react-native-toast-notifications'
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import { NativeWindStyleSheet, useColorScheme } from "nativewind";


const Stack = createNativeStackNavigator()
NativeWindStyleSheet.setColorScheme('light')

function App(): JSX.Element {

  const { colorScheme, setColorScheme } = useColorScheme();

  console.log(colorScheme)

  if (colorScheme === 'dark') {
    setColorScheme('light')
  }

  return (
    <Provider store={store}>
      <ToastProvider>
        <PortalProvider>
          <GestureHandlerRootView className="flex-1">
            <StatusBar translucent backgroundColor="transparent" barStyle={'dark-content'} />
            <NavigationContainer>
              <Stack.Navigator initialRouteName={routes.LOGIN}>
                {Routes.map(item => {
                  return (<Stack.Screen key={item.path} name={item.path} component={item.component} options={{ headerShown: false }} />)
                })}
              </Stack.Navigator>
            </NavigationContainer>
          </GestureHandlerRootView>
        </PortalProvider>
      </ToastProvider>
    </Provider>
  );
}


export default App;
