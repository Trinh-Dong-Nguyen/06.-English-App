import axios from "axios"

interface CourseData {
  title: string
  description: string
  category: string
}

export const createCourse = async (courseData: CourseData) => {
  try {
    const response = await axios.post("/api/courses", courseData)
    return response.data
  } catch (error) {
    throw error
  }
}
