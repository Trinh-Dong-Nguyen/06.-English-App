import { Section as SectionDetail } from "@/type/section"

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Section {
  handling: boolean
  current: string
  data: SectionDetail
  changed: boolean
  update: {
    [key: string]: {
      id: string
      text: string
      type: string
      order: number
      answers: {
        text: string
        isCorrect: boolean
      }[]
    }[]
  }
}
