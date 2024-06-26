/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
import {useNavigation} from '@react-navigation/native';
import ButtonActif from '../../../components/ButtonActif';
import IconActif from '../../../components/IconActif';
import {COLORS, SIZES, STYLES} from '../../../constants/theme';

const {View, StyleSheet, Image} = require('react-native');

const SlideOne = () => {
  const navigation = useNavigation();

  return (
    <>
      <View
        style={[myStyle, STYLES.mainLayout, {backgroundColor: COLORS.primary}]}>
        <View>
          <Image
            source={require('../../../../assets/images/logo-circle.png')}
            style={{width: 200, height: 200}}
          />
        </View>
        <View
          style={{
            gap: 25,
          }}>
          <View
            style={{
              alignItems: 'center',
            }}>
            <Image
              source={require('../../../../assets/images/home.png')}
              style={{width: 120, height: 120}}
            />
          </View>
          <View
            style={{
              width: 250,
            }}>
            <ButtonActif
              icon={() => (
                <IconActif name={'arrow-right'} iconColor={COLORS.secondary} />
              )}
              reverse={true}
              background={COLORS.white}
              textColor={COLORS.black}
              title={'Suivant'}
              style={{borderRadius: SIZES.buttonRadius}}
              labelStyle={{fontSize: SIZES.textButton}}
              onPress={() => navigation.navigate('registerChoice')}
            />
          </View>
        </View>
      </View>
    </>
  );
};

const myStyle = StyleSheet.create({
  alignItems: 'center',
  justifyContent: 'center',
  gap: 20,
});

export default SlideOne;
