import { Splitter, SplitterPanel } from "primereact/splitter"
import { IoSend } from "react-icons/io5"
import { IoIosArrowBack } from "react-icons/io"
import { IoIosArrowDropright, IoIosArrowDropleft } from "react-icons/io"

import writtingTest from "@/assets/image/writingTest.jpg"
import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { httpClient } from "@/services"
type Question = {
  // place type Question here just for now
  id: string
  text: string
  type: string
  order: number
  questionGroup?: object
}
type StudentAnswerDTO = {
  answers: {
    questionId: string
    answer: string
  }[]
}
const WritingTestPage = () => {
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [currentAnswer, setCurrentAnswer] = useState("")
  const [answers, setAnswers] = useState<string[]>([])
  // get sectionId from params
  const params = useParams()
  const sectionId = params.sectionId
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        // because frontend has not handled the authentication yet, so I hardcoded the accessToken here
        // sign in on the Swagger UI to get the accessToken
        const myAccessToken =
          "eyJraWQiOiJ0emNWdFRYeDYrazQ1TWhYNXV6NWhQMHVMV0sxVXBOakJVclh0Z2djT21RPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJkOWRhYjVlYy1lMDAxLTcwNDEtZmYxZS01MzNmZDJiOTAwMWQiLCJjb2duaXRvOmdyb3VwcyI6WyJTVFVERU5UIl0sImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5hcC1zb3V0aGVhc3QtMS5hbWF6b25hd3MuY29tXC9hcC1zb3V0aGVhc3QtMV9lZ3BZSjF0R1kiLCJjbGllbnRfaWQiOiI2Y2NqbTZ2ZTl0ZnExOGJoY2g5YnUwanU5aSIsIm9yaWdpbl9qdGkiOiI1MDEyZjRhZC1iYzI3LTRhOGMtYWExYi00OWFlMTRkODRiNjIiLCJldmVudF9pZCI6IjQzYjkwMjRjLWU1NDktNDMwNS05ZmJiLThiODNiYjA2ZTEzNSIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE3MzM2MjQxNzgsImV4cCI6MTczMzYyNzc3OCwiaWF0IjoxNzMzNjI0MTc4LCJqdGkiOiIyZjdmNzA3Yy1mZmE1LTRlMGMtOTA1MC05ZDMyOWE4MTU5NTMiLCJ1c2VybmFtZSI6Im1haWt1c29idSJ9.nnBAv_SmNrmrylynDPJ-85kc5w0wmugRWrJsvLA0bE1DIz1xVkOytKjgzyLcEDHk2jvJiPsC6rBT-iCGGH5QITV6qLcf5X8cMfPY_U4mlhloquHabP_rpeBuDbXQkMTeOhHANNPUCOkRxSfP9dSAFHwkMBaaQNFUtT6UYKPl3X7FJ2kuFsJR0TKriSI0FS_sEv_1i9ByK1UFKzuSZtbLxEeJpqNZ2itFMcmlKGozG9xd5N6KoQTRiO3hKEtLvX2xi-9xXbk9gmn3JPOTdxYt0eStW_ws-mGr0URiAM2KSE880QOl454F_RuUGsYFl_WKjXRSsL9HxAi7LA_taEzQRA"
        httpClient.setAuthHeader(localStorage.getItem("accessToken") || myAccessToken)
        const res = await httpClient.get<{
          statusCode: number
          message: string
          data: {
            null: {
              questions: Question[]
            }
          }
        }>(`/question`)
        // the right endpoint should be like this `/question/${sectionId}`, but the backend has not implemented it yet
        console.log(res)
        if (res.statusCode === 200) {
          setQuestions(res.data.null.questions)
          setAnswers(res.data.null.questions.map(() => ""))
          console.log(res.data.null.questions)
        } else {
          console.log(res.message)
        }
      } catch (err) {
        console.log(err)
      }
    }
    fetchQuestions()
  }, [sectionId])

  const handleSubmit = async () => {
    const currentAnswers = [...answers]
    currentAnswers[currentQuestionIndex] = currentAnswer
    setAnswers(currentAnswers)
    const studentAnswer: StudentAnswerDTO = {
      answers: questions.map((question, index) => {
        return {
          questionId: question.id,
          answer: answers[index],
        }
      }),
    }
    try {
      const res = await httpClient.post<{
        statusCode: number
        message: string
      }>("/student-answer/submit-answer", studentAnswer)
      console.log(res)
      if (res.statusCode === 200) {
        alert("Submit successfully")
      } else {
        console.log(res.message)
      }
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <>
      <div className="flex h-screen flex-col overflow-hidden bg-white">
        <div className="h-[60px] flex-none bg-[#FFF4F9] shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
          <button className="flex items-center bg-transparent py-[14px]">
            <IoIosArrowBack className="h-[30px] w-[30px] text-[#5D5FEF]" />
            <span className="text-[16px] font-bold text-[#5D5FEF]">Section Writing</span>
          </button>
        </div>

        <Splitter
          style={{ height: "calc(100vh - 150px)", backgroundColor: "#a5a6f6" }}
          className="mt-[8px] border-b-2 border-[#a5a6f6]"
        >
          <SplitterPanel
            className="align-items-center justify-content-center flex overflow-y-auto bg-white"
            size={25}
            minSize={10}
          >
            <div className="mx-2 my-auto w-full overflow-y-auto">
              <span className="text-[24px] font-bold text-black">
                {questions.length > 0 ? `Question ${currentQuestionIndex + 1}` : "Loading..."}
              </span>
              <p className="text-[16px] text-black">
                {questions.length > 0 ? questions[currentQuestionIndex].text : "Loading..."}
              </p>

              <img src={writtingTest} alt="writting test image" className="w-full object-cover" />
            </div>
          </SplitterPanel>
          <SplitterPanel className="align-items-center justify-content-center flex bg-white" size={75}>
            <div className="mx-6 my-auto w-full">
              <textarea
                placeholder="Type your essay here..."
                className="min-h-[400px] w-full rounded-md border-2 bg-white text-black"
                value={currentAnswer}
                onChange={(e) => setCurrentAnswer(e.target.value)}
              ></textarea>
              <div className="flex w-full items-center justify-between">
                <span className="text-[20px] text-black">Word Count:</span>
                <div className="flex justify-between">
                  <button
                    className="mr-2 flex items-center rounded-full bg-transparent p-0"
                    onClick={() => {
                      if (currentQuestionIndex > 0) {
                        const newAnswers = [...answers]
                        newAnswers[currentQuestionIndex] = currentAnswer
                        setAnswers(newAnswers)
                        setCurrentAnswer(answers[currentQuestionIndex - 1])
                        setCurrentQuestionIndex(currentQuestionIndex - 1)
                      }
                    }}
                  >
                    <IoIosArrowDropleft className="h-[50px] w-[50px] text-fuschia" />
                  </button>

                  <button
                    className="flex items-center rounded-full bg-transparent p-0"
                    onClick={() => {
                      if (currentQuestionIndex < questions.length - 1) {
                        const newAnswers = [...answers]
                        newAnswers[currentQuestionIndex] = currentAnswer
                        setAnswers(newAnswers)
                        setCurrentAnswer(answers[currentQuestionIndex + 1])
                        setCurrentQuestionIndex(currentQuestionIndex + 1)
                      }
                    }}
                  >
                    <IoIosArrowDropright className="h-[50px] w-[50px] text-fuschia" />
                  </button>
                </div>
              </div>
            </div>
          </SplitterPanel>
        </Splitter>

        <div className="flex h-[90px] items-center justify-center">
          <button
            onClick={handleSubmit}
            className="flex h-[38px] w-[160px] items-center justify-center bg-fuschia py-[18px]"
          >
            <span className="mr-4 text-[20px] font-bold text-white">Submit</span>
            <IoSend className="h-[25px] w-[25px] text-white" />
          </button>
        </div>
      </div>
    </>
  )
}
export default WritingTestPage
