import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import MapLibreGL from '@maplibre/maplibre-react-native'
import Geolocation from '@react-native-community/geolocation'
import { config } from '../../constants/config'
import { TextInput } from 'react-native-paper'
import { COLORS } from '../../constants/theme'

const api_key = config.app.STADIA_API_KEY;
const styleUrl = `https://tiles.stadiamaps.com/styles/alidade_smooth.json?api_key=${api_key}`
const TurnByTurn = () => {
    const [currentPosition, setCurrentPosition] = useState(null)
    const [routeCoordinates, setRouteCoordinates] = useState([])
    const [instructions, setInstructions] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    const [suggestions, setSuggestions] = useState([])


    useEffect(() => {
        Geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords
                setCurrentPosition([longitude, latitude])
            },
            error => { console.log("Error getting current position", error) },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    }, [])

    useEffect(() => {
        if (searchQuery) {
            const url = `https://api.stadiamaps.com/geocoding/v1/autocomplete?text=${encodeURIComponent(
                searchQuery,
            )}&api_key=${api_key}`;

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    if (data?.features) {
                        setSuggestions(data?.features)
                    }
                }).catch((err) => console.log("Error autocomplete search", err))
        } else {
            setSuggestions([]);
        }
    }, [searchQuery])

    const parseRouteCoordinates = (routeCoords) => {
        return routeCoords.split(';').map(coord => {
            const [lon, lat] = coord.split(',').map(parseFloat);
            return [lon, lat];
        });
    }

    const getRouteCoordinates = (origin, destination) => {
        const url = `https://api.stadiamaps.com/route/v1`;
        const requestOptions = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                locations: [
                    {
                        "lon": origin[0],
                        "lat": origin[1],
                        "type": "break"
                    },
                    {
                        "lon": destination[0],
                        "lat": destination[1],
                        "type": "break"
                    },
                ],
                "costing": "auto",
                "costing_options": {
                    "auto": {
                        "use_tolls": 1,
                        "use_highways": 0
                    }
                },
                "directions_options": {
                    "units": "miles"
                }
            })
        }

        fetch(`${url}?api_key=${api_key}`, requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data?.trip && data?.trip?.legs && data?.trip?.legs[0] && data?.trip?.legs[0]?.maneuvers) {
                    const routeCoords = data?.trip?.legs[0]?.shape;
                    const parsedRoutCoords = parseRouteCoordinates(routeCoords);
                    setRouteCoordinates(parsedRoutCoords);

                    const maneuvres = data?.trip?.legs[0]?.maneuvers;
                    const parsedInstructions = maneuvres?.map((m) => {
                        console.log("maneuvre ==> ", m?.instruction)
                        return m?.instruction;
                    });
                    setInstructions(parsedInstructions);
                } else {
                    console.error('Invalid API Response route', data?.trip?.legs[0])
                }
            }).catch(err => console.error("Error fetch route coodinates", err))
    }

    const updateRouteInstructions = () => {
        if (currentPosition && routeCoordinates?.length > 1) {
            const [lon, lat] = currentPosition;
            const url = `https://api.stadiamaps.com/route/v1`
            const requestOptions = {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    locations: [
                        {
                            "lon": lon,
                            "lat": lat,
                            "type": "break"
                        },
                        {
                            "lon": routeCoordinates[routeCoordinates?.length - 1][0],
                            "lat": routeCoordinates[routeCoordinates?.length - 1][1],
                            "type": "break"
                        },
                    ],
                    "costing": "auto",
                    "costing_options": {
                        "auto": {
                            "use_tolls": 1,
                            "use_highways": 0
                        }
                    },
                    "directions_options": {
                        "units": "miles"
                    }
                })
            };

            fetch(`${url}?api_key=${api_key}`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    if (data?.trip && data?.trip?.legs && data?.trip?.legs[0] && data?.trip?.legs[0]?.maneuvers) {
                        const maneuvres = data?.trip?.legs[0]?.maneuvers;
                        console.groupEnd("instructions ==> ", data?.trip?.legs[0])
                        const parsedInstructions = maneuvres?.map((m) => {
                            return m?.instructions;
                        });
                        setInstructions(parsedInstructions)
                    } else {
                        console.error("Invalid API response instructions", data)
                    }
                }).catch(err => console.error("error fetching route instructions", err))
        }
    };

    useEffect(() => {
        const intervalId = setInterval(updateRouteInstructions, 10000);
        return () => clearInterval(intervalId)
    }, [currentPosition, routeCoordinates])

    const handlePlaceSelect = (selectedPlace) => {
        const startCoords = currentPosition;
        const endCoords = selectedPlace?.geometry?.coordinates;

        getRouteCoordinates(startCoords, endCoords)

        setSuggestions([])
    }
    return (
        <View style={styles.page}>
            <MapLibreGL.MapView style={styles.map}
                styleURL={styleUrl}>
                {
                    currentPosition && (
                        <MapLibreGL.Camera
                            zoomLevel={5}
                            pitch={50}
                            centerCoordinate={currentPosition}
                        />
                    )
                }
                {currentPosition && (
                    <MapLibreGL.PointAnnotation
                        id='currentPosition'
                        coordinate={currentPosition} />
                )}
            </MapLibreGL.MapView>

            {/* Suggestions */}
            <View style={styles.suggestions}>
                <TextInput
                    style={styles.searchinput}
                    placeholder='Search a place.'
                    onChangeText={text => setSearchQuery(text)}
                    value={searchQuery}
                />
                <FlatList
                    data={suggestions}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.suggestionItem}
                            onPress={() => handlePlaceSelect(item)}
                        >
                            <Text>{item?.properties?.label}</Text>
                        </TouchableOpacity>
                    )}
                    keyExtractor={item => item?.properties?.id}
                />
            </View>
            <View style={styles.cardContainer}>
                <FlatList
                    style={styles.instructionContainer}
                    data={instructions}
                    renderItem={({ item }) => (
                        <Text style={styles.instruction}>
                            {item}
                        </Text>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        </View>
    )
}

export default TurnByTurn

const styles = StyleSheet.create({
    page: {
        flex: 1
    },
    map: {
        flex: 1
    },
    suggestions: {
        position: 'absolute',
        top: 20,
        left: 20,
        right: 20,
        backgroundColor: COLORS.white,
        borderRadius: 8,
        paddingHorizontal: 10,
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3
    },
    searchinput: {
        height: 40,
        backgroundColor: COLORS.white,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 10,
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3
    },
    suggestionItem: {
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc'
    },
    cardContainer: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        backgroundColor: 'rgba(255,2555,255,0.8)',
        padding: 10,
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3
    },
    instructionContainer: {
        flexGrow: 1,
        maxHeight: 200,
    },
    instruction: {
        fontSize: 16,
        padding: 10,
        color: COLORS.black
    }
})
