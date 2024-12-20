import { View, Text } from "react-native";
import { RadioButton } from "react-native-paper";
import { useState } from "react";
export default function MultipleChoiceQuestion({
  number,
  question,
  options,
  onAnswer, // Add onAnswer prop
}: {
  number: number;
  question: string;
  options: string[];
  onAnswer: () => void; // Define onAnswer type
}) {
  const [checked, setChecked] = useState<string | null>(null);

  return (
    <View className="question">
      <Text className="question-text text-[#7879F1] text-base">
        {number}.{question}
      </Text>
      <View className="options flex gap-[1px]">
        {options.map((option, index) => (
          <View className="option flex flex-row items-center gap-1" key={index}>
            <RadioButton
              value={option}
              status={checked === option ? "checked" : "unchecked"}
              onPress={() => {
                setChecked(option);
                onAnswer(); // Call onAnswer callback
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
