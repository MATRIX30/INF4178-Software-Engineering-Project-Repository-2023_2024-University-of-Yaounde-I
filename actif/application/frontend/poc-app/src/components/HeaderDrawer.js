import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {NotificationIcon} from './SvgIcons';
import {Text} from 'react-native-paper';
import {COLORS, SIZES} from '../constants/theme';
import IconActif from './IconActif';
import IconButtonActif from './IconButtonActif';
import {Avatar} from 'react-native-paper';

const HeaderDrawer = ({title, navigation}) => {
  return (
    <View style={styles.wrapper}>
      {/* <IconActif
                onPress={() => navigation.openDrawer()}
                size={40} name={"menu"} iconColor={COLORS.black}
            /> */}
      <TouchableOpacity onPress={() => navigation.navigate('account')}>
        {/* <Avatar.Image
          // onPress={() => navigation.openDrawer()}

          size={45}
          source={{
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs7ZPXmzi8TiHS8Gn7dYwL3tMRHSQysSR9Gaknj5LkIA&s',
          }}
        /> */}
      </TouchableOpacity>

      {/* <View>
                <Text style={styles.title}>{title || "Phill Florian"}</Text>
            </View> */}
      {/* <Image source={require('../../../assets/images/ACTIF15.png')} style={{ width: 40, height: 40, marginLeft: '5%', borderRadius: 100 }} /> */}
      <TouchableOpacity style={styles.notif}>
        {/* <NotificationIcon onPress={() => alert("notifs")} color={COLORS.black} /> */}
        <IconButtonActif
          name={'bell-badge-outline'}
          background={COLORS.secondary}
          iconColor={COLORS.primary}
          size={24}
        />
        {/* <View style={styles.printNotif}><Text style={{ fontSize: 8, color: COLORS.whiteSmoke }}>2</Text></View> */}
      </TouchableOpacity>
    </View>
  );
};

export default HeaderDrawer;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: 10,
  },
  title: {
    color: COLORS.black,
    fontSize: SIZES.h2,
    fontWeight: 'bold',
  },
  notif: {
    position: 'relative',
  },
  printNotif: {
    alignItems: 'center',
    width: 12,
    height: 12,
    borderRadius: 50,
    backgroundColor: COLORS.secondary,
    position: 'absolute',
    top: 5,
    left: 20,
  },
});
