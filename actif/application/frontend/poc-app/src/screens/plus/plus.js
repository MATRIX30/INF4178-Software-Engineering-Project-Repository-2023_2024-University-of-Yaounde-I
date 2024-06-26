import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import { COLORS, SIZES, STYLES } from '../../constants/theme'
import ButtonActif from '../../components/ButtonActif'
import IconActif from '../../components/IconActif'




const Plus = () => {
    const navigation = useNavigation()
    return (
        <>
            <View style={[myStyle, STYLES.mainLayout]}>

                <Text>Plus</Text>
                <ButtonActif onPress={() => navigation.navigate("main")} />
                <View style={{width:'100%', height:'100%',alignItems:'center'}}>
                    <View style={{ width: '90%', height: '40%', }}>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomColor: COLORS.gray, borderBottomWidth: 3 }}>
                            <View style={{ flexDirection: 'row', gap: 30, marginLeft: '5%' }}>
                                <IconActif name={"chart-bar"} iconColor={COLORS.black} />
                                <Text style={{ color: COLORS.black }}>Statistiques</Text>
                            </View>
                            <View style={{ marginRight: '5%' }}><IconActif name={"chevron-right"} iconColor={COLORS.black} /></View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomColor: COLORS.gray, borderBottomWidth: 3 }}>
                            <View style={{ flexDirection: 'row', gap: 30, marginLeft: '5%' }}>
                                <IconActif name={"dolby"} iconColor={COLORS.black} />
                                <Text style={{ color: COLORS.black }}>commission</Text>
                            </View>
                            <View style={{ marginRight: '5%' }}><IconActif name={"chevron-right"} iconColor={COLORS.black} /></View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomColor: COLORS.gray, borderBottomWidth: 3 }}>
                            <View style={{ flexDirection: 'row', gap: 30, marginLeft: '5%' }}>
                                <IconActif name={"account-settings"} iconColor={COLORS.black} />
                                <Text style={{ color: COLORS.black }}>Parametres</Text>
                            </View>
                            <View style={{ marginRight: '5%' }}><IconActif name={"chevron-right"} iconColor={COLORS.black} /></View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomColor: COLORS.gray, borderBottomWidth: 3 }}>
                            <View style={{ flexDirection: 'row', gap: 30, marginLeft: '5%' }}>
                                <IconActif name={"language-fortran"} iconColor={COLORS.black} />
                                <Text style={{ color: COLORS.black }}>Langue</Text>
                            </View>
                            <View style={{ marginRight: '5%' }}><IconActif name={"chevron-right"} iconColor={COLORS.black} /></View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomColor: COLORS.gray, borderBottomWidth: 3 }}>
                            <View style={{ flexDirection: 'row', gap: 30, marginLeft: '5%' }}>
                                <IconActif name={"login"} iconColor={COLORS.black} />
                                <Text style={{ color: COLORS.black }}>Deconnexion</Text>
                            </View>
                            <View style={{ marginRight: '5%' }}><IconActif name={"chevron-right"} iconColor={COLORS.black} /></View>
                        </View>
                    </View>
                </View>
            </View>

        </>
    )
}

const myStyle = StyleSheet.create({

})


export default Plus
