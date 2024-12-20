import { View, Text } from "react-native";
import React from "react";
import CircleContainer from "./CircleContainer";
import { Icon } from "react-native-elements";

const ProgressBar = () => {
  const data = [1, 2, 3, 4, 5,6,7,8,9,10];
  return (
    <View className=" flex flex-row h-[48px] w-full bg-secondaryExtraLight items-center justify-between">
      <Icon name="arrow-back-ios" type="material" size={32} color={"#EF5DA8"} className="ml-1" />
      <View className=" flex flex-row justify-items-center items-center ">
      {data.map((index) => (
        <View className=" mx-1">
          <CircleContainer index={index} />
        </View>
      ))}
      </View>
      <Icon name="arrow-forward-ios" type="material" size={32} color={"#EF5DA8"} className=" " />
    </View>
  );
};

export default ProgressBar;

