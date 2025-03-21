import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, Text, Button, StatusBar } from 'react-native';
import { RootStackParamList } from "@/app/types";

type Props = NativeStackScreenProps<RootStackParamList>;

export default function Profile({ navigation }: Props) {
    return(
        <View>
            <StatusBar barStyle={'dark-content'} />
            <Text>Profile</Text>
            <Text>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea, reiciendis officia! Quaerat exercitationem repellat, dolore aut iste sit voluptates perspiciatis sapiente? Error excepturi praesentium nulla repellendus ullam cupiditate voluptate ut?</Text>
            <Button
                title="Home"
                onPress={() => navigation.navigate("Home")}
            />
        </View>
    )
}