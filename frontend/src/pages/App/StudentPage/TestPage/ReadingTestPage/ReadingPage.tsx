import sectionApi from "@/apis/sectionApi"
import LeftNav from "@/assets/left_nav_button.svg"
import RightNav from "@/assets/right_nav_button.svg"
import SubmitLogo from "@/assets/submit_icon.svg"
import { Button } from "@/components/ui/button"
// import { ReadingTestPage } from "@/pages/App/StudentPage/TestPage/ReadingTestPage/ReadingTestPage"
import { Section } from "@/type/section"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export default function ReadingPage() {
  const [data, setData] = useState<Section | null>(null)

  const { id } = useParams()
  useEffect(() => {
    if (id) {
      sectionApi.GetSectionById(id).then((res) => {
        if (res) {
          setData(res.data)
          console.log(res.data)
        }
      })
    }
  }, [id])

  const handleNext = () => {}

  return (
    <div className="mx-[16px] mt-[32px] grid grid-cols-2 gap-[10px]">
      <div className="flex max-h-[1100px] flex-1 flex-col items-center overflow-scroll overflow-x-hidden rounded-md border-2 border-[#a5a6f6] px-[5px] text-black scrollbar-thin scrollbar-track-gray-300 scrollbar-thumb-gray-400">
        <h2 className="mb-[25px] mt-[25px] text-2xl font-bold">{data ? data.title : ""}</h2>
        {data && <div className="reading-text" dangerouslySetInnerHTML={{ __html: data.content }}></div>}
      </div>
      <div className="flex flex-1 flex-col">
        <div className="w-full rounded-md border-2 border-b-0 border-[#fcddec] p-[20px]">
          {/* <ReadingTestPage questionGroups={data ? data.questionGroups : []} /> */}
        </div>
        <div className="flex h-[60px] justify-between bg-[#fff4f9]">
          <Button className="h-full bg-inherit hover:bg-inherit hover:outline-none focus:outline-none">
            <img src={LeftNav} />
          </Button>
          <div className="flex items-center gap-2">
            {Array.from({ length: 10 }, (_, i) => (
              <Button
                key={i}
                className="border-1 h-[40px] w-[40px] rounded-full border-[#5d5fef] bg-inherit text-[#ef5da8] hover:bg-[#5d5fef] hover:bg-inherit hover:outline-none focus:bg-[#5d5fef] focus:outline-none"
              >
                {i + 1}
              </Button>
            ))}
          </div>
          <Button className="h-full bg-inherit hover:bg-inherit hover:outline-none focus:outline-none">
            <img src={RightNav} />
          </Button>
        </div>
        <div className="mt-[50px] flex justify-center">
          <Button className="w-[120px] items-center bg-[#ef5da8] text-2xl text-white" onClick={handleNext}>
            <img className="bg-[#ef5da8]" src={SubmitLogo}></img> Submit
          </Button>
        </div>
      </div>
    </div>
  )
}
