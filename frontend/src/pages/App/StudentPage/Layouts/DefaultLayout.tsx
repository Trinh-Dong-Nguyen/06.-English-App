import Header from "@/components/Student/Header"
import { ReactNode } from "react"

export default function DefaultLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Header />
      {children}
    </div>
  )
}
