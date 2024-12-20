import React, { useState } from "react"

interface CourseData {
  title: string
  description: string
  category: string
}

interface CreateCourseFormProps {
  onSubmit: (courseData: CourseData) => void
  isLoading: boolean
}

const CreateCourseForm: React.FC<CreateCourseFormProps> = ({ onSubmit, isLoading }) => {
  const [courseData, setCourseData] = useState<CourseData>({
    title: "",
    description: "",
    category: "",
  })

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target
    setCourseData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSubmit(courseData)
  }

  return (
    <form onSubmit={handleSubmit} className="create-course-form">
      <label>
        Tiêu đề:
        <input
          type="text"
          name="title"
          value={courseData.title}
          onChange={handleInputChange} // Sử dụng handleInputChange
          required
        />
      </label>
      <label>
        Mô tả:
        <textarea
          name="description"
          value={courseData.description}
          onChange={handleInputChange} // Sử dụng handleInputChange
          required
        />
      </label>
      <label>
        Thể loại:
        <input
          type="text"
          name="category"
          value={courseData.category}
          onChange={handleInputChange} // Sử dụng handleInputChange
          required
        />
      </label>
      <button type="submit" disabled={isLoading}>
        {" "}
        {/* Sử dụng isLoading */}
        {isLoading ? "Đang gửi..." : "Gửi"}
      </button>
    </form>
  )
}

export default CreateCourseForm
