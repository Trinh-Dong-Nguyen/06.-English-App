import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Icon, CheckBox } from "react-native-elements"; // or the appropriate library

export default function VocabFrame() {
  const [checked, setChecked] = React.useState(false);
  return (
    <TouchableOpacity
      style={{
        backgroundColor: checked ? "#fcddec" : "#fff",
      }}
      className="vocabFrame w-full  items-center  flex flex-row "
    >
      <Icon name="home" size={70} />
      <View>
        <Text>home(n)</Text>
        <Text>nhà</Text>
      </View>

      <View className="ml-auto">
        <CheckBox
          checked={checked}
          onPress={() => setChecked(!checked)}
          checkedColor="#ef5da8"
          uncheckedColor="#ef5da8"
        />
      </View>
    </TouchableOpacity>
  );
}
