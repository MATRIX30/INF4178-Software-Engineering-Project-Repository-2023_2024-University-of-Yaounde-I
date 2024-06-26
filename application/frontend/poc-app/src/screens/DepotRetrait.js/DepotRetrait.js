import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import ButtonActif from '../../components/ButtonActif'
import { useNavigation } from '@react-navigation/native'
import { COLORS, SIZES, STYLES } from '../../constants/theme'
import IconActif from '../../components/IconActif'
import { Text } from 'react-native-paper'
import ModalChoiceTypeDepot from '../../components/modals/ModalChoiceTypeDepot'
import ModalChoiceTypeRetrait from '../../components/modals/ModalChoiceTypeRetrait'

const DepotRetrait = () => {
  const navigation = useNavigation()

  const [openDepot, setOpenDepot] = useState(false);
  const [openRetrait, setOpenretrait] = useState(false);

  function Card({ actionTitle, icon, onPress }) {
    return (
      <TouchableOpacity
        style={myStyle.container}
        // onPress={() => navigation.navigate(navigate)}>
        onPress={onPress}>

        <View style={myStyle.cardContainer}>

          <IconActif
            name={icon}
            iconColor={COLORS.primary}
            size={70}
          />
        </View>

        <View style={myStyle.bottomCard}>
          <Text style={{
            color: COLORS.black,
            fontSize: SIZES.body,
            fontWeight: 'bold'
          }
          }>{actionTitle}</Text>

          <IconActif name={"arrow-right"} iconColor={COLORS.black} />
        </View>
      </TouchableOpacity>

    )
  }
  return (
    <>
      <View style={[myStyle.contain, STYLES.mainLayout]}>
        {/* <Card icon={"cart-arrow-down"} actionTitle={'Dépôt de paquet'} navigate={"choisirdestination"} />
        <Card icon={"cart-arrow-up"} actionTitle={'Retrait de paquet'} navigate={"DeliveriesToRemove"} /> */}


        <Card icon={"cart-arrow-down"} actionTitle={'Dépôt de paquet'} onPress={()=>setOpenDepot(true)}/>
        <Card icon={"cart-arrow-up"} actionTitle={'Retrait de paquet'} onPress={()=>setOpenretrait(true)} />
      </View>
      <ModalChoiceTypeDepot open={openDepot} setOpen={setOpenDepot} />
      <ModalChoiceTypeRetrait open={openRetrait} setOpen={setOpenretrait} />
    </>
  )
}

const myStyle = StyleSheet.create({
  contain: {
    display: 'flex',
    flexDirection: 'column',
    gap: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '60%',
    alignItems: 'center',
  },
  cardContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 1,
    elevation: 2,
    borderColor: COLORS.white,
    borderTopEndRadius: SIZES.radius,
    borderTopStartRadius: SIZES.radius,
    backgroundColor: COLORS.whiteSmoke,
    width: '100%',
    padding: 10,
    paddingVertical: 30,
  },
  bottomCard: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 4,
    elevation: 2,
    backgroundColor: COLORS.primary,
    borderBottomEndRadius: SIZES.radius,
    borderBottomStartRadius: SIZES.radius,
    padding: 10
  }

})

export default DepotRetrait
