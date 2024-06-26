import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import ButtonActif from "../../../components/ButtonActif";
import { Text } from "react-native-paper";
import { COLORS, SIZES, STYLES } from "../../../constants/theme";
import IconActif from "../../../components/IconActif";
import IconButtonActif from "../../../components/IconButtonActif";

const RetraitConfirm = () => {

    const navigation = useNavigation()
    return (
        <>
            <View style={[myStyle, STYLES.mainLayout]}>
                <View style={{ marginTop: '5%', height: '45%', }} >
                    <View style={{ color: COLORS.black, alignItems: 'center', flex: 12, }}>
                        {/* <View style={{ flex: 2, justifyContent: 'center' }}>
                            <Text style={{ fontSize: SIZES.largeTitle, color: COLORS.black, borderBottomColor: COLORS.black, borderBottomWidth: 3, }}>20000 F</Text>
                        </View> */}
                        <View style={{ flex: 10, width: '95%', marginTop: '2%', alignItems: 'center', borderWidth: 1, borderRadius: SIZES.radius, borderColor: COLORS.primary, }}>
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                <IconActif name={"qrcode-scan"} size={30} iconColor={COLORS.black} />
                                <Text style={{ color: COLORS.black, color: COLORS.black, fontSize: SIZES.body }}>Retrait reussie</Text>
                            </View >
                            <View style={{ flex: 1, color: COLORS.black, alignItems: 'center', borderColor: COLORS.primary }}>
                                <View style={{ gap: 10 }}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={{ color: COLORS.black, fontSize: SIZES.body }}>Vous avez effectué un retrait de <Text style={{ color: COLORS.secondary }}>20000F</Text></Text>
                                        <Text style={{ color: COLORS.grey, fontSize: SIZES.body }}>Veuillez verifier votre sms pour la confirmation</Text>
                                    </View >
                                    <View style={{ flex: 1, marginTop: '5%' }}>
                                        <ButtonActif
                                            style={{ borderRadius: SIZES.buttonRadius }}
                                            background={COLORS.primary} textColor={COLORS.black} title={"Continuer"} />
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>

        </>
    )
}

const myStyle = StyleSheet.create({
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
})

export default RetraitConfirm;