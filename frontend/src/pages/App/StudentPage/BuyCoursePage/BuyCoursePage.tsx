import { Button } from "@/components/Layout/Components/ui/Button"
import { ArrowLeft } from "lucide-react"
import { useNavigate, useParams } from "react-router"
import { FaStar } from "react-icons/fa"
import { MdPlayLesson } from "react-icons/md"
import { FaVideo } from "react-icons/fa"
import { convertToVND } from "@/utils/constants."
import { FaDownload } from "react-icons/fa"
import { FaMobileAlt } from "react-icons/fa"
import { IoMdInfinite } from "react-icons/io"
import { TbCertificate } from "react-icons/tb"
import { useEffect, useState } from "react"
import { courseApi } from "@/apis"
import { Course } from "@/type/course"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import FroalaViewComponent from "@/components/Layout/Components/ui/FroalaViewComponent"
import { toast } from "react-toastify"
import courseBuyingApi, { PaymentMethod } from "@/apis/courseBuyingApi"
import { MdLocalAtm } from "react-icons/md"
export default function BuyCoursePage() {
  const { id } = useParams()
  const [course, setCourse] = useState<Course>()
  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = useState(false)
  async function getCourseDetail(id?: string) {
    try {
      setIsLoading(true)
      if (id) {
        const result = await courseApi.GetCourseDetail(id)
        if (result && result.data) {
          setCourse(result.data)
          setIsLoading(false)
        }
      }
    } catch (error) {
      setIsLoading(false)
      toast.error("Error when fetching course detail")
      console.log(error)
    }
  }
  useEffect(() => {
    getCourseDetail(id)
  }, [id])
  async function handleBuyCourseWithVNPAY(courseId: string) {
    try {
      // Call API
      const res = await courseBuyingApi.createPaymentUrlWithVNPAY({
        courseId,
        paymentMethod: PaymentMethod.QR_CODE,
      })

      // Redirect to VNPAY
      if (res && res.result) {
        window.location.href = res.result
      } else {
        toast.error("Failed to create payment URL")
      }
    } catch (error) {
      console.error("Error during payment URL creation:", error) // Log the error for debugging
      toast.error("Something went wrong. Please try again.")
    }
  }
  const navigate = useNavigate()
  return (
    <>
      {isLoading && <div>Loading...</div>}
      {!isLoading && course && (
        <>
          <Dialog open={open} onOpenChange={() => setOpen(!open)}>
            <DialogContent className="overflow-y-auto">
              <DialogHeader className="flex content-center items-center">
                <DialogTitle className="text-black">Please select your pay option</DialogTitle>
              </DialogHeader>
              <div className="flex flex-col gap-4">
                <Button className="border-1 gap-10 border-[black] bg-[#34a853] bg-transparent text-xl font-bold text-black hover:bg-[#34a853]">
                  <MdLocalAtm className="h-[40px] w-[40px]" />
                  Pay with ATM card
                </Button>
                <Button
                  className="border-1 gap-10 border-[black] bg-transparent text-xl font-bold text-black hover:bg-transparent"
                  onClick={() => handleBuyCourseWithVNPAY(course?.id ?? "")}
                >
                  <img
                    className="h-[40px] w-[40px]"
                    src="https://stcd02206177151.cloud.edgevnpay.vn/assets/images/logo-icon/logo-primary.svg"
                  ></img>
                  Pay with VNPAY
                </Button>
                <Button className="border-1 gap-10 border-[black] bg-[#00a3ff] bg-transparent text-xl font-bold hover:bg-[#00a3ff]">
                  <img
                    className="h-[40px] w-[40px]"
                    src="https://simg.zalopay.com.vn/zlp-website/assets/new_logo_6c5db2d21b.svg"
                  ></img>
                  Pay with Zalopay
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          <div className="flex w-full">
            <div className="flex w-full flex-[1] items-start justify-start p-[20px]">
              <Button className="bg-transparent hover:bg-transparent" onClick={() => navigate("/student-home")}>
                <span>
                  <ArrowLeft />
                </span>
              </Button>
            </div>
            <div className="flex w-full flex-[8] items-start justify-start p-[20px]">
              <div className="flex flex-col items-start justify-center gap-[20px]">
                <span className="font-sans text-2xl font-bold">{course?.title}</span>
                <div className="flex items-center justify-center gap-[50px]">
                  <div className="flex items-center justify-center gap-1">
                    <img
                      src="https://via.placeholder.com/150"
                      alt="Course"
                      className="h-[40px] w-[40px] rounded-full"
                    />
                    <span>{course?.teacherName}</span>
                  </div>
                  <div className="flex items-center justify-center gap-1">
                    <FaStar color="#ffa405" />
                    <span>{course?.ratingAverage}</span>
                  </div>
                  <div className="flex items-center justify-center gap-1">
                    <span>
                      <MdPlayLesson />
                    </span>
                    <span>{course.lessons.length} lessons</span>
                  </div>
                </div>
                <img
                  src={course?.thumbnail_image}
                  alt="course-thumbnail"
                  className="h-auto w-full max-w-[1000px] rounded-md object-cover"
                />
                <div>
                  <span className="font-sans text-2xl font-bold">Course Description</span>
                  <FroalaViewComponent model={course?.description} />
                </div>
                <div className="flex flex-col items-start justify-center gap-[20px]">
                  <span className="font-sans text-2xl font-bold">Playlist</span>
                  {course.lessons.map((lesson, index) => (
                    <div key={lesson.id} className="flex items-center justify-between gap-8">
                      <span className="h-full content-center">
                        <FaVideo size="30px" />
                      </span>
                      <span className="font-sans text-xl font-bold">{`Lesson ${index + 1}`}</span>
                      <span className="h-full content-center font-sans">{lesson.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex h-[100vh] flex-[3] flex-col items-center justify-center gap-[20px] bg-[#f7f9fa]">
              <p className="text-6xl font-bold">{convertToVND(course?.finalPrice ?? 0)}</p>
              <Button
                className="border-1 min-w-[300px] border-[black] bg-transparent text-xl font-bold hover:bg-transparent"
                onClick={() => setOpen(true)}
              >
                Buy now
              </Button>
              <p className="text-xl font-bold">This course includes: </p>
              <div className="flex min-w-[300px] flex-col items-start justify-center gap-[20px]">
                <div className="flex w-full gap-[30px]">
                  <span>
                    <FaDownload />
                  </span>
                  <p>Downloadable resources</p>
                </div>
                <div className="flex w-full gap-[30px]">
                  <span>
                    <FaMobileAlt />
                  </span>
                  <p>Access on mobile and TV</p>
                </div>
                <div className="flex w-full gap-[30px]">
                  <span>
                    <IoMdInfinite />
                  </span>
                  <p>Full lifetime access</p>
                </div>
                <div className="flex w-full gap-[30px]">
                  <span>
                    <TbCertificate />
                  </span>
                  <p>Certificate of completion</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
