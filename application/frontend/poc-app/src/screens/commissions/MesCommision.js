/* eslint-disable prettier/prettier */
/* eslint-disable eol-last */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable quotes */
/* eslint-disable react/react-in-jsx-scope */
import {useNavigation} from '@react-navigation/native';
import {Card, Text} from 'react-native-paper';
import {View, StyleSheet, FlatList, Keyboard} from 'react-native';
import {COLORS, SIZES, STYLES} from '../../constants/theme';
import IconButtonActif from '../../components/IconButtonActif';
import Dash from 'react-native-dash';
import IconActif from '../../components/IconActif';
import {useCallback, useRef, useState} from 'react';
import ButtonActif from '../../components/ButtonActif';
import BottomModal from '../../components/alerts/ButtomModal';
import InputActif from '../../components/InputActif';
import {TouchableWithoutFeedback} from 'react-native';
import {KeyboardAwareScrollView} from '@codler/react-native-keyboard-aware-scroll-view';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import BottomSheet from '../../components/alerts/BottomSheet';

const RetraitConfirm = () => {
  const navigation = useNavigation();

  const data = [
    {key: 'item1'},
    {key: 'item2'},
    {key: 'item3'},
    {key: 'item4'},
    {key: 'item5'},
    {key: 'item6'},
    // Add more items as needed
  ];

  const renderItem = ({item}) => (
    <View style={{marginVertical: 5}}>
      {/* Your existing view structure for each item goes here */}
      <View
        style={{
          gap: 3,
        }}>
        <View
          style={{
            gap: 2,
          }}>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <Text
              style={{
                color: COLORS.grey,
              }}>
              Today
            </Text>
            <Dash
              style={{
                width: '100%',
                borderColor: COLORS.gray,
                top: 10,
                marginStart: 10,
              }}
              dashGap={0} // Adjust the gap between dashes as needed
              dashLength={8} // Adjust the length of dashes as needed
              dashColor={COLORS.grey} // Set the color of the dashes
            ></Dash>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              gap: 80,
            }}>
            <Text
              style={{
                fontWeight: 'bold',
              }}>
              Co5897665
            </Text>
            <View style={{}}>
              <View
                style={{
                  flexDirection: 'row',
                  gap: 60,
                  top: 10,
                }}>
                <Text
                  style={{
                    color: COLORS.secondary,
                  }}>
                  1 000 F
                </Text>
              </View>
            </View>
            <IconActif name={'chevron-double-right'} iconColor={COLORS.grey} />
          </View>
          <Text
            style={{
              color: COLORS.grey,
            }}>
            10h56min
          </Text>
        </View>
        <Dash
          style={{
            width: '98.5%',
          }}
          dashGap={0} // Adjust the gap between dashes as needed
          dashLength={10} // Adjust the length of dashes as needed
          dashColor={COLORS.gray} // Set the color of the dashes
        ></Dash>
      </View>
      {/* ... */}
    </View>
  );

  /* bottomsheet */

  const bottomSheetModalRef = useRef(null);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handlePresentModalClose = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);

  const handlePresentModalDismiss = useCallback(() => {
    Keyboard.dismiss();
    bottomSheetModalRef.current?.dismiss();
  }, []);
  /* End bottomsheet */

  const ModalContent = (
    <View
      style={{
        gap: 20,
        marginTop: '5%',
        width: '80%',
      }}>
      <View
        style={{
          width: 200,
          gap: 10,
          width: '100%',
        }}>
        <InputActif
          // text={text}
          // setText={setText}
          label={'Numero'}
          placeholder={'+237 659 432 332'}
        />
        <InputActif
          // text={text}
          // setText={setText}
          label={'Somme a retirer'}
          placeholder={'placeholder'}
        />
      </View>
      <ButtonActif
        icon={'cash'}
        reverse={true}
        style={{borderRadius: SIZES.buttonRadius}}
        title={'Retirer'}
        onPress={handlePresentModalClose}
      />
    </View>
  );

  return (
    <TouchableWithoutFeedback onPress={handlePresentModalDismiss}>
      <View style={[styles.wrapper]}>
        {/* Money section */}
        <View style={[styles.money]}>
          <Text
            style={{
              fontSize: 40,
              textDecorationLine: 'underline',
              fontWeight: 'bold',
            }}>
            30 000F
          </Text>
          <Text>Solde disponible</Text>
        </View>
        {/* call to action modal paiement */}
        <TouchableWithoutFeedback onPress={handlePresentModalPress}>
          <View style={{alignItems: 'center', top: '-3%'}}>
            <View style={styles.modalButton}>
              <IconButtonActif
                name={'location-exit'}
                size={30}
                iconColor={COLORS.black}
              />
              <Text style={styles.text}>Effectuer un retrait</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
        {/* historique */}
        <View style={STYLES.mainLayout}>
          <FlatList data={data} renderItem={renderItem} />
        </View>

        <BottomSheet
          handlePresentModalDismiss={handlePresentModalDismiss}
          children={ModalContent}
          bottomSheetModalRef={bottomSheetModalRef}
          handlePresentModalPress={handlePresentModalPress}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  money: {
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: '15%',
  },
  modalButton: {
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.whiteSmoke,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '40%',
    padding: 5,
  },
  text: {
    color: COLORS.black,
  },
});

export default RetraitConfirm;
