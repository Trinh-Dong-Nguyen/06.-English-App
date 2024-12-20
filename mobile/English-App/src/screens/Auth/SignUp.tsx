import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { CheckBox, Button } from "@rneui/themed";
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
  // firstName: Yup.string().required("First name is required"),
  // lastName: Yup.string().required("Last name is required"),
  // birthDate: Yup.date().required("Birth date is required"),
  email: Yup.string().email().required("Email is required"),
  // phone: Yup.string().required("Phone number is required"),
  // password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, 1 special character, and be at least 8 characters long.
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Passwords must match")
    .required("Confirm password is required"),
  // schoolName: Yup.string().required("School name is required"),
});

const SignUp = () => {
  const [isSelected, setSelection] = useState(false);
  const handleCheckBox = () => {
    setSelection(!isSelected);
    console.log(isSelected);
  };
  const loginNav = useNavigation<LoginScreenNavigationProp>();
  const otpVerifyNav = useNavigation<OTPVerificationScreenNavigationProp>();

  const handleSignUp = async (values: any) => {
    console.log(values);
    if (!isSelected) {
      alert("Please accept the Terms & Conditions");
      return;
    }
    if (values.password !== values.confirmPassword) {
      console.error("Passwords do not match");
      return;
    }
    try {
      const res = await authService.signUp({
        username: values.username,
        // firstName: values.firstName,
        // lastName: values.lastName,
        // birthDate: values.birthDate,
        email: values.email,
        // phone: values.phone,
        password: values.password,
        role: "STUDENT",
        // schoolName: values.schoolName,
      });
      console.log(res);
      if (res.statusCode === 201) {
        otpVerifyNav.navigate("OTPVerification", {
          username: values.username,
          isConfirmSignUp: true,
        });
      } else {
        // console.error(res);
        Alert.alert(res.message);
      }
    } catch (err) {
      // console.error(err);
      Alert.alert("An error occurred.");
    }
  };
  return (
    <ImageBackground
      source={require("../../../assets/signupbg.png")}
      style={{ width: "100%", height: "100%" }}
    >
      <View className="flex gap-1 mt-[80px] items-center">
        <Image
          source={require("../../../assets/avatar.png")}
          className="w-[100px] h-[105px]"
        />
        <Text className="text-[38px] font-semibold text-[#5D5FEF]">
          Create an account
        </Text>
        <View className="flex flex-row">
          {/* <TouchableOpacity>
            <Image
              source={require("../../../assets/google.png")}
              className="w-[40px] h-[40px] mr-12"
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={require("../../../assets/facebook.png")}
              className="w-[40px] h-[40px]"
            />
          </TouchableOpacity> */}
        </View>

        <Formik
          initialValues={{
            username: "",
            // firstName: "",
            // lastName: "",
            // birthDate: new Date(),
            email: "",
            // phone: "",
            password: "",
            confirmPassword: "",
            // schoolName: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log("Form submitted", values);
            // Call signUp API
            // if successful navigate to OTPVerification screen
            otpVerifyNav.navigate("OTPVerification", {
              username: values.username,
              isConfirmSignUp: true,
            });
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            //setFieldValue,
            values,
            errors,
            touched,
          }) => (
            <View className="flex gap-y-2 mt-2 mx-auto">
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
              <TextInput
                placeholder="Email"
                className="border-2 border-[#EF5DA8] w-[280] h-10 rounded-[10px] items-center px-4"
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
              />
              {errors.email && touched.email && (
                <Text style={{ color: "red" }}>{errors.email}</Text>
              )}

              <TextInput
                placeholder="Password"
                className="border-2 border-[#EF5DA8] w-[280] h-10 rounded-[10px] items-center px-4"
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                secureTextEntry
              />
              {errors.password && touched.password && (
                <Text style={{ color: "red" }}>{errors.password}</Text>
              )}

              <TextInput
                placeholder="Confirm password"
                className="border-2 border-[#EF5DA8] w-[280] h-10 rounded-[10px] items-center px-4"
                onChangeText={handleChange("confirmPassword")}
                onBlur={handleBlur("confirmPassword")}
                value={values.confirmPassword}
                secureTextEntry
              />
              {errors.confirmPassword && touched.confirmPassword && (
                <Text style={{ color: "red" }}>{errors.confirmPassword}</Text>
              )}

              {/* <CheckBox
                center
                title={
                  <Text style={{ color: "black" }}>
                    I agree to the{" "}
                    <Text
                      style={{
                        color: "#EF5DA8",
                        textDecorationLine: "underline",
                      }}
                      onPress={() => console.log("Terms & Conditions pressed")}
                    >
                      Terms & Conditions
                    </Text>
                  </Text>
                }
                checked={isSelected}
                onPress={handleCheckBox}
                containerStyle={{
                  backgroundColor: "transparent",
                  borderWidth: 0,
                }}
              /> */}
              <Button
                title={"Sign Up"}
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
                  handleSignUp(values);
                }}
              />
            </View>
          )}
        </Formik>
        <Text>
          Already have an account?{" "}
          <Text
            style={{ color: "#EF5DA8", textDecorationLine: "underline" }}
            onPress={() => {
              loginNav.navigate("Login");
            }}
          >
            Login
          </Text>{" "}
        </Text>
      </View>
    </ImageBackground>
  );
};

export default SignUp;
