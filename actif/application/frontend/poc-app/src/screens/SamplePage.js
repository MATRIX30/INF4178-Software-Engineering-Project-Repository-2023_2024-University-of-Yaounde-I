import React, { useState } from 'react'
import { Image, View } from 'react-native'
import ButtonActif from '../components/ButtonActif'
import { COLORS, SIZES, STYLES } from '../constants/theme'
import InputActif from '../components/InputActif'
import Title from '../components/Title'
import IconButtonActif from '../components/IconButtonActif'
import IconActif from '../components/IconActif'
import CarouselActif from '../components/CarouselActif'
import BottomModal from '../components/alerts/ButtomModal'
import { Text } from 'react-native-paper'
import ImagePicker from '../components/ImagePicker'
import DocumentPickerActif from '../components/DocumentPickerActif'


function SamplePage() {
  // const [text, setText] = useState("")
  const [modalVisible, setModalVisible] = useState(false);

  const ModalContent = (<View style={{}}>
    <Text style={{ fontSize: SIZES.h2 }}> Selectionner une action</Text>
    <ButtonActif title={'Ferner'} onPress={() => setModalVisible(false)} />
  </View>)
  return (
    <View style={[{ display: 'flex', gap: 4 }, STYLES.mainLayout]}>
      <ButtonActif title={"Show bottom modal"} onPress={() => setModalVisible(true)} />

      <BottomModal height={"40%"} modalVisible={modalVisible} setModalVisible={setModalVisible}>
        {ModalContent}
      </BottomModal>
      <Image
        source={require('../../assets/images/ACTIF15.png')}
        style={{
          flex: 1, // Permet au bouton de prendre tout l'espace disponible
          justifyContent: 'center',
          justifyContent: 'center',
          width: 250,
          height: 80,
          left: 50,
        }} />
      <Title text={"My title here"} />
      <ButtonActif
        icon={"account"}
        background={COLORS.primary}
        textColor={COLORS.black}
        title={"Exemple"}
      />
      <ButtonActif
        icon={"qrcode-scan"}
        background={COLORS.secondary}
        textColor={COLORS.black} title={"Scan"}
        style={{ width: 100 }}
        labelStyle={{ fontSize: SIZES.textButton }}

      />
      <ButtonActif
        icon={() => <IconActif name={"arrow-right"} iconColor={COLORS.secondary} />}
        borderColor={COLORS.primary}
        reverse={true}
        background={COLORS.white}
        textColor={COLORS.black} 
        title={"Scan"}
        // style={{ width: 100 }}
        labelStyle={{ fontSize: SIZES.textButton }}

      />
      <InputActif
        // text={text}
        // setText={setText}
        label={"Name"}
        placeholder={"placeholder"}


      />

      <InputActif
        // text={text}
        // setText={setText}
        label={"Name"}
        type={"password"}

      />

      <IconActif
        name={"qrcode-scan"}
        iconColor={COLORS.primary}

      />

      <IconButtonActif
        name={"camera"}
        background={COLORS.primary}
        iconColor={COLORS.white}
        style={{}}
      />

      <IconButtonActif
        name={"information-variant"}
        background={COLORS.primary}
        iconColor={COLORS.black}
        mode={'outlined'}
        bordercolor={COLORS.black}
        
      />


      <IconButtonActif
        name={"chevron-right"}
        background={COLORS.primary}
        iconColor={COLORS.secondary}
        style={{ borderRadius: SIZES.button.radius }}
      />
 <ImagePicker />
      <ImagePicker type={'camera'} />

      <DocumentPickerActif />

      <CarouselActif />

    </View>
  )
}

export default SamplePage
