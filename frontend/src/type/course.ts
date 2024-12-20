import { Response } from "."

export interface Category {
  id: string
  name: string
  createDate: string
  updateDate: string
}

export interface CategoryRes extends Response {
  data: Category[]
}

export interface CategoryByIdRes extends Response {
  data: Category
}

export interface Course {
  id: string
  title: string
  description: string
  thumbnail_image: string
  state: string
  ratingCount: number
  ratingAverage: number
  teacherName: string
  categoryName: string
  finalPrice: number
  price: number
  discountPercents: number
  createDate: string
  updateDate: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  lessons: any[]
}

export interface CourseRes extends Response {
  data: Course[]
}

export interface CourseCreate {
  description: string
  title: string
  price: number
  state: string
  thumbnail_image?: string
  categoryId: string
}

export interface CourseCreateRes extends Response {
  data: {
    identifiers: [
      {
        id: string
      },
    ]
    generatedMaps: [
      {
        id: string
        updateDate: string
        createDate: string
        thumbnail_image: string
        state: string
      },
    ]
    raw: [
      {
        id: string
        updateDate: string
        createDate: string
        thumbnail_image: string
        state: string
      },
    ]
  }
}

export interface CourseDetailRes {
  data: Course
}

export interface RecommendCourseItem {
  id: string
  title: string
  description: string
  rating: number
  ratingAverage: number
  teacherName: string
  createdAt: string
  updatedAt: string
  categoryName: string
  thumbnail_image: string
  price: number
  finalPrice: number
}
export interface RecommendCourseRes {
  data: RecommendCourseItem[]
}
