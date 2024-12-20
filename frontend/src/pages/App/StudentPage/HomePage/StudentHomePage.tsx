import CategoryList from "@/components/Student/CategoryList"
import ContinueLearningItem from "@/components/Student/ContinueLearningItem"
import RecommendationList from "@/components/Student/RecommendationList"
import { DefaultAvatar } from "@/utils/constants."

export default function StudentHomePage() {
  return (
    <>
      <CategoryList />
      <div className="p-[20px]">
        <div className="mb-[50px] flex content-center items-center justify-center gap-[400px]">
          <img src={DefaultAvatar} className="h-[100px] w-[100px] rounded-[100%]" />
          <div className="flex flex-col">
            <h3 className="text-2xl font-bold text-[#000000]">
              Welcome back, <span className="text-[#5d5fef]">Emma! </span>
            </h3>
            <span className="text-2xl text-[#000000]">Set today's goals</span>
          </div>
        </div>
        <div>
          <h3 className="font-sans text-2xl font-bold text-[#5d5fef]">Continue learning</h3>
          <div className="flex gap-[20px]">
            <ContinueLearningItem />
            <ContinueLearningItem />
          </div>
        </div>
        <div>
          <h3 className="font-sans text-2xl font-bold text-[#5d5fef]">Recommend for you</h3>
          <RecommendationList />
        </div>
      </div>
    </>
  )
}
