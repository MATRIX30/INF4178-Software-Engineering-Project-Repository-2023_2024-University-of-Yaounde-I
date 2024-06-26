import React, { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { Col, Row } from './GridView'
import { COLORS } from '../constants/theme'
import { Text } from 'react-native'

const ObjectActif = ({ item, index }) => {
    // const packets = [
    //     {
    //         id: "p02d2sd",
    //         height: 20,
    //         length: 30,
    //         width: 10,
    //         weight: 50,
    //         description: 'Ecran Plasma TV, SAMSAUNG FHD, 1080*1920'
    //     },
    //     {
    //         id: "p02d2ss",
    //         height: 15,
    //         length: 25,
    //         width: 6,
    //         weight: 30,
    //         description: 'Ecran Plasma TV, SAMSAUNG FHD, 1080*1920'
    //     }
    // ]
    return (
        <Row key={item?.index + 1} style={styles.container}>
            <Col numRows={1}>
                <Text style={styles.text}>{item?.index + 1}</Text>
            </Col>
            <Col numRows={3}>
                <Text numberOfLines={1} style={styles.text}>
                    {item?.item?.description} | {item?.item?.width}  * {item?.item?.height} m | {item?.item?.weight} kg
                    ( <Text
                        style={{
                            color: item?.item?.type === 'FRAGILE' ? COLORS.secondary : COLORS.grey,
                            textDecorationLine: 'underline'
                        }}
                    >{item?.item?.type}</Text> )
                </Text>
            </Col>
        </Row>


    )
}

export default ObjectActif

const styles = StyleSheet.create({
    container: {
        borderColor: COLORS.gray,
        borderWidth: 0.5,
        backgroundColor: COLORS.whiteSmoke,
        padding: 6,
        marginTop: 8,
        borderColor: COLORS.primary
    },
    text: {
        color: COLORS.black
    }
})