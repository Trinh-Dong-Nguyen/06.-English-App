import { determineFileType } from "@/lib/helper"
import PreviewFileImage from "./Image"

const PreviewFile = (file: File) => {
  const fileType = determineFileType(file.name)

  const renderPreviewByFileType = () => {
    switch (fileType) {
      case "image":
        return PreviewFileImage(file)
      default:
        break
    }
  }

  return (
    <div className="overflow-hidden rounded border border-zinc-200">
      <div className="border border-zinc-200 bg-pink-100 p-3 text-lg text-zinc-600">{file.name}</div>
      <div className="p-3">{renderPreviewByFileType()}</div>
    </div>
  )
}

export default PreviewFile
