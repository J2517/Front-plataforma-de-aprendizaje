const API_URL = 'http://localhost:8080/api/categories';

export const deleteCategory = async (id) => {
    try {
        console.log(id);
        
        const response = await fetch(`${API_URL}/delete/${id}`, { method: "DELETE" });
        if (!response.ok) throw new Error("Error al eliminar la categoria");
    } catch (error) {
        throw error;
    }
};