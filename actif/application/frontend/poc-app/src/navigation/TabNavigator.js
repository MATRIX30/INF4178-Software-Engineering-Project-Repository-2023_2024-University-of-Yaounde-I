import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react'
// import { MainNavigator } from './MainNavigator';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { COLORS, SIZES } from '../constants/theme';
import AvailableLivraison from '../screens/Livraison/AvailableLivraison';
import DepotRetrait from '../screens/DepotRetrait.js/DepotRetrait';
import Account from '../screens/auth/Account';
import InProcess from '../screens/Livraison/InProcess';
import Termineted from '../screens/Livraison/Termineted';
import { AccountIcon, DeliveryIcon, HomeIcon, MailSendReceiveIcon, MoreCircleIcon, PacketIcon, ScanIcon } from '../components/SvgIcons';
import SamplePage from '../screens/SamplePage';
import { Text } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import Plus from '../screens/plus/plus';
import IconActif from '../components/IconActif';
import IconButtonActif from '../components/IconButtonActif';
import ButtonActif from '../components/ButtonActif';
import ChoisirDestination from '../screens/DepotRetrait.js/Depots/ChoisirDestination';
import DrawerMenu from './DrawerMenu';
import Scan from '../utils/scan/Scan';
import HeaderNavigation from '../components/HeaderNavigation';

const Tab = createBottomTabNavigator();
const TabTop = createMaterialTopTabNavigator();

function BottomNavigation() {
    return (

        <Tab.Navigator
            initialRouteName="Accueil"
            screenOptions={{
                tabBarHideOnKeyboard: true,
                tabBarActiveTintColor: COLORS.black,
                tabBarInactiveTintColor: COLORS.black,
                tabBarStyle: {
                    backgroundColor: COLORS.white,
                    borderStyle: 'solid',
                    paddingBottom: 10,
                    height: 60,
                },
            }}
        >
            <Tab.Screen
                name="Home Page"
                component={DrawerMenu}

                options={{
                    tabBarLabel: ({ focused }) => (
                        <Text style={focused ? styles.textBottomMenu : { fontSize: SIZES.menuText, color: COLORS.black }}>Accueil</Text>
                    ),
                    tabBarIcon: ({ focused }) => (
                        <View>
                            <View style={focused && styles.borderTopMenu}></View>
                            <HomeIcon size={focused && 25} color={focused ? COLORS.primary : COLORS.black} />
                        </View>
                    ),
                    tabBarLabelStyle: {
                        fontSize: SIZES.menuText,
                    },
                    headerShown: false
                }}
            />

            <Tab.Screen
                name="MesLivraisons"
                component={TopNavigation}
                options={{
                    tabBarLabel: ({ focused }) => (
                        <Text numberOfLines={1} style={focused ? styles.textBottomMenu : { fontSize: SIZES.menuText, color: COLORS.black }}>Mes Paquets</Text>
                    ),
                    tabBarIcon: ({ focused }) => (
                        <View>
                            <View style={focused && styles.borderTopMenu}></View>
                            <PacketIcon size={focused && 25} color={focused ? COLORS.primary : COLORS.black} />
                        </View>
                    ),
                    tabBarLabelStyle: {
                        fontSize: SIZES.menuText,
                        display: 'flex',
                        justifyContent: 'center',
                        width: 100,
                    },
                    // headerShown: true,
                    headerShown : false,
                  
                    // header: ({ navigation }) => {
                    //     return <HeaderNavigation title={"Mes Livraisons"} />
                    // }
                }}
            />
            <Tab.Screen
                name="Scanner"
                component={Scan}
                options={{
                    // tabBarLabel: "Scanner",
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.scanIcon}>
                            <ScanIcon size={35} color={focused ? COLORS.primary : COLORS.black} />
                        </View>
                        // <IconButtonActif background={COLORS.primary}  name={"qrcode-scan"} size={25} iconColor={focused ? COLORS.secondary : COLORS.black}/>
                    ),
                    tabBarLabelStyle: {
                        fontSize: SIZES.menuText,
                        display: 'none',
                    },
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        fontSize: SIZES.h2
                    },
                }}
            />
            <Tab.Screen
                name="DepRet"
                component={DepotRetrait}
                options={{
                    tabBarLabel: ({ focused }) => (
                        <Text numberOfLines={1} style={focused ? styles.textBottomMenu : { fontSize: SIZES.menuText, color: COLORS.black }}>Dépôt/Retrait</Text>
                    ),
                    tabBarIcon: ({ focused }) => (
                        <View>
                            <View style={focused && styles.borderTopMenu}></View>
                            <MailSendReceiveIcon size={focused && 25} color={focused ? COLORS.primary : COLORS.black} />
                        </View>
                        // <IconActif size={focused && 25} name={"arrow-up-down-bold-outline"} iconColor={focused ? COLORS.primary : COLORS.black}/>
                    ),
                    tabBarLabelStyle: {
                        fontSize: SIZES.menuText,
                    },
                    header: ({ navigation }) => {
                        return <HeaderNavigation title={"Dépôt/Retrait"} />
                    }
                }}
            />

            <Tab.Screen
                name="plus"
                component={Account}
                options={{
                    // tabBarLabel: "Compte",
                    // tabBarIcon: ({ focused }) => (
                    tabBarLabel: ({ focused }) => (
                        <Text numberOfLines={1} style={focused ? styles.textBottomMenu : { fontSize: SIZES.menuText, color: COLORS.black }}>Compte</Text>
                    ),
                    tabBarIcon: ({ focused }) => (
                        <View>
                            <View style={focused && styles.borderTopMenu}></View>
                            <AccountIcon size={focused && 25} color={focused && COLORS.primary} />
                        </View>
                        // <IconActif size={focused && 25} name={"account-cog-outline"} iconColor={focused ? COLORS.primary : COLORS.black}/>
                    ),
                    tabBarLabelStyle: {
                        fontSize: SIZES.menuText,
                    },
                    headerShown: false
                }}
            />
        </Tab.Navigator>
    );
}

function TopNavigation() {
    return (
        <TabTop.Navigator
            initialRouteName='Acceptées'
            
            screenOptions={{
                tabBarActiveTintColor: COLORS.secondary,
                tabBarInactiveTintColor: COLORS.black,
                tabBarIndicatorStyle: {
                    backgroundColor: COLORS.secondary
                },
                tabBarContentContainerStyle : {
                    backgroundColor : COLORS.primary
                },
                tabBarIndicatorContainerStyle: {
                    paddingTop: 50
                },
                tabBarLabelStyle: {
                    fontSize: SIZES.topNav,
                    textTransform: 'capitalize'
                },
                tabBarItemStyle: { alignItems: 'flex-start' }
            }}

        >
            {/* <TabTop.Screen name="HomeTop" component={BottomNavigation} /> */}
            <TabTop.Screen name="En Stock" component={AvailableLivraison} />
            <TabTop.Screen name="En Chemin" component={InProcess} />
            <TabTop.Screen name="Livrés" component={Termineted} />
        </TabTop.Navigator>
    )
}

export { BottomNavigation, TopNavigation }

const styles = StyleSheet.create({
    scanIcon: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        elevation: 2,
        borderColor: COLORS.white,
        bottom: 20,
        backgroundColor: COLORS.primary,
        width: 56,
        height: 56
    },
    borderTopMenu: {
        borderTopWidth: 5,
        borderRadius: SIZES.radius,
        bottom: '20%',
        borderTopColor: COLORS.primary
    },
    textBottomMenu: { fontWeight: 'bold', fontSize: SIZES.menuText, color: COLORS.black }
})