import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator, StackHeaderStyleInterpolator } from '@react-navigation/stack'
import { Button, Icon } from '@rneui/themed'
import React, { useState } from 'react'
import { Animated, FlatList, TouchableOpacity, View, Text } from 'react-native'
import { PaperProvider, Portal } from 'react-native-paper'
import { QList, UserPostHeader } from '../../components/Q&A'
import AnswerScreen from './AnswerScreen'
import PostQuestionModal from './postQuestionModal'
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
    MenuProvider,
} from 'react-native-popup-menu';

const forFade: StackHeaderStyleInterpolator = ({ current, next }) => {
    const opacity = Animated.add(
        current.progress,
        next ? next.progress : 0
    ).interpolate({
        inputRange: [0, 1, 2],
        outputRange: [0, 1, 0],
    });

    return {
        leftButtonStyle: { opacity },
        rightButtonStyle: { opacity },
        titleStyle: { opacity },
        backgroundStyle: { opacity },
    };
};

const CustomMenu = () => {


    return (
        <Menu>
            <MenuTrigger >
                <Icon name='dots-vertical' type='material-community' color='#5D5FEF' />
            </MenuTrigger>
            <MenuOptions>
                <MenuOption onSelect={() => alert(`Edit`)} text='Edit' />
                <MenuOption onSelect={() => alert(`Delete`)} >
                    <Text style={{ color: 'red' }}>Delete</Text>
                </MenuOption>
            </MenuOptions>
        </Menu>
    );
}

const QuestionStack = ({ navigation }: { navigation: any }) => {
    const data = [
        {
            title: 'What is your name?',
            question: 'What is your name?',
            answer: ['My name is John Doe']
        },
        {
            title: 'What is your name?',
            question: 'What is your age?',
            answer: ['I am 25 years old']
        },
        {
            title: 'What is your name?',
            question: 'You can start using Material UI right away with minimal front-end  infrastructure by installing it via CDN, which is a great option for  rapid prototyping???',
            answer: ['I am a software engineer', 'I am software engineer', 'I a software engineer']
        }]
    //toggle modal
    const [isModalVisible, setIsModalVisible] = useState(false);

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };
    return (
        <PaperProvider>
            <Portal>
                <View className='w-full h-full relative mt-[24px] px-[18px]'>
                    <FlatList
                        data={data}
                        renderItem={({ item }) => (
                            <TouchableOpacity className='mt-3' onPress={() => { navigation.navigate('Detail') }}>
                                <UserPostHeader avatar={require('../../../assets/avatar.png')} name='John Doe' date={new Date()} />
                                <QList title={item.title} question={item.question} answer={item.answer} />
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item) => item.question}
                    />

                    <Button onPress={toggleModal}
                        buttonStyle={{
                            borderRadius: 50,
                            backgroundColor: '#EF5DA8',
                            width: 50,
                            height: 50,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginBottom: 20
                        }}
                        containerStyle={{
                            position: 'absolute',
                            bottom: 50,
                            right: 20,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginBottom: 20
                        }}>
                        <Icon name="add" type='material' color='white' />
                    </Button>

                    <PostQuestionModal isVisible={isModalVisible} toggleModal={toggleModal} />
                </View>
            </Portal>
        </PaperProvider>
    )
}

const QuestionScreen = () => {

    const Stack = createStackNavigator();

    return (
        <MenuProvider>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name="Q&A"
                        component={QuestionStack}
                        options={{
                            headerTintColor: '#5D5FEF',
                            headerStyle: { backgroundColor: '#FFF4F9' },
                        }}
                    />
                    <Stack.Screen
                        name="Detail"
                        component={AnswerScreen}
                        options={{
                            headerRight: () => (
                                <CustomMenu />
                            ),
                            headerStyleInterpolator: forFade,
                            headerTintColor: '#5D5FEF',
                            headerStyle: { backgroundColor: '#FFF4F9' },
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </MenuProvider>
    )
}

export default QuestionScreen