import React from "react";
import { Text, View } from "react-native";
type CategoryCardProps = {  name: string};

export default function CategoryCard({name}: CategoryCardProps) {

  return (
    <View className="p-2 border border-pink1 rounded-full self-start">
      <Text className="text-sm text-black">{name}</Text>
    </View>
  );
}
