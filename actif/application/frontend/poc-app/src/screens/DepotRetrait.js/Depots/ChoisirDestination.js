import {useNavigation} from '@react-navigation/native';
import {STYLES, COLORS, SIZES} from '../../../constants/theme';
import ButtonActif from '../../../components/ButtonActif';
import SearchbarActif from '../../../components/SearchBarActif';
import {useEffect, useState} from 'react';
import {DistanceIcon} from '../../../components/SvgIcons';
import {PocListItem} from '../../../components/PocListItem';
import useDataFetching from '../../../hooks/useDataFetching';
import usePostAxiosData from '../../../hooks/usePostAxiosData';
import {Text} from 'react-native-paper';
import {ListLoader} from '../../../components/loaders/ListLoader';
import {SKELETON_LIST_LIMIT} from '../../../constants/GLOBAL_VARIABLES';

const {View, StyleSheet, ScrollView, FlatList} = require('react-native');

const ChoisirDestination = () => {
  const [query, setQuery] = useState('');

  const navigation = useNavigation();


  const [loading, postAxiosSaved, errorMassage, successMessage, deliveries] =
    usePostAxiosData('pocs/search');

  const handleSearch = async () => {
    await postAxiosSaved({query: query});
  };

  useEffect(() => {
    if (query.length > 0) {
      handleSearch();
    }
    handleSearch();
  }, [query]);

  // fecth pocs
  const [loadingP, messageP, pocs, fetchPocs] = useDataFetching('pocs');
  // console.log("pocs ", pocs)

  // useEffect(() => {
  //   // Use `setOptions` to update the button that we previously specified
  //   // Now the button includes an `onPress` handler to update the count
  //   navigation.setOptions({
  //     headerRight: () => (
  //       <ButtonActif
  //         textColor={COLORS.black}
  //         onPress={() => navigation.navigate("GlobalMapVsion", {pocs: pocs?.content, loadingP: loadingP})}
  //         background={COLORS.white}
  //         icon={'map-marker-distance'}
  //         title={'Vision gobale'}
  //         style={{alignSelf: 'flex-end'}}
  //       />
  //     ),
  //   });
  // }, [navigation, pocs]);
  // console.log('Poc destination ==> ', deliveries);

  return (
    <>
      <View style={[myStyle, STYLES.mainLayout]}>
        <SearchbarActif search={query} setSearch={setQuery} />
        <FlatList
          data={deliveries?.result}
          renderItem={item => (
            <PocListItem
              iconStartLeft={'map-marker-radius-outline'}
              iconEndLeft={<DistanceIcon color={COLORS.black} size={25} />}
              key={item?.id}
              data={item}
            />
          )}
          ListEmptyComponent={
            !loading && query == '' ? (
              <Text style={{color: COLORS.black, textAlign: 'center'}}>
                Aucun point trouvé !!
              </Text>
            ) : (
              <ListLoader number={SKELETON_LIST_LIMIT} />
            )
          }
        />

        {/* <ButtonActif textColor={COLORS.white} icon={'map-marker'} title={'voir sur la map'} style={{ alignSelf: 'flex-end', marginBottom: 10, backgroundColor: COLORS.black }} /> */}
        {/* <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <ButtonActif style={{ width: '60%', borderRadius: SIZES.buttonRadius }} title={'Selectionner'} onPress={() => navigation.navigate("formulaire_infos_expediteur")} />
                </View> */}
      </View>
    </>
  );
};

const myStyle = StyleSheet.create({
  Scrollpoc: {
    flexDirection: 'column',
    backgroundColor: COLORS.white,
    paddingHorizontal: 5,
  },
  onPressContainer: {
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
});

export default ChoisirDestination;
