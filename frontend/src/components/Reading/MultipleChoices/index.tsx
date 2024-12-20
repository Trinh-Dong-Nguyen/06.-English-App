import { Button } from "@/components/ui/button"
// import { ComboboxDemo } from "@/components/ui/combobox"
import { useEffect, useState } from "react"
import Question from "../Components/Question"
import { useDispatch, useSelector } from "react-redux"
import { useSectionSlice } from "@/features/section/store"
import { selectSectionCurrent, selectSections, selectSectionUpdate } from "@/features/section/store/selectors"
import { toast, ToastContainer } from "react-toastify"
// import { Question as QuestionType } from "@/type/section"
import "react-toastify/dist/ReactToastify.css"
interface question {
  id: string
  questionGroup?: string
  section?: string
  text: string
  type: string
  order: number
  answers?: {
    text: string
    isCorrect: boolean
  }[]
}
const MultipleChoice = ({ type, sectionType }: { type: string; sectionType?: string }) => {
  const [question, setQuestion] = useState<question[]>([])
  const dispatch = useDispatch()
  const { actions: sectionActions } = useSectionSlice()
  const section = useSelector(selectSections)
  const sectionCurrent = useSelector(selectSectionCurrent)
  const updateData = useSelector(selectSectionUpdate)
  const currentQuestion = updateData[sectionCurrent]
  const [questions, setQuestions] = useState<number>(currentQuestion?.length ?? 0)
  useEffect(() => {
    setQuestions(currentQuestion?.length ?? 0)
  }, [currentQuestion?.length])
  console.log("updateData", updateData)
  console.log("currentQuestion", currentQuestion)
  console.log("bigBang", question)
  console.log("questionLength", questions)
  return (
    <div className="flex w-full flex-col">
      <ToastContainer />
      {
        <Button
          onClick={() => {
            let updateQuestionGroup = {}
            const checkAnswer = question
              .filter((item) => item.type !== "BLANK")
              .every((item) => {
                return item.answers?.some((answer) => answer.isCorrect === true)
              })
            console.log(
              "checkAnswer",
              question.filter((item) => item.type !== "BLANK"),
              question,
            )
            if (!checkAnswer) {
              toast.error("Missing correct answer")
              return
            }
            if (question.length < 1) {
              toast.error("Missing question text or answer")
              return
            }
            if (!sectionType) {
              updateQuestionGroup = {
                [sectionCurrent]: question,
              }
            } else {
              updateQuestionGroup = {
                [section.id]: question,
              }
            }
            console.log("MultipleChoice", question)
            dispatch(sectionActions.updateQuestion(updateQuestionGroup))
            dispatch(sectionActions.updateViewChanged(false))
            toast.success("Save successfully")
          }}
          className="fixed right-4 top-1/2 z-50 rounded-lg bg-blue-500 px-2 py-1 text-xs font-semibold text-white"
        >
          Save
        </Button>
      }
      {currentQuestion &&
        Array.from({ length: questions }).map((_, index) => (
          <Question key={index} index={index} setQuestion={setQuestion} type={type} />
        ))}
      <Button
        onClick={() => {
          dispatch(sectionActions.updateViewChanged(true))
          setQuestions((prev) => prev + 1)
        }}
        className="mt-[20px] h-[50px] w-[200px] rounded-md bg-[#5D5FEF] text-white"
      >
        Add Question
      </Button>
    </div>
  )
}

export default MultipleChoice
