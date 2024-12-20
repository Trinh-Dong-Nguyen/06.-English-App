import Logo from "@/assets/logo_web.svg"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DefaultAvatar } from "@/utils/constants."
import { FaSearch } from "react-icons/fa"
import { RiNotification2Line } from "react-icons/ri"
import { useNavigate } from "react-router"

export default function Header() {
  const navigate = useNavigate()
  return (
    <header className="flex content-center justify-between border-b-[1px] border-[#A5A6F6] p-[20px]">
      <div className="flex content-center">
        <div
          className="flex content-center justify-between hover:cursor-pointer"
          onClick={() => navigate("/student-home")}
        >
          <img src={Logo} alt="logo" className="mt-[5px] h-[36px] w-[36px]" />
          <h1 className="font-sans text-3xl font-bold text-[#5D5FEF]">Engdigo</h1>
        </div>
        <Button className="bg-transparent hover:border-transparent hover:bg-transparent">Categories</Button>
      </div>
      <div className="relative">
        <Input
          placeholder="Search for courses"
          className="relative h-[40px] min-w-[700px] rounded-[20px] border-2 border-[#ef5da8] bg-transparent"
        />
        <Button className="absolute right-0 top-0 bg-transparent hover:border-transparent hover:bg-transparent">
          <FaSearch />
        </Button>
      </div>
      <div className="flex content-center">
        <Button className="bg-transparent hover:border-transparent hover:bg-transparent">Instructor</Button>
        <Button
          className="bg-transparent hover:border-transparent hover:bg-transparent"
          onClick={() => navigate("/student/my-course")}
        >
          MyLearning
        </Button>
        <Button className="bg-transparent hover:border-transparent hover:bg-transparent">
          <RiNotification2Line className="text-[20px] text-[#5D5FEF]" />
        </Button>
        <Button className="bg-transparent hover:border-transparent hover:bg-transparent">
          <img src={DefaultAvatar} alt="avatar" className="h-[36px] w-[36px] rounded-full" />
        </Button>
      </div>
    </header>
  )
}
