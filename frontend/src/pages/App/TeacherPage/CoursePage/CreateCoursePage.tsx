import CreateCourseForm from "@/components/component/createCourseForm"
import { createCourse } from "@/services/createCourseAPI"
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

interface CourseData {
  title: string
  description: string
  category: string
}

const CreateCoursePage: React.FC = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleCreateCourse = async (courseData: CourseData) => {
    setIsLoading(true)
    setError(null)

    try {
      await createCourse(courseData)
      navigate("/courses")
    } catch (err) {
      setError("Can not create course")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="create-course-page">
      <h1>Create New Course</h1>
      {error && <div className="error-message">{error}</div>}
      <CreateCourseForm onSubmit={handleCreateCourse} isLoading={isLoading} />
    </div>
  )
}

export default CreateCoursePage
