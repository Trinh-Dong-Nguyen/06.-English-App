import React from 'react'
import { FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { PaperProvider, Portal } from 'react-native-paper'
import { Answer, UserPostHeader } from '../../components/Q&A'
import QView from '../../components/Q&A/QList'

const QADetail = () => {

  const handleChange = (name: string) => (text: string) => {
    console.log(text)
  }

  return (
    <PaperProvider>
      <Portal>
        <View>
          {/* Header */}
          {/* <View
        className="bg-[#FFF4F9] flex flex-row justify-between items-center px-4 pt-10 pb-4 w-full"
        style={{
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 8,
        }}
      /> */}
          <View className='px-3'>
            {/* Question */}
            <View>
              <UserPostHeader avatar={require('../../../assets/avatar.png')} name='John Doe' date={new Date()} />
              <QView title='What is your name?' question='What is your name?' answer={['My name is John Doe']} />
            </View>
            {/* Answer */}

            <View className='flex flex-row items-center justify-between w-full'>
              <TextInput
                placeholder='Submit your response'
                onChangeText={handleChange('question')}
                style={{
                  backgroundColor: '#FFF4F9',
                  marginTop: 10,
                  borderTopRightRadius: 4,
                  borderTopLeftRadius: 4,
                  borderBottomColor: 'black',
                  padding: 10,
                  width: '85%',
                  height: 56,
                }}

              />
              <TouchableOpacity>
                <Text className='text-[#5D5FEF] font-semibold text-sm'>Post</Text>
              </TouchableOpacity>
            </View>

            <FlatList
              data={['My name is John Doe']}
              style={{ marginTop: 10 }}
              renderItem={({ item }) =>

                <View>
                  <UserPostHeader avatar={require('../../../assets/avatar.png')} name='John Doe' date={new Date()} />
                  <Answer answer={''} />
                </View>

              }
              keyExtractor={(item) => item}
            />
          </View>
        </View>
      </Portal>
    </PaperProvider>
  )
}

export default QADetail