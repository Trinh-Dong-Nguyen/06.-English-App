import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Icon } from "react-native-paper";
import { CheckBox } from "react-native-elements";
import VocabFrame from "./VocabFrame";
import MainHeader from "../../components/MainHeader";

const width = Dimensions.get("window").width;
const Vocabulary = () => {
  return (
    <SafeAreaView>
      <MainHeader />
      <View className=" mx-4 my-5 flex flex-col">
        <View className="flex flex- col items-start">
          <Text className="text-black text-sm "> 3 words</Text>
          <Text className="text-[#757575] text-sm font-normal">
            learned: 1/3
          </Text>
        </View>

        <View className="flex flex-row gap-3   ">
          <Text className="text-[#5d5fef] text-sm font-normal">All</Text>
          <Text className="text-[#a5a6f6] text-sm font-normal">
            Not Learned
          </Text>
        </View>

        <View className="mt-7">
          {[...Array(8)].map((_, i) => (
            <VocabFrame key={i} />
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Vocabulary;

const styles = StyleSheet.create({});
