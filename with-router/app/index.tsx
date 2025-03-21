import { Text, View } from 'react-native';
import { Link } from 'expo-router';

export default function HomeScreen() {
    return (
        <View>
            <Text>Home Screen</Text>
            <Link href="/settings?userId=123">Go to Settings</Link>
        </View>
    );
}