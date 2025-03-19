import { useState, useEffect } from "react";

const ContentTable = () => {
    const [contents, setContents] = useState([]);

    useEffect(() => {
        fetchContents();
    }, []);

    const fetchContents = async () => {
        const data = await getContent();
        setContents(data);
    };

    const handleCreate = async () => {
        const type = prompt("Ingrese el tipo de contenido (PDF, MP4, etc.):");
        const url = prompt("Ingrese la URL del archivo:");
        const courseId = prompt("Ingrese el ID del curso:");

        if (!type || !url || !courseId) return;

        try {
            await uploadContent({ type, url, courseId });
            fetchContents();
        } catch (error) {
            alert("Error al subir contenido");
        }
    };

    const handleUpdate = async (id) => {
        const type = prompt("Nuevo tipo de contenido:");
        const url = prompt("Nueva URL del archivo:");
        if (!type || !url) return;

        try {
            await updateContent(id, { type, url });
            fetchContents();
        } catch (error) {
            alert("Error al actualizar contenido");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("¿Estás seguro de eliminar este contenido?")) return;
        try {
            await deleteContent(id);
            fetchContents();
        } catch (error) {
            alert("Error al eliminar contenido");
        }
    };

    return (
        <div className="p-4">
            <button onClick={handleCreate} className="mb-4 px-4 py-2 bg-blue-500 text-white rounded">
                Subir Contenido
            </button>
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                <tr className="bg-gray-200">
                    <th className="border px-4 py-2">ID</th>
                    <th className="border px-4 py-2">Tipo</th>
                    <th className="border px-4 py-2">URL</th>
                    <th className="border px-4 py-2">Curso ID</th>
                    <th className="border px-4 py-2">Acciones</th>
                </tr>
                </thead>
                <tbody>
                {contents.map((content) => (
                    <tr key={content.id} className="hover:bg-gray-50">
                        <td className="border px-4 py-2 text-center">{content.id}</td>
                        <td className="border px-4 py-2">{content.type}</td>
                        <td className="border px-4 py-2">{content.url}</td>
                        <td className="border px-4 py-2">{content.courseId}</td>
                        <td className="border px-4 py-2 flex justify-center gap-2">
                            <button onClick={() => handleUpdate(content.id)} className="px-3 py-1 bg-yellow-500 text-white rounded">
                                Editar
                            </button>
                            <button onClick={() => handleDelete(content.id)} className="px-3 py-1 bg-red-500 text-white rounded">
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

export default ContentTable;
