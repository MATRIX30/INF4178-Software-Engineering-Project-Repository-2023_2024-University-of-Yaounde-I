/* eslint-disable prettier/prettier */
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import ButtonActif from '../../../components/ButtonActif';
import { Text } from 'react-native-paper';
import { COLORS, SIZES, STYLES } from '../../../constants/theme';
import InputActif from '../../../components/InputActif';
import IconActif from '../../../components/IconActif';
import Title from '../../../components/Title';
import HeaderFormLiv from '../../../components/HeaderFormLiv';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view';

const Formulaire_Infos_Recepteur = ({ route }) => {
  const navigation = useNavigation();
  /* navigation params */
  const params = route.params;
  const globalFormState = params?.globalFormState
  const pocIndentedId = params?.pocIndentedId
  console.log("🚀 ~ pocIndentedId:", pocIndentedId)
  
  // const { globalFormState, pocIndentedId } = route.params;

  /* form yup validation 2 */
  const schema = yup.object().shape({
    firstName: yup
      .string()
      .required('Ce champ est obligatore')
      .min(2, 'Ce champ doit contenir au moins 5 caractères'),
    lastName: yup
      .string()
      .required('Ce champ est obligatore')
      .min(2, 'Ce champ doit contenir au moins 5 caractères'),
    town: yup
      .string()
      .required('Ce champ est obligatore')
      .min(2, 'Ce champ doit contenir au moins 5 caractères'),
    district: yup
      .string()
      .required('Ce champ est obligatore'),
    phone: yup
      .string()
      .required('Ce champ est obligatore'),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(schema)
  });

  /* post function */
  const onPressSend = (formData) => {
    let newFormState = {
      expeditor: globalFormState,
      receptor: formData
    }

    navigation.navigate('PacketInformation', { pocIndentedId: pocIndentedId, globalFormState: newFormState })
  };


  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={STYLES.mainLayout}>
        <View>
          <HeaderFormLiv title={"Informations du recepteur"} />

          <Title
            style={{ marginTop: '3%' }}
            color={COLORS.black}
            text={'Remplissez tous les champs du formulaire'}
          />
        </View>
        <View style={[styles.form]}>
          <KeyboardAwareScrollView style={{ width: '100%' }}>
            <View style={styles.inputBlock}>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, value } }) => (
                  <InputActif
                    style={{
                      width: '100%'
                    }}
                    text={value}
                    onChangeText={onChange}
                    label={"Prénom(s) du recepteur"}
                    placeholder={'e.x: Paul cool'}
                  />
                )}
                name="firstName"
              />
              {errors.firstName && <Text style={styles.errorYup}>{errors.firstName.message}</Text>}
            </View>
            <View style={styles.inputBlock}>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, value } }) => (
                  <InputActif
                    style={{
                      width: '100%'
                    }}
                    text={value}
                    onChangeText={onChange}
                    label={"Nom(s) du recepteur"}
                    placeholder={'e.x: Paul cool'}
                  />
                )}
                name="lastName"
              />
              {errors.lastName && <Text style={styles.errorYup}>{errors.lastName.message}</Text>}
            </View>
            <View style={styles.inputBlock}>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, value } }) => (
                  <InputActif
                    style={{
                      width: '100%'
                    }}
                    text={value}
                    onChangeText={onChange}
                    label={"Ville du recepteur"}
                    placeholder={'e.x: Yaounde'}
                  />
                )}
                name="town"
              />
              {errors.town && <Text style={styles.errorYup}>{errors.town.message}</Text>}
            </View>

            <View style={styles.inputBlock}>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, value } }) => (
                  <InputActif
                    style={{
                      width: '100%'
                    }}
                    text={value}
                    onChangeText={onChange}
                    label={"Quartier du recepteur"}
                    placeholder={'e.x: Awae escalier'}
                  />
                )}
                name="district"
              />
              {errors.district && <Text style={styles.errorYup}>{errors.district.message}</Text>}
            </View>

            <View style={styles.inputBlock}>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, value } }) => (
                  <InputActif
                    style={{
                      width: '100%'
                    }}
                    text={value}
                    onChangeText={onChange}
                    label={"Numéro de téléphone du recepteur"}
                    placeholder={'e.x: 690128903'}
                  />
                )}
                name="phone"
              />
              {errors.phone && <Text style={styles.errorYup}>{errors.phone.message}</Text>}
            </View>

            <ButtonActif
              icon={() => (
                <IconActif name={'arrow-right'} iconColor={COLORS.black} size={25} />
              )}
              reverse={true}
              background={COLORS.primary}
              textColor={COLORS.black}
              title={'Suivant'}
              style={styles.button}
              // onPress={() => navigation.navigate('formulaire_infos_recepteur')}
              onPress={handleSubmit(onPressSend)}
              labelStyle={{ fontSize: SIZES.textButton }}
            />
          </KeyboardAwareScrollView>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  form: {
    gap: 20,
    alignItems: 'center',
    marginTop: '10%'
  },
  button: {
    marginTop: 20,
    width: "100%",
    borderRadius: SIZES.buttonRadius,
  },
  errorYup: {
    color: COLORS.secondary,
    paddingStart: 5,
    marginTop: "1%"
  },
  inputBlock: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '100%',
    marginBottom: '2%'
  }
});

export default Formulaire_Infos_Recepteur;
