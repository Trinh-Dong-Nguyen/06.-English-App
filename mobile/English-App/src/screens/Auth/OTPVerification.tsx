import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  TextInput,
  Alert,
} from "react-native";
import { Button } from "@rneui/themed";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import {
  AuthCongratsScreenNavigationProp,
  LoginScreenNavigationProp,
  ResetPasswordScreenNavigationProp,
  RootStackParamList,
} from "../../type";
import authService from "../../services/auth.service";

type OTPVerificationRouteProp = RouteProp<
  RootStackParamList,
  "OTPVerification"
>;

const OTPVerification = () => {
  const resetPassNav = useNavigation<ResetPasswordScreenNavigationProp>();
  const loginNav = useNavigation<LoginScreenNavigationProp>();
  const authCongratsNav = useNavigation<AuthCongratsScreenNavigationProp>();
  const route = useRoute<OTPVerificationRouteProp>();
  const { username, isConfirmSignUp } = route.params;
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(TextInput | null)[]>([]);
  const [resendMessage, setResendMessage] = useState("Hello");
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else {
      setResendMessage("");
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleCodeChange = (index: number, value: string) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Move to the next input field if a digit is entered
    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const enteredCode = code.join("");
    console.log(enteredCode);
    if (isConfirmSignUp) {
      try {
        const res = await authService.confirmSignUp({
          username,
          code: enteredCode,
        });
        console.log(res);
        if (res.statusCode === 201) {
          authCongratsNav.navigate("AuthCongrats", { isConfirmSignUp: true });
        } else {
          Alert.alert("Invalid code", "Please enter the correct code");
        }
      } catch (err) {
        // console.error(err);
        Alert.alert("Failed to confirm sign up", "An error occurred");
      }
    } else {
      resetPassNav.navigate("ResetPassword", {
        username,
        confirmationCode: enteredCode,
      });
    }
  };

  const handleResendCode = async () => {
    try {
      let res;
      if (isConfirmSignUp) {
        res = await authService.resendConfirmationCode({ username });
      } else {
        res = await authService.forgotPassword({ username });
      }
      console.log(res);
      if (res.statusCode === 201) {
        setResendMessage("Code has been resent. Please check your email.");
        setCountdown(10);
      } else {
        // console.error("Failed to resend code: ", res.message);
        Alert.alert("Failed to resend code", res.message);
      }
    } catch (err) {
      // console.error(err);
      Alert.alert("Failed to resend code: ", "An error occurred");
    }
  };

  return (
    <ImageBackground
      source={require("../../../assets/signupbg.png")}
      style={{ width: "100%", height: "100%" }}
    >
      <View className="flex gap-3 mt-[80px] items-center">
        <Image
          source={require("../../../assets/avatar.png")}
          className="w-[100px] h-[110px]"
        />
        <Text className="text-[38px] font-semibold text-[#5D5FEF]">
          6-digit code
        </Text>
        <Text className="text-[16px] text-gray-500">
          Enter the code that is sent to your email
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: 280,
          }}
        >
          {code.map((digit, index) => (
            <TextInput
              key={index}
              style={{
                width: 40,
                height: 40,
                borderWidth: 1,
                borderColor: "#EF5DA8",
                borderRadius: 5,
                textAlign: "center",
                fontSize: 18,
              }}
              keyboardType="numeric"
              maxLength={1}
              value={digit}
              onChangeText={(value) => handleCodeChange(index, value)}
              ref={(ref) => (inputRefs.current[index] = ref)}
            />
          ))}
        </View>
        <Text>
          Haven’t received the code yet?{" "}
          <Text
            style={{
              color: "#EF5DA8",
              textDecorationLine: "underline",
            }}
            onPress={countdown === 0 ? handleResendCode : undefined}
          >
            Resend {countdown > 0 && `(${countdown}s)`}
          </Text>
        </Text>
        {resendMessage ? (
          <Text className="text-gray-500">{resendMessage}</Text>
        ) : null}
        <Button
          title="Verify"
          onPress={handleVerify}
          buttonStyle={{
            backgroundColor: "#EF5DA8",
            borderRadius: 12,
            width: 150,
            marginTop: 10,
          }}
        />
        <Text>
          Back to{" "}
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

export default OTPVerification;
