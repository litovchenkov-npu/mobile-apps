import React, { useState } from 'react';
import { StyleSheet, View, FlatList, Dimensions } from 'react-native';
import SwipeableItem from './SwipeableItem';

const { width: screenWidth } = Dimensions.get('window');
const ITEM_WIDTH = screenWidth * 0.8;

const SwipeListScreen = () => {
    const [items, setItems] = useState(
        Array.from({ length: 7 }, (_, index) => ({ id: String(index + 1), text: `Item ${index + 1}` }))
    );

    const handleSwipe = (id) => {
        setItems(prevItems => prevItems.filter(item => item.id !== id));
    };

    const renderItem = ({ item }) => (
        <SwipeableItem text={item.text} onSwipe={() => handleSwipe(item.id)} itemWidth={ITEM_WIDTH} />
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={items}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.listContent}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
    },
    listContent: {
        paddingBottom: 20,
    },
});

export default SwipeListScreen;