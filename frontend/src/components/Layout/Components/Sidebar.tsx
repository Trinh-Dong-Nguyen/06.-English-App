// import { authApi } from "@/apis"
import { FaRegCircleUser } from "react-icons/fa6"

const Sidebar = () => {
  return (
    <div className="sticky top-0 flex h-[100vh] w-60 flex-col justify-between overflow-y-auto border-r-2 bg-black px-4 py-8 max-lg:hidden">
      <div>
        <p className="flex w-full px-4 text-xl font-semibold text-white">ListChats</p>
        <div className="mt-16">
          <div className="flex w-full cursor-pointer items-center rounded-md px-2 py-2 transition-all hover:bg-gray-500">
            <FaRegCircleUser size={30}></FaRegCircleUser>
            <div className="ml-2 flex flex-col">
              <p className="text-md font-bold text-white">Nguyen Van A</p>
              <p className="text-xs font-normal text-gray-300">alo co do ko</p>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t-2">
        <p
          className="mt-1.5 cursor-pointer rounded-md px-4 py-2.5 text-slate-50 transition-colors duration-300 hover:bg-white hover:font-medium hover:text-primaryColor"
          //   onClick={async () => {
          //     await authApi.logOut()
          //     window.location.href = '/'
          //   }}
        >
          Đăng xuất
        </p>
      </div>
    </div>
  )
}

export default Sidebar
