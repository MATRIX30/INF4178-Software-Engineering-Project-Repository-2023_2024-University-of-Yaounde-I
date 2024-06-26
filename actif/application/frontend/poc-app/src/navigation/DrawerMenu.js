import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react'
import Home from '../screens/Home/Home';
import { COLORS } from '../constants/theme';
import { TopNavigation } from './TabNavigator';
import { getHeaderTitle } from '@react-navigation/elements';
import HeaderDrawer from '../components/HeaderDrawer';
import DrawerLabel from '../components/drawer/DrawerLabel';
import { AccountIcon, HomeIcon, MailSendReceiveIcon, PacketIcon } from '../components/SvgIcons';
import Account from '../screens/auth/Account';
import DepotRetrait from '../screens/DepotRetrait.js/DepotRetrait';

const Drawer = createDrawerNavigator();

const DrawerMenu = () => {
  return (
    <Drawer.Navigator
      // useLegacyImplementation
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.primary,
        },
        headerTintColor: COLORS.black,
        headerBackTitle: "Back",
        header: ({ navigation, route, options }) => {
          const title = getHeaderTitle(options, route.name);

          return <HeaderDrawer navigation={navigation} />;
        },
        drawerActiveBackgroundColor: COLORS.black,
      }}
    >
      <Drawer.Screen
        options={{
          drawerLabel: ({ color, focused }) => {
            return (
              <DrawerLabel icon={<HomeIcon color={focused ? COLORS.primary : COLORS.black} />} style={{ color: focused ? COLORS.primary : COLORS.black }} title={"Accueil"} />
            )
          }
        }}
        name="Accueil" component={Home} />
      <Drawer.Screen
        options={{
          headerShown: false,
          drawerLabel: ({ color, focused }) => {
            return (
              <DrawerLabel icon={<PacketIcon color={focused ? COLORS.primary : COLORS.black} />} style={{ color: focused ? COLORS.primary : COLORS.black }} title={"Mes Livraisons"} />
            )
          }
        }}
        name='MyDelivery'
        component={TopNavigation}
      />
      <Drawer.Screen
        options={{
          headerShown: false,
          drawerLabel: ({ color, focused }) => {
            return (
              <DrawerLabel icon={<MailSendReceiveIcon color={focused ? COLORS.primary : COLORS.black} />} style={{ color: focused ? COLORS.primary : COLORS.black }} title={"Dépôt / Retraît"} />
            )
          }
        }}
        name='DepRet'
        component={DepotRetrait}
      />
      <Drawer.Screen
        options={{
          headerShown: false,
          drawerLabel: ({ color, focused }) => {
            return (
              <DrawerLabel icon={<AccountIcon color={focused ? COLORS.primary : COLORS.black} size={25} />} style={{ color: focused ? COLORS.primary : COLORS.black }} title={"Compte"} />
            )
          }
        }}
        name='Account'
        component={Account}
      />
    </Drawer.Navigator>
  )
}

export default DrawerMenu
