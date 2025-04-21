import React, { useRef } from 'react';
import { StyleSheet, Text, View, ScrollView, Animated } from 'react-native';

const SwipeableItem = ({ text, onSwipe, itemWidth }) => {
const scrollViewRef = useRef(null);
const scrollX = useRef(new Animated.Value(0)).current;
const swipeThreshold = itemWidth / 2;

const handleScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    scrollX.setValue(offsetX);

    if (offsetX > swipeThreshold) {
        onSwipe();
        scrollViewRef.current?.scrollTo({ x: 0, animated: false });
    }
};

const handleScrollEndDrag = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    if (offsetX <= swipeThreshold) {
        scrollViewRef.current?.scrollTo({ x: 0, animated: true });
    }
};

return (
    <View style={styles.swipeableContainer}>
    <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={handleScroll}
        onScrollEndDrag={handleScrollEndDrag}
        snapToInterval={itemWidth}
        decelerationRate="fast">

        <View style={[styles.item, { width: itemWidth }]}>
            <Text style={styles.itemText}>{text}</Text>
        </View>
        <View style={{ width: itemWidth }} />
    </ScrollView>
    </View>
);
};

const styles = StyleSheet.create({
    swipeableContainer: {
        overflow: 'hidden',
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 5,
    },
    scrollView: {
        flexDirection: 'row',
    },
    item: {
        backgroundColor: 'orange',
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
});

export default SwipeableItem;