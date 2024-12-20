import React, { useEffect } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../type";

type SplashScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "SplashScreen"
>;

const SplashScreen = () => {
  const navigation = useNavigation<SplashScreenNavigationProp>();

  useEffect(() => {
    const checkTokens = async () => {
      const accessToken = await SecureStore.getItemAsync("accessToken");
      const refreshToken = await SecureStore.getItemAsync("refreshToken");

      if (accessToken && refreshToken) {
        navigation.navigate("BottomTabsNavigator");
      } else {
        navigation.navigate("Login");
      }
    };

    checkTokens();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SplashScreen;
