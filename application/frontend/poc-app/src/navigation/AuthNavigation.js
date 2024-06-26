import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PreLoader from '../components/loaders/PreLoader';
import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {COLORS, SIZES} from '../constants/theme';
import SlideOne from '../screens/auth/slides/SlideOne';
import RegisterChoice from '../screens/auth/RegisterChoice';
import VerificationCode from '../screens/auth/VerificationCode';
import Login from '../screens/auth/Login';
import Register from '../screens/auth/Register';
import {NavigationContainer} from '@react-navigation/native';
import IconActifBackNavigator from '../components/IconBackNavigator';
import App from '../../App';
import axios from 'axios';
import {config} from '../constants/config';
import {useToast} from 'react-native-paper-toast';
export const AuthContext = React.createContext();

export const AuthNavigation = () => {
  const Stack = createNativeStackNavigator();
  const [erroAxios, setErrorAxios] = useState('');

  const toaster = useToast();

  function SplashScreen() {
    return <PreLoader />;
  }

  /* Navigation auth configuration */
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      // console.log("action reducer ==>", action?.token)
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            user: action.user,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
            user: action.user,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
            user: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
      user: null,
    },
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        // userToken = await SecureStore.getItemAsync('userToken');
      } catch (e) {
        // Restoring token failed
      }

      try {
        // Restore token stored in `SecureStore` or any other encrypted storage
        // userToken = await SecureStore.getItemAsync('userToken');
        userToken = await AsyncStorage.getItem('userToken');
        user = await AsyncStorage.getItem('user');
      } catch (e) {
        // Restoring token failed
        console.log('Restoring token failed', e);
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({type: 'RESTORE_TOKEN', token: userToken});
    };

    bootstrapAsync();
  }, []);

  const [loading, setLoading] = useState(false);
  const authContext = React.useMemo(
    () => ({
      signIn: async (data, setLoad) => {
        setLoad(true);
        // console.log("🚀 ~ file: Authentication.js:111 ~ signIn: ~ data:", data)
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token

        try {
          await axios
            .post(config.app.api_url + '/auth/login', data)
            .then(async response => {
              setLoading(true);
              setLoad(false);
              await AsyncStorage.setItem(
                'userToken',
                response?.data?.access_token,
              );

              await AsyncStorage.setItem(
                'user',
                JSON.stringify({...response?.data?.user}),
              );

              setErrorAxios('');
            })
            .catch(err => {
              setLoad(true);
              setErrorAxios(err?.response?.data?.message);
              // console.log("err == > ", err?.code)
              err?.code == 'ERR_NETWORK'
                ? toaster.show({
                    message:
                      'Veuillez verifier votre wifi / connexion internet et reessayer',
                    type: 'error',
                    duration: 5000,
                    position: 'top',
                  })
                : toaster.show({
                    message: err?.response?.data?.message,
                    type: 'error',
                    duration: 5000,
                    position: 'top',
                  });
            });
        } catch (error) {
          setLoad(true);
          toaster.show({
            message: 'an error occured ',
            type: 'error',
            duration: 5000,
            position: 'top',
          });
          // console.log("🚀 ~ file: AuthNavigator.js:135 ~ .then ~ error cath:", error)
        }
        dispatch({type: 'SIGN_IN', token: 'dummy-auth-token'});
        setLoading(false);
      },
      signOut: async () => {
        try {
          await AsyncStorage.removeItem('userToken');
          await AsyncStorage.removeItem('user');
          // setVerified('')
        } catch (error) {
          console.log('error signout', error);
        }
        dispatch({type: 'SIGN_OUT'});
      },
      signUp: async data => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token

        dispatch({type: 'SIGN_IN', token: null});
      },
    }),
    [],
  );

  /* Auth stacks */
  function Auth() {
    return (
      <Stack.Navigator
        initialRouteName="slideOne"
        screenOptions={{
          animation: 'slide_from_right',
          headerStyle: {
            backgroundColor: COLORS.primary,
          },
        }}>
        <Stack.Screen
          name="slideOne"
          options={{headerShown: false}}
          component={SlideOne}
        />
        {/* <Stack.Screen name="slideTwo" options={{ headerShown: false }} component={SlideTwo} /> */}
        {/* <Stack.Screen name="slide3" options={{ headerShown: false }} component={Slide3} /> */}
        <Stack.Screen
          name="registerChoice"
          options={{headerShown: false}}
          component={RegisterChoice}
        />
        <Stack.Screen
          name="login"
          options={{title: 'Se connecter'}}
          component={Login}
        />
        <Stack.Screen
          name="vericationCode"
          options={{
            title: 'Verifiez votre compte',
          }}
          component={VerificationCode}
        />
        <Stack.Screen
          name="register"
          options={{title: 'Devenir livreur Actif'}}
          component={Register}
        />
      </Stack.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <AuthContext.Provider value={authContext}>
        <Stack.Navigator
          initialRouteName="main"
          screenOptions={{
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: SIZES.pageTitle,
            },
            headerLeft: props => <IconActifBackNavigator {...props} />,
          }}>
          {/* {console.log("state.userToken ==> ", erroAxios)} */}
          {state.isLoading || loading ? (
            /* splash screen  */
            <Stack.Screen
              name="splashScreen"
              options={{headerShown: false}}
              component={SplashScreen}
            />
          ) : state.userToken == null ||
            erroAxios?.length > 0 ||
            erroAxios == undefined ? (
            <Stack.Screen
              name="auth"
              options={{headerShown: false, animation: 'slide_from_right'}}
              component={Auth}
            />
          ) : (
            <>
              {/* <Text>loged</Text>
                           <App/> */}
              <Stack.Screen
                name="app"
                options={{headerShown: false, animation: 'slide_from_right'}}
                component={App}
              />
            </>
          )}
        </Stack.Navigator>
      </AuthContext.Provider>
    </NavigationContainer>
  );
};
