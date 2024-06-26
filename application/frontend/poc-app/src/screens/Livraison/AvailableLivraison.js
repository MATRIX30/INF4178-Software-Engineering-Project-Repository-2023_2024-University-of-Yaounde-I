import React, {useEffect, useState} from 'react';
import {COLORS, SIZES, STYLES} from '../../constants/theme';
import CardLivraison from '../../components/CardLivraison';
import {
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {Text} from 'react-native-paper';
import Title from '../../components/Title';
import {SearchBar} from 'react-native-screens';
import SearchbarActif from '../../components/SearchBarActif';
import useDataFetching from '../../hooks/useDataFetching';
import useAuthUser from '../../hooks/useAuthUser';
import {ListLoader} from '../../components/loaders/ListLoader';
import {SKELETON_LIST_LIMIT} from '../../constants/GLOBAL_VARIABLES';

const AvailableLivraison = ({navigation}) => {
  const [query, setQuery] = useState('');
  const auth = useAuthUser();
  // console.log("🚀 ~ file: AvailableLivraison.js:16 ~ AvailableLivraison ~ auth:", auth?.id)

  const [refreshing, setrefreshing] = useState(false);
  /* Request hooks fetch */
  const [loadingD, messageD, deliveries, fetchDeliveries] = useDataFetching(
    auth?.id
      ? 'pocs/' + auth?.id + '/deliveries/in-stock?page=0&size=20'
      : null,
  );
  // console.log("🚀 ~ file: AvailableLivraison.js:23 ~ AvailableLivraison ~ deliveries:", deliveries)
  let finalDeliveries = [];
  // console.log("deliveries?.content ==> ", deliveries?.content?.length)
  const onRefresh = async () => {
    await fetchDeliveries();
  };

  const onScroll = ({nativeEvent}) => {
    const currentScrollPosition =
      Math.floor(nativeEvent?.contentOffset?.y) ?? 0;

    // setIsExtended(currentScrollPosition <= 0);
  };

  // filtre des livraisons par code du paquet
  finalDeliveries = deliveries?.content?.filter(d =>
    d?.includedIn?.packet?.code?.includes(query),
  );

  useEffect(() => {}, [query]);
  // console.log('finalDeliveries ==> ', finalDeliveries);

  useEffect(() => {
    /* tosat messages */
  }, [messageD]);

  const Header = (
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
        {/* <Image source={require('../../../assets/images/om.png')} style={{ height: 70, width: 70, borderRadius: 100 }} /> */}
        {/* <Text style={{ fontWeight: 'bold', marginTop: 5 }}>ID:DF234GHJKL</Text> */}
        <SearchbarActif
          search={query}
          setSearch={setQuery}
          placeholder={'Saisir le code du paquet ici'}
        />
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
            text={'Paquêts arrives'}
          />
        </View>
      </View>
    </View>
  );
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      {/* <ScrollView style={STYLES.mainLayout}>
        <View style={{}}>
          {
            FakeData.map((data, index) => {
              return (
                // <Text style={{color:'black'}}>{data.ville}sdfghjhgfd</Text>
                <CardLivraison key={index} data={data} />
              )


            })
          }
        </View>
      </ScrollView> */}
      {Header}

      <FlatList
        key={i => i?.id}
        // ListHeaderComponent={Header}
        data={
          finalDeliveries?.length == 0 ? deliveries?.content : finalDeliveries
        }
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
    top: '5%',
    backgroundColor: COLORS.white,
    width: '60%',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: SIZES.cardRadius,
  },
});
export default AvailableLivraison;
