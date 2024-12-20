import { RecommendCourseItem } from "@/type/course"
import { convertToVND } from "@/utils/constants."
// @ts-ignore
import ReactStars from "react-rating-stars-component"

type CourseRecommendationItemProps = {
  course: RecommendCourseItem
  onClick: () => void
}

export default function CourseRecommendationItem({ course, onClick }: CourseRecommendationItemProps) {
  return (
    <div className="flex max-w-[300px] flex-col justify-between" onClick={onClick}>
      <div>
        <img
          src={course.thumbnail_image}
          alt="course-thumbnail"
          className="h-auto w-full max-w-[400px] rounded-md object-cover"
        />
        <p className="font-sans text-[24px] font-bold leading-normal text-[black]">{course.title}</p>
      </div>
      <div>
        <p className="text-[20px] text-[#7879F1]">{course.teacherName}</p>
        <div className="flex content-center gap-2 py-2">
          <p className="h-100 content-center">{course.ratingAverage}</p>
          <ReactStars
            count={5}
            value={course.ratingAverage}
            edit={false}
            size={24}
            isHalf={true}
            activeColor="#ffd700"
          />
          <p className="h-100 content-center">({course.rating})</p>
        </div>
        <div className="flex content-center gap-2">
          <p className="text-lg font-bold text-[red]">{convertToVND(course.finalPrice)}</p>
          <p className="text-gray-400 line-through">{convertToVND(course.price)}</p>
        </div>
      </div>
    </div>
  )
}
