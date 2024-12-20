import { Button } from "@/components/ui/button"
// import { ComboboxDemo } from "@/components/ui/combobox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
// import Question from "@/components/Reading/Components/Question"
import { useState } from "react"

const QuestionComponent = () => {
  const [numberOfQuestion, setNumberOfQuestion] = useState<number>(0)
  const [question, setQuestion] = useState<number[]>([])
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNumberOfQuestion(+e.target.value)
  }
  const handleQuestion = () => {
    setQuestion([...Array(numberOfQuestion).keys()])
  }
  const handleAddButton = () => {
    setNumberOfQuestion((prev) => prev + 1)
  }
  const handleRemoveButton = () => {
    setNumberOfQuestion((prev) => prev - 1)
  }
  return (
    <div className="w-full">
      <div>
        <div>
          {!question.length && (
            <div className="ml-[66px] mt-[52px]">
              <Label className="text-[black]">Number of questions</Label>
              <div className="flex gap-3">
                <div className="min-w-[500px]">
                  <Input
                    className="bg-inherit text-[black]"
                    type="number"
                    value={numberOfQuestion}
                    onChange={handleChange}
                  />
                  <div className="flex w-full justify-end">
                    <Button className="mt-[21px] bg-[#f178b6]" onClick={handleQuestion}>
                      OK
                    </Button>
                  </div>
                </div>
                <div>
                  <Button
                    className="border-none bg-customPink text-[black] hover:bg-fuschia hover:text-white"
                    onClick={handleAddButton}
                  >
                    +
                  </Button>
                  <Button
                    className="border-none bg-customPink text-[black] hover:bg-fuschia hover:text-white"
                    onClick={handleRemoveButton}
                  >
                    -
                  </Button>
                </div>
              </div>
            </div>
          )}
          {/* {question.length > 0 && (
            <div>
              <ul>
                {question.map((_q, i) => (
                  <li key={i}>
                    <Question index={i + 1} />
                  </li>
                ))}
              </ul>
            </div>
          )} */}
        </div>
      </div>
    </div>
  )
}
export default QuestionComponent
