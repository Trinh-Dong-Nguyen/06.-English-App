import { SidebarContextProps } from "@/type"
import { createContext } from "react"

export const SidebarContext = createContext<SidebarContextProps | undefined>(undefined)
