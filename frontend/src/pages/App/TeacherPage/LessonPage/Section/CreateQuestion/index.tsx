import { sectionApi } from "@/apis"
import { Section } from "@/components/component/section"
import { SectionMain } from "@/components/component/sectionMain"
import FroalaEditorComponent from "@/components/Layout/Components/ui/FroalaEditorComponent"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { queryKeys } from "@/config"
import generateFroalaConfig from "@/config/froala.config"
import { selectSections } from "@/features/section/store/selectors"
import { Lesson } from "@/type/question"
import { Label } from "@radix-ui/react-label"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useEffect, useMemo, useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router"
import { toast } from "react-toastify"
import S from "./style.module.css"

export const CreateQuestion = () => {
  const queryClient = useQueryClient()
  const { sectionId } = useParams()
  const [open, setOpen] = useState(false)
  const [questionGroupType, setQuestionGroupType] = useState<string>("")
  const sectionById = useSelector(selectSections)
  const froalaConfig = useMemo(() => generateFroalaConfig(), [])
  const CreateQuestion = useMutation({
    mutationFn: sectionApi.CreateQuestionGroup,
    onSuccess: (Res) => {
      if (Res?.message === "Question group created") {
        setOpen(false)
        queryClient.invalidateQueries({ queryKey: queryKeys.sectionById.gen(sectionId as string) })
        toast.success(`${Res.message}`)
      } else {
        toast.error(`Error ${Res?.statusCode}: ${Res?.message}`)
      }
    },
    onError: () => {
      toast.error("Something error")
    },
  })

  function onSubmit() {
    const data = {
      text: text,
      section: sectionId as string,
      questionGroupType: questionGroupType,
    }
    CreateQuestion.mutate(data)
  }

  const [text, setText] = useState<string>("")
  const isExist = useMemo(() => sectionById && sectionById.questionGroups.length > 0, [sectionById])

  useEffect(() => {
    console.log("isExist", isExist)
    if (!isExist && sectionById.type !== "WRITING" && sectionById.type !== "SPEAKING") {
      setOpen(true)
    }
  }, [isExist, sectionById.type])

  return (
    <div
      className={`mt-5 gap-12 ${sectionById.type === "WRITING" || sectionById.type === "SPEAKING" ? "flex items-center justify-center" : "grid grid-cols-6"}`}
    >
      <Dialog open={open} onOpenChange={() => setOpen(!open)}>
        <DialogContent className="h-full overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-black">Create your first question group</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <Label className="text-black">Question Group Type</Label>
            <Select key="questionGroupType" onValueChange={(value) => setQuestionGroupType(value)}>
              <div className="flex w-full space-x-3">
                <SelectTrigger className="h-10 w-[200px] !cursor-pointer rounded-md border-[1.5px] border-slate-300 bg-white text-base !font-normal text-black">
                  <SelectValue placeholder="Chọn danh mục"></SelectValue>
                </SelectTrigger>
              </div>
              <SelectContent>
                {Lesson.map((i) => (
                  <SelectItem
                    className="text-sm text-black hover:text-navTitle focus:text-navTitle"
                    key={i.key}
                    value={i.key}
                  >
                    {i.text}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Label className="text-black">Question Group Content</Label>
            <FroalaEditorComponent
              key="questionGroupContent"
              tag="textarea"
              config={froalaConfig}
              model={text}
              onModelChange={(e: string) => setText(e)}
            />
            <Button className="rounded-md bg-blue-500 p-2 text-white" onClick={onSubmit}>
              Save
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      {sectionById.type !== "WRITING" && sectionById.type !== "SPEAKING" && (
        <div className={`${S.section} col-span-2`}>
          <Section onOpenDialog={() => setOpen(!open)} />
        </div>
      )}
      <div
        className={`${sectionById.type === "WRITING" || sectionById.type === "SPEAKING" ? "w-full" : `col-span-4 overflow-y-auto`}`}
      >
        {isExist || sectionById.type === "WRITING" || sectionById.type === "SPEAKING" ? <SectionMain /> : null}
      </div>
    </div>
  )
}
