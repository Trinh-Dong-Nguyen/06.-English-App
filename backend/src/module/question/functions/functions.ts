import { Question } from "../entities/question.entity";

export function groupQuestionsByQuestionGroup(questions: Question[]): Record<string, any> {
  const groupedQuestions: Record<string, any> = {};

  questions.forEach((question) => {
    const groupKey = question.questionGroup ? question.questionGroup.id : 'null';
    
    if (!groupedQuestions[groupKey]) {
      groupedQuestions[groupKey] = {
        questionGroup: question.questionGroup,
        questions: []
      };
    }

    groupedQuestions[groupKey].questions.push(question);
  });

  return groupedQuestions;
}