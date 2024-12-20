import LoginImage from "@/assets/image/LoginImage.jpg"
export default function LoginRegisterLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex h-screen w-screen items-center justify-center bg-gradient-to-b from-white via-pink-200 to-white">
        <img src={LoginImage} alt="" className="mr-16 h-[570px] w-[500px]" />
        <>{children}</>
      </div>
    </>
  )
}
