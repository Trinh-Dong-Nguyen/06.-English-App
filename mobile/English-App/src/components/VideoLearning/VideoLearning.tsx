import { View, Text } from "react-native";
import { Video, ResizeMode } from "expo-av";
import React, { useState } from "react";
export default function VideoLearning() {
  const [play, setPlay] = useState(false);

  return (
    <View className="w-full">
      <Text>Video Learning</Text>
      <Video
        source={{
          uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
        }}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        shouldPlay
        // onPlaybackStatusUpdate={(status) => {
        //   if (status.didJustFinish) {
        //     setPlay(false);
        //   }
        // }}
        resizeMode={ResizeMode.CONTAIN}
        useNativeControls
        style={{ width: 300, height: 300 }}
      />
    </View>
  );
}
