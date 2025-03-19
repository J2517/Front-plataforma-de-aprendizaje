const API_URL = 'http://localhost:8080/api/categories';

export const updateCategory = async (id, updatedData) => {
    console.log(updatedData)

    try {
        const response = await fetch(`${API_URL}/update/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedData),
        });

        if (!response.ok) throw new Error("Error al actualizar el usuario");
        return await response.json();
    } catch (error) {
        throw error;
    }
};