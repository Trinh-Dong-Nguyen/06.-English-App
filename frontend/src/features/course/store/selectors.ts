/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSelector } from "@reduxjs/toolkit"
import { CourseView } from "./interface"

export const initialState: CourseView = {
  selectedCourse: {
    id: "",
    name: "",
  },
  selectedLesson: {
    id: "",
    name: "",
    vocab: false,
    grammar: false,
  },
  selectedSection: {
    id: "",
    name: "",
    sectionDetail: false,
    createQuestion: false,
    type: "",
  },
}

const selectDomain = (state: { course: any }) => state.course || initialState

export const selectCourseView = createSelector([selectDomain], (state) => state.selectedCourse ?? {})
export const selectLessonView = createSelector([selectDomain], (state) => state.selectedLesson ?? {})
export const selectSectionView = createSelector([selectDomain], (state) => state.selectedSection ?? {})
