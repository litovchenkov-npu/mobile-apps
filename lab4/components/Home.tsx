import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, Text, Button, StatusBar } from 'react-native';
import { RootStackParamList } from "@/app/types";

type Props = NativeStackScreenProps<RootStackParamList>;

export default function Home({ navigation }: Props) {
    return(
        <View>
            <StatusBar barStyle={'dark-content'} />
            <Text>Home screen</Text>
            <Button
                title="Details"
                onPress={() => navigation.navigate('Details', { itemId: 42, title: 'Sample Item' })}
            />
        </View>
    )
}