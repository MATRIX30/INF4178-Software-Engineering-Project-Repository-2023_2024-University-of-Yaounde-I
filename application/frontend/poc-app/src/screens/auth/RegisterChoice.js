/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
import { Text } from 'react-native-paper';
import { COLORS, SIZES, STYLES } from '../../constants/theme';
import ButtonActif from '../../components/ButtonActif';
import { useNavigation } from '@react-navigation/native';
import Title from '../../components/Title';

const { View, StyleSheet, Image } = require('react-native');

const RegisterChoice = () => {
  const navigation = useNavigation();

  return (
    <>
      <View style={[myStyle, STYLES.mainLayout]}>
        <View>
          <Image
            source={require('../../../assets/images/logo-circle.png')}
            style={{ width: 200, height: 200 }}
          />
        </View>
        <View
          style={{
            gap: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Title size={SIZES.h1} color={COLORS.black} text={'Connectez-vous'} />
          <Text style={{fontSize: SIZES.body}}>Votre service de livraison</Text>
        </View>

        <ButtonActif
          style={{
            width: '80%',
            borderRadius: SIZES.buttonRadius
          }}
          title={'Se connecter'}
          textColor={COLORS.black}
          onPress={() => navigation.navigate('login')}
        />
        <ButtonActif
          style={{
            width: '80%',
            borderRadius: SIZES.buttonRadius
          }}
          borderColor={COLORS.primary}
          reverse={true}
          background={COLORS.white}
          textColor={COLORS.black}
          title={'S’inscrire'}
          labelStyle={{ fontSize: SIZES.textButton }}
        />


      </View>
    </>
  );
};

const myStyle = StyleSheet.create({
  alignItems: 'center',
  justifyContent: 'center',
  gap: 20,
});

export default RegisterChoice;
