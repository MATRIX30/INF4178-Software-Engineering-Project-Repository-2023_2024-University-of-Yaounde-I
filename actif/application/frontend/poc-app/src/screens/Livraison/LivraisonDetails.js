import {COLORS, FONTS, SIZES, STYLES} from '../../constants/theme';
import ButtonActif from '../../components/ButtonActif';
import IconActif from '../../components/IconActif';
import {Text} from 'react-native-paper';

import {View, StyleSheet, ScrollView, Alert, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ScanIcon} from '../../components/SvgIcons';
import useAuthUser from '../../hooks/useAuthUser';
import usePostAxiosData from '../../hooks/usePostAxiosData';
import {useEffect, useState} from 'react';
import {DELIVERY_STATUS} from '../../constants/GLOBAL_VARIABLES';
import dayjs from 'dayjs';
import ObjectPacket from '../../components/ObjectPacket';
import ScanModal from '../../utils/scan/ScanModal';

const LivraisonDetails = ({route, hideOptions}) => {
  const navigation = useNavigation();
  const auth = useAuthUser();
  const {delivery} = route.params;
  // console.log("🚀 ~ LivraisonDetails ~ delivery:", delivery)
  // console.log('🚀 ~ file: stut delivery.js:17 ~ delivery ~ delivery:', delivery?.status);
  console.log(
    '🚀 ~ file: delivery.js:17 ~ delivery ~ paket:',
    delivery?.includedIn?.packet?.id,
  );
  // console.log("🚀 ~ file: delivery.js:17 ~ delivery ~ status:", status)
  const [loading, postAxiosDeposed, errorMassage, successMessage, result] =
    usePostAxiosData('deliveries/deposed');
  const [
    loadingIng,
    postAxiosIgmore,
    errorMassageIgn,
    successMessageIng,
    resultIng,
  ] = usePostAxiosData('deliveries/ignored');
  const [
    loadingcan,
    postAxiosCancel,
    errorMassageca,
    successMessageca,
    resultca,
  ] = usePostAxiosData('deliveries/canceled');
  const [code, setCode] = useState(null);
  const [visible, setVisible] = useState(false);
  const [setshowScanner, setSetshowScanner] = useState(false);
  /* Calcul des propriétés du packet */
  let packetWeight = 0;
  let packetHeight = 0;
  let packetWidth = 0;
  delivery?.includedIn?.packet?.items?.length > 0 &&
    delivery?.includedIn?.packet?.items?.map(item => {
      packetWeight += item?.weight;
      packetHeight += item?.height;
      packetWidth += item?.width;
    });

  const handleSelect = () => {
    postAxiosSelect({
      deliveryId: delivery?.id,
      livreurId: auth?.id,
    });
  };
  const handleRemettre = () => {
    setCode('');
    setVisible(true);

    // postAxiosIgmore({
    //     deliveryId: delivery?.id,
    //     livreurId: auth?.id
    // })
  };
  const handleTake = () => {
    setCode('');
    setVisible(true);
  };

  const handleCancel = () => {
    postAxiosCancel({
      deliveryId: delivery?.id,
      pocDposedId: auth?.id,
    });
  };

  useEffect(() => {
    if (
      successMessage?.status == 200 ||
      successMessageIng?.status == 200 ||
      successMessageca?.status == 200
    ) {
      navigation.goBack();
    }
  }, [successMessage, successMessageIng, successMessageca]);

  useEffect(() => {
    // console.log("🚀 ~ LivraisonDetails ~ codes:", code)
    if (code) {
      if (delivery?.includedIn?.packet?.code != code) {
        alert('Mauvais code');
      } else {
        alert('Bon code');
        postAxiosDeposed({
          deliveryId: delivery?.id,
          pocDposedId: auth?.id,
        });
      }
    }
  }, [code]);

  const buttonAction = (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        gap: 15,
        margin: 10,
      }}>
      {/* {console.log("🚀 ~ LivraisonDetails ~ delivery?.status:", delivery?.status)} */}
      {delivery?.status == DELIVERY_STATUS.AVAILABLE ? (
        <>
          <ButtonActif
            loading={loading}
            icon={'qrcode-scan'}
            background={COLORS.primary}
            title={'Scanner le paquet'}
            style={{flex: 1, height: 40}}
            labelStyle={{fontSize: SIZES.textButton}}
            onPress={() => setVisible(true)}
            // onPress={() => navigation.navigate('scan', { delivery })
            // }
          />
        </>
      ) : delivery?.status == DELIVERY_STATUS.SELECTED ? (
        <>
          <ButtonActif
            background={COLORS.secondary}
            title={'Annuler'}
            style={{flex: 1, height: 40}}
            labelStyle={{fontSize: SIZES.textButton, color: COLORS.black}}
            onPress={handleCancel}
            loading={loadingIng}
          />
          <ButtonActif
            loading={loading}
            icon={'qrcode-scan'}
            background={COLORS.primary}
            title={'Je suis selectionné par un livreur'}
            style={{flex: 1, height: 40}}
            labelStyle={{fontSize: SIZES.textButton}}
            // onPress={handleRemettre}
          />
        </>
      ) : delivery?.status == DELIVERY_STATUS.TAKEN ? (
        <>
          {/* <ButtonActif
                        loading={loading}
                        icon={'close'}

                        background={COLORS.secondary}
                        title={'Annuler'}
                        style={{ flex: 1, height: 40 }}
                        labelStyle={{ color: COLORS.black, fontSize: SIZES.textButton }}
                        onPress={handleCancel}

                    /> */}

          <ButtonActif
            loading={loading}
            icon={'qrcode-scan'}
            background={COLORS.primary}
            title={'Prendre au livreur'}
            style={{flex: 1, height: 40}}
            labelStyle={{fontSize: SIZES.textButton}}
            // onPress={() => navigation.navigate('scan', { delivery })
            // }
            // disabled={delivery?.includedIn?.packet?.code != code}
            onPress={handleTake}
          />
        </>
      ) : delivery?.status == DELIVERY_STATUS.DEPOSED ? (
        <ButtonActif
          icon={'check'}
          background={COLORS.primary}
          title={'Livraison déposée'}
          style={{flex: 1, height: 40}}
          labelStyle={{fontSize: SIZES.textButton}}
          // ${delivery?.includedIn?.packet?.customerReceiver?.phone}
          // onPress={() => navigation.navigate('scan', { delivery })
          // }
          // disabled={delivery?.includedIn?.packet?.code != code}
          onPress={() =>
            Alert.alert('Livraison déposée.', `Veuillez contacter le client`, [
              {
                text: 'Sortir',
                onPress: () => {},
              },
              {
                text: "Appelez l'expéditeur",
                onPress: () => {
                  alert(
                    `${delivery?.includedIn?.packet?.customerSender?.phone}`,
                  );
                },
              },
              {
                text: 'Appelez le recepteur',
                onPress: () => {
                  alert(
                    `${delivery?.includedIn?.packet?.customerReceiver?.phone}`,
                  );
                },
                style: 'cancel',
              },
            ])
          }
        />
      ) : (
        <></>
      )}
    </View>
  );

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      // header: props => <PocListHearder delivery={delivery} showItineraire={true} props={props} />,

      title: 'Details sur la livraison',
    });
  }, [navigation]);

  return visible ? (
    <ScanModal
      code={code}
      setCode={setCode}
      visible={visible}
      setVisible={setVisible}
    />
  ) : (
    <>
      <View style={[STYLES.mainLayout, {flexDirection: 'column', flex: 1}]}>
        <ScrollView>
          <View style={[myStyle, {gap: 10}]}>
            <View style={myStyle.Display}>
              <IconActif name={'qrcode'} iconColor={COLORS.primary} />
              <Text style={{fontWeight: 'bold', fontSize: SIZES.font}}>
                Code du packet: {delivery?.includedIn?.packet?.code}
              </Text>
              {/* {console.log("delivery ==> ", delivery?.includedIn?.packet?.code)} */}
            </View>
            {delivery?.status == DELIVERY_STATUS.SELECTED && (
              <View style={myStyle.Display}>
                <IconActif name={'timer-sand'} iconColor={COLORS.primary} />
                <Text
                  style={{
                    color: COLORS.primary,
                    backgroundColor: COLORS.cleanRed,
                    borderRadius: 3,
                    fontSize: SIZES.font,
                  }}>
                  Il vous reste
                  <Text style={{fontWeight: 'bold'}}>
                    {delivery?.estimatedDeliveryDate
                      ? dayjs(
                          new Date(delivery?.estimatedDeliveryDate),
                        ).fromNow() + ' '
                      : 'Non fourni'}
                  </Text>
                  pour demarrer la livraison
                </Text>
              </View>
            )}
            <View style={myStyle.Display}>
              <IconActif name={'cash-100'} iconColor={'#BDC413'} />
              <Text style={{fontSize: SIZES.font}}>Prix de livraison:</Text>
              <Text
                style={{
                  color: COLORS.whiteSmoke,
                  backgroundColor: COLORS.secondary,
                  paddingHorizontal: 2,
                  borderRadius: SIZES.cardRadius,
                }}>
                5{delivery?.cost} F
              </Text>
            </View>
            <View style={myStyle.Display}>
              <IconActif
                name={'chart-timeline-variant-shimmer'}
                iconColor={COLORS.black}
              />
              <Text style={{fontSize: SIZES.font}}>
                Trajet :{' '}
                <Text style={{fontWeight: 'bold'}}>
                  {delivery?.distance} Km
                </Text>
              </Text>
            </View>
            <View style={[myStyle.trajet, {borderWidth: 0}]}>
              <View style={[myStyle.Display, {alignItems: 'center'}]}>
                <IconActif name={'circle-double'} iconColor={COLORS.gray} />
                <View>
                  <Text style={{fontSize: SIZES.font}}>
                    {delivery?.pocSource?.town}
                  </Text>
                  <Text style={{color: COLORS.grey, fontSize: SIZES.font}}>
                    " Ancienne sonnel Mimboman "
                  </Text>
                </View>
              </View>
              <View
                style={{
                  borderLeftWidth: 2,
                  height: 20,
                  borderStyle: 'dashed',
                  marginLeft: 10,
                  borderColor: COLORS.grey,
                }}></View>
              <View style={[myStyle.Display, {alignItems: 'center'}]}>
                <IconActif name={'circle-double'} iconColor={COLORS.primary} />
                <View>
                  <Text style={{fontSize: SIZES.font}}>
                    {delivery?.pocIntended?.town}
                  </Text>
                  <Text style={{color: COLORS.grey, fontSize: SIZES.font}}>
                    " Titi Garage "
                  </Text>
                </View>
              </View>
            </View>

            <View style={myStyle.Display}>
              <IconActif name={'av-timer'} iconColor={'#3DE56A'} />
              <Text>
                Temps estime :{' '}
                <Text style={{fontWeight: 'bold'}}>
                  45 minutes
                  {delivery?.estimatedDeliveryDate
                    ? dayjs(new Date(delivery?.estimatedDeliveryDate)).fromNow()
                    : 'Non fourni'}
                </Text>
              </Text>
            </View>
            <View style={[myStyle.Display, {justifyContent: 'space-between'}]}>
              <View style={[myStyle.Display, {alignItems: 'center'}]}>
                <IconActif name={'weight'} iconColor={COLORS.primary} />
                <Text style={{fontWeight: 'bold'}}>{packetWeight}kg</Text>
              </View>
              <View style={[myStyle.Display, {alignItems: 'center'}]}>
                <IconActif name={'ruler'} iconColor={COLORS.primary} />
                <Text>Taille :</Text>
                <Text>
                  L=<Text style={{fontWeight: 'bold'}}>{packetHeight}m</Text>,
                  l=
                  <Text style={{fontWeight: 'bold'}}>{packetWidth}m</Text>,
                  {'\n'}
                  H=
                  <Text style={{fontWeight: 'bold'}}>"1.52m"</Text>
                </Text>
              </View>
            </View>
            <View style={myStyle.Display}>
              <IconActif name={'package-variant'} iconColor={'#2573E8'} />
              <Text>
                Objets :{' '}
                <Text style={{fontWeight: 'bold'}}>
                  {delivery?.includedIn?.packet?.items?.length > 0
                    ? delivery?.includedIn?.packet?.items?.length
                    : '0'}
                </Text>
              </Text>
            </View>
            <View style={[myStyle.trajet, myStyle.grid]}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                }}>
                {delivery?.includedIn?.packet?.items?.length > 0 &&
                  delivery?.includedIn?.packet?.items?.map((item, index) => {
                    return (
                      <>
                        <ObjectPacket
                          index={index + 1}
                          key={item?.id}
                          data={item}
                        />
                      </>
                    );
                  })}
              </View>
            </View>
            <View style={myStyle.Display}>
              <IconActif
                name={'picture-in-picture-top-right'}
                iconColor={'#1FBBB0'}
              />
              <Text>Images du colis (cliquer pour voir les images)</Text>
            </View>
            <View style={myStyle.Displayimage}>
              <StockImage />
              <StockImage />
              <StockImage />
              <StockImage />
            </View>

            <View style={myStyle.Display}>
              <IconActif
                name={'text-box-multiple-outline'}
                iconColor={COLORS.black}
              />
              <Text style={{fontWeight: 'bold'}}>Description :</Text>
            </View>
            <Text
              style={{
                fontFamily: FONTS.fontFamily,
                borderWidth: 1,
                borderColor: COLORS.white,
                textAlign: 'justify',
                backgroundColor: COLORS.white,
                padding: 7,
                borderRadius: SIZES.cardRadius,
              }}>
              {delivery?.includedIn?.packet?.description}
            </Text>
          </View>
        </ScrollView>

        {buttonAction}
      </View>
    </>
  );
};

const myStyle = StyleSheet.create({
  Display: {
    flexDirection: 'row',
    gap: 5,
    marginVertical: 2,
    fontSize: SIZES.font,
  },
  trajet: {
    borderWidth: 1,
    marginLeft: 20,
  },
  grid: {
    borderWidth: 2,
    flexDirection: 'column',
    borderRadius: 5,
    alignItems: 'flex-start',
    borderColor: COLORS.gray,
    paddingHorizontal: 10,
  },
  image: {
    height: 70,
    width: 78,
    borderWidth: 1,
    borderColor: COLORS.gray,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  Displayimage: {
    borderWidth: 2,
    overflow: 'hidden',
    flexDirection: 'row',
    height: 80,
    justifyContent: 'space-evenly',
    marginLeft: 20,
    borderRadius: 5,
    alignItems: 'center',
    borderColor: COLORS.gray,
  },
});
const StockImage = () => {
  return (
    <View style={myStyle.image}>
      <Text></Text>
    </View>
  );
};

export default LivraisonDetails;
