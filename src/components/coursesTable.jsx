import { useState, useEffect } from "react";

import {createCourse} from "../services/courses/createCourse.jsx";
import {getCourses} from "../services/courses/readCourses.jsx";
import {deleteCourse} from "../services/courses/deleteCourse.jsx";
import {updateCourse} from "../services/courses/updateCourse.jsx";

const CourseTable = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        const data = await getCourses();
        setCourses(data);
    };

    const handleCreate = async () => {
        const title = prompt("Ingrese el título:");
        if (!title) return;

        const description = prompt("Ingrese la descripción:");
        if (!description) return;

        const price = prompt("Ingrese el precio:");
        if (!price) return;

        const category_id = prompt("Ingrese el ID de la categoría:");
        if (!category_id) return;

        const instructor_id = prompt("Ingrese el ID del instructor:");
        if (!instructor_id) return;

        try {
            await createCourse({ title, description, price, category_id, instructor_id });
            await fetchCourses();
        } catch (error) {
            alert("Error al crear el curso" + error);
        }
    };

    const handleUpdate = async (id) => {
        const title = prompt("Nuevo título del curso:");
        if (!title) return;

        const description = prompt("Nueva descripción:");
        if (!description) return;

        const price = prompt("Nuevo precio:");
        if (!price) return;

        try {
            await updateCourse(id, { title, description, price });
            await fetchCourses();
        } catch (error) {
            alert("Error al actualizar el curso");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("¿Estás seguro de eliminar este curso?")) return;
        try {
            await deleteCourse(id);
            await fetchCourses();
        } catch (error) {
            alert("Error al eliminar el curso");
        }
    };

    return (
        <div className="p-4">
            <button onClick={handleCreate} className="mb-4 px-4 py-2 bg-blue-500 text-white rounded">
                Crear Curso
            </button>
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                <tr className="bg-gray-200">
                    <th className="border px-4 py-2">ID</th>
                    <th className="border px-4 py-2">Título</th>
                    <th className="border px-4 py-2">Descripción</th>
                    <th className="border px-4 py-2">Precio</th>
                    <th className="border px-4 py-2">Categoría</th>
                    <th className="border px-4 py-2">Instructor</th>
                    <th className="border px-4 py-2">Acciones</th>
                </tr>
                </thead>
                <tbody>
                {courses.map((course) => (
                    <tr key={course.id} className="hover:bg-gray-50">
                        <td className="border px-4 py-2 text-center">{course.id}</td>
                        <td className="border px-4 py-2">{course.title}</td>
                        <td className="border px-4 py-2">{course.description}</td>
                        <td className="border px-4 py-2">${course.price}</td>
                        <td className="border px-4 py-2">{course.category?.name || "N/A"}</td>
                        <td className="border px-4 py-2">{course.instructor?.username || "N/A"}</td>
                        <td className="border px-4 py-2 flex justify-center gap-2">
                            <button onClick={() => handleUpdate(course.id)}
                                    className="px-3 py-1 bg-yellow-500 text-white rounded">
                                Editar
                            </button>
                            <button onClick={() => handleDelete(course.id)}
                                    className="px-3 py-1 bg-red-500 text-white rounded">
                                Eliminar
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default CourseTable;
