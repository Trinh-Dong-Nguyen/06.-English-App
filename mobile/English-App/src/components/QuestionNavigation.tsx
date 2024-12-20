import React, { useState, RefObject } from 'react';
import { View, TouchableOpacity, StyleSheet, ScrollView, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../../colors';

interface BottomNavigationProps {
  questions: { id: string; text: string; options: string[]; answered: boolean }[];
  answeredQuestions: string[];
  currentQuestion: number;
  onQuestionChange: (questionId: number) => void;
}

const QUESTIONS_PER_PAGE = 7;

const BottomNavigation: React.FC<BottomNavigationProps> = ({
  questions,
  answeredQuestions,
  currentQuestion,
  onQuestionChange,
}) => {
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = (direction: 'prev' | 'next') => {
    setCurrentPage((prevPage) => {
      const newPage = direction === 'prev' ? prevPage - 1 : prevPage + 1;
      return Math.max(0, Math.min(newPage, Math.ceil(questions.length / QUESTIONS_PER_PAGE) - 1));
    });
  };

  const startIndex = currentPage * QUESTIONS_PER_PAGE;
  const endIndex = Math.min(startIndex + QUESTIONS_PER_PAGE, questions.length);
  const currentQuestions = questions.slice(startIndex, endIndex);

  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity onPress={() => handlePageChange('prev')} disabled={currentPage === 0}>
        <Icon name="chevron-back" size={24} color={currentPage === 0 ? '#ccc' : '#6b4ce6'} />
      </TouchableOpacity>
      {currentQuestions.map((question, index) => {
        const questionIndex = startIndex + index;
        return (
          <TouchableOpacity
            key={question.id}
            style={[
              styles.navDot,
              {
                backgroundColor: question.answered
                  ? '#6b4ce6'
                  : 'transparent',
              },
            ]}
            onPress={() => onQuestionChange(questionIndex)}
          >
            <Text style={styles.navDotText}>{questionIndex + 1}</Text>
            <View
              style={[
                styles.dotInner,
                currentQuestion === questionIndex + 1 && styles.activeDot,
              ]}
            />
          </TouchableOpacity>
        );
      })}
      <TouchableOpacity onPress={() => handlePageChange('next')} disabled={endIndex >= questions.length}>
        <Icon name="chevron-forward" size={24} color={endIndex >= questions.length ? '#ccc' : '#6b4ce6'} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: colors.pink4,
  },
  navDot: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#6b4ce6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navDotText: {
    color: colors.pink1,
    fontSize: 12,
  },
  dotInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'transparent',
  },
  activeDot: {
    backgroundColor: colors.blue1,
  },
});

export default BottomNavigation;
