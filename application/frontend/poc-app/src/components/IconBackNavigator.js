import { TouchableWithoutFeedback } from "react-native";
import { COLORS, SIZES } from "../constants/theme";
import { useNavigation } from "@react-navigation/native";

const { Icon } = require("react-native-paper")

const IconActifBackNavigator = (props) => {
    const navigation = useNavigation()

    return (
        navigation.canGoBack() && <>
            <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                <Icon
                    source={"arrow-left"}
                    color={COLORS.black}
                    size={25}
                    // onPress={() => console.log('Pressed')}
                    // onPress={onPress}

                    style={{ borderRadius: SIZES.button.radius, }}
                />
            </TouchableWithoutFeedback>
        </>
    )
}

export default IconActifBackNavigator;