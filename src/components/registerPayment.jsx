// src/components/registerPayment.jsx
import { useState } from "react";
import { registerPayment } from "../services/payments/registerPayment.jsx";

const RegisterPayment = () => {
    const [userId, setUserId] = useState("");
    const [courseId, setCourseId] = useState("");
    const [amount, setAmount] = useState("");
    const [message, setMessage] = useState("");
    const paymentDate = new Date().toISOString().split("T")[0]; // Formato YYYY-MM-DD

    const handleRegister = async () => {
        if (!userId || !courseId || !amount) {
            setMessage("Todos los campos son obligatorios");
            return;
        }

        try {
            await registerPayment({ userId, courseId, amount, paymentDate });
            setMessage("Pago registrado exitosamente");
        } catch (error) {
            setMessage("Error: " + error.message);
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-semibold mb-4">Registrar Pago</h2>
            <input
                type="number"
                placeholder="ID del usuario"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="px-2 py-1 border border-gray-300 rounded mr-2"
            />
            <input
                type="number"
                placeholder="ID del curso"
                value={courseId}
                onChange={(e) => setCourseId(e.target.value)}
                className="px-2 py-1 border border-gray-300 rounded mr-2"
            />
            <input
                type="number"
                placeholder="Monto"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="px-2 py-1 border border-gray-300 rounded mr-2"
            />
            <button onClick={handleRegister} className="px-4 py-2 bg-green-600 text-white rounded">
                Registrar
            </button>
            {message && <p className="mt-2 text-blue-600">{message}</p>}
        </div>
    );
};

export default RegisterPayment;
