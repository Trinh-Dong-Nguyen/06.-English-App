import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

export default function CircleContainer({ index }: { index: number }) {
  return (
    <TouchableOpacity className="w-[25px] h-[25px] bg-primary rounded-[50px] flex-col justify-center items-center  flex">
      <Text className="text-white">{index}</Text>
    </TouchableOpacity>
  );
}
