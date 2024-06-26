import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Alert,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Text} from 'react-native-paper';
import IconButtonActif from '../IconButtonActif';
import {COLORS, SIZES, STYLES} from '../../constants/theme';
import BottomModal from '../alerts/ButtomModal';
import ButtonActif from '../ButtonActif';
// import { CardChoice } from './CardChoice'

const ModalChoiceTypeRetrait = ({open, setOpen}) => {
  // const [modalVisible, setModalVisible] = useState(open);
  const CardChoice = ({iconName, title, link, open, setOpen, nextUrl}) => {
    const navigation = useNavigation();

    return (
      <TouchableOpacity
        onPress={() => {
          setOpen(false);
          navigation.navigate(link, {nextUrl});
        }}
        style={[
          {
            width: 140,
            height: 140,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 10,
            borderWidth: 2,
            borderColor: COLORS.primary,
            borderRadius: 15,
          },
        ]}>
        <IconButtonActif
          name={iconName}
          background={COLORS.primary}
          iconColor={COLORS.black}
          size={50}
        />
        <Text style={{fontSize: SIZES.h2}}>{title}</Text>
      </TouchableOpacity>
    );
  };
  const ModalContent = (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        paddingTOP: '4%',
        paddingBottom: '10%',
        width: '100%',
        rowGap: 20,
      }}>
      {/* <IconButtonActif  name={"information-variant"} background={COLORS.primary} iconColor={COLORS.black} mode={'outlined'}bordercolor={COLORS.black} size={50}/> */}
      <Text style={{fontSize: SIZES.h1, color: COLORS.black}}>
        Qui fait un retrait ?{' '}
      </Text>
      <View
        style={{
          flex: 2,
          flexDirection: 'row',
          justifyContent: 'space-around',
          width: '100%',
        }}>
        <CardChoice
          open={open}
          setOpen={setOpen}
          iconName={'account-tie'}
          title={'Perticulier'}
          link={'MesLivraisons'}
        />
        <CardChoice
          open={open}
          setOpen={setOpen}
          iconName={'motorbike-electric'}
          title={'Livreur'}
          link={'formulaireIdentification'}
          nextUrl={'livreurRetraitLivraisonList'}
        />
      </View>
    </View>
  );

  const navigation = useNavigation();
  return (
    <>
      {/* <View style={[myStyle, STYLES.mainLayout]}> */}
      {/* <ButtonActif title={"Show bottom modal"} onPress={() => setModalVisible(true)} /> */}
      <BottomModal height={'40%'} modalVisible={open} setModalVisible={setOpen}>
        {ModalContent}
      </BottomModal>

      {/* </View> */}
    </>
  );
};

const myStyle = StyleSheet.create({});

export default ModalChoiceTypeRetrait;
