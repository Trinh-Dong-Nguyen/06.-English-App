import { Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'

const Writing_submit = () => {
  const [text, setText] = useState('');
  const [wordcount, setWordcount] = useState(0);
  const handleChangeText = (text: string) => {
    setText(text);
    const numberOfWords = text.trim().split(/\s+/).filter(word => word.length > 0)  
    setWordcount(numberOfWords.length);
  }
    return (
    <View className='mx-6 border-1'>
      <TextInput className='border-2 h-5/6 border-[#EF5DA8] rounded-lg w-full'
        multiline
        placeholder="Write your answer here"
        onChangeText={handleChangeText}
        style={{ textAlignVertical: 'top',
          padding: 10,
         }}
        />
      <Text className='mt-10 text-sm font-medium'>Word count: {wordcount}</Text>
    </View>
  )
}

export default Writing_submit
