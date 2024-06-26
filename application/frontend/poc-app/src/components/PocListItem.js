import {StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
import IconActif from './IconActif';
import {COLORS, SIZES} from '../constants/theme';
import {useNavigation} from '@react-navigation/native';
import {Text} from 'react-native-paper';
import ButtonActif from './ButtonActif';

export const PocListItem = ({data, iconStartLeft, iconEndLeft}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View
        style={styles.seeMapCont}
        onTouchStart={() =>
          navigation.navigate('Itineraire', {destination: data})
        }>
        {/* <ButtonActif
          formap={true}
          textColor={COLORS.black}
          onPress={() => navigation.navigate('Itineraire', {destination: data})}
          background={COLORS.primary}
          icon={'map-marker-distance'}
          title={'Voir sur la map'}
        /> */}
        <Text style={styles.seeMapTextContent}>
          <IconActif
            size={15}
            name={'map-marker-distance'}
            iconColor={COLORS.black}
          />
          Voir sur la map
        </Text>
      </View>
      <TouchableWithoutFeedback
        onPress={() =>
          navigation.navigate('formulaire_infos_expediteur', {
            pocIndentedId: data?.item?.id,
          })
        }>
        <View
          style={[
            styles.firstContainer,
            {borderWidth: 1, borderColor: COLORS.primary},
          ]}>
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            <IconActif
              size={25}
              name={iconStartLeft}
              iconColor={COLORS.black}
            />
            <View style={{marginHorizontal: 10}}>
              <Text style={{color: COLORS.black}}>{data?.item?.town}</Text>
              <Text style={{fontWeight: 'bold', color: COLORS.black}}>
                {data?.item?.district}
              </Text>
            </View>
          </View>
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            {/* <IconActif size={25} name={"map-marker-distance"} iconColor={COLORS.primary} /> */}
            {iconEndLeft && iconEndLeft}
            <View style={{margin: 10}}>
              <Text style={{color: COLORS.black}}>Distance</Text>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: COLORS.black,
                }}>{`10 km`}</Text>
            </View>
          </View>
          <IconActif
            name={'chevron-right'}
            size={25}
            iconColor={COLORS.secondary}
          />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  seeMapCont: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  seeMapTextContent: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.buttonRadius,
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: COLORS.black,
    fontSize: 15,
  },
  firstContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
    borderRadius: SIZES.radius,
    // backgroundColor: COLORS.whiteSmoke,
    padding: 3,
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    height: '100%',
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.whiteSmoke,
    padding: 3,
    paddingHorizontal: 10,
    marginVertical: 4,
  },
});
