/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
import {useNavigation} from '@react-navigation/native';
import {COLORS, SIZES, STYLES} from '../../../constants/theme';
import {Text} from 'react-native-paper';
import {Image, ScrollView} from 'react-native';
import Dash from 'react-native-dash';
import Title from '../../../components/Title';
import ButtonActif from '../../../components/ButtonActif';
import IconActif from '../../../components/IconActif';
import useDataFetching from '../../../hooks/useDataFetching';
import {config} from '../../../constants/config';
import dayjs from 'dayjs';

const {View, StyleSheet} = require('react-native');

const FacturePoc = ({route}) => {
  const navigation = useNavigation();
  const params = route?.params;
  const delivery = params?.delivery;
  // console.log('delivery for facture ==> ', delivery);
  return (
    <>
      <View style={[myStyle.container, STYLES.mainLayout]}>
        <Title
          size={SIZES.h1}
          color={COLORS.secondary}
          text={'Scannez le QRCODE'}
        />
        {/* <Image
          source={require('../../../../assets/images/actif_no_background.png')}
          style={{width: 150, height: 80, alignItems: 'center', right: 10}}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Title size={SIZES.h1} color={COLORS.black} text={'Etiquette No'} />
        </View> */}

        <Image
          source={{
            uri: `${config.app.api_url}/files/${delivery?.includedIn?.packet?.qrCodePath}`,
          }}
          style={{width: 300, height: 300}}
        />
        <Title
          size={SIZES.h1}
          color={COLORS.secondary}
          text={delivery?.includedIn?.packet?.code}
        />

        <View
          style={{
            backgroundColor: COLORS.white,
            gap: 10,
            borderRadius: SIZES.radius,
            paddingBottom: '3%',
            width: '100%',
            padding: 7,
          }}>
          <View
            style={{
              gap: 6,
              top: 6,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Title text={'DATE'} />
              <Text
                style={{
                  fontWeight: 'bold',
                }}>
                {dayjs(new Date()).format('DD-MM-YYYY')}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Title text={'TIME '} />
              <Text
                style={{
                  textAlign: 'right',
                  fontWeight: 'bold',
                }}>
                '13:15min - 13:30 min'
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Title text={'Duree '} />
              <Text
                style={{
                  textAlign: 'right',
                  fontWeight: 'bold',
                }}>
                '2h'
              </Text>
            </View>
            <Dash
              style={{
                width: '98.5%',
                borderColor: COLORS.black,
              }}
              dashGap={0} // Adjust the gap between dashes as needed
              dashLength={10} // Adjust the length of dashes as needed
              dashColor={COLORS.grey} // Set the color of the dashes
            ></Dash>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            {/* Expedition */}
            <View
              style={{
                flexDirection: 'column',
              }}>
              <Text
                style={{
                  color: COLORS.black,
                  marginBottom: 10,
                }}>
                Expedition
              </Text>
              <Text
                style={{
                  fontWeight: 'bold',
                }}>
                {delivery?.pocSource?.code}
              </Text>
              <View style={{width: '100%'}}>
                <Text
                  style={{
                    fontWeight: 'bold',
                  }}
                  numberOfLines={1}>
                  {delivery?.pocSource?.district}, {delivery?.pocSource?.town},{' '}
                  {delivery?.pocSource?.region}
                </Text>
              </View>
            </View>
            {/* Destination */}
            <View
              style={{
                flexDirection: 'column',
              }}>
              <Text
                style={{
                  color: COLORS.black,
                  textAlign: 'right',
                  marginBottom: 10,
                }}>
                Destination
              </Text>
              <Text
                style={{
                  fontWeight: 'bold',
                  textAlign: 'right',
                }}>
                {delivery?.pocIntended?.code}
              </Text>
              <View style={{width: '100%'}}>
                <Text
                  numberOfLines={1}
                  style={{
                    fontWeight: 'bold',
                    textAlign: 'right',
                  }}>
                  {delivery?.pocIntended?.district},{' '}
                  {delivery?.pocIntended?.town}, {delivery?.pocIntended?.region}
                </Text>
              </View>
            </View>
          </View>
          <Dash
            style={{
              width: '98.5%',
            }}
            dashGap={0} // Adjust the gap between dashes as needed
            dashLength={10} // Adjust the length of dashes as needed
            dashColor={COLORS.grey} // Set the color of the dashes
          ></Dash>

          <View style={{alignItems: 'center'}}>
            <Image
              source={require('../../../../assets/images/actif_no_background.png')}
              style={{width: 150, height: 80, alignItems: 'center', right: 10}}
            />
          </View>
        </View>

        <ButtonActif
          style={{
            top: 10,
            borderRadius: SIZES.buttonRadius,
            width: '40%',
          }}
          icon={'printer'}
          reverse={true}
          title={'Imprimer'}
          onPress={() => navigation.navigate('MyDelivery')}
        />
      </View>
    </>
  );
};

const myStyle = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
});

export default FacturePoc;
