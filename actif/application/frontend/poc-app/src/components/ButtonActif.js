import React from 'react';
import {View} from 'react-native';
import {Button} from 'react-native-paper';
import {COLORS, SIZES} from '../constants/theme';

const ButtonActif = ({textColor, disabled, background, title, icon, style, onPress, reverse, labelStyle, borderColor}) => {
    console.log(typeof(icon))
    return (
            <Button
            rippleColor={COLORS.rippleColor}
                textColor={textColor || COLORS.black}
                buttonColor={background || COLORS.primary}
                disabled={disabled}
                icon={icon || ''}
                mode={'elevated'}
                style={{ borderRadius : SIZES.button.radius, borderWidth : borderColor ? 1 : 0, borderColor : borderColor, borderBlockColor : "red" ,...style}}
                onPress={onPress}
                // contentStyle={{borderRadius : 1}}
                contentStyle={{flexDirection: reverse ? 'row-reverse' : 'row'}}
                labelStyle={{borderRadius : SIZES.button.radius, fontSize :SIZES.textButton, ...labelStyle}}
            >
                {title  || "Mon Boutton"}
            </Button>
    )
}

export default ButtonActif;
