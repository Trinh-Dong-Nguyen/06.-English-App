import CourseCreateHeader from "@/components/Course/Create/Header"
import { Button, Text, TextArea } from "@radix-ui/themes"
import { EyeOpenIcon, CheckIcon } from "@radix-ui/react-icons"
import CourseCreateUpload from "@/components/Course/Create/Upload"

const CourseAddWritingSection = () => {
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
        <div className="mt-5">
          <Text as="div" size="4" className="mb-2 text-zinc-700" mb="1" weight="bold">
            Description
          </Text>
          <TextArea placeholder="Reply to comment…" rows={15} />
          <span>0/7000 characters</span>
        </div>
        <div className="mt-10 text-center">
          <Button variant="solid" size="3" className="cursor-pointer" color="pink">
            Save & Continue
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CourseAddWritingSection
