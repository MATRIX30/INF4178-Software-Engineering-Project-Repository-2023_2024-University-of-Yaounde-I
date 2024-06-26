import React from 'react';
import {View} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {SIZES, STYLES} from '../../../constants/theme';
import PaiementCard from '../../../components/PaiementCard';
import ButtonActif from '../../../components/ButtonActif';

const Paiement = ({route}) => {
  const navigation = useNavigation();
  const params = route?.params
  const delivery = params?.delivery

  /* navigation params */
  // const { globalFormState, pocIndentedId, objects } = route.params;


  const handlePay = () => {
    navigation.navigate("facturePoc", {delivery: delivery?.result})
  }

  return (
    <View
      style={[
        STYLES.mainLayout,
        {flex: 1, justifyContent: 'space-between', alignItems: 'center'},
      ]}>
      <View
        style={{
          width: '100%',
          gap: 30,
          paddingTop: '10%',
          alignItems: 'center',
          // height: '50%',
        }}>
        <PaiementCard
          label={'Orange Money'}
          logo={require('../../../../assets/images/om.png')}
          onPress={handlePay}
        />
        <PaiementCard
          label={'MTN Mobile Money '}
          logo={require('../../../../assets/images/momo.png')}
          onPress={handlePay}
        />
        {/* <PaiementCard label={"CASH "} logo={require('../../../../assets/images/momo.png')} /> */}
      </View>

      {/* <View style={{borderRadius:100, flexDirection: 'row', marginBottom: '10%', width: '80%', backgroundColor:COLORS.primary,gap:20, height: '8%', alignItems: 'center', justifyContent: 'center' }}> */}
      {/* <Text style={{fontSize:SIZES.body,color:COLORS.black}}>Suivant</Text>
          <IconActif name={"arrow-right"} iconColor={COLORS.black}  /> */}
      {/* <ButtonActif
        title={"Suivant"}
        icon={"arrow-right"}
        // onPress={() => navigation.navigate("confirmationdepot")}
        onPress={() => navigation.navigate("confirmationdepot", { globalFormState: globalFormState, pocIndentedId: pocIndentedId, objects: objects })}
        style={{ width: '80%', borderRadius: SIZES.buttonRadius }}
        reverse={true}
      /> */}
      {/* </View> */}
    </View>
  );
};
export default Paiement;
