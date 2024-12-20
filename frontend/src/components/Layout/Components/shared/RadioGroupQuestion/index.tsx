import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Question } from "@/type"
import { numToLetter } from "./helper"

export const RadioGroupQuestion = ({ prevSum, answer }: { prevSum: number; answer: Question[] }) => {
  console.log("RadioGroupQuestion")
  return (
    <div>
      {answer &&
        answer.map((value, index) => (
          <div className="flex w-full flex-col space-x-2">
            <div className="flex">
              <span key={(prevSum + index).toString()} className="mr-[11.18px] text-2xl text-questionText">
                {prevSum + value.order}
              </span>
              <span className="text-2xl text-questionText">{value.text}</span>
            </div>
            <RadioGroup>
              {value.answer?.map((ans, idx) => (
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value={ans.text} id={ans.text} />
                  <label htmlFor={ans.text} className="text-left text-2xl text-black">
                    {numToLetter(idx)}. {ans.text}
                  </label>
                </div>
              ))}
            </RadioGroup>
          </div>
        ))}
    </div>
  )
}
