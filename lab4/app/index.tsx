import { RootStackParamList } from './types';
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '@/components/Home';
import Details from '@/components/Details';
import Profile from '@/components/Profile';
import { Button } from 'react-native';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
    return (
        <>
            {/* <Drawer.Navigator>
                <Drawer.Screen name="Home" component={Home} />
                <Drawer.Screen name="Profile" component={Profile} />
            </Drawer.Navigator> */}

            <Stack.Navigator>
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen
                    name="Details"
                    component={Details}
                    options={{
                        title: 'Details Page',
                        headerRight: () => <Button title="Info" onPress={() => alert('More info')} />
                    }}
                />
                <Stack.Screen name="Profile" component={Profile} />
            </Stack.Navigator>
        </>
    );
}