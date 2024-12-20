import { Checkbox } from "@/components/ui/checkbox"
import { Question } from "@/type"
import { numToLetter } from "../RadioGroupQuestion/helper"
export const MultipleChoiceQuestion = ({ prevSum, answer }: { prevSum: number; answer: Question[] }) => {
  return (
    <div>
      {answer &&
        answer.map((value, index) => (
          <div className="mb-4">
            <span id={(prevSum + index).toString()} className="mr-[11.18px] text-2xl text-headerIcon">
              {prevSum + value.order}.{" "}
            </span>
            <span className="text-2xl text-headerIcon">{value.text}</span>
            {value.answer?.map((ans, idx) => (
              <div key={prevSum + idx} className="flex w-full items-center space-x-2">
                <Checkbox
                  className="bg-white p-0 data-[state=checked]:bg-checkboxBg data-[state=checked]:text-white"
                  id={ans.text}
                />
                <label htmlFor={ans.text} className="text-left text-2xl text-black">
                  {numToLetter(idx)} {ans.text}
                </label>
              </div>
            ))}
          </div>
        ))}
    </div>
  )
}
