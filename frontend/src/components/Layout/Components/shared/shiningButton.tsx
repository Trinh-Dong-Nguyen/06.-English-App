import { ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"

export default function ShiningButton({ label }: { label: string }) {
  return (
    <button className="group cursor-pointer rounded-xl border-4 border-navTitle border-opacity-0 bg-transparent p-1 transition-all duration-500 hover:border-opacity-100">
      <div className="relative flex items-center justify-center gap-4 overflow-hidden rounded-lg bg-navTitle px-3 py-2 text-sm font-bold text-white">
        {label}
        <ArrowRight className="transition-all group-hover:translate-x-2 group-hover:scale-125" />
        <div
          className={cn(
            "absolute -left-16 top-0 h-full w-12 rotate-[30deg] scale-y-150 bg-white/20 transition-all duration-700 group-hover:left-[calc(100%+1rem)]",
          )}
        />
      </div>
    </button>
  )
}
