import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import ButtonActif from '../../components/ButtonActif'
import { Text } from 'react-native-paper'
import { COLORS, SIZES, STYLES } from '../../constants/theme'
import CardLivraison from '../../components/CardLivraison'
import IconActif from '../../components/IconActif'
import { ScrollView } from 'react-native'
import { Image } from 'react-native'
import Title from '../../components/Title'
import { RefreshControl } from 'react-native-gesture-handler'
import { ListLoader } from '../../components/loaders/ListLoader'
import { SKELETON_LIST_LIMIT } from '../../constants/GLOBAL_VARIABLES'
import useAuthUser from '../../hooks/useAuthUser'
import useDataFetching from '../../hooks/useDataFetching'

const InProcess = () => {
    const auth = useAuthUser()
    // console.log("🚀 ~ file: AvailableLivraison.js:16 ~ AvailableLivraison ~ auth:", auth?.id)

    const [refreshing, setrefreshing] = useState(false);
    /* Request hooks fetch */
    const [loadingD, messageD, deliveries, fetchDeliveries] = useDataFetching(
        auth?.id ? 'pocs/' + auth?.id + '/deliveries/in-process?page=0&size=20' : null,
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
    const navigation = useNavigation()
    return (
        <View style={{ backgroundColor: 'white' }}>

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
    );
}




export default InProcess
