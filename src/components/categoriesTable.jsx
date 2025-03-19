import { useState, useEffect } from "react";

import {getAllCategories} from "../services/categories/readCategories.jsx";
import {createCategory} from "../services/categories/createCategorie.jsx";


const CategoryTable = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        const data = await getAllCategories();
        setCategories(data);
    };

    const handleCreate = async () => {
        const name = prompt("Ingrese el nombre de la categoría:");
        if (!name) return;

        try {
            await createCategory({ name });
            fetchCategories();
        } catch (error) {
            alert("Error al crear la categoría");
        }
    };

    const handleUpdate = async (id) => {
        const name = prompt("Nuevo nombre de la categoría:");
        if (!name) return;

        try {
            await updateCategory(id, { name });
            fetchCategories();
        } catch (error) {
            alert("Error al actualizar la categoría");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("¿Estás seguro de eliminar esta categoría?")) return;
        try {
            await deleteCategory(id);
            fetchCategories();
        } catch (error) {
            alert("Error al eliminar la categoría");
        }
    };

    return (
        <div className="p-4">
            <button onClick={handleCreate} className="mb-4 px-4 py-2 bg-blue-500 text-white rounded">
                Crear Categoría
            </button>
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                <tr className="bg-gray-200">
                    <th className="border px-4 py-2">ID</th>
                    <th className="border px-4 py-2">Nombre</th>
                    <th className="border px-4 py-2">Acciones</th>
                </tr>
                </thead>
                <tbody>
                {categories.map((category) => (
                    <tr key={category.id} className="hover:bg-gray-50">
                        <td className="border px-4 py-2 text-center">{category.id}</td>
                        <td className="border px-4 py-2">{category.name}</td>
                        <td className="border px-4 py-2 flex justify-center gap-2">
                            <button onClick={() => handleUpdate(category.id)} className="px-3 py-1 bg-yellow-500 text-white rounded">
                                Editar
                            </button>
                            <button onClick={() => handleDelete(category.id)} className="px-3 py-1 bg-red-500 text-white rounded">
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

export default CategoryTable;
