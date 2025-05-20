// src/components/myCoursesTable.jsx
import { useState } from "react";
import { getMyCourses } from "../services/enrollments/readEnrollments.jsx";

const MyCoursesTable = () => {
    const [userId, setUserId] = useState("");
    const [courses, setCourses] = useState([]);
    const [message, setMessage] = useState("");

    const fetchCourses = async () => {
        if (!userId) {
            setMessage("Por favor ingrese un ID de usuario");
            return;
        }

        try {
            const data = await getMyCourses(userId);
            setCourses(data);
            setMessage("");
        } catch (error) {
            setMessage("Error al obtener los cursos");
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-semibold mb-4">Mis Cursos Inscritos</h2>
            <div className="mb-4">
                <input
                    type="number"
                    placeholder="ID del usuario"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    className="px-2 py-1 border border-gray-300 rounded mr-2"
                />
                <button onClick={fetchCourses} className="px-4 py-2 bg-blue-500 text-white rounded">
                    Consultar
                </button>
            </div>
            {message && <p className="text-red-600 mb-2">{message}</p>}
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border px-4 py-2">Título</th>
                        <th className="border px-4 py-2">Fecha de Inscripción</th>
                        <th className="border px-4 py-2">Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {courses.map((c, i) => (
                        <tr key={i} className="hover:bg-gray-50">
                            <td className="border px-4 py-2">{c.courseTitle}</td>
                            <td className="border px-4 py-2">{c.enrollmentDate}</td>
                            <td className="border px-4 py-2">{c.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MyCoursesTable;
