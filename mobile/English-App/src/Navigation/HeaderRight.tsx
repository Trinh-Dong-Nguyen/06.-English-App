import { View } from "react-native";
import React from "react";
import { IconButton } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";

const HeaderRight = ({ scrollRef }:{scrollRef:React.RefObject<ScrollView>}) => {
  const scrollToTop = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ y: 0, animated: true });
    }
  };

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollToEnd({ animated: true });
    }
  };

  return (
    <View className="flex flex-row p-0 justify-center items-center">
      <IconButton icon='arrow-up' onPress={scrollToTop} />
      <IconButton icon='arrow-down' onPress={scrollToBottom} />
    </View>
  );
};

export default HeaderRight;
