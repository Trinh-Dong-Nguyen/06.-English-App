import { Response } from "."

export const Section = [
  {
    key: "SPEAKING",
    text: "Speaking",
  },
  {
    key: "LISTENING",
    text: "Listening",
  },
  {
    key: "READING",
    text: "Reading",
  },
  {
    key: "WRITING",
    text: "Writing",
  },
]

export const sectionNameMap = Object.fromEntries(Section.map(({ key, text }) => [key, text]))

export enum SectionType {
  SPEAKING = "SPEAKING",
  LISTENING = "LISTENING",
  READING = "READING",
  WRITING = "WRITING",
  ROOT = "ROOT",
}
export interface Section {
  id: string
  title: string
  content: string
  type: SectionType
  sectionMedia: string
  createDate: string
  updateDate: string
  questionGroups: QuestionGroup[]
  questions: Question[]
}

export interface SectionRes extends Response {
  data: Section[]
}

export interface SectionDetailRes extends Response {
  data: Section
}

export interface SectionCreate {
  title: string
  content: string
  type: string
  lessonId: string
  sectionMedia?: string
}

export interface QuestionGroup {
  id: string
  text: string
  questionGroupType: string
  createDate: string
  questions: Question[]
}

export interface Question {
  id: string
  questionGroup?: QuestionGroup
  section: Section
  text: string
  type: string
  studentAnswers: StudentAnswer[]
  answers: Answer[]
  order: number
}

export interface StudentAnswer {
  id: string
  question: Question
  // Các thuộc tính khác của StudentAnswer
}

export interface Answer {
  id: string
  question: Question
  // Các thuộc tính khác của Answer
}
