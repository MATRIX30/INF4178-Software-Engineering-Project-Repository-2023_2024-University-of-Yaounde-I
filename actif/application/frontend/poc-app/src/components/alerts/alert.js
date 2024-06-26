import React from "react";
import { StyleSheet, View } from "react-native"
import { COLORS, SIZES } from '../../constants/theme'
import { Colors } from "react-native/Libraries/NewAppScreen";
import IconActif from "../IconActif";
import ButtonActif from "../ButtonActif";

const { Text, PaperProvider, Button, Portal, Dialog } = require("react-native-paper")

const Alert = () => {
  const [visible, setVisible] = React.useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);


  return <PaperProvider>

    <View>

      <Button onPress={showDialog}>Show Dialog</Button>

      <Portal >

        <Dialog visible={true} onDismiss={hideDialog} style={{ justifyContent: 'center', alignItems: 'center', }}>


          <IconActif
            name={"emoticon-sad-outline"}
            iconColor={COLORS.primary}
            size={70}
          />


          <Dialog.Title style={{
            justifyContent: 'center',
            alignItems: 'center',
            color: COLORS.primary,
            fontWeight: 'bold',
            left: 10,
          }}>ERROR ! </Dialog.Title>

          <Dialog.Content>
            <Text variant="bodyMedium" style={{ fontWeight: 'bold', textAlign: 'center', }}>Thank you for your request.  </Text>
            <Text variant="bodyMedium" style={{ fontWeight: 'bold', textAlign: 'center', }} >We are unable to continue the process. </Text>
            < Text  > Please try again to complete the request.  </Text>

          </Dialog.Content>
          <Dialog.Actions style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <ButtonActif

              background={COLORS.primary}
              textColor={COLORS.white} title={"TRY AGAIN"}
              style={{ width: 100 }}
              labelStyle={{ fontSize: SIZES.textButton }}
            />

            {/* <Button onPress={hideDialog} style={{backgroundColor: COLORS.primary  }}>Try again</Button> */}
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  </PaperProvider>
}

const myStyle = StyleSheet.create({

})

export default Alert