import StudentMyCourseNav from "@/components/Student/StudentMyCourseNav"

export default function StudentMyCoursePage() {
  return (
    <>
      <div className="w-100 flex min-h-[200px] content-center items-center justify-center bg-[#fcddec] p-[20px]">
        <p className="font-sans text-8xl font-bold text-[#5D5FEF]">My Learning</p>
      </div>
      <div>
        <StudentMyCourseNav />
      </div>
    </>
  )
}
