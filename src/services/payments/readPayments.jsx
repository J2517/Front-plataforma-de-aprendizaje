// src/services/payments/readPayments.jsx
const API_URL = 'http://localhost:8080/api/payments';

export const getPaymentsByUser = async (userId) => {
    const response = await fetch(`${API_URL}/user/${userId}`);
    if (!response.ok) {
        throw new Error("No se pudieron cargar los pagos");
    }
    return response.json();
};
