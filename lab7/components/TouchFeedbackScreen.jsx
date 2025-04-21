import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, TouchableHighlight, Pressable, View, Alert } from 'react-native';

const TouchFeedbackScreen = () => {
    const [pressableState, setPressableState] = useState('Default Text');

    const handlePress = () => {
        Alert.alert('Button Pressed!');
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.buttonOpacity} onPress={handlePress}>
                <Text style={styles.buttonText}>Opacity</Text>
            </TouchableOpacity>

            <TouchableHighlight
                style={styles.buttonHighlight}
                onPress={handlePress}
                underlayColor="#dddddd">
                    <Text style={styles.buttonText}>Highlight</Text>
            </TouchableHighlight>

            <Pressable
                style={styles.buttonPressable}
                onPressIn={() => setPressableState('Pressed')}
                onPressOut={() => setPressableState('Default Text')}
                onLongPress={() => {
                setPressableState('Long Pressed');
                Alert.alert('Long Pressed!');
                }}>
                    <Text style={styles.buttonText}>{pressableState}</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonOpacity: {
        backgroundColor: 'lightblue',
        padding: 15,
        borderRadius: 5,
        marginVertical: 10,
    },
    buttonHighlight: {
        backgroundColor: 'lightgreen',
        padding: 15,
        borderRadius: 5,
        marginVertical: 10,
    },
    buttonPressable: {
        backgroundColor: 'lightcoral',
        padding: 15,
        borderRadius: 5,
        marginVertical: 10,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default TouchFeedbackScreen;