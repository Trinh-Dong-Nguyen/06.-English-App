import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/Layout/Components/ui/Select"
import { Question } from "@/type"

export const ComboBoxQuestion = ({ prevSum, answer }: { prevSum: number; answer: Question[] }) => {
  return (
    <div>
      {answer &&
        answer.map((value, idx) => (
          <div key={idx} className="mb-2 flex w-full items-center">
            <span className="mr-[11.18px] text-2xl text-headerIcon">{prevSum + value.order}</span>
            <Select>
              <SelectTrigger className="mr-[11.18px] w-auto rounded-xl border-2 border-comboboxBorder">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectGroup>
                  {value.answer?.map((i) => (
                    <SelectItem className="rounded-xl text-[12px] focus:bg-comboboxBg" key={i.text} value={i.text}>
                      {i.text}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <span className="text-left text-2xl text-black">{value.text}</span>
          </div>
        ))}
    </div>
  )
}
