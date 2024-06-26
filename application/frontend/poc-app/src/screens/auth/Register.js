import {Text} from 'react-native-paper';
import {COLORS, SIZES, STYLES} from '../../constants/theme';
import ButtonActif from '../../components/ButtonActif';
import {useNavigation} from '@react-navigation/native';
import InputActif from '../../components/InputActif';
import IconActif from '../../components/IconActif';
import Title from '../../components/Title';

const {View, StyleSheet} = require('react-native');

const Register = () => {
  const navigation = useNavigation();

  return (
    <>
      <View
        style={[myStyle, STYLES.mainLayout, {backgroundColor: COLORS.primary}]}>
        {/* <Text
            style={{
              color: '#EE1F1F',
              fontSize: SIZES.h1,
            textAlign: 'center',
            bottom: 15,
            fontWeight: 'bold',
            }}>
            Entrer votre numero
          </Text> */}
        <Title
          size={SIZES.h1}
          color={'#EE1F1F'}
          text={' Entrer votre numero'}
        />

        <InputActif
          style={{
            width: '100%',
          }}
          label={'Numero Telephone'}
          placeholder={'000 000 000'}
        />

        <InputActif label={'Mot de passe'} type={'password'} />

        <InputActif label={'Confirmer votre mot de passe'} type={'password'} />

        <View
          style={{
            paddingLeft: '2%',
          }}>
          <Text
            style={{
              textAlign: 'left',
            }}>
            Avez vous deja un compte?{'\n'}
            <Text
              style={{
                color: '#EE1F1F',
              }}>
              Se connecter
            </Text>
          </Text>
        </View>

        <Text
          style={{
            textAlign: 'center',
            paddingTop: '2%',
          }}>
          un code de verification vous sera envoyer par{'\n'} SMS pour comfirmer
          votre compte
        </Text>

        <ButtonActif
          icon={() => (
            <IconActif name={'arrow-right'} iconColor={COLORS.secondary} />
          )}
          reverse={true}
          background={COLORS.white}
          textColor={COLORS.black}
          title={'Suivant'}
          // style={{ width: 100 }}
          labelStyle={{fontSize: SIZES.textButton}}
        />
      </View>
    </>
  );
};

const myStyle = StyleSheet.create({
  alignItem: 'center',
  justifyContent: 'center',
  gap: 10,
});

export default Register;
