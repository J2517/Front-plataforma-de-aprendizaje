const API_URL = 'http://localhost:8080/api/courses';

export const updateCourse = async (id, updatedCourse) => {
    const response = await fetch(`${API_URL}/update/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedCourse),
    });
    return response.json();
};