import { View } from "react-native";
// import { Text } from "react-native-paper";
import { COLORS, SIZES, STYLES } from "../../constants/theme";
import IconActif from "../../components/IconActif";
import Scan from "./Scan";
import ButtonActif from "../../components/ButtonActif";
import { useEffect } from "react";
const { Text, PaperProvider, Button, Portal, Dialog, Modal } = require("react-native-paper")

export default function ScanModal({ code, setCode, visible, setVisible }) {
  // const [visible, setVisible] = React.useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

useEffect(() => {
  code && setVisible(false)
  
}, [code]);
  return <PaperProvider>


    {/* <Button onPress={showDialog}>Show Dialog</Button> */}
    <Portal>
      <Modal visible={visible} onDismiss={hideDialog} contentContainerStyle={[STYLES.mainLayout,{
        flexDirection : 'column', 
        alignItems : 'center',
        justifyContent : 'space-between' ,
        height : "100%",
        paddingTop : 0

        }]}>
        <Scan code={code} setCode={setCode} />
        {/* <Text>Example Modal.  Click outside this area to dismiss.</Text> */}
        <ButtonActif title={"Fermer"} onPress={()=>setVisible(false)}/>
      </Modal>
    </Portal>

  </PaperProvider>
}


