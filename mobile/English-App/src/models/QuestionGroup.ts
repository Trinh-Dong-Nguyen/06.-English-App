import { QuestionGroupType } from "../constants/enums/QuestionGroupType";

type QuestionGroup = {
  id: string;
  createDate: string;
  updateDate: string;
  text: string;
  questions: Question[];
  questionGroupType: QuestionGroupType;
};

export default QuestionGroup;
