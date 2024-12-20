import Section from "./SectionByLesson";

type Lesson = {
  id: string;
  createDate: string;
  updateDate: string;
  name: string;
  description: string;
  content: string;
  type: string;
  sections: Section[];
};
export default Lesson;
