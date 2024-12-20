import React, { useState } from "react";
import { View, Text } from "react-native";
import { Checkbox } from "react-native-paper";

export default function MultiSelectQuestion({
  number,
  question,
  options,
}: {
  number: number;
  question: string;
  options: string[];
}) {
  const [checked, setChecked] = useState<string[]>([]);

  return (
    <View className="question">
      <Text className="question-text text-[#7879F1] text-base">
        {number}.{question}
      </Text>
      <View className="options flex gap-[1px]">
        {options.map((option, index) => (
          <View className="option flex flex-row items-center gap-1" key={index}>
            <Checkbox
              status={checked.includes(option) ? "checked" : "unchecked"}
              onPress={() => {
                if (checked.includes(option)) {
                  setChecked(checked.filter((item) => item !== option));
                } else {
                  setChecked([...checked, option]);
                }
              }}
              color="#5D5FEF"
              uncheckedColor="#000"
            />
            <Text className="option-text text-black text-base">
              {String.fromCharCode(65 + index)}. {option}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}
