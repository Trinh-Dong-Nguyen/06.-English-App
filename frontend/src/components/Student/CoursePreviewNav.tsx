import { useState } from "react"
import { Button } from "../ui/button"
import { FaStar } from "react-icons/fa"
import { Course } from "@/type/course"
import FroalaViewComponent from "../Layout/Components/ui/FroalaViewComponent"

const NavContent = [
  {
    id: "Overview",
    title: "Overview",
  },
  {
    id: "Rating",
    title: "Rating",
  },
]
type CoursePreviewNavProps = {
  course: Course
}
export default function CoursePreviewNav({ course }: CoursePreviewNavProps) {
  const [tabName, setTabName] = useState("Overview")
  return (
    <div>
      {NavContent.map((item) => {
        const className = `${tabName === item.title ? "font-bold underline text-[#5d5fef]" : "text-[#a5a6f6]"} 
                            bg-transparent hover:bg-transparent hover:border-transparent 
                             text-[20px]
                            font-sans gap-[20px] 
                            `
        return (
          <Button className={className} key={item.id} onClick={() => setTabName(item.title)}>
            {item.title}
          </Button>
        )
      })}
      {tabName === "Overview" && (
        <div className="flex flex-col">
          <h2 className="p-[20px] px-0 font-sans text-2xl text-[#5d5fef]">Course Overview</h2>
          <div className="flex gap-[40px]">
            <div>
              <div className="flex gap-[10px]">
                <span className="font-bold">{course.ratingAverage}</span>
                <span className="h-100 content-center">
                  <FaStar color="#ffff00" />
                </span>
              </div>
              <span className="text-[#757575]">{course.ratingCount}</span>
            </div>
            <div>
              <div className="flex gap-[10px]">
                <span className="font-bold">1052</span>
              </div>
              <span className="text-[#757575]">students</span>
            </div>
            <div>
              <div className="flex gap-[10px]">
                <span className="font-bold">3hrs</span>
              </div>
              <span className="text-[#757575]">of video</span>
            </div>
          </div>
          <div className="mt-[20px] h-[1px] w-full bg-slate-500" />
          <h2 className="p-[20px] px-0 font-sans text-2xl font-bold text-[black]">Description</h2>
          <FroalaViewComponent model={course.description} />
          <div className="mt-[20px] h-[1px] w-full bg-slate-500" />
          <div className="flex flex-col gap-[20px]">
            <h2 className="p-[20px] px-0 font-sans text-2xl font-bold text-[black]">Instructor</h2>
            <div className="flex gap-[20px]">
              <img
                src="https://www.w3schools.com/howto/img_avatar.png"
                alt="instructor"
                className="h-[50px] w-[50px] rounded-full"
              />
              <span className="h-100 content-center text-[16px] font-bold">{course.teacherName}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
