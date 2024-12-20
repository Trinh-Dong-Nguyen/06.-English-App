import { View, Text, Dimensions, StyleSheet, ScrollView } from "react-native";
import React, { useState } from "react";

import { Button, IconButton, ProgressBar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;
const FlashCard = () => {
  const [color, setColor] = useState('#5D5FEF'); // Initial color

  const handleSwapColor = () => {
    setColor(color === '#5D5FEF' ? '#FF00FF' : '#5D5FEF'); // Toggle between primary and Fuschia/pink1
  };
  return (
    <View>
      <View
        className="items-center flex bg-[#F5F5F5]"
        style={{ width: width, height: height }}
      >
        {/* Header */}
        <View className=" relative left-0 top-0  w-full h-[120px]  rounded-bl-3xl rounded-br-3xl "
        style={{ backgroundColor: color }}
        >
          <View className="flex flex-row items-center">
            <IconButton
              icon="arrow-left"
              size={32}
              className="ml-2"
              iconColor="white"
            />
            <Text className="text-white text-3xl font-semibold font-['Work Sans']">
              Vocabulary
            </Text>
          </View>
        </View>
        {/* Body */}
        <View
          className=" absolute z-[2] flex-col    bg-white rounded-3xl flex items-center justify-center  "
          style={{ width: width - 80, top: 70, height: height - 500 }}
        >
          <View className="flex-row  justify-between w-full self-start">
            <IconButton
              icon="repeat"
              size={32}
              className="ml-2"
              onPress={handleSwapColor}
              iconColor="black"
            />
            <IconButton
              onPress={() => console.log("Bookmark")}
              icon="star-outline"
              size={32}
              className="ml-2"
              iconColor="black"
            />
          </View>
          <View className="flex-auto justify-center">
            <Text className="text-black text-2xl font-medium  font-['Work Sans'] text-center ">
              luxury(n)
            </Text>
          </View>
        </View>

        {/* Progress Bar */}
        <View className="mt-[400]" >
          <ProgressBar
            progress={0.5}
            color={color}
            style={styles.progressBar}
          />
          <Text className="text-black text-base font-medium">5/10</Text>
        </View>

        {/*Button*/}
        <Button
          mode="contained"
          buttonColor={color}
          style={styles.button}
          className="mt-[30px]"
          children="NEXT CARD"
          onPress={() => console.log("Next Card")}
          labelStyle={styles.label}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  progressBar: {
    width: width - 80,
    height: 30,
    backgroundColor: "Iris/blue3",
    borderRadius: 50,
  },
  label: {
    color: "#FFF",
    fontSize: 20,
    fontStyle: "normal",
    fontWeight: 600,
    lineHeight: 24,
    width: width - 80,
  },
  button: {
    width: width - 80,
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default FlashCard;
