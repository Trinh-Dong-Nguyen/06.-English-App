export interface CourseView {
  selectedCourse: {
    id: string
    name: string
  }
  selectedLesson: {
    id: string
    name: string
    vocab: boolean
    grammar: boolean
  }
  selectedSection: {
    id: string
    name: string
    sectionDetail: boolean
    createQuestion: boolean
    type: ""
  }
}
