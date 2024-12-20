import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, Text, View } from "react-native";
import { Rating } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";

import { CourseDetailScreenNavigationProp } from "../../type";
import { Course } from "../../models";

export default function CourseCard({ course }: { course: Course }) {
  const nav = useNavigation<CourseDetailScreenNavigationProp>();

  
  return (
    <TouchableOpacity
      className="flex flex-col justify-between w-40"
      onPress={() => {
        nav.navigate("CourseDetail", { course });
      }}
    >
      <Image
        source={{ uri: course.thumbnail_image }}
        className="w-full h-32"
      />
      <Text
        className="text-sm font-semibold text-black"
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {course.title}
      </Text>
      <Text
        className="text-xs text-blue2"
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {course.teacherName}
      </Text>
      <View className="flex flex-row items-center gap-1">
        <Text className="text-xs text-black">{course.ratingAverage}</Text>
        <Rating readonly startingValue={course.ratingAverage} imageSize={10} />
        <Text className="text-xs text-black">{course.ratingCount}</Text>
      </View>
      <View className="flex flex-row gap-1 items-start">
        <Text className="text-xs text-black">Price: {course.price}</Text>
        {/* <Text className="text-[10px] text-gray-500 line-through">đ800.000</Text> */}
      </View>
    </TouchableOpacity>
  );
}
