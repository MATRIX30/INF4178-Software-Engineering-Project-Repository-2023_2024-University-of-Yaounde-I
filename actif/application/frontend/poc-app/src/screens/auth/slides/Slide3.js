import { Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import ButtonActif from "../../../components/ButtonActif";
import { STYLES } from "../../../constants/theme";

const { View, StyleSheet } = require("react-native")

const SlideTwo = () => {
    const navigation = useNavigation()
    return (
        <>
            <View style={[myStyle, STYLES.mainLayout]}>

                <Text>Content</Text>
                <ButtonActif onPress={() => navigation.navigate("registerChoice")} />

            </View>

        </>
    )
}

const myStyle = StyleSheet.create({

})

export default SlideTwo;