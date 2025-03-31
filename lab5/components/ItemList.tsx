import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, RefreshControl, Switch, StyleSheet } from 'react-native';
import uuid from 'react-native-uuid';

const initialItems = Array.from({ length: 10 }, (_, i) => ({
    id: String(i + 1),
    name: `Item ${i + 1}`,
    price: Math.floor(Math.random() * 100) + 1,
}));

const ItemList = () => {
    const [items, setItems] = useState(initialItems);
    const [searchQuery, setSearchQuery] = useState('');
    const [ascending, setAscending] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const handleDelete = (id: string) => {
        setItems((prevItems) => prevItems.filter(item => item.id !== id));
    };

    const handleSearch = (text: string) => {
        setSearchQuery(text);
    };

    const toggleSort = () => {
        setAscending(!ascending);
    };

    const filteredItems = items
        .filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
        .sort((a, b) => ascending ? a.price - b.price : b.price - a.price);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setItems(initialItems);
            setRefreshing(false);
        }, 1000);
    }, []);

    const loadMoreItems = () => {
        const newItems = Array.from({ length: 5 }, () => ({
            id: uuid.v4(),
            name: `Item ${Math.floor(Math.random() * 1000)}`,
            price: Math.floor(Math.random() * 100) + 1,
        }));
        setItems(prevItems => [...prevItems, ...newItems]);
    };

    return (
        <View style={styles.container}>
        <TextInput
            style={styles.input}
            placeholder="Search items..."
            value={searchQuery}
            onChangeText={handleSearch}
        />
        <View style={styles.toggleContainer}>
            <Text>Sort by Price:</Text>
            <Switch value={ascending} onValueChange={toggleSort} />
        </View>
        {filteredItems.length === 0 ? (
            <Text style={styles.noItems}>No items found</Text>
        ) : (
            <FlatList
            data={filteredItems}
            keyExtractor={(item) => item.id}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            onEndReached={loadMoreItems}
            onEndReachedThreshold={0.5}
            renderItem={({ item }) => (
                <View style={styles.item}>
                <Text>{item.name} - ${item.price}</Text>
                <TouchableOpacity onPress={() => handleDelete(item.id)}>
                    <Text style={styles.delete}>X</Text>
                </TouchableOpacity>
                </View>
            )}/>
        )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, width: '100%' },
    input: { borderWidth: 1, padding: 8, marginBottom: 10 },
    toggleContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
    item: { flexDirection: 'row', justifyContent: 'space-between', padding: 10, borderBottomWidth: 1 },
    delete: { color: 'red', fontWeight: 'bold' },
    noItems: { textAlign: 'center', marginTop: 20, fontSize: 16 },
});

export default ItemList;