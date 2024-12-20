import React from "react";
import { Image, Text, View } from "react-native";

export default function DirectToSectionCard() {
  const sectionDescription = "THE COMPLETE GUIDE TO IELTS READING GENERAL";
  const lesson = 1;
  const section = 2;
  return (
    <View className="w-48 h-16  border border-blue1 flex flex-row">
      <View className="w-1/3 h-full bg-blue1 flex items-center justify-center">
        <Image
          source={require("../../../assets/sectionIcon.png")}
          className="w-5 h-8"
        />
      </View>
      <View className="w-2/3 flex flex-col justify-around p-1">
        <Text
          numberOfLines={2}
          ellipsizeMode="tail"
          className="w-full text-[10px] text-gray-500"
        >
          {sectionDescription}
        </Text>
        <Text className="text-[12px] text-black">Lesson {lesson}</Text>
        <Text className="text-[12px] text-black">Section {section}</Text>
      </View>
    </View>
  );
}
