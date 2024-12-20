import { configureStore, StoreEnhancer, Tuple } from "@reduxjs/toolkit"
import { createReducer } from "./reducers"
import createSagaMiddleware from "redux-saga"
import { createInjectorsEnhancer } from "redux-injectors"

export function configureAppStore() {
  const sagaMiddleware = createSagaMiddleware()
  const runSaga = sagaMiddleware.run

  const injectorEnhancer = createInjectorsEnhancer({
    createReducer,
    runSaga,
  })

  const store = configureStore({
    reducer: createReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
    devTools: {
      shouldHotReload: false,
    },
    enhancers: (getDefaultEnhancers) => {
      const defaultEnhancers = getDefaultEnhancers()
      return [injectorEnhancer, ...defaultEnhancers] as Tuple<StoreEnhancer[]>
    },
  })

  return store
}
