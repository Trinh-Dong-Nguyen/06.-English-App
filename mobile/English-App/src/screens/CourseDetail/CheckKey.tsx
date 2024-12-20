import { View, Text, StyleSheet, Modal,Image } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-paper'
import { Button } from '@rneui/themed'
import purchaseservice from '../../services/purchase.service'
import { useNavigation, useRoute, } from '@react-navigation/native'
import { CheckKeyScreenRouteProp, } from '../../type'
import Spinner from 'react-native-loading-spinner-overlay';
const CheckKey = () => {
    const [loading, setLoading] = useState(false);
    const toggleLoading = () => {
        setLoading(!loading);
    };
    const route = useRoute<CheckKeyScreenRouteProp>();
    const { courseBuyingId } = route.params;

    const [key, setKey] = useState<string>('');
    const nav = useNavigation();
    const checkKey = async () => {
        toggleLoading();
        const res = await purchaseservice.activeCourse(courseBuyingId, key);
        console.log(res);
        if (res) {
            if (res.data.active === true) {
                setIsPopupVisible(true); // Show the popup
                setLoading(false);
                // Delay the navigation to ensure the popup is visible
                setTimeout(() => {
                    nav.navigate('learning');
                }, 1000); // Adjust this delay as needed
            } else {
                setTimeout(() => {
                    setIsPopupVisible2(true); // Show the second popup after 3 seconds
                }, 3000);
                setLoading(false);
            }
        }
    }

    const onChangeText = (text: string) => {
        setKey(text);
    }

    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [isPopupVisible2, setIsPopupVisible2] = useState(false);
    return (
        <View className="px-3 h-full pt-10">
            <Spinner
                visible={loading}
                textContent={'Loading...'}
                textStyle={styles.spinnerTextStyle}
            />
            <Modal
                transparent={true}
                animationType="slide"
                visible={isPopupVisible}
            >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <View style={{ padding: 20, backgroundColor: 'white', borderRadius: 10 }}>
                        <Image source={require('../../../assets/pay_success.png')} />
                        <Text>Purchase Successful!</Text>
                    </View>
                </View>
            </Modal>

            <Modal
                transparent={true}
                animationType="slide"
                visible={isPopupVisible2}
            >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <View style={{ padding: 20, backgroundColor: 'white', borderRadius: 10 }}>
                        <Image source={require('../../../assets/pay_failed.png')} />
                        <Text>Purchase Successful!</Text>
                    </View>
                </View>
            </Modal>
            {/* Centered View */}
            <View className="items-center">
                <Text>OTP code was sent in your email</Text>
                <TextInput
                    label="OTP code"
                    value={key}
                    onChangeText={onChangeText}
                    style={{ width: 300 }}
                />
                <Button onPress={checkKey} containerStyle={{
                    backgroundColor: '#FF6347',
                    width: 300,
                    marginTop: 10
                }}>Check</Button>
            </View>
        </View>

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    spinnerTextStyle: {
        color: '#FFF',
    },
});
export default CheckKey