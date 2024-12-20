import { useInjectReducer } from "redux-injectors"

import { actions, key, reducer } from "./reducer"

export const useUserSlice = () => {
  useInjectReducer({ key, reducer })
  return { actions }
}
