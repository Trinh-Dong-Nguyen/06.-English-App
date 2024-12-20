import http from "./Http";

class PurchaseService {
    baseURI: string;
    constructor() {
        this.baseURI = "course-buying/";
    }
    private getURI(uri: string) {
        return `${this.baseURI}${uri}`;
    }
    async buyCourse(courseId: string) {
        return await http.post(
            this.getURI('normal-buy'),
            {
                courseId: courseId,
            },
        );
    }
    async getRedirectionUrl(courseBuyingId: string) {
        return await http.post(
            this.getURI("create-pay-order-url"),
            {
                courseBuyingId: courseBuyingId,
            },
        );

    }
    async activeCourse(courseBuyingId: string, key: string) {
        return await http.post(
            this.getURI("check-key"),
            {
                courseBuyingId: courseBuyingId,
                key: key,
            },
        );
    }
}
const purchaseservice = new PurchaseService();
export default purchaseservice;