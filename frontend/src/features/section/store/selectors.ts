/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSelector } from "@reduxjs/toolkit"
import _ from "lodash"
import { Section } from "../interface"
import { SectionType } from "@/type/section"

export const initialState: Section = {
  handling: false,
  current: "",
  data: {
    id: "",
    title: "",
    content: "",
    type: SectionType.READING,
    sectionMedia: "",
    createDate: "",
    updateDate: "",
    questionGroups: [],
    questions: [],
  },
  changed: false,
  update: {},
}

const selectDomain = (state: any) => {
  console.log("selectDomain", state)
  return state.section || initialState
}
const selectPath = (_state: any, path: any) => path
export const selectSections = createSelector([selectDomain], (state: Section) => state.data ?? {})
export const selectSectionCurrent = createSelector([selectDomain], (state: Section) => state.current)
export const selectSectionData = createSelector([selectSections, selectPath], (state, path) => _.get(state, path))
export const selectSectionHandling = createSelector([selectDomain], (state) => state.handling)
export const selectSectionChanged = createSelector([selectDomain], (state) => state.changed)
export const selectSectionUpdate = createSelector([selectDomain], (state) => state.update)
