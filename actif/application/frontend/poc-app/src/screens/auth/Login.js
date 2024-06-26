import {Text} from 'react-native-paper';
import {COLORS, SIZES, STYLES} from '../../constants/theme';
import ButtonActif from '../../components/ButtonActif';
import InputActif from '../../components/InputActif';
import Title from '../../components/Title';
import React, {useEffect, useState} from 'react';
import * as yup from 'yup';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {AuthContext} from '../../navigation/AuthNavigation';

const {View, StyleSheet, Image, Keyboard} = require('react-native');

const Login = () => {
  /* form yup validation 2 */
  const schema = yup.object().shape({
    phone: yup
      .string()
      .min(8, 'Ce champ doit contenir au moins 8 caractères')
      .required('Ce champ est obligatore'),
    password: yup.string().required('Ce champ est obligatore'),
  });

  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const {signIn} = React.useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  /* post function */
  const onPressSend = formData => {
    const data = {
      phone: formData.phone,
      password: formData.password,
    };
    signIn(data, setLoading);
  };

  return (
    <View style={[styles.container, STYLES.mainLayout]}>
      <TouchableWithoutFeedback
        style={{alignItems: 'center'}}
        onPress={() => Keyboard.dismiss()}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View>
            <Image
              source={require('../../../assets/images/logo-circle.png')}
              style={{width: 200, height: 200}}
            />
          </View>
          <Title color={'#EE1F1F'} size={SIZES.h1} text={'Connectez-vous'} />
        </View>

        <View style={[styles.form]}>
          <View style={styles.inputBlock}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, value}}) => (
                <InputActif
                  style={{
                    width: '100%',
                  }}
                  text={value}
                  keyboardType={'numeric'}
                  onChangeText={onChange}
                  label={'Numéro de téléphone'}
                  placeholder={'e.x: 6 XX XX XX XX'}
                />
              )}
              name="phone"
            />
            {errors.phone && (
              <Text style={styles.errorYup}>{errors.phone.message}</Text>
            )}
          </View>

          <View style={styles.inputBlock}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, value}}) => (
                <InputActif
                  style={{
                    width: '100%',
                  }}
                  text={value}
                  type={'password'}
                  onChangeText={onChange}
                  label={'Mot de passe'}
                  placeholder={'********'}
                />
              )}
              name="password"
            />
            {errors.password && (
              <Text style={styles.errorYup}>{errors.password.message}</Text>
            )}
          </View>
        </View>

        {/* don't have account */}
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: '2%',
          }}>
          <Text>Avez vous deja un compte?</Text>
          <Text
            style={{
              color: '#EE1F1F',
              marginStart: 5,
              textDecorationLine: 'underline',
            }}>
            S’inscrire
          </Text>
        </View>

        <Text
          style={{
            textAlign: 'center',
            marginTop: '2%',
            color: COLORS.secondary,
          }}>
          un code de verification vous sera envoyer par{'\n'} SMS pour comfirmer
          votre compte
        </Text>
        <ButtonActif
          disabled={loading ? true : false}
          style={styles.button}
          title={loading ? 'Chargement...' : 'Se connecter'}
          textColor={COLORS.black}
          onPress={handleSubmit(onPressSend)}
          // 678774707
        />
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    top: 10,
    gap: 10,
  },
  form: {
    marginTop: '2%',
    alignItems: 'center',
    gap: 5,
    width: '100%',
  },
  errorYup: {
    color: COLORS.primary,
    paddingStart: 5,
    marginTop: '1%',
  },
  inputBlock: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '100%',
  },
  button: {
    borderRadius: SIZES.buttonRadius,
    width: '100%',
    marginTop: '3%',
  },
});

export default Login;
