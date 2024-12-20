import React, { useCallback, useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Button } from "react-native-elements";
import CourseItem from "../../components/CourseItem";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { LearningScreenNavigationProp } from "../../type";
import courseService from "../../services/course.service";
import { MyCourse } from "../../models";
import MainHeader from "../../components/MainHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList } from "react-native-gesture-handler";

export default function LearningScreen() {
  const nav = useNavigation<LearningScreenNavigationProp>();
  const [buttonSelected, setButtonSelected] = React.useState("All");
  const [studentCourses, setStudentCourses] = useState<MyCourse[]>([]);
  useFocusEffect(
    useCallback(() => {
      const fetchStudentCourses = async () => {
        try {
          const res = await courseService.getStudentCourses();
          if (res.statusCode === 200) {
            setStudentCourses(res.data);
          } else {
            console.error(
              "Error fetching student courses, status code: ",
              res.statusCode
            );
          }
        } catch (error) {
          console.error("Error fetching student courses: ", error);
        }
      };

      fetchStudentCourses();
    }, [])) // Empty dependenc
  console.log(studentCourses.map((course) => course.id));

  return (
    <SafeAreaView className="w-full h-full flex-1 ">
      <MainHeader />
      <ScrollView className="w-full px-[24px] py-6">
        <Text className="font-semibold text-base text-[#5D5FEF] mb-4">
          My Courses
        </Text>
        <View className="w-full flex flex-row items-center justify-between">
          <Button
            title="All"
            type={buttonSelected === "All" ? "solid" : "outline"}
            className="rounded-[30px] px-3 py-[14px]"
            buttonStyle={{
              backgroundColor:
                buttonSelected === "All" ? "#EF5DA8" : "transparent",
            }}
            titleStyle={{
              color: buttonSelected === "All" ? "#ffffff" : "#000000",
            }}
            onPress={() => setButtonSelected("All")}
          ></Button>
          <Button
            title="In progress"
            type={buttonSelected === "In progress" ? "solid" : "outline"}
            className="rounded-[30px] px-3 py-[14px]"
            buttonStyle={{
              backgroundColor:
                buttonSelected === "In progress" ? "#EF5DA8" : "transparent",
            }}
            titleStyle={{
              color: buttonSelected === "In progress" ? "#ffffff" : "#000000",
            }}
            onPress={() => setButtonSelected("In progress")}
          ></Button>
          <Button
            title="Finished"
            type={buttonSelected === "Finished" ? "solid" : "outline"}
            className="rounded-[30px] px-3 py-[14px]"
            buttonStyle={{
              backgroundColor:
                buttonSelected === "Finished" ? "#EF5DA8" : "transparent",
            }}
            titleStyle={{
              color: buttonSelected === "Finished" ? "#ffffff" : "#000000",
            }}
            onPress={() => setButtonSelected("Finished")}
          ></Button>
          <Button
            title="Favorited"
            type={buttonSelected === "Favorited" ? "solid" : "outline"}
            className="rounded-[30px] px-3 py-[14px]"
            buttonStyle={{
              backgroundColor:
                buttonSelected === "Favorited" ? "#EF5DA8" : "transparent",
            }}
            titleStyle={{
              color: buttonSelected === "Favorited" ? "#ffffff" : "#000000",
            }}
            onPress={() => setButtonSelected("Favorited")}
          >
            Favorited
          </Button>
        </View>
        <View className="w-full flex flex-col   items-center mt-5">
          {studentCourses.map((course) => (
            <View className="pb-6 " key={course.id}>
              <CourseItem
                srcImg={course.thumbnail_image}
                title={course.title}
                teacherName={course.teacherName}
                rated={course.ratingCount}
                onPressItem={() => {
                  nav.navigate("CourseHome", { course: course });
                }}
                progress={50}
              />
            </View>
          ))}
          {/* <FlatList
          data={studentCourses}
          renderItem={({ item,index }) => (
            <CourseItem
              srcImg={item.thumbnail_image}
              title={item.title}
              teacherName={item.teacherName}
              rated={item.ratingCount}
              onPressItem={() => {
                nav.navigate("CourseHome", { course: item });
              }}
              progress={50}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
        /> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
