// src/services/enrollments/readEnrollments.jsx
const API_URL = 'http://localhost:8080/api/enrollments';

export const getMyCourses = async (userId) => {
    const response = await fetch(`${API_URL}/my-courses?userId=${userId}`);
    return response.json();
};
