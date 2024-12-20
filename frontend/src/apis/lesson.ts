import { httpClient } from "@/services"
import { Response } from "@/type"
import { GrammarRes } from "@/type/grammar"
import { LessonCreate, LessonCreateRes, LessonDetailRes, LessonRes } from "@/type/lesson"
import { vocabulariesRes, vocabularyDTO } from "@/type/vocabulary"

class LessonApi {
  constructor() {
    // httpClient.createAuthRefreshInterceptor(() => {
    //   this.logOut()
    //   window.location.href = AUTH_PATH_NAME.DANG_NHAP
    // })
  }
  async CreateLesson(data: LessonCreate) {
    try {
      const res = await httpClient.post<LessonCreateRes>("/lesson/normal", data)
      return res
    } catch (error) {
      console.log(error)
    }
  }
  async GetLessonByCourse(courseId: string) {
    try {
      const res = await httpClient.get<LessonRes>(`/lesson/get-all-lessons-by-course/${courseId}`)
      return res
    } catch (error) {
      console.log(error)
    }
  }
  async GetLessonById(lessonId: string) {
    try {
      const res = await httpClient.get<LessonDetailRes>(`/lesson/get-one/${lessonId}`)
      return res
    } catch (error) {
      console.log(error)
    }
  }
  async AddGrammarToLesson(lessonId: string, grammarIds: string[]) {
    try {
      const res = await httpClient.post<Response>(`/lesson/add-grammar-to-lesson/${lessonId}`, { grammarIds })
      return res
    } catch (error) {
      console.log(error)
    }
  }
  async AddVocabToLesson(lessonId: string, vocabularies: vocabularyDTO[]) {
    try {
      const res = await httpClient.post<Response>(`/lesson/add-vocabulary-to-lesson/${lessonId}`, { vocabularies })
      return res
    } catch (error) {
      console.log(error)
    }
  }
  async getGrammarByLesson(lessonId: string) {
    try {
      const res = await httpClient.get<GrammarRes>(`/lesson/get-all-grammar-by-lesson/${lessonId}`)
      return res
    } catch (error) {
      console.log(error)
    }
  }
  async getVocabByLesson(lessonId: string) {
    try {
      const res = await httpClient.get<vocabulariesRes>(`/lesson/get-all-vocabulary-by-lesson/${lessonId}`)
      return res
    } catch (error) {
      console.log(error)
    }
  }
}

const lessonApi = new LessonApi()

export default lessonApi
