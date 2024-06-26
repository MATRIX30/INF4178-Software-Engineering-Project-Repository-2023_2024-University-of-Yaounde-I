/* eslint-disable quotes */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */

import {useNavigation} from '@react-navigation/native';
import {ScrollView, StyleSheet, View} from 'react-native';
import ButtonActif from '../../../components/ButtonActif';
import {Card, Text} from 'react-native-paper';
import {COLORS, SIZES, STYLES} from '../../../constants/theme';
import IconActif from '../../../components/IconActif';
import InputActif from '../../../components/InputActif';
const RetraitForm = () => {
  const navigation = useNavigation();
  return (
    <>
      <View style={[myStyle, STYLES.mainLayout]}>
       
      </View>
    </>
  );
};

const myStyle = StyleSheet.create({});

export default RetraitForm;
