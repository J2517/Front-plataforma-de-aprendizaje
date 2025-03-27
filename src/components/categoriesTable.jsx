import { useState, useEffect } from "react";

import {getAllCategories} from "../services/categories/readCategories.jsx";
import {createCategory} from "../services/categories/createCategorie.jsx";
import { deleteCategory } from "../services/categories/deleteCategory.jsx";
import { updateCategory } from "../services/categories/updateCategory.jsx";
import { getCategoryById } from "../services/categories/readCategories.jsx";

const CategoryTable = () => {
    const [categories, setCategories] = useState([]);
    const [searchId, setSearchId] = useState("");
    const [filteredCategory, setFilteredCategory] = useState(null);

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

    const handleSearch = async () => {
        if (!searchId) {
            alert("Ingrese un ID válido");
            return;
        }
        try {
            const category = await getCategoryById(searchId);
            setFilteredCategory(category);
        } catch (error) {
            alert("Categoría no encontrada");
            setFilteredCategory(null);
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
            <div className="mb-4 flex items-center gap-2">
                <input
                    type="number"
                    placeholder="Buscar por ID"
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                    className="px-2 py-1 border border-gray-300 rounded"
                />
                <button onClick={handleSearch} className="px-4 py-2 bg-green-500 text-white rounded">
                    Buscar
                </button>
            </div>
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
                {filteredCategory ? (
                    <tr key={filteredCategory.id} className="hover:bg-gray-50">
                        <td className="border px-4 py-2 text-center">{filteredCategory.id}</td>
                        <td className="border px-4 py-2">{filteredCategory.name}</td>
                        <td className="border px-4 py-2 flex justify-center gap-2">
                            <button onClick={() => handleUpdate(filteredCategory.id)}
                                    className="px-3 py-1 bg-yellow-500 text-white rounded">
                                Editar
                            </button>
                            <button onClick={() => handleDelete(filteredCategory.id)}
                                    className="px-3 py-1 bg-red-500 text-white rounded">
                                Eliminar
                            </button>
                        </td>
                    </tr>
                ) : (
                    categories.map((category) => (
                        <tr key={category.id} className="hover:bg-gray-50">
                            <td className="border px-4 py-2 text-center">{category.id}</td>
                            <td className="border px-4 py-2">{category.name}</td>
                            <td className="border px-4 py-2 flex justify-center gap-2">
                                <button onClick={() => handleUpdate(category.id)}
                                        className="px-3 py-1 bg-yellow-500 text-white rounded">
                                    Editar
                                </button>
                                <button onClick={() => handleDelete(category.id)}
                                        className="px-3 py-1 bg-red-500 text-white rounded">
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))
                )}
                </tbody>
            </table>
        </div>
    );
};

export default CategoryTable;
