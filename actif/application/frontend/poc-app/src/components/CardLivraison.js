import React, { useState } from 'react'
import { Button, Dimensions, ScrollView, StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
// import HomeSvg from '../../../assets/icons/home.svg'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS, SIZES, STYLES } from '../constants/theme';
import IconActif from './IconActif';
import ButtonActif from './ButtonActif';
import { Image } from 'react-native-svg';
import Dash from 'react-native-dash';
import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';


const CardLivraison = ({ data, handleConsult }) => {
    // console.log("🚀 ~ file: CardLivraison.js:14 ~ CardLivraison ~ data:", data)
    var relativeTime = require('dayjs/plugin/relativeTime');
    dayjs.extend(relativeTime);
    dayjs.locale('fr');

    /* Calcul du poid du packet */
    let packetWeight = 0;
    let packetHeight = 0;
    let packetWidth = 0;
    data?.includedIn?.packet?.items?.length > 0 &&
        data?.includedIn?.packet?.items?.map(item => {
            packetWeight += item?.weight;
            packetHeight += item?.height;
            packetWidth += item?.width;
        });
    const navigation = useNavigation()
    return (

        <TouchableWithoutFeedback onPress={() => navigation.navigate('livraisonDetails',{delivery: data})}>

            <View key={data.id} style={[styles.wrapper, STYLES.mainLayout]} >
                <View style={styles.cardContent}>
                    {/* Head */}
                    <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', gap: 5, color: COLORS.black, alignItems: 'center', width: '60%' }}>
                            <IconActif
                                name={"qrcode-scan"}
                                iconColor={COLORS.secondary} />
                            <Text numberOfLines={1} style={{ fontSize: SIZES.topNav, color: COLORS.black, fontWeight: 'bold' }} >code packet,{data?.includedIn?.packet?.code}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                            <View style={{ backgroundColor: COLORS.cleanRed, paddingVertical: SIZES.subText, paddingHorizontal: SIZES.subText, borderRadius: SIZES.cardRadius }}>
                                <Text numberOfLines={1} style={{ color: COLORS.secondary }}>-{data?.selectedBy?.date ? dayjs(new Date(data?.selectedBy?.date)).fromNow() : 'Non fourni'}</Text>
                            </View>
                            {/* <IconActif
                                name={"arrow-right-circle-outline"}
                                iconColor={COLORS.primary} /> */}
                        </View>
                    </View>

                    {/* middle */}
                    <View style={{ flexDirection: 'row', justifyContent: "space-between", padding: 10 }}>
                        {/* left */}
                        <View style={{ flexDirection: 'column', width: '33.33%' }}>
                            <View style={{ flexDirection: 'row', fontSize: SIZES.font, alignItems: 'center', color: COLORS.black, }}>
                                <Icon name="circle-double" size={15} color={COLORS.gray} />
                                <Text numberOfLines={1} style={{ color: COLORS.black }}>{data.pocSource?.town}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', borderLeftWidth: 1, borderStyle: 'dashed', borderColor: COLORS.grey, marginStart: 7 }}>
                                <View style={{ marginVertical: 15, marginStart: 10, paddingHorizontal: 7, paddingVertical: 1, backgroundColor: COLORS.gray, borderRadius: 2 }}>
                                    <Text style={{ color: COLORS.black, }} numberOfLines={1}>{data?.distance}Km</Text>
                                </View>
                            </View>
                            <View style={{ fontSize: SIZES.font, flexDirection: 'row', fontSize: SIZES.font, alignItems: 'center', color: COLORS.black, }}>
                                <Icon name="circle-double" size={15} color={COLORS.gray} />
                                <Text numberOfLines={1} style={{ color: COLORS.black }}>{data?.pocIntended?.town}</Text>
                            </View>
                        </View>

                        {/* middle */}
                        <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'stretch', width: '33.33%' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, }}>
                                <IconActif
                                    name={"weight"}
                                    iconColor={COLORS.black}
                                />
                                {/* <Icon name="weight" size={20} color={COLORS.black} /> */}
                                <View >
                                    <Text style={{ color: COLORS.grey, }}>Poids</Text>
                                    <Text numberOfLines={1} style={{ color: COLORS.black, fontSize: SIZES.font }}>{packetWeight}Kg</Text>
                                </View>
                            </View>
                            <View style={{
                                color: COLORS.black, flexDirection: 'row', gap: 5, alignItems: 'center'
                            }}>
                                <IconActif
                                    name={"tools"}
                                    iconColor={COLORS.black}

                                />
                                {/* <Icon name="tools" size={20} color={COLORS.black}/> */}
                                <View>
                                    <Text style={{ color: COLORS.grey, }}>Objects</Text>
                                    <Text style={{ color: COLORS.black, fontSize: SIZES.font }}>{data?.includedIn?.packet?.items?.length > 0
                                        ? data?.includedIn?.packet?.items?.length
                                        : '0'}</Text>
                                </View>
                            </View>
                        </View>

                        {/* end */}
                        <View style={{ flexDirection: 'column', justifyContent: "space-between", alignItems: 'flex-start' }}>
                            <View style={{ alignItems: 'center', flexDirection: 'row', gap: 5 }}>
                                <IconActif
                                    name={"format-line-spacing"}
                                    iconColor={COLORS.black}

                                />
                                <View >
                                    <Text style={{ color: COLORS.grey, }}>Taille</Text>
                                    <Text style={{ color: COLORS.black, fontSize: SIZES.font }}>
                                        {packetWidth}*{packetHeight}Cm</Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                                {/* <Icon name="clock-time-five-outline" size={20} color={COLORS.black} backgroundColor={COLORS.white} /> */}
                                <IconActif
                                    name={"clock-time-five-outline"}
                                    iconColor={COLORS.black}

                                />
                                <View>
                                    <Text style={{ color: COLORS.grey, }}>Duree</Text>
                                    <Text style={{ color: COLORS.black, fontSize: SIZES.font }}>
                                        {data?.estimatedDeliveryDate ? dayjs(new Date(data?.estimatedDeliveryDate)).fromNow() : 'Non fourni'}

                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    {/* buttons */}
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: 'center', paddingHorizontal: 10 }}>
                        <View >
                            <Text style={styles.moneyCard}>{data?.cost} FCFA</Text>
                            {/* <Text style={Dashboards.titre3_1_A}>5500F</Text> */}
                        </View>
                        <View style={{ justifyContent: "space-between" }}>
                            <View>
                                <ButtonActif onPress={handleConsult} reverse={true} icon={"chevron-right"} title={'Consulter'} style={styles.button} background={COLORS.black} textColor={COLORS.white} />
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>

    )
}

export default CardLivraison

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: 'center',

    },
    cardContent: {
        width: '100%',
        backgroundColor: COLORS.whiteSmoke,
        elevation: 4,
        padding: 6,
        shadowColor: COLORS.grey,
        borderRadius: SIZES.cardRadius,
        flexDirection: 'column'
    },
    button: {
        borderRadius: SIZES.radius,
    },
    moneyCard: { backgroundColor: COLORS.primary, padding: 4, paddingHorizontal: 8, borderRadius: SIZES.radius, fontSize: SIZES.body, color: COLORS.black }
})
