const API_URL = 'http://localhost:8080/api/courses';

export const getCourses = async () => {
    const response = await fetch(`${API_URL}/all`);
    return response.json();
};