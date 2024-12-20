import { View, Text, ScrollView, Image, Button } from "react-native";
import React, { useState, useEffect } from "react";
import DirectToSectionCard from "../../components/Home/DirectToSectionCard";
import CategoryCard from "../../components/Home/CategoryCard";
import CourseCard from "../../components/Home/CourseCard";
import colors from "../../../colors";
import courseCategoryService from "../../services/courseCategory.service";
import courseService from "../../services/course.service";
import { Course } from "../../models";
import MainHeader from "../../components/MainHeader";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  const userName = "Emma";
  interface CourseCategory {
    id: string;
    name: string;
  }

  const [courseCategories, setCourseCategories] = useState<CourseCategory[]>(
    []
  );
  const [recommendationCourses, setRecommendationCourses] = useState<Course[]>(
    []
  );
  // use Course model for now, will be changed to RecommendationCourse model later
  useEffect(() => {
    const fetchCourseCategories = async () => {
      try {
        const result = await courseCategoryService.getCourseCategories();
        if (result.statusCode === 200) {
          setCourseCategories(result.data);
        } else {
          console.error(
            "Error fetching course categories, status code: ",
            result.statusCode
          );
        }
      } catch (error) {
        console.error("Error fetching course categories:", error);
      }
    };
    const fetchRecommendationCourses = async () => {
      try {
        const res = await courseService.getAllCourses(); // change to getRecommendationCourses later
        if (res.statusCode === 200) {
          setRecommendationCourses(res.data.data);
        } else {
          console.error(
            "Error fetching recommendation courses, status code: ",
            res.statusCode
          );
        }
      } catch (error) {
        console.error("Error fetching recommendation courses: ", error);
      }
    };

    fetchCourseCategories();
    fetchRecommendationCourses();
  }, []);
  console.log(recommendationCourses);
  

  return (
    <SafeAreaView>
      <MainHeader showSearchButton={true} />
      <ScrollView
        style={{
          padding: 10,
        }}
        className="flex flex-col gap-4"
      >
        <View className="welcome-container w-3/4 flex flex-row items-center gap-1">
          <Image
            source={require("../../../assets/avatar.png")}
            className="w-12 h-12 p-1 border border-pink1 rounded-full"
          />
          <View className="flex flex-col">
            <Text className="text-xl font-bold text-black">
              Welcome back,{" "}
              <Text className="text-xl font-bold text-blue1">{userName}!</Text>
            </Text>
            <Text className="text-lg text-black">Let’s start learning</Text>
          </View>
        </View>
        <ScrollView
          horizontal
          contentContainerStyle={{
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 10,
            gap: 10,
          }}
        >
          <DirectToSectionCard />
          <DirectToSectionCard />
          <DirectToSectionCard />
        </ScrollView>
        <View className="categories flex flex-col gap-2">
          <View className="heading flex flex-row justify-between items-center">
            <Text className="text-lg font-bold text-blue1">Categories</Text>
            <Text className="text-sm text-blue1">View all</Text>
          </View>
          <ScrollView
            horizontal
            contentContainerStyle={{
              gap: 10,
              flexDirection: "row",
              alignItems: "center",
              paddingVertical: 10,
            }}
          >
            {courseCategories.map((category) => (
              <CategoryCard name={category.name} key={category.id} />
            ))}
          </ScrollView>
        </View>
        <View className="recommend flex flex-col gap-2">
          <View className="heading flex flex-row items-center">
            <Text className="text-lg font-bold text-blue1">
              Recommend for you
            </Text>
          </View>
          <View
            className="courses-container"
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 20,
              marginBottom: 20,
            }}
          >
            {Array.isArray(recommendationCourses) &&
            recommendationCourses.length > 0 ? (
              recommendationCourses.map((course) => (
                <CourseCard course={course} key={course.id} />
              ))
            ) : (
              <Text>No courses available</Text>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
