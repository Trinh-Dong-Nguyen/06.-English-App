import { Button } from "@/components/Layout/Components/ui/Button"
import { Input } from "@/components/Layout/Components/ui/Input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useGrammar } from "@/features/section/hooks"
import { BiPlus, BiMinus } from "react-icons/bi"
import _ from "lodash"
import FroalaViewComponent from "@/components/Layout/Components/ui/FroalaViewComponent"
import { useState } from "react"
import { lessonApi } from "@/apis"
import { useParams } from "react-router"
import { toast } from "react-toastify"
import { useGrammarByLesson } from "@/features/lesson/hooks"
import LoadingScreen from "@/components/Layout/loadingScreen"
import { useMutation } from "@tanstack/react-query"

export const CreateGrammar = () => {
  const { data: grammarList } = useGrammar()
  const { lessonId } = useParams()
  const [listGrammar, setListGrammar] = useState<string[]>([])
  const { data: grammarByLesson, isLoading } = useGrammarByLesson(lessonId as string)
  console.log("grammarByLesson", grammarByLesson)
  const CreateGrammar = useMutation({
    mutationFn: ({ lessonId, grammarIds }: { lessonId: string; grammarIds: string[] }) =>
      lessonApi.AddGrammarToLesson(lessonId, grammarIds),
    onSuccess: (Res) => {
      if (Res?.message === "Add grammar to lesson successfully") {
        toast.success("Add grammar to lesson successfully")
      } else {
        toast.error(`${Res?.message}`)
      }
    },
    onError: () => {
      toast.error("Something error")
    },
  })
  const handleAddGrammar = () => {
    CreateGrammar.mutateAsync({ lessonId: lessonId as string, grammarIds: listGrammar })
  }
  function checkGrammarExist(id: string) {
    if (listGrammar.length > 0 && listGrammar.includes(id)) {
      return true
    }
    const check = grammarByLesson?.data.some((grammar) => grammar.id === id)
    console.log("checkGrammar", check, id)
    return check
  }
  console.log("CreateGrammar", CreateGrammar.isPending)
  return (
    <div className="flex h-full min-h-screen w-full flex-col bg-white px-[66px] py-[64px]">
      {(CreateGrammar.isPending || isLoading) && <LoadingScreen />}
      <div className="mb-[43px] flex flex-col rounded-md border-2 border-fuschia px-[78px] py-[56px]">
        <div className="flex w-full items-center justify-between">
          <Input
            className="w-[300px] rounded-full border-2 border-fuschia bg-white p-6 text-2xl text-placeHolder"
            placeholder="Search"
          />
          <Button
            onClick={handleAddGrammar}
            className="mr-[19px] rounded-full border-2 border-fuschia bg-fuschia px-[12px] py-[9.5px] text-[16px] font-normal text-white"
          >
            <BiPlus className="mr-[1.5px]" size={20} />
            Add list grammar
          </Button>
        </div>
        <div className="mt-[43px] flex w-full items-center justify-center">
          <Accordion type="single" collapsible className="w-full rounded-none border-[1px] border-fuschia text-2xl">
            {grammarList?.data &&
              grammarByLesson?.data &&
              _.orderBy(grammarList.data, ["title"], ["asc"]).map((grammar, index) => (
                <AccordionItem key={grammar.id} value={grammar.id}>
                  <AccordionTrigger className="bg-white px-[41px] py-[22px] font-semibold text-black">
                    <div className="flex w-full items-center justify-between">
                      <span>
                        {index + 1}. {grammar.title}
                      </span>
                      <div
                        onClick={() => {
                          setListGrammar((prev) => {
                            if (prev.includes(grammar.id)) {
                              return prev.filter((id) => id !== grammar.id)
                            }
                            if (grammarByLesson?.data.some((grammarLesson) => grammarLesson.id === grammar.id)) {
                              toast.info("You can not remove grammar which is already in lesson")
                              return prev
                            }
                            return [...prev, grammar.id]
                          })
                        }}
                        className="mr-2 flex items-center justify-center rounded-full bg-lessonbg transition-all hover:bg-fuchsia-300"
                      >
                        {!checkGrammarExist(grammar.id) ? (
                          <BiPlus
                            fill="#ef5da8"
                            className="m-2 cursor-pointer text-fuschia hover:text-fuchsia-700"
                            size={20}
                          />
                        ) : (
                          <BiMinus
                            fill="#ef5da8"
                            className="m-2 cursor-pointer text-fuschia hover:text-fuchsia-700"
                            size={20}
                          />
                        )}
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="bg-white px-[41px] py-[11px] font-normal text-black">
                    <FroalaViewComponent model={grammar.content} />
                  </AccordionContent>
                </AccordionItem>
              ))}
          </Accordion>
        </div>
      </div>
    </div>
  )
}
