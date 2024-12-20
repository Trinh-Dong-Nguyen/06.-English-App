import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react"
import Answer from "./Answer"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { AnimatePresence, motion } from "framer-motion"
import { useDispatch, useSelector } from "react-redux"
import { selectSectionCurrent, selectSections, selectSectionUpdate } from "@/features/section/store/selectors"
import { useParams } from "react-router"
import FroalaEditorComponent from "@/components/Layout/Components/ui/FroalaEditorComponent"
import generateFroalaConfig from "@/config/froala.config"
import { useSectionSlice } from "@/features/section/store"

interface AnswerType {
  text: string
  isCorrect: boolean
}

interface Question {
  index: number
  question: string
  answers: AnswerType[]
  multipleAnswers: boolean
}

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

const parent = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}
const child = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
}

const Question = ({
  index,
  setQuestion: setListQuestion,
  type,
}: {
  index: number
  setQuestion: Dispatch<SetStateAction<question[]>>
  type: string
}) => {
  const dispatch = useDispatch()
  const { actions: sectionActions } = useSectionSlice()
  const { sectionId } = useParams()
  const froalaConfig = useMemo(() => generateFroalaConfig(), [])
  const section = useSelector(selectSections)
  const sectionCurrent = useSelector(selectSectionCurrent)
  const updateData = useSelector(selectSectionUpdate)
  const currentQuestion = updateData[sectionCurrent]
  const [question, setQuestion] = useState<string>(currentQuestion ? (currentQuestion[index]?.text ?? "") : "")
  console.log("NhapText", question, section, currentQuestion)
  const [answers, setAnswers] = useState<AnswerType[]>(currentQuestion ? (currentQuestion[index]?.answers ?? []) : [])
  const [newAnswerText, setNewAnswerText] = useState<string>("")
  const handleRemoveAnswer = (index: number) => {
    const newAnswers = [...answers]
    newAnswers.splice(index, 1)
    setAnswers(newAnswers)
    console.log("REMOVE")
    dispatch(sectionActions.updateViewChanged(true))
  }

  const handleKeyDown = (event: { key: string }) => {
    if (event.key === "Enter") {
      let newAnswers = {
        text: "",
        isCorrect: false,
      }
      if (type === "BLANK") {
        newAnswers = {
          text: newAnswerText,
          isCorrect: true,
        }
      } else {
        newAnswers = {
          text: newAnswerText,
          isCorrect: false,
        }
      }
      setNewAnswerText("")
      setAnswers([...answers, newAnswers])
      dispatch(sectionActions.updateViewChanged(true))
    }
  }

  const handleIsCorrectChange = (text: string) => {
    console.log("TextCheck", text)
    setAnswers((prevAnswers) =>
      prevAnswers.map((answer) => (answer.text === text ? { ...answer, isCorrect: !answer.isCorrect } : answer)),
    )
    dispatch(sectionActions.updateViewChanged(true))
  }

  const noQuestionGroup = useMemo(() => section.type === "WRITING" || section.type === "SPEAKING", [section.type])

  useEffect(() => {
    if ((answers.length > 0 || noQuestionGroup) && question !== "") {
      setListQuestion((prev): question[] => {
        console.log("Begin", prev, question)
        if (prev.length > 0) {
          if (
            prev.some((q) => q.id && q.id === currentQuestion[index]?.id) ||
            prev.some((q) => q.order === currentQuestion[index]?.order)
          ) {
            console.log(
              "CheckIf",
              prev.some((q) => q.id === currentQuestion[index]?.id),
              prev.some((q) => q.order === currentQuestion[index]?.order),
            )
            if (prev.some((q) => q.order === currentQuestion[index]?.order)) {
              prev.forEach((q) => {
                if (q.order === currentQuestion[index]?.order) {
                  console.log("CheckIfOrder", currentQuestion[index], q)
                }
                q.order === currentQuestion[index]?.order
              })
            }
            if (!noQuestionGroup) {
              console.log("QuestionGroupprev", prev)
              return prev.map((q) =>
                q.id === currentQuestion[index]?.id || q.order === currentQuestion[index]?.order
                  ? {
                      id: q.id,
                      text: question,
                      type: type,
                      order: currentQuestion[index]?.order ?? index,
                      answers: answers,
                    }
                  : q,
              )
            } else {
              console.log(
                "NoQuestionGroupprev",
                prev,
                prev.map((q) =>
                  q.id === currentQuestion[index]?.id || q.order === currentQuestion[index]?.order
                    ? {
                        id: q.id,
                        text: question,
                        type: type,
                        order: currentQuestion[index]?.order ?? index,
                      }
                    : q,
                ),
              )
              return prev.map((q) =>
                q.id === currentQuestion[index]?.id || q.order === currentQuestion[index]?.order
                  ? {
                      id: q.id,
                      text: question,
                      type: type,
                      order: currentQuestion[index]?.order ?? index,
                    }
                  : q,
              )
            }
          }
          if (currentQuestion.length === 0) {
            if (prev.some((q) => q.order === index)) {
              if (!noQuestionGroup) {
                return prev.map((q) =>
                  q.order === index
                    ? {
                        id: q.id,
                        text: question,
                        type: type,
                        order: q.order,
                        answers: answers,
                      }
                    : q,
                )
              } else {
                return prev.map((q) =>
                  q.order === index
                    ? {
                        id: q.id,
                        text: question,
                        type: type,
                        order: q.order,
                      }
                    : q,
                )
              }
            }
          }
        }
        if (noQuestionGroup) {
          console.log("ElseIfNoQuestionGroupprev", prev, currentQuestion[index])
          return [
            ...prev,
            {
              id: currentQuestion[index]?.id,
              text: question,
              type: type,
              order: currentQuestion[index]?.order ?? index,
            },
          ]
        }
        if (prev.some((q) => !q.id && q.text === question)) {
          return prev.map((q) =>
            q.text === question
              ? {
                  id: q.id,
                  text: question,
                  type: type,
                  order: currentQuestion[index]?.order ?? index,
                  answers: answers,
                }
              : q,
          )
        }
        console.log("ReturnQuestionGroupprev", prev)
        return [
          ...prev,
          {
            id: currentQuestion[index]?.id,
            text: question,
            type: type,
            order: currentQuestion[index]?.order ?? index,
            answers: answers,
          },
        ]
      })
    }
  }, [answers, currentQuestion, index, noQuestionGroup, question, sectionCurrent, sectionId, setListQuestion, type])

  return (
    <motion.div
      variants={parent}
      initial="hidden"
      animate="visible"
      className="mb-[28px] rounded-lg border-2 border-gray-200"
    >
      <h3 className="ml-[14px] mt-[16px] text-[24px] font-normal not-italic leading-normal text-[#5D5FEF]">
        Question {index + 1}
      </h3>
      <div className="ml-[42px] mr-[10px] mt-[33px]">
        <Label className="leading-[140%] text-black" htmlFor="question">
          Question
        </Label>
        <FroalaEditorComponent
          key={index}
          tag="textarea"
          config={froalaConfig}
          model={question}
          onModelChange={(e: string) => {
            setQuestion(e)
          }}
        />
      </div>
      <hr className="mx-[15px] mt-[36px] bg-backgroundLine" />
      {section.type !== "WRITING" && section.type !== "SPEAKING" && (
        <div className="ml-[36px] mt-[66px]">
          <div className="flex flex-col">
            <div className="flex">
              <div className="flex w-full flex-col">
                <div className="mr-[25px] flex items-center justify-between">
                  {type === "MULTIPLE_CHOICE" && (
                    <div className="mb-[33px] flex min-w-[340px] items-center gap-6">
                      <span className="text-xl leading-normal text-[#1E1E1E]">Multiple answers</span>
                    </div>
                  )}
                  {type !== "BLANK" && <span className="text-[#8A8A8A]">Correct</span>}
                </div>
                <AnimatePresence>
                  <ul className="mr-[25px] flex flex-col gap-[28px]">
                    <RadioGroup
                      defaultValue={
                        answers.length > 0
                          ? answers
                              .filter((ans) => ans.isCorrect === true)
                              .map((ans) => {
                                return ans.text
                              })[0]
                          : ""
                      }
                      onValueChange={(value) => handleIsCorrectChange(value)}
                    >
                      {answers.length > 0 ? (
                        answers.map((answer, index) => (
                          <motion.li
                            variants={child}
                            initial="hidden"
                            animate="visible"
                            transition={{ duration: 0.5 }}
                            className="flex items-center justify-between"
                            key={index}
                          >
                            <Answer content={answer.text} index={index} />
                            <Button
                              className="h-full border-none bg-transparent text-[#A5A6F6] outline-none hover:bg-transparent hover:text-fuschia"
                              onClick={() => handleRemoveAnswer(index)}
                            >
                              X
                            </Button>
                            {type === "MULTIPLE_CHOICE" && (
                              <Checkbox
                                id={answer.text}
                                checked={answer.isCorrect}
                                onCheckedChange={() => handleIsCorrectChange(answer.text)}
                                className="mr-3 h-[20px] w-[20px] bg-white"
                              />
                            )}
                            {type === "COMBO_BOX" && (
                              <div className="mr-3 flex h-[20px] w-[20px] items-center space-x-2">
                                <RadioGroupItem className="bg-inherit" value={answer.text} id={answer.text} />
                              </div>
                            )}
                          </motion.li>
                        ))
                      ) : (
                        <span className="text-sm font-semibold text-red-600">
                          Please fill your question answer or this question can't be saved!!!
                        </span>
                      )}
                    </RadioGroup>
                    <div className="mb-[20px] flex w-full max-w-[780px] justify-center align-middle">
                      <div className="w-full min-w-[240px] rounded-lg border-[1px] bg-customPink px-[16px] py-2">
                        <Input
                          value={newAnswerText}
                          onChange={(e) => setNewAnswerText(e.target.value)}
                          onKeyDown={handleKeyDown}
                          className="border-none bg-inherit text-[#AEAEB2]"
                          type="text"
                          placeholder="Type here"
                        />
                      </div>
                    </div>
                  </ul>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  )
}
export default Question
