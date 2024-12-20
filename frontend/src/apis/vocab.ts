import { httpClient } from "@/services"
import { Response } from "@/type"
import { GrammarRes } from "@/type/grammar"

class GrammarApi {
  constructor() {
    // httpClient.createAuthRefreshInterceptor(() => {
    //   this.logOut()
    //   window.location.href = AUTH_PATH_NAME.DANG_NHAP
    // })
  }
  async getAllVocabByLesson(lessonId: string) {
    try {
      const res = httpClient.get<GrammarRes>(`/lesson/get-all-vocabulary-by-lesson/${lessonId}`)
      return res
    } catch (error) {
      console.log(error)
    }
  }
  async DeleteGrammar(id: string) {
    try {
      const res = await httpClient.delete<Response>(`/grammar/${id}`)
      return res
    } catch (error) {
      console.log(error)
    }
  }
  async UpdateGrammar(id: string) {
    try {
      const res = await httpClient.patch<Response>(`/grammar/${id}`)
      return res
    } catch (error) {
      console.log(error)
    }
  }
}

const grammarApi = new GrammarApi()

export default grammarApi
