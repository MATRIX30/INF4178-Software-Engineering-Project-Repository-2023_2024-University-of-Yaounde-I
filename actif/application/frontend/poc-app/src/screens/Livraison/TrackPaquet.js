import React, {useEffect, useState} from 'react';
import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {COLORS, SIZES, STYLES} from '../../constants/theme';
import {useNavigation} from '@react-navigation/native';
import InputActif from '../../components/InputActif';
import ButtonActif from '../../components/ButtonActif';
import Title from '../../components/Title';
import useDataFetching from '../../hooks/useDataFetching';

const TrackPaquet = ({route}) => {
  const navigation = useNavigation();
  const [code, setCode] = useState('');

  const [loading, messageP, packet, fetchPackets] = useDataFetching(
    code ? 'packets/' + code : null,
    true,
  );

  useEffect(() => {
    console.log(messageP?.error);
  }, [messageP]);
  const params = route?.params;
  const nextUrl = params?.nextUrl;
  console.log(
    '🚀 ~ file: formulaireIdentification.js:17 ~ forinde packet ~ nextUrl:',
    nextUrl,
  );

  useEffect(() => {
    if (packet && code) {
      //   navigation.navigate(nextUrl || 'livreurDepotLivraisonList', {livreur});

      setCode('');
    }
  }, [packet]);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View
        style={[
          STYLES.mainLayout,
          {
            backgroundColor: COLORS.primary,
            flex: 1,
            justifyContent: 'space-around',
          },
        ]}>
        <View style={styles.inputContainer}>
          <Title
            text={'SUIVI ET TRAÇABILITÉ'}
            size={SIZES.h1}
            color={COLORS.black}
          />
          <InputActif
            style={{
              width: '98%',
            }}
            label={'Code du paquet'}
            placeholder={'Saisissez le code de votre paquet'}
            onChangeText={text => setCode(text)}
            text={code}
          />
        </View>

        <ButtonActif
          icon={'arrow-right'}
          reverse={true}
          disabled={loading}
          background={COLORS.white}
          textColor={COLORS.black}
          title={'Suivre'}
          // style={{ width: 100 }}
          // onPress={()=>navigation.navigate(nextUrl || 'livreurDepotLivraisonList')}
          loading={loading}
          onPress={() => fetchPackets()}
          labelStyle={{fontSize: SIZES.textButton}}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default TrackPaquet;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 25,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 40,
  },
});
