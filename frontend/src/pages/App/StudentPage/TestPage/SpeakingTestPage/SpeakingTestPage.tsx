import "regenerator-runtime/runtime"
import { useEffect, useState } from "react"
import { IoIosArrowBack } from "react-icons/io"
import { LuClock } from "react-icons/lu"
import { IoSend } from "react-icons/io5"
import { FaMicrophone } from "react-icons/fa"
import { FaMicrophoneSlash } from "react-icons/fa"
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition"
import { useParams } from "react-router"
import { httpClient } from "@/services"
// import { set } from "lodash"
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
const SpeakingTestPage = () => {
  const speech = useSpeechRecognition()
  const totalMinutes: number = 15
  const [minutes, setMinutes] = useState(totalMinutes)
  const [isRecording, setIsRecording] = useState(false)
  const [seconds, setSeconds] = useState(59)
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [currentAnswer, setCurrentAnswer] = useState("")
  const [answers, setAnswers] = useState<string[]>([])
  const params = useParams()
  const sectionId = params.sectionId
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        // because frontend has not handled the authentication yet, so I hardcoded the accessToken here
        // sign in on the Swagger UI to get the accessToken
        const myAccessToken =
          "eyJraWQiOiJ0emNWdFRYeDYrazQ1TWhYNXV6NWhQMHVMV0sxVXBOakJVclh0Z2djT21RPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJkOWRhYjVlYy1lMDAxLTcwNDEtZmYxZS01MzNmZDJiOTAwMWQiLCJjb2duaXRvOmdyb3VwcyI6WyJTVFVERU5UIl0sImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5hcC1zb3V0aGVhc3QtMS5hbWF6b25hd3MuY29tXC9hcC1zb3V0aGVhc3QtMV9lZ3BZSjF0R1kiLCJjbGllbnRfaWQiOiI2Y2NqbTZ2ZTl0ZnExOGJoY2g5YnUwanU5aSIsIm9yaWdpbl9qdGkiOiJmODY1ODM3MC05ZDk4LTQ3ZjAtODRkMy04YmRlOTg4MmZiMmUiLCJldmVudF9pZCI6IjJjODk3NzJjLTg3NTAtNDcyZS1hN2Y3LWExOThkMjVjODU2ZiIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE3MzM2MjgxNTYsImV4cCI6MTczMzYzMTc1NiwiaWF0IjoxNzMzNjI4MTU2LCJqdGkiOiI2YzkyMzFmOS1hNTEyLTQwN2YtYjA1Zi0xN2NmNDhmNzA0YzYiLCJ1c2VybmFtZSI6Im1haWt1c29idSJ9.AxgcYSPSCDAqAvhNXXa6eAIq5yDC9H5H5Canr3RyCqUxOiF47DM9VvgcxB98QPnNbvIbN_lhnoF7PNtWjoO6mU939T5AqA-S3vBMTRJHgmzsBh3iJLaFM_fawc8ct67QnneGBky2lXimelyHqUWt95KTkv2nRq4iniD01-WEkXvAUfS4hASCo0r6oSVOFqBXKpqaJAFUi3P3AtqY_irqaLRHD7hqQmGAMqgW-V1O3gjMFgQUvKE60T_TdCe3cn0qKamiHo5l0Y2-DCWDQ8zxm-hSFLfAn6jt7gyuI2QTXeunb28aACGizkxuegvrn9EQbnnHiNHP1v0E2Yn_OihFPA"
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
    const studentAnswer: StudentAnswerDTO = {
      answers: questions.map((question, index) => {
        return {
          questionId: question.id,
          answer: index === currentQuestionIndex ? currentAnswer : answers[index],
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
  const startRecording = () => {
    setIsRecording(!isRecording)
    if (!isRecording) {
      SpeechRecognition.startListening({
        continuous: true,
      })
    } else {
      SpeechRecognition.stopListening()
    }
  }
  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds === 0) {
        setMinutes(minutes - 1)
        setSeconds(59)
      } else {
        setSeconds(seconds - 1)
      }
      if (minutes === 0 && seconds === 0) {
        clearInterval(interval)
        // console.log('Đã hết giờ!');
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [minutes, seconds])
  useEffect(() => {
    if (speech.listening) {
      setCurrentAnswer(speech.finalTranscript)
    }
  }, [speech])
  return (
    <>
      <div className="flex h-screen flex-col bg-white">
        <div className="h-[60px] flex-none bg-[#FFF4F9] shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
          <button className="flex items-center bg-transparent py-[14px]">
            <IoIosArrowBack className="h-[30px] w-[30px] text-[#5D5FEF]" />
            <span className="text-[16px] font-bold text-[#5D5FEF]">Speaking Section</span>
          </button>
        </div>

        <div className="flex h-full w-full items-center justify-around">
          <div className="mx-auto flex h-[90%] w-[95%] flex-col rounded-lg border-2 border-[#a5a6f6]">
            <div className="flex h-[60px] w-full items-center justify-between bg-[#e4e4e4]">
              <div></div>
              <span className="mr-[-40] items-center text-[32px] font-medium text-black">PART 1 TOPIC</span>
              <button
                onClick={
                  currentQuestionIndex < questions.length - 1
                    ? () => {
                        if (currentQuestionIndex < questions.length - 1) {
                          const newAnswers = [...answers]
                          newAnswers[currentQuestionIndex] = currentAnswer
                          setAnswers(newAnswers)
                          setCurrentAnswer("")
                          setCurrentQuestionIndex(currentQuestionIndex + 1)
                          if (speech.listening) {
                            startRecording()
                          }
                          speech.resetTranscript()
                        }
                      }
                    : handleSubmit
                }
                className="mr-10 flex h-[30px] w-[110px] items-center justify-center bg-fuschia py-[5px]"
              >
                <span className="mr-3 text-[20px] font-normal text-white">
                  {currentQuestionIndex < questions.length - 1 ? "Next" : "Submit"}
                </span>
                <IoSend className="h-[20px] w-[20px] text-white" />
              </button>
            </div>

            <div className="flex flex-grow flex-col justify-around bg-[#fafafa]">
              <div className="flex items-center justify-center">
                <LuClock className="ml-[2px] h-[30px] w-[30px] text-[#5D5FEF]" />
                <span className="text-[24px] font-semibold text-[#5D5FEF]">{minutes}:</span>
                <span className="text-[24px] font-semibold text-[#5D5FEF]">{seconds}</span>
              </div>

              <span className="mx-auto text-[28px] font-semibold text-fuschia">
                QUESTION {currentQuestionIndex + 1}
              </span>

              <p className="mx-auto text-[24px] font-semibold text-black">
                {questions.length > 0 ? questions[currentQuestionIndex].text : "Loading..."}
              </p>
              <p className="mx-auto text-[20px] text-black">{speech.transcript}</p>
              {/* <div className="ml-[200px]">
                <p className="text-[20px] font-medium text-black">You should say:</p>
                <p className="ml-5 text-[20px] font-medium text-black">Who this person is</p>
                <p className="ml-5 text-[20px] font-medium text-black">How you met</p>
                <p className="ml-5 text-[20px] font-medium text-black">
                  Why you want to work or study with this person
                </p>
              </div> */}

              <div className="mx-auto flex items-center justify-between">
                <hr className="w-[250px] border border-fuschia" />
                <button
                  className="mx-2 flex h-[70px] w-[70px] items-center justify-center overflow-hidden rounded-full bg-white shadow-[0_-1px_4px_rgba(0,0,0,0.25)] outline-none focus:outline-none"
                  onClick={() => {
                    startRecording()
                  }}
                >
                  {isRecording ? (
                    <FaMicrophoneSlash className="h-[30px] w-[40px] rounded-full text-red-500" />
                  ) : (
                    <FaMicrophone className="h-[30px] w-[30px] rounded-full text-fuschia" />
                  )}
                </button>
                <hr className="w-[250px] border border-fuschia" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default SpeakingTestPage
