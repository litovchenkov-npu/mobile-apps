import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, Text, Button, StatusBar } from 'react-native';
import { RootStackParamList } from "@/app/types";
import { RouteProp, useRoute } from "@react-navigation/native";

type Props = NativeStackScreenProps<RootStackParamList>;

export default function Details({ navigation }: Props) {
    const route = useRoute<RouteProp<RootStackParamList, 'Details'>>();
    const { itemId, title } = route.params;

    return(
        <View>
            <StatusBar barStyle={'dark-content'} />
            <Text>Details</Text>
            <Text>Item ID: {itemId}</Text>
            <Text>Title: {title}</Text>
            <Button
                title="Profile"
                onPress={() => navigation.navigate("Profile")}
            />
        </View>
    );
}