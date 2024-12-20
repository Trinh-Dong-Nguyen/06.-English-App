import React, { useEffect, useState, useRef } from "react";
import { View, Text, ScrollView, Image, Dimensions, StyleSheet } from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../type";
import sectionService from "../../services/section.service";
import Section from "../../models/Section";
import SelectionFormat from "../../components/SelectionFormat/SelectionFormat";
import { SafeAreaView } from "react-native-safe-area-context";
import HtmlReader from "../../components/HtmlReader";
import BottomNavigation from '../../components/QuestionNavigation';
import { ActivityIndicator } from "react-native-paper";


type ReadingExerciseProps = {
  scrollRef?: React.RefObject<ScrollView>; 
};

export default function ReadingExercise({ scrollRef }: ReadingExerciseProps) {
  const route = useRoute<RouteProp<RootStackParamList, "Reading">>();
  const { sectionID } = route.params;
  const [section, setSection] = useState<Section | null>(null);
  const [answeredQuestions, setAnsweredQuestions] = useState<string[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [questions, setQuestions] = useState<{ id: string; text: string; options: string[]; answered: boolean }[]>([]);
  const scrollViewRef = useRef<ScrollView>(null);
  
  const estimateContentHeight = (content: string) => {
    const CHAR_HEIGHT = 0.35; // Estimate height per character
    return content.length * CHAR_HEIGHT;
  };

  const estimateQuestionGroupHeight = (questionGroup: any) => {
    const CHAR_HEIGHT = 0.5; // Estimate height per character
    return questionGroup.text.length * CHAR_HEIGHT;
  };

  const handleQuestionChange = (questionIndex: number) => {
    setCurrentQuestion(questionIndex + 1);
    const contentHeight = section ? estimateContentHeight(section.content) : 0;
    const questionGroupHeight = section ? estimateQuestionGroupHeight(section.questionGroups[0]) : 0;
    scrollViewRef.current?.scrollTo({
      y: questionIndex * 50 + contentHeight + questionGroupHeight, // Adjust the scroll position as needed
      animated: true,
    });
  };

  const handleAnswerChange = (questionId: string, value: string) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) =>
        question.id === questionId ? { ...question, answered: !!value } : question
      )
    );
    if (value) {
      setAnsweredQuestions((prevAnswered) => [...prevAnswered, questionId]);
    } else {
      setAnsweredQuestions((prevAnswered) => prevAnswered.filter(id => id !== questionId));
    }
  };

  // Fetch section data from API
  useEffect(() => {
    const fetchSection = async () => {
      try {
        const response = await sectionService.getSectionById(sectionID);
        setSection(response.data);
        if (response.data.questionGroups) {
          const allQuestions = response.data.questionGroups.flatMap((group: any) =>
            group.questions.map((q: any) => ({
              id: q.id,
              text: q.text,
              options: q.options,
              answered: false
            }))
          );
          setQuestions(allQuestions);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchSection();
  }, [sectionID]);

  const questionGroups = section ? section.questionGroups : [];

  if (!section) {
    return <ActivityIndicator size={"large"}  />
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        className="reading-exercise flex gap-4"
        ref={scrollViewRef}
      >
        {/* Render the main reading content */}
        <View className="reading-content flex gap-2 items-center">
          {section.content && <HtmlReader html={section.content} />}
        </View>

        {/* Render each question group and its questions */}
        <View className="reading-questions" style={{ display: "flex", gap: 20 }}>
          {questionGroups.length > 0 ? (
            questionGroups.map((questionGroup) => (
              <SelectionFormat
                key={questionGroup.id}
                questionGroup={questionGroup}
                onAnswerChange={handleAnswerChange}
              />
            ))
          ) : (
            <Text>No questions available</Text>
          )}
        </View>
      </ScrollView>
      <BottomNavigation
        questions={questions}
        answeredQuestions={answeredQuestions}
        currentQuestion={currentQuestion}
        onQuestionChange={handleQuestionChange}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },}
)

