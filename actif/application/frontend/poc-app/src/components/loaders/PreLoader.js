import * as React from 'react';
import { Dimensions, Image, View } from 'react-native';
import { ActivityIndicator, MD2Colors, Text } from 'react-native-paper';
import { COLORS } from '../../constants/theme';

const iconSice = 75;
const PreLoader = () => {
    return (
     <View
        style={{
            backgroundColor: COLORS.secondaryGray,
            opacity: 0.8,

            position: 'absolute', zIndex: 99,
            height: Dimensions.get('window').height,
            width: Dimensions.get('screen').width,
            display: 'flex',
            // alignItems: 'center',
            // justifyContent: 'center'
            paddingTop: (Dimensions.get('window').height / 2) - iconSice

        }}
    >
        <ActivityIndicator size={iconSice} animating={true} color={COLORS.primary}  />
        <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>

            <Image
                style={{
                    // width: 60,
                    // height: 60,
                    justifyContent: 'flex-start',
                    margin: 10,
                    // position: 'absolute',
                }}
                source={require('../../../assets/images/ACTIF15.png')}
            />
            {/* <Text
                style={{ color: COLORS.black, margin: 10, }}
                variant="displayMedium">
                {'ACTIF'}
            </Text> */}
        <Text
            style={{ color: COLORS.primary, marginLeft: 10, textAlign: 'center' }}
            variant="bodyMedium">
            {/* {t("Fichier Nationale des Travailleurs Etrangers au Cameroun")}
             */}
             Chargement en cours...
        </Text>
        </View>

    </View>
)}

export default PreLoader;