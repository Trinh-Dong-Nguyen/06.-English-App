import QuestionGroup from "./QuestionGroup";

type Section = {
  id: string;
  createDate: string;
  updateDate: string;
  title: string;
  content: string;
  type: string;
  sectionMedia: string;
  questionGroups: QuestionGroup[];
};

export default Section;
