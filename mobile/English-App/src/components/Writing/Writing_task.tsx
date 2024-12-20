import React from 'react';
import { Text, View, Image } from 'react-native';

interface WritingTaskProps {
  taskNumber: number;
  question: string;
  image?: string;
}
const Writing_task: React.FC<WritingTaskProps> = ({ taskNumber, question ,image}) => {
  return (
    <View className='mx-[26]'>
      <Text className='font-bold text-base'>Writing task {taskNumber}</Text>
      {/* <Text>You should spend about <Text className='font-bold'>{timespend}</Text> minutes on this task.</Text>
      <Text>{question}</Text>

      <Text>You should write at least {maximum_wordcount} words.</Text>
      {
        taskNumber === 1 ? (
          <Text>Summarize the formation by selecting and reporting the main features and make comparisons where relevant.</Text>
        ) : (
          <Text>Give reasons for your answer and include any relevant examples from own knowledge or experience.</Text>
        )
      } */}
      <Text className='text-sm'>{question}</Text>
      {image && <Image source={{ uri: image }} className='w-full min-h-[200px] h-[300px] mt-3' />}
    </View>
  );

};


export default Writing_task