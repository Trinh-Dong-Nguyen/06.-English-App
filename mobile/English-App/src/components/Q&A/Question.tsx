import { View, Text } from 'react-native'
import React from 'react'

const Question = ({ title,question }: { title: string,question: string}) => {
  return (
    <View >
      <Text className='text-[14px] font-semibold'>{title}</Text>
      <Text className='text-[14px] font-normal'>{question}</Text>
    </View>
  )
}

export default Question