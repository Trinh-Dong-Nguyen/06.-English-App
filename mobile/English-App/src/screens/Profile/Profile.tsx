import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  Alert,
} from "react-native";
import { Avatar, Icon } from "react-native-elements";
import InputField from "./InputField";
import userService from "../../services/user.service";
import MainHeader from "../../components/MainHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import authService from "../../services/auth.service";
import { useNavigation } from "@react-navigation/native";
import { LoginScreenNavigationProp } from "../../type";
import * as SecureStore from "expo-secure-store";
import { User } from "../../models";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

const Profile = () => {
  const [profile, setProfile] = useState({
    id: "",
    createDate: "",
    updateDate: "",
    role: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    birthDate: "",
    avatarURL: "",
    awsCognitoId: "",
    additionalInfo: {
      schoolName: "",
    },
  });
  const handleInputChange = (field: string, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };
  const [show, setShow] = useState(false);
  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShow(false);
    if (selectedDate) {
      setProfile((prev) => ({
        ...prev,
        birthDate: selectedDate.toISOString(),
      }));
    }
  };

  const loginNav = useNavigation<LoginScreenNavigationProp>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await userService.getUser();
        if (result.statusCode === 200) {
          setProfile(result.data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, []);

  const handleUpdateProfile = async (profile: User) => {
    try {
      const result = await userService.updateUser(profile);
      if (result.statusCode === 200) {
        Alert.alert("Profile updated successfully");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      Alert.alert("An error occurred while updating the profile.");
    }
  };
  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        let uri = result.assets[0].uri;
        // Fix URI for iOS (replace file:// with /private)
        // if (uri.startsWith('file://')) {
        //   uri = uri.replace('file://', '/private');
        // }
        // const fileName = uri.split('/').pop();

        // if (!fileName) {
        //   Alert.alert("Failed to get file name");
        //   return;
        // }

        // if (result.assets[0].mimeType) {
        //   const fileExtension = fileName.split('.').pop();
        //   if (!fileExtension) {
        //     Alert.alert("Failed to get file extension");
        //     return;
        //   }
        //   const response = await userService.getImageUrl(result.assets[0].mimeType, fileExtension);

        //   const base64Data = await FileSystem.readAsStringAsync(uri, {
        //     encoding: FileSystem.EncodingType.Base64,
        //   });

        //   console.log('Base64 Image Data:', base64Data);

        //   const url = response.data.preSignedUrl;
        //   const key = response.data.key;
        //   const uploadResponse = await fetch(url, {
        //     method: 'PUT',
        //     headers: {
        //       'Content-Type': 'multipart/form-data',
        //     },
        //     body: base64Data,
        //   });
        //   console.log(uploadResponse);
        //   if (uploadResponse.status === 200) {
        //     Alert.alert("Image uploaded successfully");
        //     console.log(key);
        //     setProfile((prev) => ({ ...prev, avatarURL: key }));
        //   } else {
        //     console.log(uploadResponse);
        //     Alert.alert("Failed to upload image");
        //   }
        Alert.alert("Image uploaded successfully");
        setProfile((prev) => ({ ...prev, avatarURL: uri }));
      } else {
        Alert.alert("Failed to get image MIME type");
        return;
      }
    } catch (error) {
      console.error("Error in pickImage:", error);
      Alert.alert("An error occurred while uploading the image.");
    }
  };

  const handleLogout = async () => {
    await SecureStore.deleteItemAsync("accessToken");
    await SecureStore.deleteItemAsync("refreshToken");
    loginNav.navigate("Login");
  };

  return (
    <SafeAreaView>
      <MainHeader />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex flex-col justify-center items-center">
          <Avatar
            source={
              // profile?.avatarURL
              //   ? { uri: profile.avatarURL }
              //   : 
              require("../../../assets/avatar.jpg")
            }
            size="xlarge"
            rounded
            containerStyle={{ marginTop: 20 }}
            onPress={() => console.log("Works!")}
          />
          <TouchableOpacity onPress={() => {
            pickImage();
          }}>
            <Text>Change Image</Text>
          </TouchableOpacity>
          <View className="w-[90%] justify-center items-center ">
            <Text className="text-black ml-5 self-start text-base font-semibold leading-none">
              BirthDate
            </Text>
            <TouchableOpacity onPress={() => setShow(true)} className="flex flex-row w-2/3 justify-center items-center ">
              <View className="bg-white w-2/3  rounded-[15px] shadow p-3">
                <Text className="text-black ml-[2px] text-base font-semibold leading-none">
                  {new Date(profile.birthDate).toLocaleDateString("vi-VN", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </Text>
              </View>
              {show && (
                <DateTimePicker
                  value={new Date(profile.birthDate)}
                  mode="date" // Use "time" for time picker or "datetime" for both
                  display="default" // "default", "spinner", or "calendar" (iOS-specific options)
                  onChange={onChange} // Callback when the date is changed
                />
              )}
            </TouchableOpacity>
          </View>
          <InputField
            label="First Name"
            value={profile.firstName}
            onChangeText={(value) => handleInputChange("firstname", value)}
          />
          <InputField
            label="Last Name"
            value={profile.lastName}
            onChangeText={(value) => handleInputChange("lastname", value)}
          />
          <InputField
            label="Email"
            value={profile.email}
            onChangeText={(value) => handleInputChange("email", value)}
          />
          <InputField
            label="Phone Number"
            value={profile.phone}
            onChangeText={(value) => handleInputChange("phone", value)}
          />
          <View
            style={{ marginTop: 100 }}
            className="flex flex-row justify-center items-center  gap-7"
          >
            <TouchableOpacity
              className="flex-row justify-between items-center bg-secondary rounded-lg shadow p-3"
              onPress={() => {
                //handleUpdateProfile({ ...profile, birthDate: new Date(profile.birthDate) });
                console.log(profile);
                handleUpdateProfile({ ...profile, birthDate: new Date(profile.birthDate) });
              }}
            >
              <Icon
                name="checkbox-marked-outline"
                type="material-community"
                color="white"
                size={25}
              />
              <Text className="text-white text-xs  font-semibold">Update</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-row justify-between items-center bg-secondary rounded-lg shadow p-3"
              onPress={() => handleLogout()}
            >
              <Icon
                name="logout"
                type="material-community"
                color="white"
                size={25}
              />
              <Text className="text-white text-xs  font-semibold">Log out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};
export default Profile;