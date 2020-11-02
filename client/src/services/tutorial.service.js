import http from "../http-common";

class TutorialDataService {
    getAll() {
        return http.get("/monsters");
    }

    get(id) {
        return http.get(`/monsters/${id}`);
    }

    create(data) {
        return http.post("/monsters", data);
    }

    update(id, data) {
        return http.put(`/monsters/${id}`, data);
    }

    delete(id) {
        return http.delete(`/monsters/${id}`);
    }

    deleteAll() {
        return http.delete(`/monsters`);
    }

    findByTitle(title) {
        return http.get(`/monsters?title=${title}`);
    }


}
export default new TutorialDataService();