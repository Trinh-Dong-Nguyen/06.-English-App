import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Dropdown } from "react-native-element-dropdown";

const data = [
  { label: "A", value: "A" },
  { label: "B", value: "B" },
  { label: "C", value: "C" },
  { label: "D", value: "D" },
];
type DropdownComponentProps = {
  options: string[];
  onChange: (value: string) => void;
};

const DropdownComponent = ({ options, onChange }: DropdownComponentProps) => {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  const data = options.map((option) => {
    return { label: option, value: option };
  });

  const handleChange = (item: { label: string; value: string }) => {
    setSelectedValue(item.value);
    onChange(item.value);
  };

  return (
    <View className=" w-[80px] pl-3 flex justify-center px-2  ">
      <Dropdown
        data={data}
        maxHeight={1000}
        labelField={"label"}
        valueField={"value"}
        placeholder={""}
        value={selectedValue}
        onChange={handleChange}
        search={false}
        containerStyle={styles.container}
        placeholderStyle={styles.placeholder}
        renderRightIcon={() => <Text></Text>}
        selectedTextStyle={styles.selectedText}
        itemContainerStyle={styles.itemContainer}
        style={[
          styles.dropdown,
          selectedValue ? styles.selectedDropdown : styles.unselectedDropdown,
        ]}
      />
    </View>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    borderWidth: 2,
    borderRadius: 20,
    borderStyle: "solid",
    borderColor: "#F178B6",
    backgroundColor: "white",
    width: 100,
    alignSelf: "stretch",
  },
  placeholder: {
    width: "auto",
    textAlign: "center",
    flex: 1,
  },
  selectedText: {
    width: "auto",
    textAlign: "center",
    flex: 1,
  },
  itemContainer: {
    flex: 1,
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 1,
    backgroundColor: "transparent",
    width: 80,
  },
  dropdown: {
    borderWidth: 2,
    borderRadius: 10,
    padding: 5,
  },
  selectedDropdown: {
    borderColor: "#5D5FEF",
    backgroundColor: "#FCDDEC",
  },
  unselectedDropdown: {
    borderColor: "#F178B6",
    backgroundColor: "white",
  },
});
