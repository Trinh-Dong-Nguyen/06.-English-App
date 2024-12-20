import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { Button, Icon } from "@rneui/themed";
import { BottomSheet } from "@rneui/base";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation, useRoute } from "@react-navigation/native";
import { CourseDetailScreenRouteProp, PayMentScreenNavigationProp } from "../../type";
import { Lesson, Section } from "../../models";
import lessonService from "../../services/lesson.service";
const LessonItem = ({ lesson }: { lesson: Lesson }) => {
  return (
    <View className="flex gap-1 mt-[10px]">
      <Text className="text-base font-semibold">{lesson.name}</Text>
      <Text
        style={{ color: "rgba(0, 0, 0, 0.7)" }}
        className="text-sm font-medium"
      >
        {lesson.description}
      </Text>
    </View>
  );
};

const CourseDetail = () => {
  const [isPlaylist, setIsPlaylist] = useState(true);
  const [isDescription, setIsDescription] = useState(false);

  const route = useRoute<CourseDetailScreenRouteProp>();
  const { course } = route.params;

  const [lessons, setLessons] = useState<Lesson[]>([]);

  const nav = useNavigation<PayMentScreenNavigationProp>();

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const res = await lessonService.getAllLessonsByCourse(course.id);
        if (res.statusCode === 200) {
          setLessons(
            res.data.map((lesson: Lesson) => ({
              ...lesson,
              sections: lesson.sections ? lesson.sections : ([] as Section[]),
            }))
          );
        } else {
          console.error(
            "Error fetching lessons, status code: ",
            res.statusCode
          );
        }
      } catch (error) {
        console.error("Error fetching lessons: ", error);
      }
    };
    fetchLessons();
  }, [course]);

  const handlePlaylist = () => {
    setIsPlaylist(true);
    setIsDescription(false);
  };
  const handleDescription = () => {
    setIsPlaylist(false);
    setIsDescription(true);
  };
  const [isBottomSheetVisible, setIsBottomSheetVisible] = React.useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = React.useState(0);
  return (
    <View className="h-full relative">
      <ScrollView className="mt-[10px]" nestedScrollEnabled contentContainerStyle={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
        <View className="px-[45px] h-[90%]">
          <Image
            source={{ uri: course.thumbnail_image }}
            className="rounded-3xl w-full h-64"
          />
          <Text className="text-lg font-semibold">{course.title}</Text>
          <Text>
            Created by <Text className="text-[#5D5FEF]">{course.teacherName}</Text>
          </Text>
          <View className="flex flex-row justify-between">
            <View className="flex flex-row items-center gap-1">
              <Icon
                name="star-o"
                type="font-awesome"
                onPress={() => {
                  console.log("Press");
                }}
              />
              <Text>{course.ratingAverage}</Text>
            </View>
            <Text className="text-[#5D5FEF] text-3xl">{new Intl.NumberFormat('de-DE').format(course.price)}đ</Text>
          </View>

          <View>
            <View className="flex flex-row py-3 bg-[#A5A6F6] justify-around rounded-[20px]">
              <Button
                title="Playlist"
                buttonStyle={{
                  backgroundColor: isPlaylist ? "#5D5FEF" : "#A5A6F6",
                  borderRadius: 20,
                  width: 120,
                  height: 50,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={handlePlaylist}
              />
              <Button
                title="Description"
                buttonStyle={{
                  backgroundColor: !isDescription ? "#A5A6F6" : "#5D5FEF",
                  borderRadius: 20,
                  width: 120,
                  height: 50,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={handleDescription}
              />
            </View>
            <ScrollView className="h-[250px] w-full">
              {isPlaylist && lessons.length > 0 ? (
                lessons.map((lesson) => (
                  <LessonItem key={lesson.id} lesson={lesson} />))
              ) : (
                <Text className="text-sm font-medium text-center mt-4 text-gray-500">
                  No lessons available.
                </Text>
              )}

            </ScrollView>
          </View>
        </View>
      </ScrollView>
      <View className="flex flex-row bg-white pl-8 pr-8 pb-3 pt-[14px] w-screen justify-around h-[80px] absolute right-0 left-0 bottom-0">
        <Button
          title="BUY NOW"
          onPress={() => {
            setIsBottomSheetVisible(true);
          }}
          buttonStyle={{
            backgroundColor: "#5D5FEF",
            borderRadius: 20,
            width: 210,
            height: 50,
            justifyContent: "center",
            alignItems: "center",
          }}
        />
      </View>
      <BottomSheet
        isVisible={isBottomSheetVisible}
        modalProps={{
          animationType: "slide",
        }}
      >
        <View className="flex flex-col items-center justify-between pb-4 h-[50vh] bg-white rounded-2xl">
          <View className="header flex flex-row justify-between w-full p-4">
            <Text className="text-lg text-gray-500">Choose payment method</Text>
            <Icon
              name="close"
              type="material-community"
              onPress={() => {
                setIsBottomSheetVisible(false);
              }}
            />
          </View>
          <View className="payment-method-cards flex flex-col gap-2 items-center w-3/4">
            <TouchableOpacity
              className="payment-method-card"
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 16,
                width: "100%",
                padding: 15,
                borderRadius: 20,
                borderStyle: "solid",
                borderWidth: selectedPaymentMethod === 0 ? 1 : 0,
                borderColor: "#6b7280",
                backgroundColor:
                  selectedPaymentMethod !== 0
                    ? "rgba(165, 166, 246, 0.2)"
                    : "transparent",
                position: "relative",
              }}
              onPress={() => {
                setSelectedPaymentMethod(0);
              }}
            >
              <Icon
                name="credit-card"
                type="font-awesome"
                color="#5D5FEF"
                size={40}
              />
              <Text className="text-lg">Pay with card</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="payment-method-card"
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 16,
                width: "100%",
                padding: 15,
                borderRadius: 20,
                borderStyle: "solid",
                borderWidth: selectedPaymentMethod === 1 ? 1 : 0,
                borderColor: "#6b7280",
                backgroundColor:
                  selectedPaymentMethod !== 1
                    ? "rgba(165, 166, 246, 0.2)"
                    : "transparent",
                position: "relative",
              }}
              onPress={() => {
                setSelectedPaymentMethod(1);
              }}
            >
              <Icon name="bank" type="font-awesome" color="#5D5FEF" size={40} />
              <Text className="text-lg">Pay with bank</Text>
            </TouchableOpacity>
          </View>
          <View
            className="security-standards-info"
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
              gap: 8,
              backgroundColor: "#E3F7EF",
              borderRadius: 15,
              width: "85%",
              padding: 10,
            }}
          >
            <Icon name="check" type="font-awesome" color="#10B981" size={10} />
            <Text className="text-xs text-gray-500">
              We adhere entirely to the data security standards of the payment
              card industry.
            </Text>
          </View>
          <View className="button-container w-full flex items-center">
            <Button
              title="Continue"
              buttonStyle={{
                backgroundColor: "#5D5FEF",
                borderRadius: 40,
                width: 210,
                height: 50,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={async () => {
                if (selectedPaymentMethod === 0) {
                  nav.navigate("PayWithCard", { courseID: course.id , coursePrice: course.price });
                  setIsBottomSheetVisible(false);
                }
                else if (selectedPaymentMethod === 1) {
                  nav.navigate("PayWithBank", { courseID: course.id , coursePrice: course.price });
                  setIsBottomSheetVisible(false);
                }
              }}
            />
          </View>
        </View>
      </BottomSheet>

    </View>
  );
};

export default CourseDetail;
