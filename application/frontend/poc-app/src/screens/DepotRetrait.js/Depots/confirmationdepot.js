import { useNavigation } from "@react-navigation/native"
import { STYLES, COLORS, SIZES } from "../../../constants/theme"
import IconButtonActif from "../../../components/IconButtonActif"
import { Text, Searchbar } from "react-native-paper"
import ButtonActif from "../../../components/ButtonActif";
import IconActif from "../../../components/IconActif";




const { View, StyleSheet, ScrollView, TouchableOpacity } = require("react-native")

const ConfirmationDepot = () => {

    const navigation = useNavigation()
    return (
        <>
            <View style={[STYLES.mainLayout, styles.container]}>
                <View style={{ alignItems: 'center', backgroundColor: COLORS.white, paddingVertical: 10, borderColor: COLORS.primary, borderWidth: 1, borderRadius: SIZES.cardRadius }}>
                    <IconButtonActif
                        name={"check"}
                        background={COLORS.primary}
                        iconColor={COLORS.black}
                        mode={'outlined'}
                        size={40}
                        bordercolor={COLORS.black}
                    />
                    <Text style={{ fontWeight: 'bold', fontSize: SIZES.h1 }}>3 000F</Text>
                    <Text style={{ fontStyle: "italic" }}>Dépôt effectué avec succès</Text>
                    <View style={{
                        backgroundColor: COLORS.primary,
                        width: 200,
                        alignItems: "center",
                        borderRadius: 10,
                        height: 100,
                        width: '60%',
                        justifyContent: 'center',
                        marginVertical: 20,
                    }}>
                        <Text style={{ fontSize: SIZES.input }}>Code du colis</Text>
                        <Text style={{
                            fontSize: SIZES.h1,
                            fontWeight: 'bold',
                        }}>co127643
                        </Text>
                    </View>
                    <ButtonActif
                        //  icon={() => <IconActif name={"arrow-right"} iconColor={COLORS.secondary} />}
                        //  borderColor={COLORS.primary}
                        //  reverse={true}
                        background={COLORS.black}
                        textColor={COLORS.white} title={"OK"}
                        style={{ borderRadius: SIZES.buttonRadius, width: "40%"}}
                        labelStyle={{ fontSize: SIZES.textButton }}
                        onPress={() => navigation.navigate("recuPoc")}

                    />
                </View>
            </View>

        </>
    )
}

export default ConfirmationDepot

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    }
})