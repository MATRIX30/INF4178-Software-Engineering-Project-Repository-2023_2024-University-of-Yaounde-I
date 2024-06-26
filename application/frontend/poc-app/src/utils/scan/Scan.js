import { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { Text } from "react-native-paper";
import { Camera, useCameraDevice, useCodeScanner, useCameraPermission } from "react-native-vision-camera";
import { COLORS, SIZES, STYLES } from "../../constants/theme";
import IconActif from "../../components/IconActif";
import { useNavigation } from "@react-navigation/native";
// https://www.react-native-vision-camera.com/docs/guides/code-scanning
// https://github.com/mrousavy/react-native-vision-camera/blob/main/package/example/src/CodeScannerPage.tsx
export default function Scan({code, setCode, width, height}) {
  const navigation = useNavigation()
  const device = useCameraDevice('back')
  const { hasPermission, requestPermission } = useCameraPermission()
  // const [codes, setCodes] = useState([]);
  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    requestPermission()
  }, []);
  const [packet, setPacket] = useState("");
  // console.log("🚀 ~ file: Scan.js:10 ~ ScanB ~ permission:", hasPermission)
  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: (codes, frame) => {
      setCode('')
      let res = []
      Object.keys(codes).map((key) => {
        console.log(key + "----" + codes[key]?.value)
        res.push(codes[key]?.value)
      })
      // console.log("🚀 ~ file: Scan.js:46 ~ Scan ~ res[0]?.split('-')[1]:", res[0]?.split('-')[1])
      // setCodes(res)
      setIsActive(false);

      setCode(res[0]?.split('-')[1])
      // setPacket(res[0])
      // 
    }
  })

  useEffect(() => {
    setTimeout(() => {
      setIsActive(true);
    }, 1500);


  }, []);

  if (device == null) return <Text>Error</Text>
  return (
    <View >
      <Camera
        style={StyleSheet.create({
          // width: Dimensions.get('screen').width,
          width: width ||  Dimensions.get('screen').width,
          height: height || 400
        })}
        device={device}
        isActive={isActive}
        codeScanner={codeScanner}
        photo={true}
        enableZoomGesture={true}
      />
    </View>
  )
}


