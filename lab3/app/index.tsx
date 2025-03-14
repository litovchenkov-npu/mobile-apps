import React, { useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import RowLayoutScreen from '@/components/RowLayoutScreen';
import ColumnLayoutScreen from '@/components/ColumnLayoutScreen';
import GridLayoutScreen from '@/components/GridLayoutScreen';

export default function Index() {
const [layout, setLayout] = useState('row');

const toggleLayout = () => {
    setLayout(prev => (prev === 'row' ? 'column' : prev === 'column' ? 'grid' : 'row'));
};

return (
    <View style={styles.container}>
        {layout === 'row' && <RowLayoutScreen />}
        {layout === 'column' && <ColumnLayoutScreen />}
        {layout === 'grid' && <GridLayoutScreen />}
        <View style={styles.buttonContainer}>
            <Button title="Toggle Layout" onPress={toggleLayout} />
        </View>
    </View>
);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 20,
        alignSelf: 'center',
    },
});