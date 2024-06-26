import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Divider } from 'react-native-paper'
import Title from './Title'
import { COLORS, SIZES } from '../constants/theme'

const HeaderFormLiv = ({title}) => {
    return (
        <View>
            <Divider style={styles.divider} />
            <Title text={title} size={SIZES.h1} color={COLORS.secondary} />
        </View>
    )
}

export default HeaderFormLiv

const styles = StyleSheet.create({
    divider: {
        marginVertical: 5,
        color: COLORS.gray,
        height: 1.5
    }
})
