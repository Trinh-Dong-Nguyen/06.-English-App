import CourseCreateHeader from "@/components/Course/Create/Header"
import { Button } from "@radix-ui/themes"
import { EyeOpenIcon, CheckIcon } from "@radix-ui/react-icons"
import CourseCreateUpload from "@/components/Course/Create/Upload"

const CourseAddListeningSection = () => {
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
        <div className="mt-10 text-center">
          <Button variant="solid" size="3" className="cursor-pointer" color="pink">
            Save & Continue
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CourseAddListeningSection
