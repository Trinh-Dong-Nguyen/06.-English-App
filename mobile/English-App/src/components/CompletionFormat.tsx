import { Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import QuestionHeading from './QuestionHeading';
import QuestionSubHeading from './QuestionSubHeading';
interface CompletionFormatProps {
  questionList: any[];
}
const CompletionFormat :React.FC<CompletionFormatProps> = ({
  questionList
}) => {
    const dataset = questionList || [];
    const [userInputs, setUserInputs] = useState<string[][]>([[]]);

    const handleInputChange = (text: string, questionIndex: number, index: number) => {
      const newInputs = [...userInputs];
      if (!newInputs[questionIndex]) {
        newInputs[questionIndex] = [];
      }
      newInputs[questionIndex][index] = text;
      setUserInputs(newInputs);
      console.log(newInputs);
    };
    const parseQuestion = (question: string) => {
      return question ? question.split('___') : [];
    };
   	return (
      <View className='border-2 border-[#FCDDEC] rounded-xl mx-5 px-5'>
        <QuestionHeading from={1} to={4} />
        <QuestionSubHeading  text='Complete the notes below.Choose ONE WORD AND/OR A NUMBER from the passage for each answer.' />
        {dataset.map((item, key) => (
          <View key={key} style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', marginVertical: 10 }}>
            {parseQuestion(item.question).map((part, index) => (
              <View key={index} className='flex flex-row items-center'>
                <Text>{part}</Text>
                {index < parseQuestion(item.question).length - 1 && (
                  <View className='flex flex-row items-center'>
                    <Text>{key+1 +'. '}</Text>
                    <TextInput
                      key={`${key}-${index}`}
                      placeholder="___"
                      onChangeText={(text) => handleInputChange(text, key, index)}
                      value={userInputs[key] && userInputs[key][index]}
                      style={{ borderColor: 'gray', borderWidth: 1, padding: 5, width: 50, textAlign: 'center', marginHorizontal: 5 }}
                    />
                  </View>
                )}
              </View>
            ))}
          </View>
        ))}
    </View>
	)
}

export default CompletionFormat