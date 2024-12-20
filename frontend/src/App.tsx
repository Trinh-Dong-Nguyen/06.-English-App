import { BrowserRouter, Routes, Route } from "react-router-dom"
import { protectedRoutes, publicRoutes } from "./routes/index"
import { DefaultLayout } from "./components/Layout"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ToastContainer } from "react-toastify"
import "@radix-ui/themes/styles.css"
import { Theme } from "@radix-ui/themes"
import "regenerator-runtime/runtime"
import "react-toastify/dist/ReactToastify.css"
const queryClient = new QueryClient()
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Theme>
          <div id="App">
            <Routes>
              {publicRoutes.map((route, index) => {
                const Page = route.component
                const Layout = route.layout == null ? DefaultLayout : route.layout
                return <Route key={index} path={route.path} element={<Layout>{Page}</Layout>} />
              })}
              {protectedRoutes.map((route, index) => {
                const Page = route.component
                const Layout = route.layout == null ? DefaultLayout : route.layout
                // if (route.path === "/profile" || route.path === "/login") {
                //   Layout = ProfileLayout
                // } else if (route.layout) {
                //   Layout = route.layout
                // } else if (route.layout === null) {
                //   Layout = Fragment
                // }
                return <Route key={index} path={route.path} element={<Layout>{Page}</Layout>} />
              })}
            </Routes>
          </div>
        </Theme>
      </BrowserRouter>
      <ToastContainer />
    </QueryClientProvider>
  )
}

export default App
