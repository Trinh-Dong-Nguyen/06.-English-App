import { Button } from "@/components/ui/button"
import BackIconButton from "../../../../assets/back_button_icon.svg"
import { useAuth } from "@/hooks/useAuth"
import { useSelector } from "react-redux"
import { selectCourseView, selectLessonView } from "@/features/course/store/selectors"
import { useMemo } from "react"

export default function DoTestLayout({ children }: { children: React.ReactNode }) {
  useAuth()
  const lessonView = useSelector(selectLessonView)
  const { name: courseName } = useSelector(selectCourseView)
  const name = useMemo(
    () => (lessonView.grammar ? "Grammar" : lessonView.vocab ? "Vocabulary" : ""),
    [lessonView.grammar, lessonView.vocab],
  )

  if (performance.navigation.type === 1) {
    // Nếu trang được reload
    window.location.href = "/course" // Điều hướng về trang home
  }

  return (
    <div className="flex flex-col">
      <div className="sticky top-0 z-10 flex gap-[10px] bg-[#fff4f9] py-6 shadow-custom">
        <Button variant="ghost" className="bg-inherit hover:bg-inherit hover:outline-none focus:outline-none">
          <span className="ml-[14px]">
            <img src={BackIconButton} />
          </span>
        </Button>
        <div className="ml-[11px] flex flex-col gap-2">
          <span className="text-2xl font-normal text-black">{name}</span>
          <span className="text-xl font-normal text-zinc-600">
            Course/{courseName}/{lessonView.name}/<span className="text-black">{name}</span>
          </span>
        </div>
      </div>
      <div className="bg-white">{children}</div>
    </div>
  )
}
