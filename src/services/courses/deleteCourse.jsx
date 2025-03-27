const API_URL = 'http://localhost:8080/api/courses';

export const deleteCourse = async (id) => {
    await fetch(`${API_URL}/delete/${id}`, { method: "DELETE" });
};