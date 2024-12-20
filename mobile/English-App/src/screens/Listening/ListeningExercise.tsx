import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  Dimensions
} from 'react-native';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/Ionicons';
import { Audio } from 'expo-av'; // Import Audio from expo-av
import BottomNavigation from '../../components/QuestionNavigation';
import colors from '../../../colors';
import Section from "../../models/Section";
import sectionService from "../../services/section.service";
import { useRoute, RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../type";
import SelectionFormat from "../../components/SelectionFormat/SelectionFormat";
import { useFocusEffect } from '@react-navigation/native';
import { Button } from 'react-native-paper';
import { Input } from 'react-native-elements';
import HtmlReader from '../../components/HtmlReader';

const CONTENT_HEIGHT = 400;
const BOTTOM_NAV_HEIGHT = 80;

type ListeningExerciseProps = {
  scrollRef?: React.RefObject<ScrollView>; 
};

export default function ListeningExerciseScreen() {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0); // Initialize duration state
  const [isPlaying, setIsPlaying] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<string[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const scrollViewRef = useRef<ScrollView>(null);
  const [questions, setQuestions] = useState<{ id: string; text: string; options: string[]; answered: boolean }[]>([]);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const route = useRoute<RouteProp<RootStackParamList, "Reading">>();
  const { sectionID } = route.params;
  const [section, setSection] = useState<Section | null>(null);
  const { width } = Dimensions.get("window");
  const questionGroups = section ? section.questionGroups : [];

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

  useEffect(() => {
    const loadAudio = async () => {
      if (section && section.sectionMedia) {
        const { sound } = await Audio.Sound.createAsync(
          { uri: section.sectionMedia },
          { shouldPlay: false }
        );
        setSound(sound);

        // Fetch and set the duration of the audio
        const status = await sound.getStatusAsync();
        if (status.isLoaded) {
          if (status.durationMillis !== undefined) {
            setDuration(status.durationMillis / 1000); // Convert milliseconds to seconds
          }
        }

        // Update currentTime as the audio plays
        sound.setOnPlaybackStatusUpdate((status) => {
          if (status.isLoaded && status.positionMillis !== undefined) {
            setCurrentTime(status.positionMillis / 1000); // Convert milliseconds to seconds
          }
        });
      }
    };

    loadAudio();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [section]);

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        if (sound) {
          sound.stopAsync();
        }
      };
    }, [sound])
  );

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const estimateContentHeight = (content: string) => {
    const CHAR_HEIGHT = 0.5; // Estimate height per character
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
      y: questionIndex * 150 + contentHeight + questionGroupHeight, // Adjust the scroll position as needed
      animated: true,
    });
  };

  const handlePlayPause = async () => {
    if (sound) {
      if (isPlaying) {
        await sound.pauseAsync();
      } else {
        await sound.playAsync();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleInputChange = (questionId: string, value: string) => {
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

  if (!section) {
    return <Text>Loading...</Text>;
  }
  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.audioPlayer}>
        <Text style={styles.playAudioText}>Play audio</Text>
        <View style={styles.playerControls}>
          <TouchableOpacity onPress={handlePlayPause}>
            <Icon
              name={isPlaying ? 'pause' : 'play'}
              size={24}
              color={colors.blue1}
            />
          </TouchableOpacity>
          <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={duration}
            value={currentTime}
            onValueChange={async (value) => {
              setCurrentTime(value);
              if (sound) {
                await sound.setPositionAsync(value * 1000);
              }
            }}
            minimumTrackTintColor="#6b4ce6"
            maximumTrackTintColor="#ddd"
            thumbTintColor="#6b4ce6"
          />
          <Text style={styles.timeText}>{formatTime(duration)}</Text>
        </View>
      </View>

      <ScrollView
        className="reading-exercise flex gap-4"
        ref={scrollViewRef}
      >
        <View
          className="reading-questions"
          style={{ display: "flex", gap: 20 }}
        >
          {questionGroups ? (
            <>
              {questionGroups.map((questionGroup, groupIndex) => (
              <ScrollView key={groupIndex} style={styles.readingQuestions}>
                <HtmlReader html={questionGroup.text} />
                {questionGroup.questions.map((question, questionIndex) => (
                    <View key={question.id} style={{ marginBottom: 10 }}>
                    <Text style={{ fontWeight: 'bold' }}>
                      {groupIndex + 1}.{questionIndex + 1}. {question.text}
                    </Text>
                    <Input
                      style={styles.input}
                      underlineColorAndroid="transparent"
                      inputContainerStyle={{ borderBottomWidth: 0 }} // Remove the underline
                      onChangeText={(value) => handleInputChange(question.id, value)}
                    />
                    </View>
                ))}
              </ScrollView>
              ))}
            </>
          ) : (
            <Text>No questions available</Text>
          )}
        </View>
        <TouchableOpacity
          onPress={() => {}}
          style={styles.submitButton}
        >
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>

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
  },
  scrollContainer: {
    height: CONTENT_HEIGHT,
  },
  scrollContent: {
    paddingBottom: BOTTOM_NAV_HEIGHT,
  },
  audioPlayer: {
    padding: 16,
  },
  readingContent: {
    flex: 1,
    alignItems: 'flex-start', // Changed to flex-start for better text alignment
    marginVertical: 10,
    paddingHorizontal: 16,
    width: '100%'
  },
  playAudioText: {
    fontSize: 16,
    color: '#6b4ce6',
    marginBottom: 8,
  },
  playerControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  slider: {
    flex: 1,
    height: 40,
  },
  timeText: {
    fontSize: 12,
    color: '#666',
  },
  playbackSpeed: {
    fontSize: 12,
    color: '#666',
    marginLeft: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sectionImage: {
    height: 240,
    width: 160,
    marginBottom: 10,
  },
  readingQuestions: {
    display: 'flex',
    gap: 20,
    paddingHorizontal: 16,
  },
  submitButton: {
    backgroundColor: colors.pink1,
    borderRadius: 30,
    padding: 16,
    alignSelf: 'center',
    marginTop: 16,
  },
  submitButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: colors.pink1,
    borderRadius: 10,
    padding: 5,
    marginHorizontal: 5,
    maxWidth: 100,
    height: 20,
  }
});

