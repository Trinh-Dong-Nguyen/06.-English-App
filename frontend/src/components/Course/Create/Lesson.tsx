import { AlertDialog, Button, Flex, RadioGroup } from "@radix-ui/themes"
import { PlusIcon, BookOpen, Logs, Video, Trash } from "lucide-react"
import { useCallback, useRef, useState } from "react"
import { useNavigate } from "react-router"
import get from "lodash/get"

const CourseCreateLesson = ({ index, onRemove }: any) => {
  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement>(null)

  const [file, setFile] = useState<File>()
  const [fileDuration, setFileDuration] = useState("")

  const [createSectionMode, setCreateSectionMode] = useState("reading")

  function onOk() {
    navigate(`/course/123/add/${createSectionMode}-section`)
    console.log("fileDuration ", fileDuration)
  }

  const onBrowseFile = useCallback(() => inputRef?.current?.click(), [])

  function formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    const formattedTime = `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`
    return formattedTime
  }

  const onChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = get(event, "target.files[0]", null)
    if (!file) return
    setFile(file)

    var video = document.createElement("video")
    video.preload = "metadata"

    video.onloadedmetadata = function () {
      window.URL.revokeObjectURL(video.src)
      const duration = video.duration
      setFileDuration(formatTime(duration))
    }

    video.src = URL.createObjectURL(file)
  }

  function handleRemove() {
    onRemove()
  }

  return (
    <div className="my-5 rounded-sm border border-zinc-200 p-3">
      <div>
        <div className="mb-5 flex gap-4">
          <div className="text-xl">
            <span className="font-bold text-blue-700">Lesson { index + 1 }:</span>
            <span> Introduction</span>
          </div>
          <Button
            variant="surface"
            size="2"
            radius="full"
            className="cursor-pointer"
            color="pink"
            onClick={onBrowseFile}
          >
            <PlusIcon></PlusIcon>
            Add materials
          </Button>
          <Button variant="surface" size="2" radius="full" className="cursor-pointer" color="pink">
            <BookOpen></BookOpen>
            Vocabulary
          </Button>
          <Button variant="surface" size="2" radius="full" className="cursor-pointer" color="pink">
            <Logs></Logs>
            Grammar
          </Button>
          <Button variant="surface" size="2" radius="full" className="cursor-pointer ml-auto" color="red" onClick={handleRemove}>
            <Trash></Trash>
          </Button>
        </div>
        {file && (
          <div className="mb-5 flex items-center gap-5 rounded border border-zinc-200 pl-3">
            <Video height={48} width={48}></Video>
            <div className="flex flex-1 items-center bg-pink-100 p-3">
              <div className="flex-1">
                <div>{file.name}</div>
                <div>10:20</div>
              </div>
              <Trash className="cursor-pointer" color="red"></Trash>
            </div>
          </div>
        )}
      </div>
      <input ref={inputRef} type="file" className="hidden" accept="video/*" onChange={(e) => onChangeFile(e)} />
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button variant="soft" size="2" className="cursor-pointer" color="pink">
            <PlusIcon></PlusIcon>
            Add section
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content maxWidth="350px">
          <AlertDialog.Title>Create a new section - {createSectionMode}</AlertDialog.Title>
          <AlertDialog.Description size="1">Please choose section type</AlertDialog.Description>
          <div className="py-5">
            <RadioGroup.Root
              defaultValue={createSectionMode}
              name="example"
              size="3"
              onValueChange={setCreateSectionMode}
            >
              <RadioGroup.Item value="reading">Reading</RadioGroup.Item>
              <RadioGroup.Item value="writing">Writing</RadioGroup.Item>
              <RadioGroup.Item value="listening">Listening</RadioGroup.Item>
              <RadioGroup.Item value="speaking">Speaking</RadioGroup.Item>
            </RadioGroup.Root>
          </div>

          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray" size={"3"}>
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button variant="solid" color="pink" size={"3"} onClick={onOk}>
                Revoke access
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </div>
  )
}

export default CourseCreateLesson
