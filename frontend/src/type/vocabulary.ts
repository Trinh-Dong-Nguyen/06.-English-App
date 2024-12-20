import { Response } from "."

export interface vocabularyDTO {
  vocabulary: string
  note: string
  mediaWord: string
  wordType: string
}

export interface vocabulary extends vocabularyDTO {
  createDate: string
}

export interface vocabulariesRes extends Response {
  data: vocabularyDTO[]
}

export interface vocabularyDetailRes extends Response {
  data: vocabularyDTO
}
