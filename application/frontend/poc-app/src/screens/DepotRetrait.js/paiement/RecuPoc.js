/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
import { useNavigation } from '@react-navigation/native';
import { COLORS, SIZES, STYLES } from '../../../constants/theme';
import { Text } from 'react-native-paper';
import { Image, ScrollView } from 'react-native';
import Dash from 'react-native-dash';
import Title from '../../../components/Title';
import ButtonActif from '../../../components/ButtonActif';

const { View, StyleSheet } = require('react-native');

const RecuPoc = () => {
  const navigation = useNavigation();
  return (
    <>
      <View style={[myStyle.wrapper, STYLES.mainLayout]}>
        <View style={myStyle.container}>
          <Title size={SIZES.h1} color={COLORS.secondary} text={"Le reçu est prêt"} />
          <Image
            source={require('../../../../assets/images/actif_no_background.png')}
            style={{ width: 150, height: 80, alignItems: 'center', right: 10 }}
          />
          <Title size={SIZES.h1} color={COLORS.black} text={"RECU N_105"} />
        </View>
        <ScrollView>
          <View
            style={{
              backgroundColor: COLORS.white,
              padding: 7,
              gap: 10,
              borderRadius: SIZES.radius,
              paddingBottom: '3%',
            }}>
            <View
              style={{
                gap: 6,
                top: 6
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between'
                }}>
                <View>
                  <Title text={'Id POC '} />
                </View>

                <View>
                  <Text
                    style={{
                      fontWeight: 'bold',
                    }}>
                    PO456787
                  </Text>
                </View>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between'
                }}>
                <Title text={'Adresse '} />
                <Text
                  style={{
                    textAlign: 'right',
                    fontWeight: 'bold',
                  }}>
                  Rond point nlongkah 2m{'\n'}de la station Total
                </Text>
              </View>
              <Dash
                style={{
                  width: '98.5%',
                  borderColor: COLORS.black
                }}
                dashGap={5} // Adjust the gap between dashes as needed
                dashLength={10} // Adjust the length of dashes as needed
                dashColor={COLORS.grey} // Set the color of the dashes
              ></Dash>
            </View>

            <View
              style={{
                gap: 5,
                top: 6,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between'
                }}>
                <Title text={'DATE '} />
                <Text
                  style={{
                    fontWeight: 'bold',
                  }}>
                  ven,Dec 15,2023
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between'
                }}>
                <Title text={'TIME '} />
                <Text
                  style={{
                    textAlign: 'right',
                    fontWeight: 'bold',
                  }}>
                  13:15min - 13:30 min
                </Text>
              </View>
              <Dash
                style={{
                  width: '98.5%',
                }}
                dashGap={5} // Adjust the gap between dashes as needed
                dashLength={10} // Adjust the length of dashes as needed
                dashColor={COLORS.grey} // Set the color of the dashes
              ></Dash>
            </View>

            <View
              style={{
                gap: 5,
                top: 6,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between'
                }}>
                <Title
                  size={20}
                  text={'Methode de payment '}
                  color={COLORS.black}
                />
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between'
                }}>
                <Title text={'Orange Money****498 '} />
                <Text
                  style={{
                    textAlign: 'right',
                    fontWeight: 'bold',
                  }}>
                  3000F
                </Text>
              </View>
              <Dash
                style={{
                  width: '98.5%',
                }}
                dashGap={5} // Adjust the gap between dashes as needed
                dashLength={10} // Adjust the length of dashes as needed
                dashColor={COLORS.grey} // Set the color of the dashes
              ></Dash>
            </View>

            <View
              style={{
                gap: 5,
                top: 6,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between'
                }}>
                <Title text={'Code du colis '} />
                <Text
                  style={{
                    fontWeight: 'bold',
                  }}>
                  Co123476
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between'
                }}>
                <Title text={'Nom Expediteur:  '} />
                <Text
                  style={{
                    textAlign: 'right',
                    fontWeight: 'bold',
                  }}>
                  Séraphin DOMCHEU
                </Text>
              </View>
              {/* names */}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between'
                }}>
                <Title text={'Telephone  '} />
                <Text
                  style={{
                    textAlign: 'right',
                    fontWeight: 'bold',
                  }}>
                  656698754
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between'
                }}>
                <Title text={'Adresse:'} />
                <Text
                  style={{
                    textAlign: 'right',
                    fontWeight: 'bold',
                  }}>
                  4367 Nlongkak
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between'
                }}>
                <Title text={'Nom_destinataire'} />
                <Text
                  style={{
                    textAlign: 'right',
                    fontWeight: 'bold',
                  }}>
                  Séraphin DOMCHEU
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between'
                }}>
                <Title text={'Telephone'} />
                <Text
                  style={{
                    textAlign: 'right',
                    fontWeight: 'bold',
                  }}>
                  656698754
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between'
                }}>
                <Title text={'Adresse:'} />
                <Text
                  style={{
                    textAlign: 'right',
                    fontWeight: 'bold',
                  }}>
                  4367 Nlongkak
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between'
                }}>
                <Title text={'Destination  '} />
                <Text
                  style={{
                    textAlign: 'right',
                    fontWeight: 'bold',
                  }}>
                  PO124237
                </Text>
              </View>

              <Dash
                style={{
                  width: '98.5%',
                }}
                dashGap={5} // Adjust the gap between dashes as needed
                dashLength={10} // Adjust the length of dashes as needed
                dashColor={COLORS.grey} // Set the color of the dashes
              ></Dash>
            </View>

            <View
              style={{
                gap: 8,
                top: 6,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between'
                }}>
                <Title text={'Poids: '} />
                <Text
                  style={{
                    fontWeight: 'bold',
                  }}>
                  ven,Dec 15,2023
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between'
                }}>
                <Title text={'Mode '} />
                <Text
                  style={{
                    textAlign: 'right',
                    fontWeight: 'bold',
                  }}>
                  Express
                </Text>
              </View>
              <Dash
                style={{
                  width: '98.5%',
                }}
                dashGap={5} // Adjust the gap between dashes as needed
                dashLength={10} // Adjust the length of dashes as needed
                dashColor={COLORS.grey} // Set the color of the dashes
              ></Dash>
            </View>

            <View
              style={{
                gap: 5,
                top: 6,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between'
                }}>
                <Title
                  size={20}
                  text={'Prix de la livraison '}
                  color={COLORS.black}
                />
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between'
                }}>
                <Title text={'Amount '} />
                <Text
                  style={{
                    textAlign: 'right',
                    fontWeight: 'bold',
                  }}>
                  3000F
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>


        <View style={{flexDirection : 'row', justifyContent : 'space-around'}}>
          <ButtonActif
          reverse={true}
          icon={'share'}
            title={'Partager'}
            style={{ borderRadius: SIZES.buttonRadius, width: "40%" }}
            // onPress={() => navigation.navigate('facturePoc')
            // }
          />
            <ButtonActif
            title={'Suivant'}
            style={{ borderRadius: SIZES.buttonRadius, width: "40%" }}
            onPress={() => navigation.navigate('facturePoc')
            }
          />
        </View>

      </View>
    </>
  );
};

const myStyle = StyleSheet.create({
  wrapper: {
    gap: 10,
  },
  container: {
    alignItems: 'center',
  }
});

export default RecuPoc;
