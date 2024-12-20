import { View, Text } from "react-native";
import React from "react";
import { TextInput } from "react-native-paper";

type InputFieldProps = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
};

const InputField = ({ label, value, onChangeText }: InputFieldProps) => {
  
    return (
    <View className="w-[90%] justify-center items-center ">
      <Text className="text-black ml-5 self-start text-base font-semibold leading-none">
        {label}
      </Text>
      <TextInput
        mode="outlined"
        dense
       
        value={value}
        style={{ width: "90%" }}
        onChangeText={onChangeText}
        outlineColor="#5D5FEF"
        outlineStyle={{borderRadius:15}}
        right={<TextInput.Icon icon={"pencil"}  />}
      />
    </View>
  );
};

export default InputField;
