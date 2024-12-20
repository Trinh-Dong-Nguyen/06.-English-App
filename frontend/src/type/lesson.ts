import { Course } from "./course"
import { Response } from "."
import { Section } from "./section"

export const Lesson = [
  {
    key: "WRITING",
    text: "Writing",
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
    key: "SPEAKING",
    text: "Speaking",
  },
]
export interface Lesson {
  id: string
  name: string
  description: string
  content: string
  type: string
  createDate: string
}

export interface LessonRes extends Response {
  data: Lesson[]
}

export interface LessonDetailRes extends Response {
  data: Lesson
}

export interface LessonCreate {
  courseId: string
  name: string
  description: string
  content: string
}

export interface LessonCreateRes extends Response {
  data: {
    id: string
    name: string
    description: string
    content: string
    type: string
    course: Course
    teacher: {
      id: string
      degree: string | null
      userInfo: {
        id: string
        role: string
        firstName: string
        lastName: string
        email: string
        phone: string
        birthday: string
        avatarUrl: string
      }
    }
    createDate: string
  }
}

export interface Lesson {
  id: string
  name: string
  description: string
  content: string
  sections: Section[]
  createdDate: string
  updatedAt: string
}
