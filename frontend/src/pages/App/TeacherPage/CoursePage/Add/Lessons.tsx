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

  const [lesson, setLesson] = useState<Array<any>>([])

  function onAddLesson() {
    const lessonItem = {
      key: Date.now(),
    }
    setLesson([...lesson, lessonItem])
  }

  function onRemoveLesson(key: number) {
    console.log("key", key)

    setLesson(lesson.filter((item) => item.key !== key))
  }

  return (
    <div className="p-3">
      {publishCourse.isPending && <LoadingScreen message="Đang xuất bản" />}
      <CourseCreateHeader>
        <div className="flex gap-3">
          <Button variant="outline" size="3" className="cursor-pointer bg-white">
            <EyeOpenIcon></EyeOpenIcon>
            Preview
          </Button>
          <Button variant="outline" size="3" className="cursor-pointer bg-white">
            <CheckIcon></CheckIcon>
            Publish
          </Button>
        </div>
      </CourseCreateHeader>
      <div className="w-full">
        <MyLessonPage courseId={id} />
        <div className="px-10">
          {lesson.map((item, index) => (
            <CourseCreateLesson
              key={item.key}
              index={index}
              onRemove={() => onRemoveLesson(item.key)}
            ></CourseCreateLesson>
          ))}

          <Button variant="solid" size="3" className="mt-3 cursor-pointer bg-pink-500" onClick={onAddLesson}>
            <PlusIcon></PlusIcon>
            Add lesson
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CourseAddLessons
