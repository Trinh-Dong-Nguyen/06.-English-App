import Header from "@/components/Tam-components/Header"
import Logo from "../../../assets/header_image_teacher.svg"

export default function DefaultLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <div className="ml-[70px] flex h-[120px] items-center gap-[30px] bg-white">
        <img src={Logo} />
        <span className="text-[40px] font-bold text-black">Emma</span>
      </div>
      <Header></Header>
      <div className="mb-4 w-screen flex-1">{children}</div>
    </div>
  )
}
