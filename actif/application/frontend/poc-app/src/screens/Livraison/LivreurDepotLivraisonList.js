import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {FlatList, RefreshControl, StyleSheet, View} from 'react-native';
import ButtonActif from '../../components/ButtonActif';
import {Text} from 'react-native-paper';
import {COLORS, SIZES, STYLES} from '../../constants/theme';
import CardLivraison from '../../components/CardLivraison';
import IconActif from '../../components/IconActif';
import {ScrollView} from 'react-native';
import {Image} from 'react-native';
import Title from '../../components/Title';
import useAuthUser from '../../hooks/useAuthUser';
import {
  LIVREUR_ID,
  SKELETON_LIST_LIMIT,
} from '../../constants/GLOBAL_VARIABLES';
import useDataFetching from '../../hooks/useDataFetching';
import {ListLoader} from '../../components/loaders/ListLoader';

const LivreurDepotLivraisonList = ({route}) => {
  const navigation = useNavigation();
  const auth = useAuthUser();
  // console.log("🚀 ~ file: AvailableLivraison.js:16 ~ AvailableLivraison ~ auth:", auth?.id)
  const params = route?.params;

  const livreur = params?.livreur;

  const [refreshing, setrefreshing] = useState(false);
  /* Request hooks fetch */
  const [loadingD, messageD, deliveries, fetchDeliveries] = useDataFetching(
    auth?.id && livreur
      ? 'livreurs/' +
          livreur?.id +
          '/pocs/' +
          auth?.id +
          '/deliveries/toDeposed?page=0&size=20'
      : null,
  );
  // console.log("🚀 ~ file: AvailableLivraison.js:23 ~ AvailableLivraison ~ deliveries:", deliveries)

  const onRefresh = async () => {
    await fetchDeliveries();
  };

  const onScroll = ({nativeEvent}) => {
    const currentScrollPosition =
      Math.floor(nativeEvent?.contentOffset?.y) ?? 0;

    // setIsExtended(currentScrollPosition <= 0);
  };

  useEffect(() => {
    /* tosat messages */
  }, [messageD]);

  useEffect(() => {
    navigation.setOptions({
      title: (livreur?.firstName + ' ' + livreur?.lastName).toUpperCase(),
    });
  }, [navigation]);
  return (
    <View style={{backgroundColor: COLORS.whiteSmoke}}>
      <View
        style={{
          backgroundColor: COLORS.primary,
          minHeight: '20%',
          marginBottom: '5%',
        }}>
        {/* <View style={{ backgroundColor: COLORS.primary, flexDirection: 'row', justifyContent: 'space-between', marginTop: '2%', alignItems: 'center' }}>
                    <View style={{ marginLeft: '2%' }}><IconActif name={"arrow-left"} onPress={() => navigation.goBack()} iconColor={COLORS.black} /></View>
                    <Text style={{ color: COLORS.black, fontSize: SIZES.body, fontWeight: 'bold' }}>Paul Diouf</Text>
                    <View style={{ marginRight: '2%' }}><IconActif name={"dots-vertical"} iconColor={COLORS.black} /></View>
                </View> */}
        <View
          style={{
            backgroundColor: COLORS.primary,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '3%',
          }}>
          <Image
            source={require('../../../assets/images/om.png')}
            style={{height: 70, width: 70, borderRadius: 100}}
          />
          <Text style={{fontWeight: 'bold', marginTop: 5}}>ID:{livreur?.code}</Text>
        </View>
        <View style={styles.infosPaquet}>
          <View style={styles.infoContain}>
            <Title
              color={COLORS.secondary}
              style={{marginEnd: 5}}
              size={SIZES.body}
              text={deliveries?.numberOfElements}
            />
            <Title
              color={COLORS.black}
              size={SIZES.body}
              text={'Paquêts à retirer'}
            />
          </View>
        </View>
      </View>
      {/* <ScrollView style={{ marginTop: "6%" }}>
                {
                    FakeData.map((data) => {
                        return (
                            <CardLivraison handleConsult={() => alert("consulter")} data={data} key={data.id} />
                        )
                    })
                }
            </ScrollView> */}

      <FlatList
        style={{marginTop: '10%', backgroundColor: COLORS.whiteSmoke}}
        key={i => i?.id}
        // ListHeaderComponent={Header}
        data={deliveries?.content}
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
        }
        renderItem={({item}) => (
          <CardLivraison navigation={navigation} data={item} key={item?.id} />
        )}
        ListEmptyComponent={
          !loadingD ? (
            <Text style={{color: COLORS.black, textAlign: 'center'}}>
              Aucune données pour l'instant
            </Text>
          ) : (
            <ListLoader number={SKELETON_LIST_LIMIT} />
          )
        }
        keyExtractor={item => item?.id}
        onScroll={onScroll}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  infosPaquet: {
    backgroundColor: COLORS.primary,
    alignItems: 'center',
  },
  infoContain: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    top: 45,
    backgroundColor: COLORS.white,
    width: '60%',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: SIZES.cardRadius,
  },
});

export default LivreurDepotLivraisonList;
