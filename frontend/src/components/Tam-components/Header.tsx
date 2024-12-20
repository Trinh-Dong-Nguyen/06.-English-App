import { HiOutlineArrowNarrowLeft } from "react-icons/hi"
import { FiUpload } from "react-icons/fi"
import { AiOutlineQuestionCircle } from "react-icons/ai"
import { IoEyeOutline, IoCheckmarkDoneCircleOutline } from "react-icons/io5"
import { useLocation } from "react-router"

// import { ButtonGroup } from "primitives"
// import { Button } from "primitives"
// import { IconCheckCircle } from "icons"
// import { IconEye } from "icons"

function Header() {
  const param = useLocation()
  return (
    <>
      <header className="h-52 w-screen bg-gradient-to-b from-[#fdebf4] to-[#FEFCFC]">
        <div className="flex h-full w-full items-baseline justify-between py-10">
          <div className="flex">
            <button className="ml-16 mr-14 h-10 w-10 rounded-full border-0 bg-transparent p-0">
              <HiOutlineArrowNarrowLeft className="h-8 w-8 text-2xl font-medium text-icon_color" />
            </button>
            <div className="flex flex-col justify-between">
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl font-normal text-black">Create reading exercise</h1>
                <span className="rounded-full bg-gray-400 px-2 py-1 text-xs font-semibold text-white">Draft</span>
              </div>

              <p className="text-xl text-black opacity-50">{param.pathname}</p>
              <span className="text-xl text-black">Create Reading Exercise</span>
              <div className="flex">
                <button className="mr-3 flex items-center rounded-lg bg-transparent p-0">
                  <FiUpload className="mr-1 text-2xl text-icon_color" />
                  <span className="text-xl font-normal text-black">Upload paragraph</span>
                </button>
                <button className="flex items-center rounded-lg bg-transparent p-0">
                  <AiOutlineQuestionCircle className="mr-1 text-2xl text-icon_color" />
                  <span className="text-xl font-normal text-black">Create questions</span>
                </button>
              </div>
            </div>
          </div>

          <div className="my-auto mr-16 flex">
            <button className="mr-3 flex h-10 w-28 items-center justify-center rounded-lg border bg-white p-0">
              <IoEyeOutline className="mr-1 text-2xl text-icon_color" />
              <span className="text-xl font-normal text-black">Preview</span>
            </button>
            <button className="flex h-10 w-28 items-center justify-center rounded-lg border bg-white p-0">
              <IoCheckmarkDoneCircleOutline className="mr-1 text-2xl text-icon_color" />
              <span className="text-xl font-normal text-black">Publish</span>
            </button>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header
