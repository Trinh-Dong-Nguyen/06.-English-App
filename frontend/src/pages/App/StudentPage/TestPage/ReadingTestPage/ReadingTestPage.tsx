import { MatchingQuestion } from "@/components/Layout/Components/shared/MatchingQuestion"
// import { MultipleChoiceQuestion } from "@/components/Layout/Components/shared/MultipleChoiceQuestion"
// import { ComboBoxQuestion } from "@/components/Layout/Components/shared/TFNQuestion"
// import _ from "lodash"
// import { RadioGroupQuestion } from "@/components/Layout/Components/shared/RadioGroupQuestion"

interface ReadingTestPageProps {
  questionGroups: Group[] // Ensure it's an array
}
type Group = {
  id: string
  text: string
  questions: Question[]
}

type Question = {
  id: string
  text: string
  type: string
  order: number
  createDate: string
  updateDate: string
}

export const ReadingTestPage: React.FC<ReadingTestPageProps> = ({ questionGroups }) => {
  return (
    <div className="flex h-full w-full flex-col overflow-y-auto bg-white">
      {questionGroups.map((group) => (
        <div className="my-6">
          <div className="mt-4">
            {group.questions.map((Question: Question, id: number) => (
              <div key={id} className="mb-4">
                {Question.type === "BLANK" && <MatchingQuestion text={Question.text} />}
                {/* Uncomment and handle other question types */}
                {/* {question.type === "MULTIPLECHOICE" && <MultipleChoiceQuestion text={question.text} order={question.order} />} */}
                {/* {question.type === "COMBOBOX" && <ComboBoxQuestion text={question.text} order={question.order} />} */}
              </div>
            ))}
          </div>
        </div>
      ))}

      <hr className="mx-3 my-[30px] border-t-2 bg-[#FCDDEC]" />
      <div className="my-[50px] text-center text-2xl text-[#5d5fef]">--End of the Test--</div>
    </div>
  )
}
