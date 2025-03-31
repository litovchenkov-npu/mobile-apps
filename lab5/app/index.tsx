import ItemList from "@/components/ItemList";
import LocationScreen from "@/components/LocationScreen";
import UserInputScreen from "@/components/UserInputScreen";
import { View } from "react-native";

export default function Index() {
    return (
        <View
        style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        }}
        >
        <ItemList />
        <LocationScreen />
        <UserInputScreen />
        </View>
    );
}