import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/themed";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { HeaderNavigationProp } from "../type";

type MainHeaderProps = {
  showSearchButton?: boolean; // Add a prop to control the visibility of the search button
};

export default function MainHeader({ showSearchButton }: MainHeaderProps) {
  const nav = useNavigation<HeaderNavigationProp>();
  return (
    <View
      className="bg-white  flex flex-row justify-between items-center px-4 pt-5 pb-4 w-full"
      style={{
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 8,
      }}
    >
      <View className="flex flex-row items-center gap-2">
        <Image
          source={require("../../assets/header-icon.png")}
          className="w-6 h-6"
        />
        <Text className="text-lg font-semibold text-[#5D5FEF]">Engdigo</Text>
      </View>
      <View className="buttons-container flex flex-row items-center gap-4 mr-2">
        {showSearchButton && (
          <TouchableOpacity className="button">
            <Icon name="search" color="#5D5FEF" size={24} />
          </TouchableOpacity>
        )}

        <TouchableOpacity className="button">
          <Icon
            name="notifications-none"
            type="material"
            color="#5D5FEF"
            size={24}
            onPress={() => {
              nav.navigate("Notification");
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
