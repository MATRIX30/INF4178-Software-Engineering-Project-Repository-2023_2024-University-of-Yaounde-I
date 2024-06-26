import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { COLORS, SIZES } from '../constants/theme'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'


const CardHome = ({ icon, title, subTitle, count, link, displayArrow }) => {
    return (
        <View style={styles.wrapper}>
            <View style={styles.displayLeft}>
                <View style={styles.icon}>
                    {icon}
                </View>
                <View >
                    <Text numberOfLines={1} style={{ fontSize: SIZES.h2, color: COLORS.black }}>{title} {count && `(${count})`}</Text>
                    <Text numberOfLines={1} style={{ fontSize: SIZES.subText, color: COLORS.black }}>{subTitle}</Text>
                </View>
            </View>
            {
                displayArrow === true && (
                    <View>
                        <MaterialCommunityIcons name='arrow-right' color={COLORS.primary} size={30} onPress={() => alert('go')} />
                    </View>
                )
            }


        </View>
    )
}

export default CardHome

const styles = StyleSheet.create({
    wrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        paddingVertical: 20,
        marginTop: 20,
        backgroundColor: COLORS.whiteSmoke,
        borderRadius: SIZES.cardRadius
    },
    displayLeft: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        marginEnd: 10
    }
})
