import { useEffect, useState } from "react"
import CourseRecommendationItem from "./CourseRecommendationItem"
import { RecommendCourseItem } from "@/type/course"
import { courseApi } from "@/apis"
import { useNavigate } from "react-router"
import { toast } from "react-toastify"

export default function RecommendationList() {
  const [listRecomendCourse, setListRecommendCourse] = useState<RecommendCourseItem[]>([])
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  function handleClickCourse(courseId: string) {
    navigate(`/student/course-preview/${courseId}`)
  }
  async function fetchRecommendCourse() {
    try {
      setIsLoading(true)
      const response = await courseApi.getRecommendCourse()
      if (response) {
        setListRecommendCourse(response.data)
        setIsLoading(false)
      }
    } catch (error) {
      setIsLoading(false)
      toast.error("Error when fetching recommend course")
      console.log(error)
    }
  }
  useEffect(() => {
    fetchRecommendCourse()
  }, [])

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {!isLoading && listRecomendCourse.length > 0 && (
        <div className="mt-[20px] flex flex-row flex-wrap gap-4 hover:cursor-pointer">
          {listRecomendCourse.map((course) => (
            <CourseRecommendationItem key={course.id} course={course} onClick={() => handleClickCourse(course.id)} />
          ))}
        </div>
      )}
    </>
  )
}
