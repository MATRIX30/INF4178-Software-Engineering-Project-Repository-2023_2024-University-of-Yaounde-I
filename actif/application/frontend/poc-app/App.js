/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import 'react-native-gesture-handler';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import {Text, View, useColorScheme} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import Login from './src/screens/auth/Login';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SlideOne from './src/screens/auth/slides/SlideOne';
import RegisterChoice from './src/screens/auth/RegisterChoice';
import VerificationCode from './src/screens/auth/VerificationCode';
import Register from './src/screens/auth/Register';
import formulaireIdentification from './src/screens/auth/formulaireIdentification';
// import DetailsPaquet from './src/screens/Livraison/DetailsPaquet';
import {COLORS, SIZES} from './src/constants/theme';
import Alert from './src/components/alerts/alert';
import RetraitForm from './src/screens/commissions/retraits/RetraitForm';
import RetraitConfirm from './src/screens/commissions/retraits/RetraitConfirm';
import ChoisirDestination from './src/screens/DepotRetrait.js/Depots/ChoisirDestination';
import SamplePage from './src/screens/SamplePage';
import Paiement from './src/screens/DepotRetrait.js/paiement/selectModePaiement';
import Account from './src/screens/auth/Account';
import RecuPoc from './src/screens/DepotRetrait.js/paiement/RecuPoc';
import FacturePoc from './src/screens/DepotRetrait.js/paiement/FacturePoc';
import Formulaire_Infos_Recepteur from './src/screens/Livraison/forms/Formulaire_Infos_Recepteur';
import Formulaire_infos_expediteur from './src/screens/Livraison/forms/Formulaire_infos_expediteur';
import MesCommision from './src/screens/commissions/MesCommision';
import Paquet from './src/screens/DepotRetrait.js/Retrait/paquet';
import Paquet1 from './src/screens/DepotRetrait.js/Retrait/Paquet1';
import InProcess from './src/screens/Livraison/InProcess';
import Graph from './src/screens/statisitic/Graph';
// import AreaChart from './src/screens/statisitic/AreaChart'
// import AreaChart1 from './src/screens/statisitic/AreaChart1';
// import Graph2 from './src/screens/statisitic/Graph2';
// import FacturePoc from './src/screens/DepotRetrait.js/facturePoc';
import PacketInformation from './src/screens/DepotRetrait.js/Depots/PackageRegistration/PacketInformation';
import ConfirmationDepot from './src/screens/DepotRetrait.js/Depots/confirmationdepot';
import DeliveriesToRemove from './src/screens/DepotRetrait.js/Retrait/DeliveriesToRemove';
import {BottomNavigation} from './src/navigation/TabNavigator';
import BottmSheetWraperActif from './src/components/BottmSheetWraperActif';
import Scan from './src/utils/scan/Scan';
import RecapitulatifLivraison from './src/screens/DepotRetrait.js/Depots/RecapitulatifLivraison';
import LivraisonDetails from './src/screens/Livraison/LivraisonDetails';
import LivreurRetraitLivraisonList from './src/screens/Livraison/LivreurRetraitLivraisonList';
import LivreurDepotLivraisonList from './src/screens/Livraison/LivreurDepotLivraisonList';
import FormulaireIdentificationLivreur from './src/screens/auth/formulaireIdentification';
import Itineraire from './src/screens/map/Itineraire';
import MapLibreGL, {Logger} from '@maplibre/maplibre-react-native';
import Geolocation from '@react-native-community/geolocation';
import {config} from './src/constants/config';
import TrackPaquet from './src/screens/Livraison/TrackPaquet';
import GlobalMapVsion from './src/screens/map/GlobalMapVsion';
import About from './src/screens/About/About';

MapLibreGL.setAccessToken(`${config.app.mapbox_token}`);
MapLibreGL.setConnected(true);
Geolocation.setRNConfiguration({
  skipPermissionRequests: false,
  authorizationLevel: 'auto',
});

Logger.setLogCallback(log => {
  const {message} = log;
  if (
    message.match('Request failed due to a permanent error: Canceled') ||
    message.match('Request failed due to a permanent error:: Socket Closed')
  ) {
    return true;
  }
  return false;
});

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const Stack = createNativeStackNavigator();

  // function Auth() {
  //   return (
  //     <Stack.Navigator initialRouteName='slideOne' screenOptions={{
  //       animation: 'slide_from_right',
  //       headerStyle: {
  //         backgroundColor: COLORS.primary,
  //       },
  //     }} >
  //       <Stack.Screen name="slideOne" options={{ headerShown: false }} component={SlideOne} />
  //       {/* <Stack.Screen name="slideTwo" options={{ headerShown: false }} component={SlideTwo} /> */}
  //       {/* <Stack.Screen name="slide3" options={{ headerShown: false }} component={Slide3} /> */}
  //       <Stack.Screen name="registerChoice" options={{ headerShown: false }} component={RegisterChoice} />
  //       <Stack.Screen name="login" options={{ title: "Se connecter" }} component={Login} />
  //       <Stack.Screen name="vericationCode" options={{
  //         title: "Verifiez votre compte",
  //       }} component={VerificationCode} />
  //       <Stack.Screen name="register" options={{ title: "Devenir livreur Actif" }} component={Register} />
  //     </Stack.Navigator>
  //   );
  // }
  return (
    <Stack.Navigator
      initialRouteName="main"
      screenOptions={{
        // headerLeft :()=><IconActif  name={'chevron-left'} size={30} iconColor={COLORS.white} />,
        //  title : ()=><Title>ues</Title>
        headerStyle: {
          backgroundColor: COLORS.primary,
        },
        headerTintColor: COLORS.black,
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: SIZES.body,
        },
      }}>
      <Stack.Screen
        name="sample"
        options={{headerShown: false}}
        component={SamplePage}
      />
      <Stack.Screen
        name="about"
        options={{
          title: 'A propos',
          headerShown: true,
        }}
        component={About}
      />
      <Stack.Screen
        name="main"
        options={{headerShown: false}}
        component={BottomNavigation}
      />
      {/* <Stack.Screen name="auth" options={{ headerShown: false }} component={Auth} /> */}
      <Stack.Screen
        name="account"
        options={{headerShown: false}}
        component={Account}
      />
      <Stack.Screen
        name="recapitulatifLivraison"
        options={{headerShown: true, title: 'Récapitulatif de la Livraison'}}
        component={RecapitulatifLivraison}
      />
      <Stack.Screen
        name="livraisonDetails"
        options={{headerShown: true}}
        component={LivraisonDetails}
      />
      <Stack.Screen
        name="retraitForm"
        options={{headerShown: true}}
        component={RetraitForm}
      />
      <Stack.Screen
        name="retraitConfirm"
        options={{headerShown: true}}
        component={RetraitConfirm}
      />
      <Stack.Screen
        name="livreurRetraitLivraisonList"
        options={{headerShown: true}}
        component={LivreurRetraitLivraisonList}
      />
      <Stack.Screen
        name="livreurDepotLivraisonList"
        options={{headerShown: true}}
        component={LivreurDepotLivraisonList}
      />
      <Stack.Screen
        name="choisirdestination"
        options={{
          title: 'Destination',
          headerShown: true,
        }}
        component={ChoisirDestination}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Itineraire"
        component={Itineraire}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="GlobalMapVsion"
        component={GlobalMapVsion}
      />
      <Stack.Screen
        name="formulaire_infos_expediteur"
        options={{
          title: 'Remplissez le formulaire de livraison',
          headerShown: true,
        }}
        component={Formulaire_infos_expediteur}
      />
      <Stack.Screen
        name="formulaire_infos_recepteur"
        options={{
          title: 'Remplissez le formulaire de livraison',
          headerShown: true,
        }}
        component={Formulaire_Infos_Recepteur}
      />
      <Stack.Screen
        name="DeliveriesToRemove"
        options={{title: 'Livraisons a retirer'}}
        component={DeliveriesToRemove}
      />
      <Stack.Screen
        name="PacketInformation"
        options={{title: 'Remplissez le formulaire de livraison'}}
        component={PacketInformation}
      />
      <Stack.Screen
        name="TrackPaquet"
        options={{title: 'Suivi et Traçabilité'}}
        component={TrackPaquet}
      />
      {/* <Stack.Screen name="detailsclients" options={{ title: "Récapitulatif des informations" }} component={LivraisonDetails} /> */}
      <Stack.Screen
        name="selectMode"
        options={{title: 'Sélectionner le mode depaiement'}}
        component={Paiement}
      />
      <Stack.Screen
        name="mesCommision"
        options={{title: 'Mes commissions'}}
        component={MesCommision}
      />
      <Stack.Screen
        name="graph"
        options={{headerShown: true}}
        component={Graph}
      />
      {/* <Stack.Screen name="areaChart" options={{ headerShown: true }} component={AreaChart} />
        <Stack.Screen name="areaChart1" options={{ headerShown: true }} component={AreaChart1} />
        <Stack.Screen name="graph2" options={{ headerShown: true }} component={Graph2} /> */}
      <Stack.Screen
        name="formulaireIdentification"
        options={{title: 'Identification du livreur'}}
        component={FormulaireIdentificationLivreur}
      />
      <Stack.Screen
        name="recuPoc"
        options={{headerShown: false}}
        component={RecuPoc}
      />
      <Stack.Screen
        name="listePaquetRetirer"
        options={{headerShown: false}}
        component={InProcess}
      />
      <Stack.Screen
        name="confirmationdepot"
        options={{headerShown: false}}
        component={ConfirmationDepot}
      />
      <Stack.Screen
        name="facturePoc"
        options={{headerShown: false}}
        component={FacturePoc}
      />
      <Stack.Screen
        name="alert"
        options={{headerShown: false}}
        component={Alert}
      />
      <Stack.Screen
        name="successAlert"
        options={{headerShown: true}}
        component={Paquet}
      />
      <Stack.Screen
        name="errorAlert"
        options={{headerShown: true}}
        component={Paquet1}
      />
      <Stack.Screen
        name="sheet"
        options={{headerShown: true}}
        component={BottmSheetWraperActif}
      />
      <Stack.Screen
        name="scan"
        options={{headerShown: true}}
        component={Scan}
      />
      {/* <Stack.Screen name="choice" options={{ headerShown: true }} component={ModalChoiceType} /> */}
    </Stack.Navigator>
  );
}

export default App;
