import React from 'react';
import { View, StyleSheet, Dimensions, Platform } from 'react-native';

const { width } = Dimensions.get('window');

export default function RowLayoutScreen() {
    return (
        <View style={styles.container}>
            <View style={[styles.box, { backgroundColor: 'red' }]} />
            <View style={[styles.box, { backgroundColor: 'green' }]} />
            <View style={[styles.box, { backgroundColor: 'blue' }]} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
    },
    box: {
        width: width * 0.15,
        height: width * 0.15,
        margin: Platform.select({ ios: 10, android: 5}),
    },
});