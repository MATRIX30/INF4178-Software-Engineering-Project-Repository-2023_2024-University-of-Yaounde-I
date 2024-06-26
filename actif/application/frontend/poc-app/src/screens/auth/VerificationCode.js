/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Checkbox, Text } from 'react-native-paper';
import { COLORS, SIZES, STYLES } from '../../constants/theme';
import ButtonActif from '../../components/ButtonActif';
import { Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import Title from '../../components/Title';

const CELL_COUNT = 4;

const VerificationCode = () => {
  const navigation = useNavigation();
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  return (
    <LinearGradient
      colors={['#FFC801', '#FFFFFF', '#FFFFFF']}
      style={[myStyle, STYLES.mainLayout]}>
      <View
        style={{
          gap: 30,
          alignItems: 'center',
        }}>
        <View>
          <Image
            source={require('../../../assets/images/logo-circle.png')}
            style={{ width: 200, height: 200 }}
          />
        </View>
        <View
          style={{
            gap: 25,
          }}>
          <View
            style={{
              alignItems: 'center'
            }}
          >
            <Title style={{marginBottom: '3%'}} color={'#EE1F1F'} size={SIZES.h1} text={"Entrer votre code"} />

            <Text>
              Nous vous avons envoyé un code par SMS au {'\n'} +237 000 000 000
              pour vérification. Saisissez le.
            </Text>
          </View>

          <CodeField
            ref={ref}
            {...props}
            value={value}
            onChangeText={setValue}
            cellCount={CELL_COUNT}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({ index, symbol, isFocused }) => (
              <Text
                key={index}
                style={[styles.cell, isFocused && styles.focusCell, {borderColor: COLORS.grey}]}
                onLayout={getCellOnLayoutHandler(index)}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            )}
          />

          <ButtonActif
            background={COLORS.primary}
            title={'Valider'}
            style={{ borderRadius: SIZES.buttonRadius }}
            textColor={COLORS.black}
            onPress={() => navigation.navigate('app')}
          />
        </View>
      </View>
    </LinearGradient>
  );
};

const myStyle = StyleSheet.create({
  alignItems: 'center',
  justifyContent: 'center',
  top: 4,
});

const styles = StyleSheet.create({
  codeFieldRoot: { padding: 15, },
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderColor: COLORS.black,
    textAlign: 'center',
    borderRadius: SIZES.radius,
  },
  focusCell: {
    borderColor: '#000',
  },
});

export default VerificationCode;
