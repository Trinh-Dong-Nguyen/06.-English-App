import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PlusCircledIcon } from "@radix-ui/react-icons"

const InputQuestion = ({ className }: { className: string }) => {
  return (
    <div className={`flex ${className}`}>
      <Input className="bg-customPink px-[12px] py-[16px] text-[#AEAEB2]" placeholder="Type here" />
      <Button variant="outline" size="icon" className="flex items-center justify-center bg-inherit p-0">
        {" "}
        <PlusCircledIcon className="h-5 w-5 bg-inherit text-[black]" />
      </Button>
    </div>
  )
}
export default InputQuestion
