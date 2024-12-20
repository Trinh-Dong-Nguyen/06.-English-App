import {
  View,
  Text,
  ImageBackground,
  Image,
  TextInput,
  Alert,
} from "react-native";
import React from "react";
import { Button } from "@rneui/themed";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";
import {
  LoginScreenNavigationProp,
  OTPVerificationScreenNavigationProp,
} from "../../type";
import authService from "../../services/auth.service";

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
});

const ForgotPassword = () => {
  const loginNav = useNavigation<LoginScreenNavigationProp>();
  const otpVerifyNav = useNavigation<OTPVerificationScreenNavigationProp>();
  const handleForgotPassword = async (values: any) => {
    try {
      const res = await authService.forgotPassword(values);
      if (res.statusCode === 201) {
        otpVerifyNav.navigate("OTPVerification", {
          username: values.username,
          isConfirmSignUp: false,
        });
      } else {
        // console.error(res.message);
        Alert.alert("Failed to reset password", res.message);
      }
    } catch (err) {
      // console.error(err);
      Alert.alert("Failed to reset password", "An error occurred.");
    }
  };
  return (
    <ImageBackground
      source={require("../../../assets/signupbg.png")}
      style={{ width: "100%", height: "100%" }}
    >
      <View className="flex gap-3 mt-[40px] items-center">
        <Image
          source={require("../../../assets/avatar.png")}
          className="w-[100px] h-[110px]"
        />
        <Text className="text-[38px] font-semibold text-[#5D5FEF]">
          Forgot password?
        </Text>
        <Text className="text-[16px] text-gray-500">
          Enter your username below to reset
        </Text>
        <Formik
          initialValues={{
            username: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View className="flex gap-y-2 mt-3 mx-auto">
              <TextInput
                placeholder="Username"
                className="border-2 border-[#EF5DA8] w-[280] h-10 rounded-[10px] items-center px-4"
                onChangeText={handleChange("username")}
                onBlur={handleBlur("username")}
                value={values.username}
              />
              {errors.username && touched.username && (
                <Text style={{ color: "red" }}>{errors.username}</Text>
              )}
              <View className="h-2"></View>

              <Button
                title={"Continue"}
                containerStyle={{
                  display: "flex",
                  alignItems: "center",
                }}
                buttonStyle={{
                  backgroundColor: "#EF5DA8",
                  borderRadius: 12,
                  width: 150,
                }}
                onPress={() => {
                  handleForgotPassword(values);
                }}
              />
            </View>
          )}
        </Formik>
        <Text>
          Back to{" "}
          <Text
            style={{ color: "#EF5DA8", textDecorationLine: "underline" }}
            onPress={() => loginNav.navigate("Login")}
          >
            Login
          </Text>{" "}
        </Text>
      </View>
    </ImageBackground>
  );
};

export default ForgotPassword;
