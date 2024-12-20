import { createSlice } from "@reduxjs/toolkit"

import { initialState } from "./selectors"

const slice = createSlice({
  name: "course",
  initialState,
  reducers: {
    updateSelectedCourse: (state, action) => {
      const { id, name } = action.payload
      state.selectedCourse.id = id
      state.selectedCourse.name = name
    },
    updateSelectedLesson: (state, action) => {
      Object.entries(action.payload).forEach(([key, value]) => {
        if (key in state.selectedLesson) {
          state.selectedLesson[key as keyof typeof state.selectedLesson] = value as never
        }
      })
    },
    updateSelectedSection: (state, action) => {
      Object.entries(action.payload).forEach(([key, value]) => {
        if (key in state.selectedSection) {
          state.selectedSection[key as keyof typeof state.selectedSection] = value as never
        }
      })
    },
  },
})

export const { actions, name: key, reducer } = slice
