// src/components/registerCourse.jsx
import { useState } from "react";
import { registerEnrollment } from "../services/enrollments/registerEnrollment.jsx";

const RegisterCourse = () => {
    const [userId, setUserId] = useState("");
    const [courseId, setCourseId] = useState("");
    const [message, setMessage] = useState("");

    const handleRegister = async () => {
        if (!userId || !courseId) {
            setMessage("Por favor, ingrese ambos IDs");
            return;
        }

        try {
            await registerEnrollment({ userId: parseInt(userId), courseId: parseInt(courseId) });
            setMessage("Inscripción exitosa");
        } catch (error) {
            setMessage("Error: " + error.message);
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-semibold mb-4">Inscribirse en un Curso</h2>
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
            <button onClick={handleRegister} className="px-4 py-2 bg-green-500 text-white rounded">
                Inscribirse
            </button>
            {message && <p className="mt-2 text-blue-600">{message}</p>}
        </div>
    );
};

export default RegisterCourse;
