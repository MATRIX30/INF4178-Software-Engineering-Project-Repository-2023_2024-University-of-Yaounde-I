/* eslint-disable prettier/prettier */
import { useNavigation } from "@react-navigation/native"
import { Text } from "react-native-paper"
import ButtonActif from "../../../components/ButtonActif"
import { COLORS, SIZES, STYLES } from "../../../constants/theme"

const { View, StyleSheet, Image } = require("react-native")

const SlideTwo = () => {
    const navigation = useNavigation()
    return (


        <>
            <View style={[myStyle, STYLES.mainLayout]}>
                <Text style={{ fontSize: SIZES.h1, color: COLORS.primary, alignSelf: 'flex-start' }}>
                    BIENVENUE DANS L APPLICATION DE LIVRAISONS
                </Text>

                <Text style={{ fontSize: SIZES.h2, color: COLORS.grey }}>
                    Salut cher livreur ! Prêt à embarquer pour des livraisons exceptionnelles ? Découvrez les
                    offrez un service hors pair. Votre succès est notre priorité. Appuyez pour commencer l'aventure !
                </Text>


                <ButtonActif
                    color={COLORS.primary}
                    textColor={COLORS.white}
                    size={SIZES.cardRadius}
                    title={"Suivant"}
                    onPress={() => navigation.navigate("registerChoice")}
                    style={{
                        borderRadius: SIZES.button
                    }}
                />



            </View>

        </>
    )
}

const myStyle = StyleSheet.create({
    gap: 50, flex: 1,
    justifyContent: 'center',

    backgroundColor: COLORS.white,
    padding: 30,
    margin: 0
})

export default SlideTwo;