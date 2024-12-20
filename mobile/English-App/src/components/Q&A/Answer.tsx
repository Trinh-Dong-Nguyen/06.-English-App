import React from 'react'
import { Text } from 'react-native'

const Answer = ({ answer }: { answer: string})  => {
  return (
    <Text className='text-[14px] font-normal'>{answer}</Text>
  )
}

export default Answer