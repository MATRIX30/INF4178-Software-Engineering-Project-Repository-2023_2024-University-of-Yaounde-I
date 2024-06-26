/* eslint-disable prettier/prettier */
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import Home from '../screens/Home/Home'
import MyLivraisons from '../screens/Livraison/MyLivraisons'
import Login from '../screens/auth/Login'
import { TopNavigation } from './TabNavigator'
import { COLORS } from '../constants/theme'
const Stack = createNativeStackNavigator()

const MainNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.white,
        },
        headerTintColor: "white",
        headerBackTitle: "Back",
       
      }}
    >
      <Stack.Screen options={{headerShown: false}} name='Accueil'  component={Home} />
      <Stack.Screen name='MyDelivery' component={TopNavigation} />
    </Stack.Navigator>
  )
}

export { MainNavigator }
