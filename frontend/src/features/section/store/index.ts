import { useInjectReducer } from "redux-injectors"

import { actions, key, reducer } from "./reducer"

export const useSectionSlice = () => {
  useInjectReducer({ key, reducer })
  return { actions }
}
