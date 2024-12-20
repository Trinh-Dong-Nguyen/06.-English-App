export interface reduxState {
  state: {
    user: string
  }
}

export interface Field {
  text: string
}

export interface Answer {
  text: string
  correct?: boolean
  isCorrect?: boolean
}

export interface Question {
  text: string
  type: string
  answer?: Answer[]
  order: number // Trường order là tùy chọn
}
export interface SidebarContextProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  animate: boolean
}
export type Response = {
  statusCode: number
  message: string
  data: unknown
}
export interface Pagination {
  page: number
  limit: number
}
export const WordType = [
  {
    key: "NOUN",
    text: "Noun",
  },
  {
    key: "VERB",
    text: "Verb",
  },
  {
    key: "ADJECTIVE",
    text: "Adjective",
  },
  {
    key: "ADVERB",
    text: "Adverb",
  },
  {
    key: "PRONOUN",
    text: "Pronoun",
  },
  {
    key: "PREPOSITION",
    text: "Preposition",
  },
  {
    key: "CONJUNCTION",
    text: "Conjunction",
  },
  {
    key: "INTERJECTION",
    text: "Interjection",
  },
]
export const WordTypeMap = Object.fromEntries(WordType.map(({ key, text }) => [key, text]))
