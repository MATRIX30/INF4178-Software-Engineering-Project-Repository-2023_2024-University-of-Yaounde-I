import React from 'react'
import { TouchableWithoutFeedback, StyleSheet, View, Text } from 'react-native'
import { COLORS, SIZES } from '../constants/theme'
import IconActif from './IconActif'
import { DistanceIcon } from './SvgIcons'
import { useNavigation } from '@react-navigation/native'

const LivreurListItem = ({ data, iconStartLeft, iconEndLeft }) => {
    const navigation = useNavigation()


    return (
        <TouchableWithoutFeedback
         onPress={
            ()=>navigation.navigate('livreurDepotLivraisonList')
        }
        >
            <View style={[styles.container, { borderWidth: 1, borderColor: COLORS.white }]}>
                <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
                    <IconActif size={25} name={iconStartLeft} iconColor={COLORS.black} />
                    <View style={{ marginHorizontal: 10, }}>
                        <Text style={{ color: COLORS.black }}>Kencfack Paull</Text>
                        <Text style={{ fontWeight: "bold", color: COLORS.black }}>adresse</Text>
                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
                    {/* <IconActif size={25} name={"map-marker-distance"} iconColor={COLORS.primary} /> */}
                    {iconEndLeft && iconEndLeft}
                    <View style={{ margin: 10, }}>
                        <Text style={{ color: COLORS.black }}>Livraison</Text>
                        <Text style={{ fontWeight: "bold", color: COLORS.black }}>{`10`}</Text>
                    </View>
                </View>
                <IconActif name={"chevron-right"} size={25} iconColor={COLORS.secondary} />
            </View>

        </TouchableWithoutFeedback>
    )
}

export default LivreurListItem
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        height: "100%",
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.whiteSmoke,
        padding: 3,
        paddingHorizontal: 10,
        marginVertical: 10
    },
})
