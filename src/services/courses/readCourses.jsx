const API_URL = 'http://localhost:8080/api/courses';

export const getCourses = async () => {
    const response = await fetch(`${API_URL}/all`);
    return response.json();
};

export const getCourseById = async (id) => {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) {
            throw new Error('Error al obtener el curso');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}