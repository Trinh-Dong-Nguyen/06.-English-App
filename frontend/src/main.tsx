import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import GlobalStyles from "./components/GlobalStyles/index.ts"
import "./index.css"
import { Provider } from "react-redux"
import { configureAppStore } from "./redux/configureStore.ts"
import "regenerator-runtime/runtime"
const store = configureAppStore()

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <GlobalStyles>
        <App />
      </GlobalStyles>
    </Provider>
  </React.StrictMode>,
)
