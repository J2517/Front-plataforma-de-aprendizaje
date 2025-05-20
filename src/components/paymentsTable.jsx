// src/components/paymentsTable.jsx
import { useState } from "react";
import { getPaymentsByUser } from "../services/payments/readPayments.jsx";

const PaymentsTable = () => {
    const [userId, setUserId] = useState("");
    const [payments, setPayments] = useState([]);
    const [message, setMessage] = useState("");

    const handleFetch = async () => {
        try {
            const data = await getPaymentsByUser(userId);
            setPayments(data);
            setMessage("");
        } catch (error) {
            setMessage("No se pudieron cargar los pagos");
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-semibold mb-4">Pagos Registrados</h2>
            <div className="mb-4">
                <input
                    type="number"
                    placeholder="ID del usuario"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    className="px-2 py-1 border border-gray-300 rounded mr-2"
                />
                <button onClick={handleFetch} className="px-4 py-2 bg-blue-500 text-white rounded">
                    Consultar
                </button>
            </div>
            {message && <p className="text-red-600">{message}</p>}
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border px-4 py-2">ID</th>
                        <th className="border px-4 py-2">Curso</th>
                        <th className="border px-4 py-2">Monto</th>
                        <th className="border px-4 py-2">Fecha</th>
                    </tr>
                </thead>
                <tbody>
                    {payments.map((p, i) => (
                        <tr key={i} className="hover:bg-gray-50">
                            <td className="border px-4 py-2">{p.id}</td>
                            <td className="border px-4 py-2">{p.courseTitle || p.courseId}</td>
                            <td className="border px-4 py-2">${p.amount}</td>
                            <td className="border px-4 py-2">{p.paymentDate}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PaymentsTable;
