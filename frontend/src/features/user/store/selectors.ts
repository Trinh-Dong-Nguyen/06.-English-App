/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSelector } from "@reduxjs/toolkit"
import _ from "lodash"
import { User } from "../interface"

export const initialState: User = {
  handling: false,
  data: {},
}

const selectDomain = (state: { user: any }) => state.user || initialState
const selectPath = (path: any) => path
export const selectUser = createSelector([selectDomain], (state) => state.data ?? {})
export const selectActiveUnit = createSelector([selectUser], (state) => state.activeUnit ?? {})
export const selectViewUnit = createSelector([selectUser], (state) => state.viewUnit ?? {})
export const selectClass = createSelector([selectViewUnit, selectPath], (state, path) =>
  _.get(state, ["classes", path]),
)
export const selectUserHandling = createSelector([selectDomain], (state) => state.handling)
