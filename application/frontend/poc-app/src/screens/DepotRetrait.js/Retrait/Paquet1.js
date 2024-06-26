import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import ButtonActif from '../../../components/ButtonActif'
import { COLORS, SIZES, STYLES } from '../../../constants/theme'
import BottomModal from '../../../components/alerts/ButtomModal'
import IconActif from '../../../components/IconActif'
import IconButtonActif from '../../../components/IconButtonActif'

const Paquet1 = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const ModalContent = (<View style={{}}>
        
            <View style={{flex:1,alignItems:'center',marginTop:'4%'}}>
            <IconButtonActif  name={"close"} background={COLORS.secondary} iconColor={COLORS.white} mode={'outlined'}bordercolor={COLORS.secondary} size={50}/>
               <View style={{flex:1}}><Text style={{color:COLORS.secondary,fontSize:SIZES.h1}}>Paquet Bloque</Text></View>
                <View style={{flex:2,}}><Text style={{fontSize:SIZES.h2,color:COLORS.black}}><Text style={{color:COLORS.black,textDecorationLine:'underline'}}>NB:</Text>Ce paquet n est pas destiné a ce livreur</Text></View>
            </View>
        
    </View>)

    const navigation = useNavigation()
    return (
        <>
            <View style={[myStyle, STYLES.mainLayout]}>
                <ButtonActif title={"Show bottom modal"} onPress={() => setModalVisible(true)} />
                <BottomModal height={"40%"} modalVisible={modalVisible} setModalVisible={setModalVisible}>
                    {ModalContent}
                </BottomModal>

            </View>

        </>
    )
}

const myStyle = StyleSheet.create({

})

export default Paquet1
