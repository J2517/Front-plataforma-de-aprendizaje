const API_URL = 'http://localhost:8080/api/users';

export const deleteUser = async (id) => {
    try {
        const response = await fetch(`${API_URL}/delete/${id}`, { method: "DELETE" });
        if (!response.ok) throw new Error("Error al eliminar el usuario");
    } catch (error) {
        throw error;
    }
};