import http from "./Http";
class GrammarService {
    //global grammer
    async getGrammar() {
        const response = await http.get('grammar');
        return response;
    }
    async getGrammarById(id: string) {
        const response = await http.get(`grammar/${id}`);
        return response;
    }
}
const grammarService = new GrammarService()
export default grammarService;