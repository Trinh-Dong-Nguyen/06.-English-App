import { Group } from "lucide-react"
import { Section } from "./section"

export const Lesson = [
  {
    key: "COMBO_BOX",
    text: "Combo box",
  },
  {
    key: "BLANK",
    text: "Blank",
  },
  {
    key: "MULTIPLE_CHOICE",
    text: "Multiple choice",
  },
]
export const questionGroupNameMap = Object.fromEntries(Lesson.map(({ key, text }) => [key, text]))
// Type for QuestionGroups for Reading and Listening Skills
export type QuestionGroups = {
  id: string
  text: string
  groups: Group[]
  createDate: string
  updateDate: string
}

export type Group = {
  questions: Question[]
}

export type Question = {
  id: string
  text: string
  type: string
  order: number
  createDate: string
  updateDate: string
}

export type QuestionGrRes = {
  id: string
  text: string
  questionGroupType: string
  section: Section
  createDate: string
  updateDate: string
}

export interface QuestionGroupRes extends Response {
  data: QuestionGrRes
}
