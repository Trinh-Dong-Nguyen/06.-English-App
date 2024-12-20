import { httpClient } from "@/services"
import { SectionCreate, SectionDetailRes, SectionRes } from "@/type/section"

interface CreateQuestionGroup {
  text: string
  section: string
  questionGroupType: string
}

interface CreateQuestion {
  sectionId?: string
  questionGroupId?: string
  questions: {
    questionGroup?: string
    section?: string
    text: string
    type: string
    order: number
    answer?: {
      text: string
      isCorrect: boolean
    }[]
  }[]
}

class SectionApi {
  constructor() {
    // httpClient.createAuthRefreshInterceptor(() => {
    //   this.logOut()
    //   window.location.href = AUTH_PATH_NAME.DANG_NHAP
    // })

    httpClient.setAuthHeader(localStorage.getItem("accessToken") || "")
  }
  async CreateSection(data: SectionCreate) {
    try {
      const res = await httpClient.post<SectionRes>("/section", data)
      return res
    } catch (error) {
      console.log(error)
    }
  }
  async UpdateSection(data: SectionCreate) {
    try {
      const res = await httpClient.patch<SectionRes>("/section", data)
      return res
    } catch (error) {
      console.log(error)
    }
  }
  async GetSectionByLesson(lessonId: string) {
    try {
      const res = await httpClient.get<SectionRes>(`/section/get-all-section-by-lesson/${lessonId}`)
      return res
    } catch (error) {
      console.log(error)
    }
  }
  async GetSectionById(id: string) {
    console.log("GetSectionById", id)
    try {
      console.log("getSectionById", id)
      const res = await httpClient.get<SectionDetailRes>(`/section/${id}`)
      return res
    } catch (error) {
      console.log(error)
    }
  }
  async CreateQuestionGroup(data: CreateQuestionGroup) {
    try {
      const res = await httpClient.post<SectionRes>("/question-group", data)
      return res
    } catch (error) {
      console.log(error)
    }
  }
  async CreateQuestion(data: CreateQuestion) {
    try {
      const res = await httpClient.post<SectionRes>("/question/create-many-question", data)
      return res
    } catch (error) {
      console.log(error)
    }
  }
}

const sectionApi = new SectionApi()

export default sectionApi
