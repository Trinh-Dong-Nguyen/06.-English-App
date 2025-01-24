import CourseCreateHeader from "@/components/Course/Create/Header"
import { Pencil1Icon } from "@radix-ui/react-icons"
import { Button, Checkbox } from "@radix-ui/themes"
import { BookOpen, BookOpenCheck, Logs, Play, HeadphonesIcon, Mic, Edit } from "lucide-react"

const CoursePreview = () => {
  return (
    <div>
      <CourseCreateHeader>
        <Button variant="outline" size="3" className="cursor-pointer bg-white">
          <Pencil1Icon></Pencil1Icon>
          Continue editing
        </Button>
      </CourseCreateHeader>
      <div className="grid grid-cols-5">
        <div className="col-span-3">
          <video className="w-full" controls>
            <source src="https://w3schools.com/htœml/mov_bbb.mp4" type="video/mp4" />
            Your browser does not support HTML video.
          </video>
        </div>
        <div className="col-span-2 p-3">
          <div className="mb-3 border-b-2 border-pink-300 pb-2 text-2xl font-semibold text-blue-600">
            Course content
          </div>
          <div className="mb-2 text-lg">Lesson 1: Introduction</div>
          <div className="flex gap-2 mb-3">
            <Button variant="surface" size="2" radius="full" className="cursor-pointer" color="pink">
              <BookOpen></BookOpen>
              Vocabulary
            </Button>
            <Button variant="surface" size="2" radius="full" className="cursor-pointer" color="pink">
              <Logs></Logs>
              Grammar
            </Button>
          </div>
          <div>
            <div className="flex items-center p-2 bg-pink-50 rounded mb-3">
                <Play />
                <div className="flex-1 px-2">œ
                    <div className="text-lg">Video lecture 1</div>
                    <div className="text-sm text-gray-400">3:40</div>
                </div>
                <Checkbox defaultChecked color="pink" />
            </div>
            <div className="flex items-center p-2 bg-gray-50 rounded mb-3">
                <BookOpenCheck />
                <div className="flex-1 px-2">
                    <div className="text-lg">Section 1</div>
                    <div className="text-sm text-gray-400">Reading</div>
                </div>
                <Checkbox defaultChecked color="gray" />
            </div>
            <div className="flex items-center p-2 bg-gray-50 rounded mb-3">
                <HeadphonesIcon />
                <div className="flex-1 px-2">
                    <div className="text-lg">Section 2</div>
                    <div className="text-sm text-gray-400">Listening</div>
                </div>
                <Checkbox defaultChecked color="gray" />
            </div>
            <div className="flex items-center p-2 bg-gray-50 rounded mb-3">
                <Mic />
                <div className="flex-1 px-2">
                    <div className="text-lg">Section 3</div>
                    <div className="text-sm text-gray-400">Speaking</div>
                </div>
                <Checkbox defaultChecked color="gray" />
            </div>
            <div className="flex items-center p-2 bg-gray-50 rounded mb-3">
                <Edit />
                <div className="flex-1 px-2">
                    <div className="text-lg">Section 4</div>
                    <div className="text-sm text-gray-400">Writing</div>
                </div>
                <Checkbox defaultChecked color="gray" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CoursePreview
