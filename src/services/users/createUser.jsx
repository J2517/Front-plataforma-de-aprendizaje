const API_URL = 'http://localhost:8080/api/users/create';

export const createUser = async (newUser) => {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newUser),
        });

        if (!response.ok) throw new Error("Error al crear el usuario");
        return await response.json();
    } catch (error) {
        throw error;
    }
};