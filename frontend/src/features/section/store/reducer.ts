import { createSlice } from "@reduxjs/toolkit"

import { initialState } from "./selectors"

const slice = createSlice({
  name: "section",
  initialState,
  reducers: {
    loadSections(state, action) {
      state.handling = true
      state.data = {
        ...state.data,
        ...action.payload,
      }
    },
    setCurrentSection(state, action) {
      state.current = action.payload
    },
    loadSection(state, action) {
      state.data = action.payload
    },
    changeCurrentSection(state, action) {
      state.current = action.payload
    },
    updateViewChanged(state, action) {
      state.changed = action.payload
    },
    updateQuestion(state, action) {
      if (Object.keys(action.payload).length === 0) {
        state.update = {}
        return
      }
      Object.entries(action.payload).forEach(([key, value]) => {
        state.update[key as keyof typeof state.update] = value as (typeof state.update)[keyof typeof state.update]
      })
    },
    close() {
      return initialState
    },
  },
})

export const { actions, name: key, reducer } = slice
