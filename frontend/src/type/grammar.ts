import { Response } from "."

export interface Grammar {
  id: string
  title: string
  description: string
  content: string
}

export interface GrammarRes extends Response {
  data: Grammar[]
}
