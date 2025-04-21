import React, { useState } from 'react';
import { View, Text, Button, Modal, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import Toast from 'react-native-toast-message';

export default function Index() {
    const [confirmVisible, setConfirmVisible] = useState(false);
    const [errorVisible, setErrorVisible] = useState(false);
    const [loadingVisible, setLoadingVisible] = useState(false);

    const showToast = () => {
        Toast.show({
            type: 'info',
            text1: 'Something happened!',
            visibilityTime: 2000,
        });
    };

    const handleFetchData = () => {
        setLoadingVisible(true);
        setTimeout(() => {
            setLoadingVisible(false);
        }, 3000);
    };

    return (
        <View style={styles.container}>
            <Button title="Confirm Action" onPress={() => setConfirmVisible(true)} />
            <Button title="Show Error" onPress={() => setErrorVisible(true)} />
            <Button title="Toast Message" onPress={showToast} />
            <Button title="Fetch Data…" onPress={handleFetchData} />

            <Modal transparent visible={confirmVisible} animationType="fade">
                <View style={styles.modalOverlay}>
                    <View style={styles.modal}>
                        <Text style={styles.modalTitle}>Are you sure?</Text>
                        <View style={styles.modalButtons}>
                            <TouchableOpacity style={styles.btn} onPress={() => setConfirmVisible(false)}>
                                <Text style={styles.btnText}>No</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btn} onPress={() => setConfirmVisible(false)}>
                                <Text style={styles.btnText}>Yes</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal transparent visible={errorVisible} animationType="slide">
                <View style={styles.modalOverlay}>
                    <View style={[styles.modal, { borderColor: 'red', borderWidth: 2 }]}>
                        <Text style={[styles.modalTitle, { color: 'red' }]}>Something went wrong!</Text>
                        <View style={styles.modalButtons}>
                            <TouchableOpacity style={styles.btn} onPress={() => setErrorVisible(false)}>
                                <Text style={styles.btnText}>Ignore it</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btn} onPress={() => setErrorVisible(false)}>
                                <Text style={styles.btnText}>Fix it</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal transparent visible={loadingVisible} animationType="none">
                <View style={styles.modalOverlay}>
                    <View style={styles.loadingModal}>
                        <ActivityIndicator size="large" color="#0000ff" />
                        <Text style={{ marginTop: 10 }}>Loading data...</Text>
                    </View>
                </View>
            </Modal>

            <Toast />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-evenly',
        padding: 20,
        backgroundColor: '#fff',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        width: 300,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        elevation: 10,
        alignItems: 'center',
    },
    loadingModal: {
        width: 200,
        height: 120,
        backgroundColor: 'white',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 10,
    },
    modalTitle: {
        fontSize: 18,
        marginBottom: 20,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    btn: {
        backgroundColor: '#eeeeee',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    btnText: {
        fontSize: 16,
    },
});