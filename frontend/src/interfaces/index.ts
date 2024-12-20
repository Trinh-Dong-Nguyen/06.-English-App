import { CourseEnum } from "@/utils/constants."
export interface User {
  id: string
  email: string
  fullName: string
  phone: string
  birthDay: string
  avatarUrl?: string
}
export interface Teacher {
  id: string
  user: User
  degree: string
}
export interface Student {
  id: string
  user: User
  schoolName: string
}
export interface Category {
  id: string
  name: string
}
export interface Course {
  id: string
  title: string
  description: string
  price: number
  state: CourseEnum
  imageUrl: string
  teacher: Teacher
  category: Category
}
