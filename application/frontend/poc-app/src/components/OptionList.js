import React from 'react'
import { COLORS, SIZES } from '../constants/theme'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import IconActif from './IconActif'
import { Text } from 'react-native-paper'

const OptionList = ({title, icon, style, onPress}) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.wrapper, style]}>
            <View style={{ flexDirection: 'row', gap: 10 }}>
                <IconActif name={icon} iconColor={COLORS.secondary} />
                <Text style={{ color: COLORS.black }}>{title}</Text>
            </View>
            <View>
                <IconActif name={"chevron-right"} iconColor={COLORS.secondary} />
            </View>
        </TouchableOpacity>
    )
}

export default OptionList

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        backgroundColor: COLORS.whiteSmoke,
        borderRadius: SIZES.radius
    }
})
