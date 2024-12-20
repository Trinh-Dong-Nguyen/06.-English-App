import { Text } from "react-native";
export default function QuestionHeading({
  from,
  to,
}: {
  from: number;
  to: number;
}) {
  return (
    <Text className="heading text-primary text-lg font-semibold ">
      Question {from}-{to}
    </Text>
  );
}
