import { httpClient } from "@/services"
import { CategoryRes } from "@/type/course"

class CategoryApi {
  constructor() {}
  async getAllCategory() {
    try {
      const res = await httpClient.get<CategoryRes>("/course-category")
      return res
    } catch (error) {
      console.log(error)
    }
  }
}
const categoryApi = new CategoryApi()
export default categoryApi
