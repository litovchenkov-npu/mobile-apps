import React from 'react';
import { View, StyleSheet, Dimensions, Platform } from 'react-native';

const { width } = Dimensions.get('window');

export default function GridLayoutScreen() {
    return (
        <View style={styles.container}>
            {[...Array(8)].map((_, index) => (
                <View key={index} style={[styles.box, { backgroundColor: `hsl(${index * 45}, 100%, 50%)` }]} />
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
    },
    box: {
        width: width * 0.1,
        height: width * 0.1,
        margin: Platform.select({ ios: 8, android: 4 }),
    },
});