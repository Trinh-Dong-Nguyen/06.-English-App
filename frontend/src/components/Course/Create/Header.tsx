import LoadingScreen from "@/components/Layout/loadingScreen"
import { useCourseTeacher } from "@/features/course/hooks"
import { selectCourseView } from "@/features/course/store/selectors"
import { ArrowLeftIcon } from "@radix-ui/react-icons"
import { useMemo } from "react"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router"

const CourseCreateHeader = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate()
  const { name } = useSelector(selectCourseView)
  const { id } = useParams()
  const goBack = () => {
    navigate(-1)
  }

  if (performance.navigation.type === 1) {
    // Nếu trang được reload
    window.location.href = "/course" // Điều hướng về trang home
  }

  const { data: course, isLoading } = useCourseTeacher()
  const courseName = useMemo(() => {
    return (course?.data ?? [])
      .filter((item) => item.id === id)
      .map((item) => {
        return item.title
      })[0]
  }, [course, id])
  console.log("courseName", courseName, course, id)

  return (
    <div className="flex rounded-sm border border-zinc-200 bg-pink-50 px-3 py-5">
      {isLoading && <LoadingScreen />}
      <div>
        <ArrowLeftIcon className="cursor-pointer text-blue-700" height={24} width={24} onClick={goBack}></ArrowLeftIcon>
      </div>
      <div className="ml-3 flex-1">
        <div className="text-lg">Back to course</div>
        <div>
          <span className="text-zinc-400">Courses / </span>
          {!isLoading && <span className="font-semibold">{name || courseName}</span>}
        </div>
      </div>
      <div className="flex items-center">{children}</div>
    </div>
  )
}

export default CourseCreateHeader
