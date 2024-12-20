import React from "react"
import { MoveRight } from "lucide-react"

import { cn } from "@/lib/utils"

interface ArrowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string
  textColor?: string
  buttonOverlayColor?: string
  borderColor?: string
  iconColor?: string
  className?: string
}

export default function ArrowButton({
  text = "Open",
  textColor = "#00b14f",
  buttonOverlayColor = "#0b9145",
  borderColor = "#00b14f",
  iconColor = "white",
  className,
  ...props
}: ArrowButtonProps) {
  return (
    <button
      style={{ borderColor: borderColor }}
      {...props}
      className={cn(
        "group relative inline-flex items-center justify-center overflow-hidden rounded-md border-2 border-navTitle bg-white px-6 py-1.5 font-medium shadow-md transition duration-300 ease-out",
        className,
      )}
    >
      <span
        style={{ background: buttonOverlayColor }}
        className={cn(
          "ease absolute inset-0 flex h-full w-full -translate-x-full items-center justify-center bg-purple-400 text-white duration-300 group-hover:translate-x-0",
        )}
      >
        <MoveRight style={{ color: iconColor }} />
      </span>
      <span
        style={{ color: textColor }}
        className={cn(
          "absolute flex h-full w-full transform items-center justify-center text-sm font-bold transition-all duration-300 ease-in-out group-hover:translate-x-full",
        )}
      >
        {text}
      </span>
      <span className="invisible relative">Button</span>
    </button>
  )
}
