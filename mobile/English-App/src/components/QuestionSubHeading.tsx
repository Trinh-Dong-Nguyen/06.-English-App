import { Text } from "react-native";

export default function QuestionSubHeading({ text }: { text: string }) {
  return <Text className="sub-heading text-[#7879F1] text-base">{text}</Text>;
}
