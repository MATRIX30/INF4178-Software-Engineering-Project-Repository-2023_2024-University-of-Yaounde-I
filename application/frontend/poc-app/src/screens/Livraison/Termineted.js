import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import {  StyleSheet, View } from 'react-native'
import { COLORS, STYLES } from '../../constants/theme'
import ButtonActif from '../../components/ButtonActif'
import { Text } from 'react-native-paper'
import Paquets from '../DepotRetrait.js/Retrait/paquet'
import { FlatList, RefreshControl } from 'react-native-gesture-handler'
import CardLivraison from '../../components/CardLivraison'
import { SKELETON_LIST_LIMIT } from '../../constants/GLOBAL_VARIABLES'
import useAuthUser from '../../hooks/useAuthUser'
import useDataFetching from '../../hooks/useDataFetching'
import { ListLoader } from '../../components/loaders/ListLoader'

const Termineted = () => {
  const navigation = useNavigation()
  const auth = useAuthUser()
  // console.log("🚀 ~ file: AvailableLivraison.js:16 ~ AvailableLivraison ~ auth:", auth?.id)

  const [refreshing, setrefreshing] = useState(false);
  /* Request hooks fetch */
  const [loadingD, messageD, deliveries, fetchDeliveries] = useDataFetching(
      auth?.id ? 'pocs/' + auth?.id + '/deliveries/terminated?page=0&size=20' : null,
  );
  // console.log("🚀 ~ file: AvailableLivraison.js:23 ~ AvailableLivraison ~ deliveries:", deliveries)

  const onRefresh = async () => {
      await fetchDeliveries();
  };

  const onScroll = ({ nativeEvent }) => {
      const currentScrollPosition =
          Math.floor(nativeEvent?.contentOffset?.y) ?? 0;

      // setIsExtended(currentScrollPosition <= 0);
  };

  useEffect(() => {
      /* tosat messages */
  }, [messageD]);
  return (
      <>
          <View style={[myStyle, STYLES.mainLayout]}>

          <FlatList
                key={(i) => i?.id}
                // ListHeaderComponent={Header}
                data={deliveries?.content}
                refreshControl={
                    <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
                }
                renderItem={({ item }) => <CardLivraison navigation={navigation} data={item} key={item?.id} />}
                ListEmptyComponent={
                    !loadingD ? <Text style={{ color: COLORS.black, textAlign: 'center' }}>
                        Aucune données pour l'instant
                    </Text> :

                        <ListLoader number={SKELETON_LIST_LIMIT} />

                }
                keyExtractor={item => item?.id}
                onScroll={onScroll}
            />
          </View>
        
      </>
  )
}

const myStyle = StyleSheet.create({

})

export default Termineted
