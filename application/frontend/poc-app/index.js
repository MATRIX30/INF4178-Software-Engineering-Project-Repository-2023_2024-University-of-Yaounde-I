/**
 * @format
 */

import { AppRegistry, Platform } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { PaperProvider, configureFonts } from 'react-native-paper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthNavigation } from './src/navigation/AuthNavigation';
import { ToastProvider } from 'react-native-paper-toast';

// const fontConfig = {
//   customVariant: {
//     fontFamily: Platform.select({
//       web: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
//       ios: 'System',
//       default: 'sans-serif',
//     }),
//     fontWeight: '400',
//     letterSpacing: 0.5,
//     lineHeight: 22,
//     fontSize: 80,
//   }
// };

// const theme = {
//   fonts: configureFonts({config: fontConfig}),
// };
export default function Main() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider
      // theme={theme}
      >
        <ToastProvider>
          <AuthNavigation />
        </ToastProvider>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}
AppRegistry.registerComponent(appName, () => Main);
