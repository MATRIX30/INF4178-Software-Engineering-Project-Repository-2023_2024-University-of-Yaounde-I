import {useNavigation} from '@react-navigation/native';
import {STYLES, COLORS, SIZES, FONTS} from '../../../constants/theme';
import ButtonActif from '../../../components/ButtonActif';
import {Text, Divider} from 'react-native-paper';
import IconActif from '../../../components/IconActif';
import IconButtonActif from '../../../components/IconButtonActif';
import Title from '../../../components/Title';
import usePostAxiosData from '../../../hooks/usePostAxiosData';
import {useEffect} from 'react';
import DetailsPaquet from '../../Livraison/DetailsPaquet';

const {View, StyleSheet, ScrollView} = require('react-native');

const RecapitulatifLivraison = ({route}) => {
  /* navigation params */
  const params = route.params;
  const globalFormState = params?.globalFormState;
  const pocIndentedId = params?.pocIndentedId;
  const objects = params?.objects;
  // console.log('route ==> ', globalFormState?.packet);

  //   const {globalFormState, pocIndentedId, objects} = route.params;
  // console.log("🚀 ~ RecapitulatifLivraison ~ globalFormState:", globalFormState)

  const navigation = useNavigation();

  const [loadingE, postAxiosSavedE, errorMassageE, successMessageE, resultE] =
    usePostAxiosData('estimations');
  const [loading, postAxiosSaved, errorMassage, successMessage, result] =
    usePostAxiosData('deliveries/with-new-packet-and-customers');
  // console.log("🚀 ~ RecapitulatifLivraison ~ resultE:", resultE)

  useEffect(() => {
    globalFormState &&
      postAxiosSavedE({
        weight: globalFormState?.packet?.weight,
        height: globalFormState?.packet?.height,
        width: globalFormState?.packet?.width,
        townSource: globalFormState?.packet?.customerSender?.town,
        townIntented: globalFormState?.packet?.customerReceiver?.town,
      });
  }, [globalFormState]);

  // useEffect(() => {
  //     if (successMessage?.status == 200) {
  //         alert(successMessage?.message)
  //         navigation.navigate('selectMode')
  //     }

  // }, [successMessage]);

  useEffect(() => {
    if (successMessage?.status == 200) {
      alert(successMessage?.message);
      navigation.navigate('selectMode', {delivery: result})
      // navigation.navigate('main');
    }
  }, [successMessage]);

  const handleSubmit = async () => {
    console.log('🚀 ~ handleSubmit ~ globalFormState:', {
      ...globalFormState,
      packet: {estimationId: resultE?.result?.id, ...globalFormState?.packet},
    });
    await postAxiosSaved({
      ...globalFormState,
      packet: {estimationId: resultE?.result?.id, ...globalFormState?.packet},
    });
  };

  return (
    <>
      <View style={[STYLES.mainLayout]}>
        {/* price section */}
        <View style={{alignItems: 'center'}}>
          <IconButtonActif
            name={'information-variant'}
            background={COLORS.primary}
            iconColor={COLORS.black}
            size={40}
            mode={'outlined'}
            bordercolor={COLORS.black}
          />
          <Text style={{fontWeight: 'bold', fontSize: SIZES.h1}}>
            {loadingE ? '...' : resultE?.result?.cost + ' FCFA'}
          </Text>
          <Text style={{fontStyle: 'italic'}}>Prix de la livraison</Text>
        </View>

        {/* content */}
        <ScrollView
          style={{
            backgroundColor: COLORS.gray,
            borderRadius: 10,
            padding: 10,
            marginVertical: 10,
          }}>
          {/* Exp informations */}
          <View>
            <Title size={SIZES.body} color={COLORS.black} text={'Expediteur'} />
            <Divider style={myStyle.divider} />
            <View style={myStyle.aligntext}>
              <Text style={{color: COLORS.grey}}>Nom</Text>
              <Text numberOfLines={1} style={{fontWeight: '700'}}>
                {globalFormState?.packet?.customerSender?.lastName}
              </Text>
            </View>
            <View style={myStyle.aligntext}>
              <Text style={{color: COLORS.grey}}>Prenom</Text>
              <Text numberOfLines={1} style={{fontWeight: '700'}}>
                {globalFormState?.packet?.customerSender?.firstName}
              </Text>
            </View>
            <View style={myStyle.aligntext}>
              <Text style={{color: COLORS.grey}}>Telephone</Text>
              <Text style={{fontWeight: '700'}}>
                {globalFormState?.packet?.customerSender?.phone}
              </Text>
            </View>
          </View>

          {/* Dest informations */}
          <View style={myStyle.section}>
            <Title
              size={SIZES.body}
              color={COLORS.black}
              text={'Destinataire'}
            />
            <Divider style={myStyle.divider} />
            <View style={myStyle.aligntext}>
              <Text style={{color: COLORS.grey}}>Nom</Text>
              <Text numberOfLines={1} style={{fontWeight: '700'}}>
                {globalFormState?.packet?.customerReceiver?.lastName}
              </Text>
            </View>
            <View style={myStyle.aligntext}>
              <Text style={{color: COLORS.grey}}>Prenom</Text>
              <Text style={{fontWeight: '700'}}>
                {globalFormState?.packet?.customerReceiver?.firstName}
              </Text>
            </View>
            <View style={myStyle.aligntext}>
              <Text style={{color: COLORS.grey}}>Telephone</Text>
              <Text style={{fontWeight: '700'}}>
                {globalFormState?.packet?.customerReceiver?.phone}
              </Text>
            </View>
          </View>

          {/* packet informations */}
          <View style={myStyle.section}>
            <Title
              size={SIZES.body}
              color={COLORS.black}
              text={'A propos du paquet'}
            />
            <DetailsPaquet
              data={objects}
              paquet={globalFormState?.packet}
              // hideOptions={true}
            />
          </View>
        </ScrollView>
        <View style={myStyle.buttonContainer}>
          <View>
            <ButtonActif
              borderColor={COLORS.primary}
              // reverse={true}
              background={COLORS.white}
              onPress={() =>
                navigation.navigate('PacketInformation', {
                  globalFormState: globalFormState,
                  pocIndentedId: pocIndentedId,
                  objects: objects,
                })
              }
              textColor={COLORS.black}
              title={'Précédent'}
              style={{borderRadius: SIZES.buttonRadius}}
              labelStyle={{fontSize: SIZES.textButton}}
            />
          </View>

          <ButtonActif
            disabled={(!resultE?.result || loading) ? true : false}
            title={'Valider'}
            style={{borderRadius: SIZES.buttonRadius, paddingHorizontal: 10}}
            textColor={COLORS.black}
            onPress={handleSubmit}
            loading={loading}
            // onPress={() => navigation.navigate("selectMode", {globalFormState: globalFormState, pocIndentedId: pocIndentedId, objects: objects })}
          />
        </View>
      </View>
    </>
  );
};

const myStyle = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  aligntext: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  divider: {
    marginVertical: 5,
    color: COLORS.secondary,
    backgroundColor: COLORS.primary,
    height: 1.5,
  },
  section: {
    marginTop: '2%',
    marginBottom: '3%',
  },
});

export default RecapitulatifLivraison;
