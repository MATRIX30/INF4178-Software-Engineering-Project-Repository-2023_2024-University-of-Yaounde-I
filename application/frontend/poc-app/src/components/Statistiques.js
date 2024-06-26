import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { COLORS, SIZES } from '../constants/theme'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { DepositIcon, PacketIcon } from './SvgIcons'
import { Col, Row } from './GridView'


const Statistiques = () => {
    return (
        <View style={styles.wrapper}>
            <Row>
                <Col numRows={2}>
                    <View style={styles.item}>
                        <PacketIcon color={COLORS.whiteSmoke} />
                        <Text style={styles.count}>65</Text>
                        <Text style={styles.text}>Livraisons réussies</Text>
                    </View>
                </Col>
                <Col numRows={2}>
                    <View style={styles.item}>
                        <PacketIcon color={COLORS.whiteSmoke} />
                        <Text style={styles.count}>65</Text>
                        <Text style={styles.text}>Livraisons réussies</Text>
                        <View>
                            <MaterialCommunityIcons name='arrow-right' color={COLORS.white} size={30} onPress={() => alert('go')} />
                        </View>
                    </View>
                </Col>
            </Row>
            {/* <View>
                <DepositIcon color={COLORS.whiteSmoke} />
                <Text style={styles.count}>41</Text>
                <Text style={styles.text}>Dépôts effectués</Text>

                <View>
                    <MaterialCommunityIcons name='arrow-right' color={COLORS.white} size={30} onPress={() => alert('go')} />
                </View>
            </View> */}
        </View>
    )
}

export default Statistiques

const styles = StyleSheet.create({
    wrapper: {
        flex: 4,
        marginHorizontal: 'auto',
        backgroundColor: COLORS.primary,
        borderRadius: SIZES.cardRadius,
        paddingVertical: 13,
        paddingHorizontal: 8,
        marginTop: 10
    },
    // displayLeft: {
    //     display: 'flex',
    //     flexDirection: 'row',
    //     alignItems: 'center',
    //     flexWrap: 'wrap'
    // },
    item: {
        flex: 2,
        flexDirection: 'row',
        alignItems: 'center',
    },
    count: {
        color: COLORS.whiteSmoke,
        fontWeight: 'bold',
        fontSize: SIZES.h2,
        marginHorizontal: 5
    },
    text: {
        color: COLORS.whiteSmoke,
        fontSize: SIZES.subText
    }
})