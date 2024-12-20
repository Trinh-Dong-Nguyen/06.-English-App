import { UploadIcon } from "@radix-ui/react-icons"
import { Button, Text } from "@radix-ui/themes"
import { useCallback, useRef, useState } from "react"
import get from "lodash/get"
import PreviewFile from "./PreviewFile"

const CourseCreateUpload = () => {
  const inputRef = useRef<HTMLInputElement>(null)

  const [file, setFile] = useState<File>()

  const onBrowseFile = useCallback(() => inputRef?.current?.click(), [])

  const onChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = get(event, "target.files[0]", null)
    if (!file) return
    setFile(file)
  }

  const onCancel = () => {
    setFile(undefined)
  }

  return file ? (
    <div>
      {PreviewFile(file)}
      <div className="mt-5 text-center">
        <Button variant="outline" size={"3"} color="pink" className="mr-5 cursor-pointer" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="solid" size={"3"} color="pink" className="cursor-pointer">
          Confirm
        </Button>
      </div>
    </div>
  ) : (
    <div>
      <Text as="div" size="4" className="mb-2 text-zinc-700" mb="1" weight="bold">
        Upload file
      </Text>
      <div
        className="flex h-80 w-full cursor-pointer flex-col items-center justify-center gap-10 rounded border-2 border-dashed border-zinc-400 hover:border-blue-400 hover:bg-blue-50"
        onClick={onBrowseFile}
      >
        <UploadIcon height={48} width={48} className="text-blue-700"></UploadIcon>
        <div className="text-center">
          <div>Choose a file or drag & drop here</div>
          <div className="text-zinc-400">.docx, .txt, .png, .jpg</div>
        </div>
        <Button variant="outline" size={"3"}>
          Browse file
        </Button>
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept=".docx, .txt, .png, .jpg"
          onChange={(e) => onChangeFile(e)}
        />
      </div>
    </div>
  )
}

export default CourseCreateUpload
