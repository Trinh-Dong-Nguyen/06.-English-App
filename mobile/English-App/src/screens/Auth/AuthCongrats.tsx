import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Image, ImageBackground, Text, View } from "react-native";
import { LoginScreenNavigationProp, RootStackParamList } from "../../type";

type AuthCongratsRouteProp = RouteProp<RootStackParamList, "AuthCongrats">;
const AuthCongrats = () => {
  const route = useRoute<AuthCongratsRouteProp>();
  const { isConfirmSignUp } = route.params;
  const loginNav = useNavigation<LoginScreenNavigationProp>();
  return (
    <ImageBackground
      source={require("../../../assets/signupbg.png")}
      style={{ width: "100%", height: "100%" }}
    >
      <View className="flex gap-5 mt-[80px] items-center">
        <Image
          source={require("../../../assets/avatar.png")}
          className="w-[100px] h-[110px]"
        />
        <Text className="text-[38px] font-semibold text-[#5D5FEF]">
          {isConfirmSignUp ? "Account Created" : "Password Reset"}
        </Text>
        <Text className="text-[16px] text-gray-500 text-center">
          {isConfirmSignUp
            ? "Your account has been created successfully.\nPlease go back to login screen."
            : "Your password has been reset successfully.\nPlease go back to login screen."}
        </Text>
        <Text>
          Back to{" "}
          <Text
            style={{ color: "#EF5DA8", textDecorationLine: "underline" }}
            onPress={() => {
              loginNav.navigate("Login");
            }}
          >
            Login
          </Text>
        </Text>
      </View>
    </ImageBackground>
  );
};

export default AuthCongrats;
