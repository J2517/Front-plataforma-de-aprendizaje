const API_URL = 'http://localhost:8080/api/courses';

export const createCourse = async (newCourse) => {
    console.log(newCourse);
    const response = await fetch(`${API_URL}/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCourse),
    });
    return response.json();
};