import { courseApi } from "@/apis"
import { queryKeys } from "@/config"
import { useQuery } from "@tanstack/react-query"

export const useCourseCategory = (categoryId?: string) =>
  useQuery({
    queryKey: queryKeys.courseCategory.gen(categoryId),
    queryFn: () => courseApi.getCategory(categoryId),
    refetchOnMount: "always",
  })

export const useCourse = (
  page: number,
  take: number,
  sort: string,
  sortBy: string,
  search?: string,
  categoryId?: string,
) =>
  useQuery({
    queryKey: queryKeys.course.gen(page, take, sort, sortBy, search, categoryId),
    queryFn: () => courseApi.getAllCourse(page, take, sort, sortBy, search, categoryId),
    refetchOnMount: "always",
  })

export const useCourseTeacher = () =>
  useQuery({
    queryKey: ["courseByTeacher"],
    queryFn: () => courseApi.getAllCourseTeacher(),
    refetchOnMount: "always",
  })
