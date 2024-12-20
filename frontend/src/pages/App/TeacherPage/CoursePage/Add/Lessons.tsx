import CourseCreateHeader from "@/components/Course/Create/Header"
import { Button } from "@radix-ui/themes"
import { EyeOpenIcon, CheckIcon } from "@radix-ui/react-icons"
import { MyLessonPage } from "../../LessonPage/MyLessonPage"
import { useNavigate, useParams } from "react-router"
import { useMutation } from "@tanstack/react-query"
import { courseApi } from "@/apis"
import { toast } from "react-toastify"
import LoadingScreen from "@/components/Layout/loadingScreen"

const CourseAddLessons = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  function handlePublishCourse() {
    publishCourse.mutate(id as string)
  }
  const publishCourse = useMutation({
    mutationFn: courseApi.PublishCourse,
    onSuccess: (Res) => {
      if (Res?.message === "Course published") {
        toast.success(`${Res.message}`)
        navigate("/course")
      } else {
        toast.error(`Error ${Res?.statusCode}: ${Res?.message}`)
      }
    },
    onError: () => {
      toast.error("Something error")
    },
  })
  return (
    <div className="p-3">
      {publishCourse.isPending && <LoadingScreen message="Đang xuất bản" />}
      <CourseCreateHeader>
        <div className="flex gap-3">
          <Button variant="outline" size="3" className="cursor-pointer bg-white">
            <EyeOpenIcon></EyeOpenIcon>
            Preview
          </Button>
          <Button onClick={handlePublishCourse} variant="outline" size="3" className="cursor-pointer bg-white">
            <CheckIcon></CheckIcon>
            Publish
          </Button>
        </div>
      </CourseCreateHeader>
      <div className="w-full">
        <MyLessonPage courseId={id} />
      </div>
    </div>
  )
}

export default CourseAddLessons
