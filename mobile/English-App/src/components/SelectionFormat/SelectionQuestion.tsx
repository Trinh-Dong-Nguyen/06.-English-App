import { View, Text } from "react-native";
import React from "react";
import { Dropdown } from "react-native-element-dropdown";
import DropdownComponent from "../DropdownComponent";

type SelectionFormatProps = {
  text: string;
  options: string[];
  order: number;
  onAnswerChange: (value: string) => void;
};

const SelectionQuestion = ({ text, options, order, onAnswerChange }: SelectionFormatProps) => {
  const handleChange = (value: string) => {
    onAnswerChange(value);
  };

  return (
    <View className=" flex flex-row  items-start">
      <Text className=" text-primaryLight text-lg">{order+1}.</Text>
      <DropdownComponent options={options} onChange={handleChange} />
      <Text className="question flex self-end text-lg flex-shrink mr-2 ">
        {text}
      </Text>
    </View>
  );
};
export default SelectionQuestion;
