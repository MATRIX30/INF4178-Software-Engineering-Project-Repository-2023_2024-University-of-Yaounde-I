import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MapLibreGL from '@maplibre/maplibre-react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {ActivityIndicator} from 'react-native-paper';
import {COLORS} from '../../constants/theme';
import {config} from '../../constants/config';
import Geolocation from '@react-native-community/geolocation';
import ColorfulCard from 'react-native-colorful-card';

const routeProfiles = [
  {id: 'walking', label: 'Walking', icon: 'walking'},
  {id: 'cycling', label: 'Cycling', icon: 'bicycle'},
  {id: 'driving', label: 'Driving', icon: 'car'},
];

const Itineraire = ({route}) => {
  const {destination} = route.params;

  //   console.log('destination data ===> ', destination?.item);
  /* Route direction section */
  const [routeDirections, setRouteDirections] = useState(null);
  const [coords, setCoords] = useState([0, 0]);
  const [curentPosition, setCurrentPosition] = useState({
    longitude: 0,
    latitude: 0,
  });
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);
  const [destinationCoords, setDestinationCoords] = useState([0, 0]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const [selectedRouteProfile, setSelectedRouteProfile] = useState('driving');

  async function hasLocationPermission() {
    if (
      Platform.OS === 'web' ||
      Platform.OS === 'ios' ||
      (Platform.OS === 'android' && Platform.Version < 23)
    ) {
      return true;
    }
    const isGranted = await MapLibreGL.requestAndroidLocationPermissions();

    console.log('isGranted', isGranted);
    return isGranted;
  }

  const [permission, setPermission] = useState(false);

  useEffect(() => {
    const task = async () => {
      const per = await hasLocationPermission();
      setPermission(per);
    };
    task();

    if (selectedRouteProfile != null) {
      createRouterLine(coords, selectedRouteProfile);
    }
    Geolocation.getCurrentPosition(
      position => {
        // console.log("current position ==> ", position)
        const {latitude, longitude} = position.coords;
        setCurrentPosition({
          longitude: longitude,
          latitude: latitude,
        });
        setCoords([longitude, latitude]);
      },
      error => {
        console.log('Error getting current position', error);
      },
      {enableHighAccuracy: false, timeout: 15000},
    );
  }, [false, selectedRouteProfile]);

  useEffect(() => {}, [coords]);
  useEffect(() => {}, [routeDirections]);

  // console.log("currentposition", curentPosition)

  function makeRouterFeature(coordinates) {
    let routerFeature = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: coordinates,
          },
        },
      ],
    };

    return routerFeature;
  }

  async function createRouterLine(coords, routeProfile) {
    const startCoords = `${coords[0]},${coords[1]}`;
    const endCoords = `${destination?.item?.lng},${destination?.item?.lat}`;
    const geometries = 'geojson';
    const url = `https://api.mapbox.com/directions/v5/mapbox/${routeProfile}/${startCoords};${endCoords}?alternatives=true&geometries=${geometries}&steps=true&banner_instructions=true&overview=full&voice_instructions=true&access_token=${config.app.mapbox_token}`;
    try {
      await fetch(url)
        .then(response => response.json())
        .then(data => {
          //   console.log("data route ==> ", data?.routes)
          const routeData = data?.routes?.map(route => {
            setDistance((route?.distance / 1000).toFixed(2));
            setDuration((route?.duration / 3600).toFixed(2));
          });

          let coordinates = data['routes'][0]['geometry']['coordinates'];
          let destinationCoordinates =
            data['routes'][0]['geometry']['coordinates'].slice(-1)[0];
          setDestinationCoords(destinationCoordinates);

          if (coordinates.length) {
            const routerFeature = makeRouterFeature([...coordinates]);
            setRouteDirections(routerFeature);
          }
          setLoading(false);
        })
        .catch(err => {
          setLoading(false);
          console.log('Error fetching route data', err);
        });
    } catch (error) {
      console.log('error direction', error);
    }
  }

  const renderItem = item => (
    <TouchableOpacity
      style={[
        styles.routeProfileButon,
        item?.id === selectedRouteProfile && styles.selectedRouteProfileButton,
      ]}
      onPress={() => setSelectedRouteProfile(item?.id)}>
      <Icon
        name={item?.icon}
        size={24}
        color={
          item?.id === selectedRouteProfile
            ? COLORS.white
            : 'rgba(255,255,255,0.6)'
        }
      />
      <Text
        style={[
          styles.routeProfileButtonText,
          item?.id === selectedRouteProfile &&
            styles.selectedRouteProfileButtonText,
        ]}>
        {item?.label}
      </Text>
    </TouchableOpacity>
  );

  /* check if current location change */
  // useEffect(() => {
  //   if (curentPosition) {
  //     // Previous location for comparison
  //     const previousLocation = {
  //       longitude: curentPosition.longitude,
  //       latitude: curentPosition.latitude,
  //     };

  //     const checkLocationChange = () => {
  //       const currentL = curentPosition;

  // if (
  //   previousLocation.latitude !== currentL.latitude ||
  //   previousLocation.longitude !== currentL.longitude
  // ) {
  //   // Location has changed!
  //   console.log('Location changed!');
  //   alert('Location changed!')
  //   // Perform necessary actions, e.g., update UI, trigger events

  //   // Update previousLocation for next comparison
  //   previousLocation.longitude = currentL.longitude;
  //   previousLocation.latitude = currentL.latitude;

  //   setCurrentPosition({
  //     longitude: currentL.longitude,
  //     latitude: currentL.latitude
  //   });

  //   setCoords([currentL.longitude, currentL.latitude])
  // }
  //       // else {
  //       //   console.log('previousLocation ===> ', previousLocation , "currentL ==>", currentL);
  //       // }
  //     };

  //     // Set up an interval to check for changes regularly
  //     const intervalId = setInterval(checkLocationChange, 5000);
  //     // Check every 5 seconds

  //     return () => clearInterval(intervalId); // Clear interval on unmount
  //   }
  // }, [curentPosition]);

  return (
    <View style={{flex: 1}}>
      <MapLibreGL.MapView
        style={styles.map}
        
        zoomEnabled={true}
        userTrackingMode={MapLibreGL.UserTrackingModes.FollowWithHeading}
        onUserLocationUpdate={location => {
          const {longitude, latitude} = location.coords;
          if (
            curentPosition.latitude !== latitude ||
            curentPosition.longitude !== longitude
          ) {
            // Location has changed!
            console.log('Location changed!');
            alert('Location changed!');

            setCurrentPosition({longitude: longitude, latitude: latitude});

            setCoords([longitude, latitude]);
          }
          // setCoords([longitude, latitude]);
          console.log('location not changed !');
          return () => clearInterval(intervalId);
        }}
        styleURL="mapbox://styles/mapbox/navigation-day-v1"
        rotateEnabled={true}
        onDidFinishLoadingMap={async () => {
          await createRouterLine(coords, selectedRouteProfile);
        }}>
        <MapLibreGL.Camera
          zoomLevel={7}
          centerCoordinate={[coords[0], coords[1]]}
          pitch={30}
          animationMode={'flyTo'}
          animationDuration={6000}
        />
        {routeDirections && (
          <MapLibreGL.ShapeSource id="line1" shape={routeDirections}>
            <MapLibreGL.LineLayer
              id="line-source"
              style={{
                lineColor: COLORS.secondary,
                lineWidth: 6,
                lineCap: 'round',
                lineJoin: 'round',
                lineDasharray: [0.5, 2],
              }}
            />
          </MapLibreGL.ShapeSource>
        )}

        {/* starter position */}
        <MapLibreGL.PointAnnotation
          id="marker"
          coordinate={[coords[0], coords[1]]}>
          <View style={styles.markerStartContainer}></View>
        </MapLibreGL.PointAnnotation>

        {destinationCoords && (
          <MapLibreGL.PointAnnotation
            id="destinationPoint"
            coordinate={destinationCoords}>
            <View>
              <MaterialCommunityIcons
                name="map-marker-radius"
                size={20}
                color={COLORS.secondary}
              />
            </View>
          </MapLibreGL.PointAnnotation>
        )}
      </MapLibreGL.MapView>
      <FlatList
        data={routeProfiles}
        renderItem={({item}) => renderItem(item)}
        keyExtractor={item => item.id}
        horizontal
        contentContainerStyle={styles.routeProfilelist}
        showsHorizontalScrollIndicator={false}
        style={styles.flatList}
      />
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={24} color={COLORS.white} />
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator
          size="large"
          color={COLORS.secondary}
          style={styles.loadingIndicator}
        />
      ) : (
        routeDirections && (
          <View style={styles.cardContainer}>
            <ColorfulCard
              title="Duration"
              value={`${duration} hours`}
              footerTitle="Distance"
              footerValue={`${distance} km`}
              iconImageSource={require('../../../assets/icons/info.png')}
              style={{backgroundColor: '#33495F'}}
              onPress={() => {}}
            />
          </View>
        )
      )}
    </View>
  );
};

export default Itineraire;

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
