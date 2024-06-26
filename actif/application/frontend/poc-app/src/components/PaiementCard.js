import React from 'react';
import {StyleSheet, View, Image, Text, Alert} from 'react-native';
import IconActif from './IconActif';
import {COLORS, SIZES} from '../constants/theme';

const PaiementCard = ({label, logo, onPress}) => {
  return (
      <View onTouchStart={onPress} style={styles.wrapper}>
      <View
        style={{
          flexDirection: 'row',
          gap: 10,
          justifyContent: 'center',
          alignItems: 'center',
          marginLeft: '5%',
        }}>
        <Image
          source={logo}
          style={{height: 40, width: 40, borderRadius: 100}}
        />
        <Text style={{color: COLORS.black, fontSize: SIZES.body}}>
          {label}{' '}
        </Text>
      </View>
      <View style={{marginRight: '5%'}}>
        <IconActif size={30} name={'chevron-right'} iconColor={COLORS.black} />
      </View>
    </View>
  );
};

export default PaiementCard;

const styles = StyleSheet.create({
  wrapper: {
    borderWidth: 1,
    backgroundColor: COLORS.whiteSmoke,
    borderColor: COLORS.gray,
    shadowColor: COLORS.black,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    height: '20%',
    borderRadius: 18,
    alignItems: 'center',
  },
});
