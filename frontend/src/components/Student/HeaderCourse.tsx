import Logo from "@/assets/Logo.svg"

type HeaderCourseProps = {
  title?: string
}
export function HeaderCourse({ title }: HeaderCourseProps) {
  return (
    <div className="flex min-w-[90px] content-center gap-5 bg-[#FFF4F9] p-[20px] shadow-[0_6px_10px_-3px_rgba(0,0,0,0.5)]">
      <div className="flex content-center justify-between">
        <img src={Logo} alt="logo" className="mt-[5px] h-[36px] w-[36px] rounded-[40px]" />
        <h1 className="font-sans text-3xl font-bold text-[#5D5FEF]">Engdigo</h1>
      </div>
      <span className="h-100 content-center text-[24px]">|</span>
      <h1 className="font-sans text-3xl text-[#5D5FEF]">{title}</h1>
    </div>
  )
}
