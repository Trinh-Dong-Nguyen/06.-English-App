import { useNavigation, useRoute } from "@react-navigation/native";
import {
  AVPlaybackStatus,
  AVPlaybackStatusSuccess,
  ResizeMode,
  Video,
} from "expo-av";
import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import colors from "../../../colors";
import { Lesson, Section } from "../../models";
import lessonService from "../../services/lesson.service";
import sectionService from "../../services/section.service";
import {
  CourseDetailScreenNavigationProp,
  CourseScreenRouteProp,
} from "../../type";
import More from "./More";
import { ActivityIndicator } from "react-native-paper";

const { height } = Dimensions.get("window");

export default function CourseViewer() {
  const [currentSectionId, setCurrentSectionId] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentVideoUri, setCurrentVideoUri] = useState("");
  const [activeTab, setActiveTab] = useState("lessons");
  const videoRef = useRef<Video>(null);
  const navigation = useNavigation<CourseDetailScreenNavigationProp>();
  const route = useRoute<CourseScreenRouteProp>();
  const { course } = route.params;
  const [lessons, setLessons] = useState<Lesson[]>([]);

  const fetchLessons = async () => {
    try {
      const res = await lessonService.getAllLessonsByCourse(course.id);
      if (res.statusCode === 200) {
        const lessonsWithSections = await Promise.all(
          res.data.map(async (lesson: Lesson) => {
            const sections = await fetchSection(lesson.id);

            return {
              ...lesson,

              sections: sections ?? ([] as Section[]),
            };
          })
        );
        setLessons(lessonsWithSections);
      } else {
        console.error("Error fetching lessons, status code: ", res.statusCode);
      }
    } catch (error) {
      console.error("Error fetching lessons: ", error);
    }
  };

  const fetchSection = async (lessonId: string) => {
    try {
      const res = await sectionService.getSection(lessonId);
      if (res.data && Array.isArray(res.data)) {
        return res.data;
      }
      return [];
    } catch (error) {
      console.error("Error fetching sections: ", error);
      return [];
    }
  };

  useEffect(() => {
    fetchLessons();
  }, [course]);
  // const handleReplay = () => {
  //   if (videoRef.current) {
  //     videoRef.current.replayAsync();
  //   }
  // };

  // // khi bấm vào section thì gọi hàm này
  const handleSectionPress = (section: any) => {
    setCurrentSectionId(section.id);
    // nếu section là video thì phát video
    if (section.type === "video") {
      setCurrentVideoUri(section.uri);
      setIsPlaying(true);
    }
    console.log(section.type);

    switch (section.type) {
      case "LISTENING":
        navigation.navigate("Listening", { sectionID: section.id });

        break;
      case "READING":
        navigation.navigate("Reading", { sectionID: section.id });
        break;
      case "ROOT":
        navigation.navigate("SectionRoot", { sectionID: section.id });
        break;
      case "SPEAKING":
        navigation.navigate("Speaking", { sectionID: section.id });
        break;
      case "WRITING":
        navigation.navigate("Writing", { sectionID: section.id });
        break;

      default:
        break;
    }
  };

  // // hàm này là logic cho việc khi phát hết video thì section được xem là completed
  // const handlePlaybackStatusUpdate = (status: AVPlaybackStatus) => {
  //   if (status.isLoaded && (status as AVPlaybackStatusSuccess).didJustFinish) {
  //     setLessons((prevLessons) =>
  //       prevLessons.map((lesson) => ({
  //         ...lesson,
  //         sections: lesson.sections.map((section) =>
  //           section.id === currentSectionId
  //             ? { ...section, completed: true }
  //             : section
  //         ),
  //       }))
  //     );
  //   }
  // };

  if (lessons.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Video Section */}
      {/* <View style={styles.videoContainer}>
        <View style={styles.videoArea}>
          <Video
            ref={videoRef}
            source={{ uri: currentVideoUri }}
            style={styles.video}
            shouldPlay={isPlaying}
            resizeMode={ResizeMode.COVER}
            useNativeControls
            onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
          />
          <TouchableOpacity
            style={styles.replayButton}
            onPress={handleReplay}
            accessibilityLabel="Replay section"
          >
            <Icon name="refresh-cw" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View> */}

      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.title}>{course.title}</Text>
        <Text style={styles.subtitle}>{course.teacherName}</Text>
      </View>

      {/* Tab Section */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "lessons" && styles.activeTab]}
          onPress={() => setActiveTab("lessons")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "lessons" && styles.activeTabText,
            ]}
          >
            Lessons
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "more" && styles.activeTab]}
          onPress={() => setActiveTab("more")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "more" && styles.activeTabText,
            ]}
          >
            More
          </Text>
        </TouchableOpacity>
      </View>

      {/* Scrollable Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
      >
        {activeTab === "lessons" &&
          lessons.length > 0 &&
          lessons.map((lesson, lessonIndex) => (
            <View key={lessonIndex} style={styles.lessonContainer}>
              <Text style={styles.lessonTitle}>{lesson.name}</Text>
              <View style={styles.sectionListContainer}>
                <View style={styles.row}>
                  {lesson.sections &&
                    Array.isArray(lesson.sections) &&
                    lesson.sections
                      .filter(
                        (section) =>
                          section.type === "vocab" || section.type === "grammar"
                      )
                      .map((section) => (
                        <TouchableOpacity
                          key={section.id}
                          style={[
                            styles.sectionButton,
                            currentSectionId === section.id &&
                              styles.sectionButtonActive,
                            section.type === "vocab" && {
                              backgroundColor: colors.blue4,
                              borderRadius: 20,
                            },
                            section.type === "grammar" && {
                              backgroundColor: colors.blue4,
                              borderRadius: 20,
                            },
                          ]}
                          onPress={() => handleSectionPress(section)}
                        >
                          <Icon
                            name={section.type === "vocab" ? "book" : "list"}
                            size={20}
                            color="#666"
                            style={styles.sectionIcon}
                          />
                          <Text style={styles.sectionTitle}>
                            {section.title}
                          </Text>
                        </TouchableOpacity>
                      ))}
                </View>
                {lesson.sections
                  .filter(
                    (section) =>
                      section.type !== "vocab" && section.type !== "grammar"
                  )
                  .map((section) => (
                    <TouchableOpacity
                      key={section.id}
                      style={[
                        styles.sectionButton,
                        currentSectionId === section.id &&
                          styles.sectionButtonActive,
                      ]}
                      onPress={() => handleSectionPress(section)}
                    >
                      <Icon
                        name={
                          section.type === "VIDEO"
                            ? "play"
                            : section.type === "SPEAKING"
                            ? "mic"
                            : section.type === "LISTENING"
                            ? "headphones"
                            : section.type === "WRITING"
                            ? "edit-3"
                            : section.type === "READING"
                            ? "book-open"
                            : "circle"
                        }
                        size={20}
                        color="#666"
                        style={styles.sectionIcon}
                      />
                      <Text style={styles.sectionTitle}>{section.title}</Text>
                      {"completed" in section &&
                        (section.completed ? (
                          <Icon name="check-circle" size={20} color="green" />
                        ) : (
                          <Icon name="circle" size={20} color="#ccc" />
                        ))}
                    </TouchableOpacity>
                  ))}
              </View>
            </View>
          ))}

        {/* content của tab more */}
        {activeTab === "more" && <More />}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  videoContainer: {
    backgroundColor: "#1c1c1e",
  },
  videoArea: {
    aspectRatio: 16 / 9,
    backgroundColor: "#262626",
    justifyContent: "center",
    alignItems: "center",
  },
  video: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  replayButton: {
    padding: 8,
    borderRadius: 16,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    position: "absolute",
    bottom: 16,
    right: 16,
  },
  header: {
    padding: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e5e5",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
  subtitle: {
    fontSize: 14,
    color: colors.blue1,
  },
  tabContainer: {
    flexDirection: "row",
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: colors.blue1,
  },
  tabText: {
    fontSize: 16,
    color: colors.blue3,
  },
  activeTabText: {
    color: colors.blue1,
    fontWeight: "600",
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 16,
  },
  lessonContainer: {
    marginBottom: 8,
  },
  lessonTitle: {
    fontSize: 16,
    fontWeight: "600",
    padding: 16,
    paddingBottom: 8,
  },
  sectionListContainer: {
    paddingHorizontal: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  sectionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: "#fff",
    flex: 1,
    marginHorizontal: 4,
  },
  sectionButtonActive: {
    backgroundColor: colors.pink3,
  },
  sectionIcon: {
    marginRight: 8,
  },
  sectionTitle: {
    flex: 1,
    fontSize: 16,
  },
  moreContent: {
    padding: 16,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  menuIcon: {
    marginRight: 8,
  },
  menuText: {
    fontSize: 16,
  },
});
