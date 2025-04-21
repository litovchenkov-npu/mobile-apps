import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, ScrollView, View, RefreshControl } from 'react-native';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

const ScrollExampleScreen = () => {
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);

    const items = Array.from({ length: 12 }, (_, index) => `Item ${index + 1}`);

    return (
        <ScrollView
        style={styles.container}
        refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {items.map((item, index) => (
            <View key={index} style={styles.item}>
            <Text style={styles.itemText}>{item}</Text>
            </View>
        ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 20,
    },
    item: {
        backgroundColor: '#f0f0f0',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 5,
    },
    itemText: {
        fontSize: 16,
    },
});

export default ScrollExampleScreen;