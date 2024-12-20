import { Button } from "@/components/ui/button"
import BackIconButton from "../../../../../../assets/back_button_icon.svg"
// import { useAuth } from "@/hooks/useAuth"
import { useDispatch, useSelector } from "react-redux"
import { selectCourseView, selectLessonView, selectSectionView } from "@/features/course/store/selectors"
import { useCourseSlice } from "@/features/course/store"
import { useNavigate } from "react-router"

export default function SectionHeader({ children }: { children: React.ReactNode }) {
  const lessonView = useSelector(selectLessonView)
  const dispatch = useDispatch()
  const { actions: courseActions } = useCourseSlice()
  const { name: courseName } = useSelector(selectCourseView)
  const { id, name: sectionName, createQuestion, sectionDetail } = useSelector(selectSectionView)
  const navigate = useNavigate()
  const handleBackButton = () => {
    navigate(-1)
  }
  const active =
    "border-none rounded-xl bg-fuschia py-3 px-5 text-white font-normal text-base hover:bg-fuschia hover:text-white"
  const inActive = "border-[1px] border-fuschia rounded-xl bg-transparent py-3 px-5 text-black font-normal text-base"
  return (
    <div className="flex h-screen flex-col overflow-y-hidden">
      <div className="sticky top-0 z-10 flex gap-[10px] bg-[#fff4f9] py-6 shadow-custom">
        <Button
          variant="ghost"
          className="bg-inherit hover:bg-inherit hover:outline-none focus:outline-none"
          onClick={handleBackButton}
        >
          <span className="ml-[14px]">
            <img src={BackIconButton} />
          </span>
        </Button>
        <div className="ml-[11px] flex flex-col gap-2">
          <span className="text-2xl font-normal text-black">{sectionName}</span>
          <span className="text-xl font-normal text-zinc-600">
            Course/{courseName}/{lessonView.name}/<span className="text-black">{sectionName}</span>
          </span>
          <div className="flex items-center gap-2">
            <Button
              onClick={() => {
                const view = {
                  id: id,
                  name: sectionName,
                  sectionDetail: true,
                  createQuestion: false,
                }
                dispatch(courseActions.updateSelectedSection(view))
              }}
              className={sectionDetail ? active : inActive}
            >
              Section details
            </Button>
            <Button
              onClick={() => {
                const view = {
                  id: id,
                  name: sectionName,
                  sectionDetail: false,
                  createQuestion: true,
                }
                dispatch(courseActions.updateSelectedSection(view))
              }}
              className={createQuestion ? active : inActive}
            >
              Create questions
            </Button>
          </div>
        </div>
      </div>
      <div className="ml-[62px] bg-white">{children}</div>
    </div>
  )
}
