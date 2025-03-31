import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker, Polygon } from 'react-native-maps';

const LocationScreen = () => {
const [location, setLocation] = useState<Location.LocationObjectCoords | null>(null);
const [errorMsg, setErrorMsg] = useState<string | null>(null);

useEffect(() => {
    (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Location permission denied');
            return;
        }

        let currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation.coords);
    })();
}, []);

const userRegion = location
    ? { latitude: location.latitude, longitude: location.longitude, latitudeDelta: 0.05, longitudeDelta: 0.05 }
    : { latitude: 50.4501, longitude: 30.5234, latitudeDelta: 0.05, longitudeDelta: 0.05 }; // Default to Kyiv

const hardcodedMarker = { latitude: 50.4501, longitude: 30.5234 }; // Kyiv
const polygonCoordinates = [
    { latitude: 50.4501, longitude: 30.5234 }, // Kyiv
    { latitude: 49.8397, longitude: 24.0297 }, // Lviv
    { latitude: 48.9226, longitude: 24.7111 }, // Ivano-Frankivsk
    { latitude: 50.4501, longitude: 30.5234 }, // Back to Kyiv
];

return (
    <View style={styles.container}>
    {errorMsg ? (
        <Text style={styles.error}>{errorMsg}</Text>
    ) : location ? (
        <Text style={styles.text}>Latitude: {location.latitude}, Longitude: {location.longitude}</Text>
    ) : (
        <Text style={styles.text}>Fetching location...</Text>
    )}
    <MapView
        style={styles.map}
        initialRegion={userRegion}
        showsUserLocation
        followsUserLocation
    >
        {location && (
        <Marker
            coordinate={{ latitude: location.latitude, longitude: location.longitude }}
            title="You"
            description="Your current location"
        />)}

        <Marker
            coordinate={hardcodedMarker}
            title="NYC"
            description="Hardcoded Marker"
        />
        
        <Polygon coordinates={polygonCoordinates} strokeColor="red" fillColor="rgba(255,0,0,0.3)" />
    </MapView>
    </View>
);
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, width: '100%' },
    text: { textAlign: 'center', margin: 10, fontSize: 16 },
    error: { color: 'red', textAlign: 'center', margin: 10, fontSize: 16 },
    map: { flex: 1 },
});

export default LocationScreen;