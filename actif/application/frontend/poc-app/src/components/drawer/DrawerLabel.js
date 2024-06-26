import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import { COLORS, SIZES } from '../../constants/theme'

const DrawerLabel = ({ title, icon, style }) => {
    return (
        <View style={styles.container}>
            {icon && icon}
            <View>
                <Text style={[styles.text, style]}>{title}</Text>
            </View>
        </View>
    )
}

export default DrawerLabel

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    text: { color: COLORS.black, fontSize: SIZES.h2 }
})
