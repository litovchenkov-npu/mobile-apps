import { Text, View } from 'react-native';
import { useSearchParams } from 'expo-router/build/hooks';

export default function SettingsScreen() {
    const searchParams = useSearchParams();
    const userId = searchParams.get('userId');

    return (
        <View>
            <Text>Settings Screen</Text>
            <Text>User ID: {userId}</Text>
        </View>
    );
}