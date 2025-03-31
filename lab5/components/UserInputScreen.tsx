import React, { useState } from 'react';
import { View, TextInput, Button, Switch, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

const UserInputScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isAirplaneMode, setAirplaneMode] = useState(false);
    const [isWiFiOn, setWiFiOn] = useState(false);
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);

    const handleSubmit = () => {
        alert(`Username: ${username}\nPassword: ${password}`);
    };

    const handleDateChange = (event: any, selectedDate: any) => {
        setShowDatePicker(false);
        setSelectedDate(selectedDate || new Date());
    };

    return (
        <View style={{ width: '100%', padding: 20 }}>
        <TextInput
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            style={{ borderBottomWidth: 1, marginBottom: 10 }}
        />
        <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={{ borderBottomWidth: 1, marginBottom: 10 }}
        />
        <Button title="Submit" onPress={handleSubmit} />
        <Text>Username: {username}</Text>
        
        <Text>Airplane Mode</Text>
        <Switch
            value={isAirplaneMode}
            onValueChange={(value) => setAirplaneMode(value)}
        />
        <Text>Wi-Fi</Text>
        <Switch
            value={isWiFiOn}
            onValueChange={(value) => setWiFiOn(value)}
            disabled={isAirplaneMode}
        />
        
        <Text>Select a Clothing Size</Text>
        <Picker
            selectedValue={selectedSize}
            onValueChange={(itemValue) => setSelectedSize(itemValue)}
            style={{ height: 50, width: 150 }}>
            <Picker.Item label="S" value="S" />
            <Picker.Item label="M" value="M" />
            <Picker.Item label="L" value="L" />
            <Picker.Item label="XL" value="XL" />
        </Picker>
        <Text>Selected Size: {selectedSize}</Text>

        <Button title="Select Date" onPress={() => setShowDatePicker(true)} />
        
        {showDatePicker && (
            <DateTimePicker
            value={selectedDate}
            mode="date"
            display="default"
            onChange={handleDateChange}
            />
        )}
        <Text>Selected Date: {selectedDate.toLocaleDateString()}</Text>
        </View>
    );
};

export default UserInputScreen;