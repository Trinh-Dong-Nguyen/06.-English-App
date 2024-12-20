import { useNavigation, useRoute } from "@react-navigation/native";
import { Button } from "@rneui/themed";
import React, { useState } from "react";
import { Alert, Image, Modal, StyleSheet, Text, TextInput, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import Spinner from 'react-native-loading-spinner-overlay';
import purchaseservice from "../../services/purchase.service";
import { CheckKeyScreenNavigationProp, PayMentScreenRouteProp } from "../../type";
export default function PayWithBank() {
  const route = useRoute<PayMentScreenRouteProp>();
  const { courseID, coursePrice } = route.params;
  const nav = useNavigation<CheckKeyScreenNavigationProp>();
  const handleBuyCourse = async () => {
    try {
      setLoading(true);
      const res = await purchaseservice.buyCourse(courseID);
      console.log(res);
      if (res) {
        if (res.statusCode === 201) {
          Alert.alert("Success", "Purchase successful. Please register key that was sent to your email");
          setTimeout(() => {
            nav.navigate("Validation", { courseBuyingId: res.data.courseBuying });
          }, 1000);
        } else if (res.statusCode === 500) {
          Alert.alert("Failed", "Course is already owned by user");
        }
      }
      setLoading(false);
    } catch (error) {
      Alert.alert("Failed", String(error));
    }
  }
  //Spinner
  const [loading, setLoading] = useState(false);
  return (
    <View className="w-full h-full">
      <Spinner
        visible={loading}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
      />
      <View className="h-full mt-[50px] mx-[16px] flex flex-col justify-around items-center">
        <Text className="text-[64px] text-blue1">{new Intl.NumberFormat('de-DE').format(coursePrice)}đ</Text>
        <View className="form w-full flex gap-4">
          <View className="flex flex-col flex-wrap gap-1">
            <Text className="text-lg font-semibold">Card Information</Text>
            <TextInput
              placeholder="Card Number"
              style={{
                width: "100%",
                borderWidth: 1,
                borderColor: "#5D5FEF",
                borderRadius: 5,
                padding: 5,
                fontSize: 20,
              }}
            />
          </View>
          <View className="flex flex-col flex-wrap gap-1">
            <Text className="text-lg font-semibold">Bank</Text>
            <Dropdown
              data={[
                { label: "Vietcombank" },
                { label: "Techcombank" },
                { label: "Vietinbank" },
              ]}
              labelField={"label"}
              valueField={"label"}
              value="Vietcombank"
              onChange={(value) => console.log(value)}
              style={{
                width: "100%",
                borderWidth: 1,
                borderColor: "#5D5FEF",
                borderRadius: 5,
                padding: 5,
              }}
              selectedTextStyle={{
                fontSize: 20,
              }}
            />
          </View>
          <View className="flex flex-col flex-wrap gap-1">
            <Text className="text-lg font-semibold">Country or region</Text>
            <Dropdown
              data={[
                {
                  label: "Vietnam",
                  value: "Vietnam",
                },
                {
                  label: "USA",

                  value: "USA",
                },
              ]}
              labelField={"label"}
              valueField={"value"}
              onChange={(value) => console.log(value)}
              style={{
                width: "100%",
                borderWidth: 1,
                borderColor: "#5D5FEF",
                borderRadius: 5,
                padding: 5,
              }}
              selectedTextStyle={{
                fontSize: 20,
              }}
              value={"Vietnam"}
            />
          </View>
          <View className="flex flex-col flex-wrap gap-1">
            <Text className="text-lg font-semibold">OTP</Text>
            <TextInput
              placeholder="6-digit code"
              style={{
                width: "100%",
                borderWidth: 1,
                borderColor: "#5D5FEF",
                borderRadius: 5,
                padding: 5,
                fontSize: 20,
              }}
            />
          </View>
        </View>
        <Button
          title="Pay"
          buttonStyle={{
            borderRadius: 30,
            width: 120,
            height: 50,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#5D5FEF",
          }}
          titleProps={{
            style: {
              fontSize: 24,
              color: "white",
            },
          }}
          onPress={() => {
            handleBuyCourse();
          }}
        />
      </View>
    </View>
  );
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