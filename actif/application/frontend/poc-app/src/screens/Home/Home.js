import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {COLORS, SIZES} from '../../constants/theme';
import {Image, TouchableWithoutFeedback} from 'react-native';
import IconActif from '../../components/IconActif';
import ModalChoiceTypeDepot from '../../components/modals/ModalChoiceTypeDepot';
import ModalChoiceTypeRetrait from '../../components/modals/ModalChoiceTypeRetrait';
import useAuthUser from '../../hooks/useAuthUser';
import useDataFetching from '../../hooks/useDataFetching';

const Home = ({navigation}) => {
  const auth = useAuthUser();
  const [openDepot, setOpenDepot] = useState(false);
  const [openRetrait, setOpenretrait] = useState(false);

  const [loadingD, messageD, deliveries, fetchDeliveries] = useDataFetching(
    auth?.id
      ? 'pocs/' + auth?.id + '/deliveries/in-stock?page=0&size=20'
      : null,
  );

  const [loading, message, deliveriesT, fetchDeliveriesT] = useDataFetching(
    auth?.id ? 'pocs/' + auth?.id + '/deliveries/in-process?page=0&size=20' : null,
);

const [loadingTh, messageTh, deliveriesTh, fetchDeliveriesTh] = useDataFetching(
  auth?.id ? 'pocs/' + auth?.id + '/deliveries/terminated?page=0&size=20' : null,
);
// console.log("deliveries?.content?.length" , deliveriesTh?.content?.length)
let savePaquetSum = (deliveries?.content?.length || 0) + (deliveriesT?.content?.length || 0) + (deliveriesTh?.content?.length || 0)

  return (
    <>
      <View style={{flex: 1}}>
        <View style={{flex: 1, backgroundColor: '#FFC803'}}>
          <Text
            style={{
              textAlign: 'center',
              color: COLORS.black,
              fontSize: SIZES.h1,
              textDecorationLine: 'underline',
            }}>
            {auth?.firstName} {auth?.lastName}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 40,
            }}>
            <View style={{alignItems: 'center'}}>
              <View
                style={{
                  borderWidth: 2,
                  borderRadius: 100,
                  borderColor: COLORS.black,
                  alignItems: 'center',
                }}>
                <IconActif
                  name={'cube-outline'}
                  size={30}
                  iconColor={COLORS.black}
                />
              </View>
              <Text style={{color: COLORS.secondary}}>{savePaquetSum || 0}</Text>
              <Text style={{color: COLORS.black}}>Paquets enregistrés</Text>
            </View>
            <View style={{alignItems: 'center'}}>
              <View
                style={{
                  borderWidth: 2,
                  borderRadius: 100,
                  borderColor: COLORS.black,
                  alignItems: 'center',
                }}>
                <IconActif
                  name={'cube-outline'}
                  size={30}
                  iconColor={COLORS.black}
                />
              </View>
              <Text style={{color: COLORS.secondary}}>'0'</Text>
              <Text style={{color: COLORS.black}}>Paquets retirés </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            flex: 1.5,
            backgroundColor: COLORS.white,
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
            alignItems: 'center',
            marginTop: '-30%',
          }}>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 15,
              marginTop: '10%',
            }}>
            <TouchableWithoutFeedback
              // onPress={() => navigation.navigate("choisirdestination")}
              onPress={() => setOpenDepot(true)}>
              <View
                style={{
                  shadowColor: COLORS.grey,
                  shadowOffset: {
                    width: 0,
                    height: 10,
                  },
                  shadowOpacity: 0.1,
                  elevation: 10,
                  alignItems: 'center',
                  backgroundColor: COLORS.primary,
                  width: '45%',
                  height: '40%',
                  borderRadius: SIZES.radius,
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    flex: 1,
                    width: '100%',
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Image
                      source={require('../../../assets/images/var2.png')}
                      style={{width: '100%', height: '90%'}}
                    />
                  </View>
                </View>
                <View style={{flex: 1, width: '100%', marginLeft: '10%'}}>
                  <Text
                    style={{
                      color: COLORS.black,
                      fontSize: SIZES.h2,
                      fontWeight: 'bold',
                    }}>
                    Dépôt de paquet
                  </Text>
                  <Text style={{color: COLORS.black, fontSize: SIZES.font}}>
                    Faciliter vos paiements en ligne en rechargeant votre
                    portefeuille numerique
                  </Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => setOpenretrait(true)}>
              <View
                style={{
                  alignItems: 'center',
                  backgroundColor: 'white',
                  width: '45%',
                  height: '40%',
                  borderRadius: SIZES.radius,
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    flex: 1,
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={{
                      flex: 2,
                      justifyContent: 'center',
                      marginLeft: '5%',
                    }}>
                    <Image
                      source={require('../../../assets/images/delivered_walk.png')}
                      style={{width: '100%', height: '90%'}}
                    />
                  </View>
                  <View style={{height: '25%'}}>
                    <Text
                      style={{
                        flex: 1,
                        backgroundColor: COLORS.secondary,
                        paddingVertical: 3,
                        paddingHorizontal: 6,
                        color: COLORS.white,
                        borderTopRightRadius: SIZES.radius,
                      }}>
                      200
                    </Text>
                  </View>
                </View>
                <View style={{flex: 1, width: '100%', marginLeft: '10%'}}>
                  <Text
                    style={{
                      color: COLORS.black,
                      fontSize: SIZES.h2,
                      fontWeight: 'bold',
                    }}>
                    Retrait paquets
                  </Text>
                  <Text style={{color: COLORS.black, fontSize: SIZES.font}}>
                    Faciliter vos paiements en ligne en rechargeant votre
                    portefeuille numerique
                  </Text>
                </View>
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback
              onPress={() => navigation.navigate('mesCommision')}>
              <View
                style={{
                  alignItems: 'center',
                  backgroundColor: 'white',
                  width: '45%',
                  height: '40%',
                  borderRadius: SIZES.radius,
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    flex: 1,
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={{
                      flex: 2,
                      justifyContent: 'center',
                      marginLeft: '5%',
                    }}>
                    <Image
                      source={require('../../../assets/images/var5.png')}
                      style={{width: '90%', height: '80%'}}
                    />
                  </View>
                  <View style={{height: '25%'}}>
                    <Text
                      style={{
                        flex: 1,
                        backgroundColor: COLORS.secondary,
                        paddingVertical: 3,
                        paddingHorizontal: 6,
                        color: COLORS.white,
                        borderTopRightRadius: SIZES.radius,
                      }}>
                      10500F
                    </Text>
                  </View>
                </View>
                <View style={{flex: 1, width: '100%', marginLeft: '10%'}}>
                  <Text
                    style={{
                      color: COLORS.black,
                      fontSize: SIZES.h2,
                      fontWeight: 'bold',
                    }}>
                    Mes Gains
                  </Text>
                  <Text style={{color: COLORS.black, fontSize: SIZES.font}}>
                    Faciliter vos paiements en ligne en rechargeant votre
                    portefeuille numerique
                  </Text>
                </View>
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback
              onPress={() => navigation.navigate('TrackPaquet')}>
              <View
                style={{
                  alignItems: 'center',
                  backgroundColor: 'white',
                  width: '45%',
                  height: '40%',
                  borderRadius: SIZES.radius,
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    flex: 1,
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={{
                      flex: 2,
                      justifyContent: 'center',
                      marginLeft: '5%',
                    }}>
                    <Image
                      source={require('../../../assets/images/tracking.png')}
                      style={{width: '100%', height: '80%'}}
                    />
                  </View>
                  <View style={{height: '25%'}}>
                    <Text
                      style={{
                        flex: 1,
                        backgroundColor: COLORS.secondary,
                        paddingVertical: 3,
                        paddingHorizontal: 6,
                        color: COLORS.white,
                        borderTopRightRadius: SIZES.radius,
                      }}>
                      122
                    </Text>
                  </View>
                </View>
                <View style={{flex: 1, width: '100%', marginLeft: '10%'}}>
                  <Text
                    style={{
                      color: COLORS.black,
                      fontSize: SIZES.h2,
                      fontWeight: 'bold',
                    }}>
                    Suivre vos paquets
                  </Text>
                  <Text style={{color: COLORS.black, fontSize: SIZES.font}}>
                    Faciliter vos paiements en ligne en rechargeant votre
                    portefeuille numerique
                  </Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
        {/* <ButtonActif title={'ewew'}  onPress={()=>setOpen(true)}/> */}
      </View>
      {<ModalChoiceTypeDepot open={openDepot} setOpen={setOpenDepot} />}
      {<ModalChoiceTypeRetrait open={openRetrait} setOpen={setOpenretrait} />}
    </>
  );
};

export default Home;
