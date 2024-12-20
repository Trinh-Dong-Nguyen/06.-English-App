import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import RootStack from "./src/Navigation/RootStack";
export default function App() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <RootStack />
      </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
  },
});
