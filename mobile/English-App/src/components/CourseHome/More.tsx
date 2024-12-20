import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Feather";

export default function More() {
  return (
    <View className="p-[16px]">
      <TouchableOpacity style={styles.menuItem}>
        <Icon name="info" size={20} color="#666" style={styles.menuIcon} />
        <Text style={styles.menuText}>About this course</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem}>
        <Icon name="share-2" size={20} color="#666" style={styles.menuIcon} />
        <Text style={styles.menuText}>Share this course</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem}>
        <Icon
          name="message-circle"
          size={20}
          color="#666"
          style={styles.menuIcon}
        />
        <Text style={styles.menuText}>Q&A</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem}>
        <Icon name="bell" size={20} color="#666" style={styles.menuIcon} />
        <Text style={styles.menuText}>Announcements</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem}>
        <Icon name="heart" size={20} color="#666" style={styles.menuIcon} />
        <Text style={styles.menuText}>Add course to favorite</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  menuText: {
    fontSize: 16,
  },
  menuIcon: {
    marginRight: 8,
  },
});
