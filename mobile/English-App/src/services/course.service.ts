import http from "./Http";

class CourseService {
  baseURI: string;
  constructor() {
    this.baseURI = "course/";
  }
  private getURI(uri: string) {
    return `${this.baseURI}${uri}`;
  }
  async getAllCourses() {
    return await http.get(this.getURI("get-all-courses"));
  }
  async getAllRecommendationCourses() {
    return await http.get(this.getURI("get-all-recomendation-courses"));
  }
  async getStudentCourses() {
    return await http.get(this.getURI("student/my-course"));
  }
  async getCourseById(courseId: string) {
    return await http.get(this.getURI(`detail/${courseId}`));
  }
}
const courseService = new CourseService();
export default courseService;
