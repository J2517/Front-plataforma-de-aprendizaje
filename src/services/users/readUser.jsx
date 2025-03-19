const API_URL = 'http://localhost:8080/api/users';

export const getAllUsers = async () => {
    try {
        const response = await fetch(`${API_URL}/all`);
        if (!response.ok) {
            throw new Error('Error al obtener los usuarios');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};