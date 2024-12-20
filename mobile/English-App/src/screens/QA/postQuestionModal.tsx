import { Formik } from 'formik';
import React, { useState } from 'react';
import { TextInput, TouchableOpacity, View, ViewStyle } from 'react-native';
import { Modal, Text } from 'react-native-paper';
interface PostQuestionModalProps {
    isVisible: boolean;
    toggleModal: () => void;
}

const PostQuestionModal: React.FC<PostQuestionModalProps> = ({ isVisible, toggleModal }) => {
    const containerStyle: ViewStyle = {
        backgroundColor: 'white',
        borderRadius: 20,
        margin: 20,
        width: 300,
        height: 220,
        padding: 20,
        marginHorizontal: 'auto'
    };

    return (
        <Modal visible={isVisible} onDismiss={toggleModal} contentContainerStyle={containerStyle}>
            <View className='w-full h-full '>
                <Text>Post a question</Text>
                <Formik
                    initialValues={{ question: '' }}
                    onSubmit={(values) => console.log(values)}
                >
                    {({ handleChange, handleBlur, handleSubmit, values }) => (
                        <View className='flex gap-y-1'>
                            <TextInput
                                placeholder='Title'
                                onChangeText={handleChange('question')}
                                onBlur={handleBlur('question')}
                                value={values.question}
                                style={{ backgroundColor: '#FFF4F9',
                                    borderTopRightRadius: 4,
                                    borderTopLeftRadius: 4,
                                    borderBottomColor: 'black',
                                    padding: 10,
                                 }}
                            />
                            <TextInput
                                placeholder='Question'
                                onChangeText={handleChange('question')}
                                onBlur={handleBlur('question')}
                                value={values.question}
                                style={{ backgroundColor: '#FFF4F9',
                                    borderTopRightRadius: 4,
                                    borderTopLeftRadius: 4,
                                    borderBottomColor: 'black',
                                    padding: 10,
                                 }}
                            />
                            <View className='flex flex-row gap-x-1 justify-end'>
                                <TouchableOpacity onPress={toggleModal}>
                                    <Text className='text-[#5D5FEF]'>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { console.log("Sent") }}>
                                    <Text className='text-[#5D5FEF]'>Submit</Text>
                                </TouchableOpacity>

                            </View>
                        </View>
                    )}
                </Formik>
            </View>
        </Modal>

    );
}

export default PostQuestionModal