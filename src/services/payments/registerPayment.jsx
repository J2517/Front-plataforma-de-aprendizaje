// src/services/payments/registerPayment.jsx
const API_URL = 'http://localhost:8080/api/payments';

export const registerPayment = async (paymentData) => {
    const response = await fetch(`${API_URL}/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paymentData),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al registrar el pago");
    }

    return response.json();
};
