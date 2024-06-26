import React from 'react'
import { StyleSheet, View } from 'react-native'
import { COLORS, SIZES } from '../constants/theme'
import IconActif from './IconActif'
import Title from './Title'

const HeaderNavigation = ({ title, rightIcon, leftIcon, navigation }) => {
    return (
        <View style={styles.container}>
            <View>
                {leftIcon && leftIcon}
            </View>
            <Title text={title} size={SIZES.body} color={COLORS.black} />
            <View>
                {rightIcon && rightIcon}
            </View>
        </View>
    )
}

export default HeaderNavigation

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 60,
        width: '100%',
        paddingHorizontal: 10,
        backgroundColor: COLORS.primary
    }
})
