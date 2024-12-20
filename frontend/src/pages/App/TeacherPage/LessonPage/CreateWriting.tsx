import { Button } from "@/components/Layout/Components/ui/Button"
import FroalaEditorComponent from "@/components/Layout/Components/ui/FroalaEditorComponent"
import generateFroalaConfig from "@/config/froala.config"
import { useMemo, useState } from "react"

export const CreateWriting = () => {
  const [content, setContent] = useState<string>("")
  const froalaConfig = useMemo(() => generateFroalaConfig(), [])
  return (
    <div className="flex h-full min-h-screen w-full flex-col bg-white px-[66px] py-[64px]">
      <div className="flex w-full flex-col px-[305px] py-[80px]">
        <span className="text-[32px] font-medium">Description</span>
        <FroalaEditorComponent
          tag="textarea"
          config={froalaConfig}
          model={content}
          onModelChange={(e: string) => setContent(e)}
        />
        <div className="flex w-full items-center justify-center">
          <Button className="rounded-md bg-fuschia px-[22px] py-[15px] text-[32px] font-normal text-white">
            Save & Continue
          </Button>
        </div>
      </div>
    </div>
  )
}
