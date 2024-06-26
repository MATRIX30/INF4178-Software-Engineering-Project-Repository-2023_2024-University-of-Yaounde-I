/* eslint-disable prettier/prettier */
import {Text} from 'react-native-paper';
import {COLORS, SIZES, STYLES} from '../../constants/theme';
import ButtonActif from '../../components/ButtonActif';
import {useNavigation} from '@react-navigation/native';
import InputActif from '../../components/InputActif';
import IconActif from '../../components/IconActif';
import {ScanIcon} from '../../components/SvgIcons';
import useDataFetching from '../../hooks/useDataFetching';
import {useEffect, useState} from 'react';

const {View, StyleSheet} = require('react-native');

const FormulaireIdentificationLivreur = ({route}) => {
  const navigation = useNavigation();
  const [code, setCode] = useState('');
  // const [noauthFetect, setnoAuto] = useState(true);
  const [loading, messageD, livreur, fetchDeliveries] = useDataFetching(
    code ? 'livreurs/get-by-code/' + code : null,
    true,
  );
  // console.log("🚀 ~ FormulaireIdentificationLivreur ~ livreur:", livreur)

  useEffect(() => {
    console.log(messageD?.error);
  }, [messageD]);
  const params = route?.params;
  const nextUrl = params?.nextUrl;
  console.log(
    '🚀 ~ file: formulaireIdentification.js:17 ~ forinde livreyr ~ nextUrl:',
    nextUrl,
  );

  useEffect(() => {
    if (livreur && code) {
      navigation.navigate(nextUrl || 'livreurDepotLivraisonList', {livreur});

      setCode('');
    }
  }, [livreur]);
  return (
    <View
      style={[
        STYLES.mainLayout,
        {
          backgroundColor: COLORS.primary,
          flex: 1,
          justifyContent: 'space-around',
        },
      ]}>
      {/* <Text style={{fontSize : SIZES.h2}}>Identifiant du livreur</Text> */}
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 40,
        }}>
        <InputActif
          style={{
            width: '68%',
          }}
          label={'Entrer l’identifinat du livreur'}
          placeholder={'Entrer l’identifinat du livreur'}
          onChangeText={text => setCode(text)}
          text={code}
        />

        <Text
          style={{
            textDecorationLine: 'underline',
            fontSize: SIZES.h2,
          }}>
          OU
        </Text>

        <ButtonActif
          icon={() => <ScanIcon />}
          background={COLORS.white}
          textColor={COLORS.black}
          title={'Scanner son Qr code'}
          onPress={() => navigation.navigate('scan')}
        />
      </View>

      <View
        style={
          {
            // gap: 120,
          }
        }>
        <ButtonActif
          icon={'arrow-right'}
          reverse={true}
          background={COLORS.white}
          textColor={COLORS.black}
          title={'Suivant'}
          // style={{ width: 100 }}
          // onPress={()=>navigation.navigate(nextUrl || 'livreurDepotLivraisonList')}
          loading={loading}
          onPress={() => fetchDeliveries()}
          labelStyle={{fontSize: SIZES.textButton}}
        />
      </View>
    </View>
  );
};

const myStyle = StyleSheet.create({
  justifyContent: 'center',
  alignItems: 'center',
  gap: 25,
});

export default FormulaireIdentificationLivreur;
