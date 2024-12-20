import { httpClient } from "@/services"

interface CreateCourseBuyingDto {
  courseId: string
  paymentMethod: PaymentMethod
}

interface CourseBuyingRes {
  data: {
    courseBuying: string
    key: string
  }
}
interface CreatePaymentVNPAYRes {
  data: {
    result: string
  }
}

export enum PaymentMethod {
  ATM = "ATM",
  QR_CODE = "QR_CODE",
  E_WALLET = "E_WALLET",
}

class CourseBuyingApi {
  constructor() {}
  async createPaymentUrlWithVNPAY(data: CreateCourseBuyingDto) {
    try {
      const courseBuying = await httpClient.post<CourseBuyingRes>("/course-buying", data)
      if (courseBuying && courseBuying.data) {
        const res = await httpClient.post<CreatePaymentVNPAYRes>("/course-buying/create-pay-order-url", {
          courseBuyingId: courseBuying.data.courseBuying,
        })
        return res.data
      } else {
        throw new Error("Course buying data is missing or invalid")
      }
    } catch (error) {
      console.error("Error creating payment URL:", error)
      throw error
    }
  }
}
const courseBuyingApi = new CourseBuyingApi()

export default courseBuyingApi
