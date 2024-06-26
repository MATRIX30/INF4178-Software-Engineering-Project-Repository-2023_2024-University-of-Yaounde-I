import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Dimensions,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import MapLibreGL from '@maplibre/maplibre-react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {ActivityIndicator} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '../../constants/theme';

const GlobalMapVsion = ({route}) => {
  const {pocs, loadingP} = route.params;

  // console.log('pocs===> ', pocs);
  const [coords, setCoords] = useState([0, 0]);
  const navigation = useNavigation();

  async function hasLocationPermission() {
    if (
      Platform.OS === 'web' ||
      Platform.OS === 'ios' ||
      (Platform.OS === 'android' && Platform.Version < 23)
    ) {
      return true;
    }
    const isGranted = await MapLibreGL.requestAndroidLocationPermissions();

    // console.log('isGranted', isGranted);
    return isGranted;
  }
  useEffect(() => {
    hasLocationPermission();
  }, []);
  return (
    <View style={{flex: 1}}>
      <MapLibreGL.MapView
        style={styles.map}
        zoomEnabled={true}
        userTrackingMode={MapLibreGL.UserTrackingModes.FollowWithHeading}
        styleURL="mapbox://styles/mapbox/navigation-day-v1"
        rotateEnabled={true}>
        <MapLibreGL.Camera
          zoomLevel={5}
          centerCoordinate={[pocs[1]?.lng, pocs[1]?.lat]}
          pitch={30}
          animationMode={'flyTo'}
          animationDuration={6000}
        />
        {pocs &&
          pocs?.map(poc => {
            return (
              <MapLibreGL.PointAnnotation
                id="destinationPoint"
                coordinate={[poc?.lat, poc?.lng]}>
                <MaterialCommunityIcons
                  onPress={() => {
                    Alert.alert(
                      'Details',
                      `${poc?.firstName} ${poc?.lastName}`,
                    );
                  }}
                  name="map-marker-radius"
                  size={20}
                  color={COLORS.secondary}
                />
              </MapLibreGL.PointAnnotation>
            );
          })}
      </MapLibreGL.MapView>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={24} color={COLORS.white} />
      </TouchableOpacity>
    </View>
  );
};

export default GlobalMapVsion;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },

  markerStartContainer: {
    width: 15,
    height: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.secondary,
    borderRadius: 20,
  },

  backButton: {
    position: 'absolute',
    top: 20,
    zIndex: 1,
    left: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    padding: 8,
  },

  loadingIndicator: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    zIndex: 2,
  },

  cardContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
  },

  routeProfilelist: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: 'transparent',
    zIndex: 1,
  },

  flatList: {
    position: 'absolute',
    bottom: 20,
    left: Dimensions.get('window').width / 4 - 40,
    zIndex: 1,
    backgroundColor: 'transparent',
  },

  routeProfileButon: {
    width: 70,
    height: 70,
    borderRadius: 40,
    marginHorizontal: 8,
    borderColor: '#fff',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },

  selectedRouteProfileButton: {
    backgroundColor: '#FA9E14',
    borderColor: COLORS.secondary,
  },

  routeProfileButtonText: {
    color: COLORS.white,
    marginTop: 5,
  },

  selectedRouteProfileButtonText: {
    color: COLORS.white,
  },
});
