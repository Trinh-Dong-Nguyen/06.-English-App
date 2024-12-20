import { combineReducers } from "@reduxjs/toolkit"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createReducer(injectedReducers: any) {
  if (Object.keys(injectedReducers ?? {}).length) {
    return combineReducers({
      ...injectedReducers,
    })
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (state: any) => state
}
