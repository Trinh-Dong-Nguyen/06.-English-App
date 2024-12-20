import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import { Audio } from 'expo-av';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as FileSystem from 'expo-file-system';
import colors from '../../../colors';

export default function SpeakingExercise() {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [question, setQuestion] = useState("What's your favorite book and why?");
  const [recordingUri, setRecordingUri] = useState<string | null>(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [savedFilePath, setSavedFilePath] = useState<string | null>(null);



  useEffect(() => {
    return () => {
      if (recording) {
        recording.stopAndUnloadAsync();
      }
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [recording, sound]);

  async function startRecording() {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      setIsRecording(true);
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    if (!recording) {
      return;
    }

    setIsRecording(false);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    setRecordingUri(uri);
    setRecording(null);
    console.log('Recording saved at', uri);
  }

  async function playRecording() {
    if (!recordingUri) {
      return;
    }

    const { sound } = await Audio.Sound.createAsync({ uri: recordingUri });
    setSound(sound);
    setIsPlaying(true);
    await sound.playAsync();
    sound.setOnPlaybackStatusUpdate((status) => {
      if (status.isLoaded) {
        if (status.durationMillis) {
          setProgress(status.positionMillis / status.durationMillis);
        }
        if (status.durationMillis !== undefined) {
          setDuration(status.durationMillis);
        }
        if (status.didJustFinish) {
          setIsPlaying(false);
        }
      }
    });
  }

  async function pauseRecording() {
    if (sound) {
      await sound.pauseAsync();
      setIsPlaying(false);
    }
  }

  async function replayRecording() {
    if (sound) {
      await sound.setPositionAsync(0);
      await sound.playAsync();
      setIsPlaying(true);
    }
  }

  async function saveRecording() {
    if (!recordingUri) {
      Alert.alert('No recording to save');
      return;
    }

    try {
      const destPath = `${FileSystem.documentDirectory}recording.mp3`;
      await FileSystem.copyAsync({
        from: recordingUri,
        to: destPath,
      });
      setSavedFilePath(destPath);
      console.log('Recording saved', `File saved to: ${destPath}`);

      // Read the file as a binary string
      const fileData = await FileSystem.readAsStringAsync(destPath, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // Post the file to the backend API
      const response = await fetch('https://your-backend-api.com/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fileName: 'recording.mp3',
          fileData: fileData,
        }),
      });

      if (response.ok) {
        Alert.alert('Success', 'Recording uploaded successfully');
      } else {
        Alert.alert('Error', 'Failed to upload recording');
      }
    } catch (error) {
      console.error('Error saving recording:', error);
      Alert.alert('Error', 'Failed to save recording');
    }
  }

  const formatTime = (millis: number) => {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return `${minutes}:${Number(seconds) < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text className='font-sans text-header-2' style={styles.title}>Speaking Exercise</Text>
        <Text className='font-sans text-body'style={styles.question}>{question}</Text>
        <TouchableOpacity
          onPress={isRecording ? stopRecording : startRecording}
          style={styles.recordButton}
        >
          {isRecording ? (
            <Icon name="stop" size={32} color="white" />
          ) : (
            <Icon name="microphone" size={32} color="white" />
          )}
        </TouchableOpacity>
        <Text style={styles.recordingText}>
          {isRecording ? 'Tap to stop recording' : 'Tap to start recording'}
        </Text>

        {recordingUri && (
          <View>
            <Slider
              value={progress}
              onValueChange={(value: number) => {
                if (sound) {
                  sound.setPositionAsync(value * duration);
                }
              }}
              style={styles.slider}
            />
            <View style={styles.timeContainer}>
              <Text style={styles.timeText}>{formatTime(progress * duration)}</Text>
              <Text style={styles.timeText}>{formatTime(duration)}</Text>
            </View>
            <View style={styles.buttonRow}>
                <TouchableOpacity
                onPress={isPlaying ? pauseRecording : playRecording}
                style={styles.playButton}
                >
            
                {isPlaying ? (
                    <Icon name="pause" size={24} color={colors.blue2} />
                ) : (
                    <Icon name="play" size={24} color={colors.blue2} />
                )}
                </TouchableOpacity>
                <TouchableOpacity
                onPress={replayRecording}
                style={styles.replayButton}
                >
                <Icon name="repeat" size={24} color={colors.blue2} />
                </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={saveRecording}
              style={styles.submitButton}
            >
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
  },
  card: {
    backgroundColor: colors.pink4,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    padding: 16,
    width: '100%',
    maxWidth: 400,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: colors.blue1,
    paddingTop: 16,
    fontFamily: 'WorkSans_400Regular',
  },
  question: {
    marginBottom: 24,
    textAlign: 'center',
  },
  recordButton: {
    backgroundColor: colors.blue1,
    borderRadius: 50,
    padding: 16,
    paddingLeft: 20,
    paddingRight: 20,
    alignSelf: 'center',
  },
  recordingText: {
    marginTop: 16,
    textAlign: 'center',
    color: '#888',
  },
  playButton: {
  },
  slider: {
    marginTop: 32,
    color: colors.blue1,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  timeText: {
    color: '#888',
  },
  replayButton: {
    alignSelf: 'center',
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
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});