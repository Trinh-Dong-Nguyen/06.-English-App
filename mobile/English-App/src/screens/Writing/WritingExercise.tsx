import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { Button } from '@rneui/themed'
import Writing_task from '../../components/Writing/Writing_task'
import Writing_submit from '../../components/Writing/Writing_submit'

const WritingExercise = () => {
    const [task, setTask] = useState(true);

    const handleTask = () => {
        setTask(true); // Set to "true" for the "Task" button
    };

    const handleWriting = () => {
        setTask(false); // Set to "false" for the "Writing" button
    };
    
    const [textInputValue, setTextInputValue] = useState('');
    return (
        <View className='flex relative h-full'>
            <View className='mt-[50px]'>
                {
                    task ? (
                        <Writing_task taskNumber={0} question={''} />
                    ) : (
                        <Writing_submit />
                    )
                }
            </View>

            <View className='flex flex-row justify-between p-3 gap-2 absolute right-0 bottom-0 left-0'>
                <Button
                    title={'Task'}
                    containerStyle={{
                    }}
                    onPress={handleTask}
                    buttonStyle={{ 
                        backgroundColor: '#EF5DA8',
                        borderRadius: 12,
                        width: 100,
                    }}
                />
                <Button
                    title={'Writing'}
                    containerStyle={{
                    }}
                    onPress={handleWriting}
                    buttonStyle={{ 
                        backgroundColor: '#EF5DA8',
                        borderRadius: 12,
                        width: 100,
                    }}
                />
            </View>
        </View>
    )
}

export default WritingExercise