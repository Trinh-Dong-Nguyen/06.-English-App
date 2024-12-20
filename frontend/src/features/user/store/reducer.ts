import { createSlice } from "@reduxjs/toolkit"

import { initialState } from "./selectors"

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateHanding(state, action) {
      state.handling = action.payload
    },
    fetchUserInformation(state, action) {
      state.handling = false
      state.data = {
        ...state.data,
        ...action.payload,
      }
    },
    updateUserInformation(state, action) {
      state.data = {
        ...state.data,
        ...action.payload,
      }
    },
    loadViewUnit(state, action) {
      state.data.viewUnit = action.payload
    },
    switchUnit(state) {
      state.handling = true
    },
    signedIn(state) {
      state.handling = true
    },
    signOut(state) {
      state.handling = true
      state.data = {}
    },
    stop(state) {
      state.handling = false
    },
  },
})

export const { actions, name: key, reducer } = slice
