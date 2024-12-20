import {
  selectSectionChanged,
  selectSectionCurrent,
  selectSections,
  selectSectionUpdate,
} from "@/features/section/store/selectors"
import { useDispatch, useSelector } from "react-redux"
import { LuStar } from "react-icons/lu"
import { Button } from "../Layout/Components/ui/Button"
import _ from "lodash"
import { questionGroupNameMap } from "@/type/question"
import { SaveIcon } from "lucide-react"
import { useParams } from "react-router"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { sectionApi } from "@/apis"
import { toast } from "react-toastify"
import { queryKeys } from "@/config"
import S from "./style.module.css"
import { useSectionSlice } from "@/features/section/store"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useState } from "react"
interface question {
  questionGroup?: string
  section: string
  text: string
  type: string
  order: number
  answers: {
    text: string
    isCorrect: boolean
  }[]
}
interface updateData {
  update: {
    [key: string]: {
      id: string
      text: string
      type: string
      order: number
      answers: {
        text: string
        isCorrect: boolean
      }[]
    }[]
  }
}
export const Section = ({ onOpenDialog }: { onOpenDialog: () => void }) => {
  const dispatch = useDispatch()
  const { actions: sectionActions } = useSectionSlice()
  const [open, setOpen] = useState(false)
  const queryClient = useQueryClient()
  const sectionById = useSelector(selectSections)
  const { sectionId } = useParams()
  const section = useSelector(selectSections)
  const sectionCurrent = useSelector(selectSectionCurrent)
  const updateData = useSelector(selectSectionUpdate)
  const viewChange = useSelector(selectSectionChanged)
  const CreateQuestion = useMutation({
    mutationFn: sectionApi.CreateQuestion,
    onSuccess: (Res) => {
      if (Res?.message === "Create successfully") {
        queryClient.invalidateQueries({
          queryKey: queryKeys.sectionById.gen(sectionId as string),
        })
        toast.success(`${Res.message}`)
      } else {
        toast.error(`Error ${Res?.statusCode}: ${Res?.message}`)
      }
    },
    onError: () => {
      toast.error("Something error")
    },
  })
  console.log("sectionCurrent", sectionCurrent)
  Object.entries(section ?? {}).forEach(([key, value]) => console.log("section", key, " ", value))
  return (
    <div className="flex flex-col items-center bg-white">
      <Dialog open={open} onOpenChange={() => setOpen(!open)}>
        <DialogContent className="h-fit overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-black">Oops!!!</DialogTitle>
          </DialogHeader>
          <div className="flex items-center justify-center">
            <span className="text-black">Save your changes before moving to another question group</span>
          </div>
        </DialogContent>
      </Dialog>
      <div className="flex min-w-[439px] flex-col rounded-md border-2 border-borderContent bg-white p-[30px]">
        <div className="flex w-full items-center justify-between border-b-2 border-borderContent">
          <p className="w-full pb-3 text-[32px] text-content">Content</p>
          <div className="flex items-center gap-3">
            <Button
              onClick={() => onOpenDialog()}
              className="rounded-lg bg-fuschia px-3 py-1 text-base font-normal text-white hover:bg-pink-600"
            >
              + Add
            </Button>
            <Button
              onClick={async () => {
                if (viewChange) {
                  toast.error("Save your changes!!!")
                  return
                }
                const promises = []
                const finalData = Object.fromEntries(
                  Object.entries((updateData as updateData) ?? {}).map(([questionGrKey, value]) => {
                    console.log("ProccedData", questionGrKey, value)
                    const finalVual = value.map((item: question) => {
                      const removeAnswerId = (item.answers ?? []).map((answer) => {
                        const omit = _.omit(answer, ["id", "createDate", "updateDate"])
                        return omit
                      })
                      const data = {
                        ...item,
                        answers: removeAnswerId,
                      }
                      const removeItemId = _.omit(data, ["id", "createDate", "updateDate"])
                      return removeItemId
                    })
                    console.log("removeId", finalVual)
                    return [questionGrKey, finalVual]
                  }),
                )
                console.log("finalData", finalData)
                Object.entries(finalData ?? {}).forEach(([questionGrKey, value]) => {
                  const data = {
                    questionGroupId: questionGrKey,
                    questions: value as question[],
                  }
                  console.log("createWriting", data)
                  promises.push(CreateQuestion.mutate(data))
                })
                queryClient.invalidateQueries({
                  queryKey: queryKeys.sectionById.gen(sectionId as string),
                })
              }}
              className="rounded-lg bg-green-600 px-3 py-1 text-base font-normal text-white hover:bg-green-700"
            >
              <SaveIcon size={20} className="mr-1" />
              Save
            </Button>
          </div>
        </div>
        <div className={`flex w-full flex-col overflow-y-auto ${S.questionGroup}`}>
          {sectionById &&
            _.orderBy(sectionById.questionGroups ?? [], ["createDate"]).map((questionGr, index) => {
              return (
                <div
                  key={questionGr.id}
                  onClick={() => {
                    if (viewChange) {
                      setOpen(true)
                      return
                    }
                    dispatch(sectionActions.changeCurrentSection(questionGr.id))
                  }}
                  className={`${sectionCurrent.toString() === questionGr.id ? "my-2 flex w-full cursor-pointer rounded-md bg-currentBg px-4 py-3 transition-all" : "my-2 flex w-full cursor-pointer bg-white px-4 py-3 transition-all hover:bg-fuchsia-200"}`}
                >
                  <LuStar stroke="black" size={20} />
                  <div className="ml-3 flex flex-col">
                    <p className="text-2xl text-content">QuestionGroup {index + 1}</p>
                    <p className="text-sm text-typeContent">{questionGroupNameMap[questionGr.questionGroupType]}</p>
                  </div>
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}
