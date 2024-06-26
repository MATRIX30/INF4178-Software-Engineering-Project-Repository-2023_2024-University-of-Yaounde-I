import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {COLORS, SIZES, STYLES} from '../../constants/theme';
import {Text} from 'react-native-paper';
import {Image} from 'react-native';
import Title from '../../components/Title';
import IconActif from '../../components/IconActif';
import OptionList from '../../components/OptionList';
import useAuthUser from '../../hooks/useAuthUser';
import {AuthContext} from '../../navigation/AuthNavigation';

const Account = () => {
  const navigation = useNavigation();
  // const [currentUser, setCurrentUser] = useState('')
  const currentUser = useAuthUser();

  // useEffect(() => {
  // const get = async () => {
  // let user = await getCurentUser()
  // setCurrentUser(user)
  // }
  // get()
  // }, [currentUser]);

  // console.log('currentUser ==> ', currentUser);
  const {signOut} = React.useContext(AuthContext);
  return (
    <>
      <View style={{flex: 1}}>
        <View
          style={{
            flex: 3,
            backgroundColor: COLORS.primary,
            borderBottomLeftRadius: SIZES.radiusHeader,
            borderBottomRightRadius: SIZES.radiusHeader,
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
            }}>
            <IconActif
              name={'account-outline'}
              iconColor={COLORS.black}
              size={40}
            />
            <Title text={`Compte`} size={SIZES.h1} color={COLORS.black} />
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              width: '100%',
              gap: 5,
            }}>
            <Text numberOfLines={1} style={{fontSize: SIZES.h2}}>
              {currentUser?.code}
            </Text>
          </View>
          <View
            style={{
              flex: 3,
              flexDirection: 'row',
              gap: 10,
              justifyContent: 'space-evenly',
              alignItems: 'center',
            }}>
            <View>
              <Image
                source={require('../../../assets/images/scarlett.png')}
                style={{borderRadius: 100, width: 100, height: 100}}
              />
            </View>
            <View style={{rowGap: 10}}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{flexDirection: 'row', gap: 10}}>
                  <IconActif
                    name={'account-outline'}
                    iconColor={COLORS.secondary}
                  />
                  <Text style={{color: COLORS.black, fontSize: SIZES.body}}>
                    {currentUser?.firstName} {currentUser?.lastName}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: COLORS.white,
                    borderRadius: SIZES.radius,
                  }}>
                  {/* <Text style={{color: COLORS.black, paddingHorizontal: 5}}>
                    4.9
                  </Text>
                  <IconActif name={'star'} iconColor={COLORS.secondary} /> */}
                </View>
              </View>
              <View style={{flexDirection: 'row', gap: 10}}>
                <IconActif
                  name={'phone-outline'}
                  iconColor={COLORS.secondary}
                />
                <Text style={{color: COLORS.black, fontSize: SIZES.body}}>
                  {currentUser?.phone}
                </Text>
              </View>
              <View style={{flexDirection: 'row', gap: 10}}>
                <IconActif name={'gmail'} iconColor={COLORS.secondary} />
                <Text style={{color: COLORS.black, fontSize: SIZES.body}}>
                  {currentUser?.mail}
                </Text>
              </View>
              <View style={{flexDirection: 'row', gap: 10}}>
                <IconActif name={'map-marker'} iconColor={COLORS.secondary} />
                <Text style={{color: COLORS.black, fontSize: SIZES.body}}>
                  {currentUser?.town}, {currentUser?.region}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={{flex: 8, padding: STYLES.mainLayout.padding}}>
          <Title text={'Options'} size={SIZES.h2} color={COLORS.black} />
          <View style={{alignItems: 'center', gap: 10, marginTop: '3%'}}>
            <OptionList
              onPress={() => alert('Go it !')}
              icon={'account-outline'}
              title={'Editer le Profile'}
              style={styles.list}
            />
            <OptionList
              icon={'image-area'}
              title={'Gallerie'}
              style={styles.list}
            />
            <OptionList
              icon={'wallet'}
              title={'Mes commissions'}
              style={styles.list}
            />
            <OptionList
              icon={'face-agent'}
              title={'Support'}
              style={styles.list}
            />
            <OptionList
              icon={'newspaper-variant-outline'}
              title={'FAQ'}
              style={styles.list}
            />
            {/* <OptionList
              icon={'information'}
              title={'Termes et conditions'}
              style={styles.list}
            />  */}
            <OptionList
              icon={'information'}
              title={'A propos'}
              style={styles.list}
              onPress={() => {navigation.navigate("about")}}
            />
            <OptionList
              icon={'logout'}
              title={'Se Déconnecter'}
              style={styles.list}
              onPress={signOut}
            />
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  list: {
    paddingVertical: 15,
    paddingHorizontal: '3%',
  },
});

export default Account;
