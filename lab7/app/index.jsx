import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TouchFeedbackScreen from '../components/TouchFeedbackScreen';
import ScrollExampleScreen from '../components/ScrollExampleScreen';
import SwipeListScreen from '../components/SwipeListScreen';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const Stack = createStackNavigator();

const HomeScreen = ({ navigation }) => (
    <View style={styles.homeContainer}>
        <TouchableOpacity
        style={styles.homeButton}
        onPress={() => navigation.navigate('TouchFeedback')}>
            <Text style={styles.homeButtonText}>Touch Feedback</Text>
        </TouchableOpacity>

        <TouchableOpacity
        style={styles.homeButton}
        onPress={() => navigation.navigate('ScrollExample')}>
            <Text style={styles.homeButtonText}>Scroll Example</Text>
        </TouchableOpacity>

        <TouchableOpacity
        style={styles.homeButton}
        onPress={() => navigation.navigate('SwipeList')}>
            <Text style={styles.homeButtonText}>Swipeable Items</Text>
        </TouchableOpacity>
    </View>
);

const styles = StyleSheet.create({
    homeContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    homeButton: {
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 5,
        marginVertical: 10,
        width: '80%',
        alignItems: 'center',
    },
    homeButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

const Index = () => {
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Touch Gestures Demo' }} />
            <Stack.Screen name="TouchFeedback" component={TouchFeedbackScreen} options={{ title: 'Touch Feedback' }} />
            <Stack.Screen name="ScrollExample" component={ScrollExampleScreen} options={{ title: 'Scroll Example' }} />
            <Stack.Screen name="SwipeList" component={SwipeListScreen} options={{ title: 'Swipeable Items' }} />
        </Stack.Navigator>
    );
};

export default Index;