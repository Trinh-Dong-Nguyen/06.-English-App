import { useCourseSlice } from "@/features/course/store"
import { selectCourseView } from "@/features/course/store/selectors"
import { useSectionByLesson } from "@/features/section/hooks"
import { useSectionSlice } from "@/features/section/store"
import { sectionNameMap } from "@/type/section"
import _ from "lodash"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router"

export const SectionByLesson = ({ lessonId, lessonName }: { lessonId: string; lessonName: string }) => {
  const { data: sectionData } = useSectionByLesson(lessonId)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { actions: courseActions } = useCourseSlice()
  const { actions: sectionActions } = useSectionSlice()
  const { id: courseId } = useSelector(selectCourseView)
  return (
    <div className="flex w-full flex-col gap-[23px]">
      {sectionData?.data && sectionData.data.length > 0 ? (
        _.orderBy(sectionData.data, ["createDate"]).map((section) => (
          <div
            key={section.id}
            onClick={() => {
              const view = {
                id: section.id,
                name: section.title,
                sectionDetail: false,
                createQuestion: true,
                type: section.type,
              }
              const lessonView = {
                id: lessonId,
                name: lessonName,
                vocab: false,
                grammar: false,
              }
              const sectionId = section.id
              dispatch(courseActions.updateSelectedSection(view))
              dispatch(courseActions.updateSelectedLesson(lessonView))
              dispatch(sectionActions.updateQuestion({}))
              navigate(`/course/${courseId}/lesson/${lessonId}/${sectionId}`)
            }}
            className="flex h-full w-full cursor-pointer border-[1px] border-headerIcon py-[11px] shadow-sectionCard"
          >
            <div className="flex flex-col px-[26px]">
              <div className="flex w-full items-center gap-[23px]">
                <span className="text-2xl font-normal text-headerIcon">Section: {section.title}</span>
                <span className="text-xl font-extralight text-headerIcon">{sectionNameMap[section.type]}</span>
              </div>
            </div>
          </div>
        ))
      ) : (
        <span className="text-base font-semibold text-zinc-700">No section in this lesson...</span>
      )}
    </div>
  )
}
