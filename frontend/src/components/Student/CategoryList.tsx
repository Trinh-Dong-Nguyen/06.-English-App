import categoryApi from "@/apis/categoryApi"
import { Category } from "@/interfaces"
import { useEffect, useState } from "react"

export default function CategoryList() {
  const [categories, setCategories] = useState<Category[]>([])
  useEffect(() => {
    async function fetchData() {
      const apiResult = await categoryApi.getAllCategory()
      if (apiResult) {
        setCategories(apiResult.data)
      }
    }
    fetchData()
  }, [])
  return (
    <div className="mx-4 flex content-center justify-between border-b-2 border-x-transparent py-4 shadow-xl">
      {categories.map((category) => (
        <span key={category.id} className="font-bold text-[#5d5fef]">
          {category.name}
        </span>
      ))}
    </div>
  )
}
