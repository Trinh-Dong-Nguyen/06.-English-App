
import http from "./Http";

class SectionService {
  async getSection(id: string) {
    const response = await http.get("section/get-all-section-by-lesson/" + id);
    return response;
  }
  async getSectionById(id: string) {
    const response = await http.get("section/" + id);
    return response;
  }
}
const sectionService = new SectionService();
export default sectionService;
