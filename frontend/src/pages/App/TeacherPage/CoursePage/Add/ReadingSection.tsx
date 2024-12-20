import CourseCreateHeader from "@/components/Course/Create/Header"
import { Button } from "@radix-ui/themes"
import { EyeOpenIcon, CheckIcon } from "@radix-ui/react-icons"
import CourseCreateUpload from "@/components/Course/Create/Upload"

const CourseAddReadingSection = () => {
  return (
    <div className="p-3">
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
      <div className="p-10">
        <CourseCreateUpload></CourseCreateUpload>
      </div>
    </div>
  )
}

export default CourseAddReadingSection
