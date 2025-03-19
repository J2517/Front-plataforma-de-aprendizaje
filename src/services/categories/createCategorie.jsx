const API_URL = 'http://localhost:8080/api/categories';

export const createCategory = async (newCategory) => {
    const response = await fetch(`${API_URL}/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCategory),
    });
    return response.json();
};