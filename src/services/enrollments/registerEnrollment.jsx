// src/services/enrollments/registerEnrollment.jsx
const API_URL = 'http://localhost:8080/api/enrollments';

export const registerEnrollment = async ({ userId, courseId }) => {
    const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, courseId }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al inscribirse');
    }

    return response.json();
};
