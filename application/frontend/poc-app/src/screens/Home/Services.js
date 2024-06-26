import React from 'react'
import { Text, View } from 'react-native'
import { COLORS, SIZES, STYLES } from '../../constants/theme'
import { Image, TouchableWithoutFeedback } from 'react-native'

const Services = ({ navigation }) => {
   
    const items = [
        {
            title: "Become a subscriber",
            description: "",
            imd: "var2",
            // onPress: ()
        },
        {
            title: "use our services",
            description: "",
            imd: "var4"
        },
        {
            title: "My Wallet",
            description: "",
            imd: "var5"
        },
        {
            title: "Transfert",
            description: "",
            imd: "var6"
        },
    ]
    const Card = (props) => {
        <TouchableWithoutFeedback
            // onPress={() => navigation.navigate("choisirdestination")}
            onPress={() => setOpenDepot(true)}
        >
            <View style={{
                shadowColor: COLORS.grey,
                shadowOffset: {
                    width: 0,
                    height: 10,
                },
                shadowOpacity: 0.1,
                elevation: 10, alignItems: 'center', backgroundColor: COLORS.primary, width: '45%', height: '40%', borderRadius: SIZES.radius, justifyContent: 'center',
            }}>

                <View style={{ flex: 1, width: '100%', justifyContent: 'space-between' }}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Image source={require('../../../assets/images/var2.png')} style={{ width: '80%', height: '80%' }} />
                    </View>

                </View>
                <View style={{ flex: 1, width: '100%', marginLeft: '10%' }}>
                    <Text style={{ color: COLORS.black, fontSize: SIZES.h2, fontWeight: 'bold' }}>{props?.title}</Text>
                    <Text style={{ color: COLORS.black, fontSize: SIZES.font }}>{props?.description}</Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    }
    return (
        <>
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1, backgroundColor: COLORS.primary }}>
                    <Text style={{ textAlign: 'center', color: COLORS.black, fontSize: SIZES.h1, textDecorationLine: 'underline' }}>Our Services</Text>

                </View>

                <View style={{ flex: 4, backgroundColor: COLORS.white, borderTopLeftRadius: 40, borderTopRightRadius: 40, alignItems: 'center', marginTop: '-30%' }}>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', height: '100%', alignItems: 'center', justifyContent: 'center', gap: 15, marginTop: '10%' }}>
                            <TouchableWithoutFeedback
                                // onPress={() => navigation.navigate("choisirdestination")}
                                // onPress={() => setOpenDepot(true)}
                            >
                                <View style={{
                                    shadowColor: COLORS.grey,
                                    shadowOffset: {
                                        width: 0,
                                        height: 10,
                                    },
                                    height : 100,
                                    shadowOpacity: 0.1,
                                    elevation: 10, alignItems: 'center', backgroundColor: COLORS.primary, width: '45%', height: '40%', borderRadius: SIZES.radius, justifyContent: 'center',
                                }}>

                                    <View style={{ flex: 1, width: '100%', justifyContent: 'space-between' }}>
                                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                            <Image source={require('../../../assets/images/var2.png')} style={{ width: '80%', height: '80%' }} />
                                        </View>

                                    </View>
                                    <View style={{ flex: 1, width: '100%', marginLeft: '10%' }}>
                                        <Text style={{ color: COLORS.black, fontSize: SIZES.h2, fontWeight: 'bold' }}>Become a subscriber</Text>
                                        <Text style={{ color: COLORS.black, fontSize: SIZES.font }}>Unlock exclusive features and benefits! Subscribe to gain access to premium content, discounts, and priority support.</Text>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback
                                // onPress={() => setOpenretrait(true)}

                            >
                                <View style={{ alignItems: 'center', backgroundColor: 'white', width: '45%', height: '40%', borderRadius: SIZES.radius, justifyContent: 'center' }}>
                                    <View style={{ flex: 1, width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <View style={{ flex: 2, justifyContent: 'center', marginLeft: '5%', }}>
                                            <Image source={require('../../../assets/images/var4.png')} style={{ width: '90%', height: '80%' }} />
                                        </View>
                                        <View style={{ height: '25%' }}>
                                            <Text style={{ flex: 1, backgroundColor: COLORS.secondary, paddingVertical: 3, paddingHorizontal: 6, color: COLORS.white, borderTopRightRadius: SIZES.radius }}>200</Text>
                                        </View>
                                    </View>
                                    <View style={{ flex: 1, width: '100%', marginLeft: '10%' }}>
                                        <Text style={{ color: COLORS.black, fontSize: SIZES.h2, fontWeight: 'bold' }}>Use our services</Text>
                                        <Text style={{ color: COLORS.black, fontSize: SIZES.font }}>
                                            Explore the wide range of services we offer. We have something for everyone!
                                        </Text>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>


                            <TouchableWithoutFeedback
                                onPress={() => navigation.navigate("mesCommision")}
                            >
                                <View style={{ alignItems: 'center', backgroundColor: 'white', width: '45%', height: '40%', borderRadius: SIZES.radius, justifyContent: 'center', }}>
                                    <View style={{ flex: 1, width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <View style={{ flex: 2, justifyContent: 'center', marginLeft: '5%', }}>
                                            <Image source={require('../../../assets/images/var5.png')} style={{ width: '90%', height: '80%' }} />
                                        </View>
                                        <View style={{ height: '25%' }}>
                                            <Text style={{ flex: 1, backgroundColor: COLORS.secondary, paddingVertical: 3, paddingHorizontal: 6, color: COLORS.white, borderTopRightRadius: SIZES.radius }}>10500F</Text>
                                        </View>
                                    </View>
                                    <View style={{ flex: 1, width: '100%', marginLeft: '10%' }}>
                                        <Text style={{ color: COLORS.black, fontSize: SIZES.h2, fontWeight: 'bold' }}>My Wallet</Text>
                                        <Text style={{ color: COLORS.black, fontSize: SIZES.font }}>Manage your account balance, view transaction history, and easily control your payment methods.</Text>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>

                            <TouchableWithoutFeedback
                            // onPress={() => navigation.navigate("mesCommision")}
                            >
                                <View style={{ alignItems: 'center', backgroundColor: 'white', width: '45%', height: '40%', borderRadius: SIZES.radius, justifyContent: 'center', }}>
                                    <View style={{ flex: 1, width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <View style={{ flex: 2, justifyContent: 'center', marginLeft: '5%', }}>
                                            <Image source={require('../../../assets/images/var6.png')} style={{ width: '90%', height: '80%' }} />
                                        </View>
                                        <View style={{ height: '25%' }}>
                                            <Text style={{ flex: 1, backgroundColor: COLORS.secondary, paddingVertical: 3, paddingHorizontal: 6, color: COLORS.white, borderTopRightRadius: SIZES.radius }}>122</Text>
                                        </View>
                                    </View>
                                    <View style={{ flex: 1, width: '100%', marginLeft: '10%' }}>
                                        <Text style={{ color: COLORS.black, fontSize: SIZES.h2, fontWeight: 'bold' }}>Transfer</Text>
                                        <Text style={{ color: COLORS.black, fontSize: SIZES.font, }}>Send and receive funds securely with our user-friendly transfer system.</Text>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>

                        </View>
                </View>
                {/* <ButtonActif title={'ewew'}  onPress={()=>setOpen(true)}/> */}

            </View>
        </>
    )

}



export default Services



