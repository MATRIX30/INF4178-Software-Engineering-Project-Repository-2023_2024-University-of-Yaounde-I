
import { COLORS, SIZES } from '../constants/theme';
import { IconButton, MD3Colors } from 'react-native-paper';


// https://callstack.github.io/react-native-paper/docs/components/IconButton/
const IconButtonActif = ({ mode, name, background, iconColor, size, onPress, style, bordercolor }) => {

    return (
        <>

            <IconButton
                mode={mode}
                icon={name || "camera"}
                iconColor={iconColor || COLORS.white}
                size={size || SIZES.icon}
                // onPress={() => console.log('Pressed')}
                onPress={onPress}
                containerColor={background || COLORS.primary}
                style={style}
                theme={{
                    colors : {
                        outline : bordercolor
                    }
                }} 


            />

        </>
    )
}

export default IconButtonActif;