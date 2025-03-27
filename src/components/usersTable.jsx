import { useEffect, useState } from "react";
import { getAllUsers } from "../services/users/readUser.jsx";
import { deleteUser } from "../services/users/deleteUser.jsx";
import { createUser } from "../services/users/createUser.jsx";
import { updateUser } from "../services/users/updateUser.jsx";
import {getUserById} from "../services/users/readUser.jsx";

const UserTable = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchId, setSearchId] = useState("");
    const [filteredUser, setFilteredUser] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        getAllUsers()
            .then(setUsers)
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    };

    const handleCreate = async () => {
        const username = prompt("Ingrese el nombre de usuario:");
        if (!username) return;

        const password = prompt("Ingrese la contraseña:");
        if (!password) return;

        const rolesInput = prompt("Ingrese los roles separados por comas (ej: Admin, User):");
        if (!rolesInput) return;

        const roles = rolesInput.split(",").map((role) => role.trim());

        try {
            await createUser({ username, password, roles });
            fetchUsers(); // Recargar la lista
        } catch (err) {
            alert("Error al crear usuario: " + err.message);
        }
    };

    const handleSearch = async () => {
        if (!searchId) {
            alert("Ingrese un ID válido");
            return;
        }
        try {
            const user = await getUserById(searchId);
            setFilteredUser(user);
        } catch (error) {
            alert("Usuario no encontrado");
            setFilteredUser(null);
        }
    };

    const handleEdit = async (id) => {
        const newUsername = prompt("Nuevo nombre de usuario:");
        if (!newUsername) return;

        try {
            await updateUser(id, { username: newUsername });
            fetchUsers(); // Recargar la lista
        } catch (err) {
            alert("Error al actualizar usuario: " + err.message);
        }
    };


    const handleDelete = async (id) => {
        if (!confirm("¿Estás seguro de eliminar este usuario?")) return;

        try {
            await deleteUser(id);
            fetchUsers(); // Recargar la lista
        } catch (err) {
            alert("Error al eliminar usuario: " + err.message);
        }
    };

    if (loading) return <p className="text-center">Cargando...</p>;
    if (error) return <p className="text-center text-red-500">Error: {error}</p>;

    return (
        <div className="overflow-x-auto p-4">
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
            <button
                onClick={handleCreate}
                className="mb-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
            >
                Crear Usuario
            </button>
            <table className="min-w-full border border-gray-300">
                <thead>
                <tr className="bg-gray-100">
                    <th className="border px-4 py-2">ID</th>
                    <th className="border px-4 py-2">Username</th>
                    <th className="border px-4 py-2">Roles</th>
                    <th className="border px-4 py-2">Acciones</th>
                </tr>
                </thead>
                <tbody>
                {filteredUser ? (
                    <tr key={filteredUser.id} className="hover:bg-gray-50">
                        <td className="border px-4 py-2 text-center">{filteredUser.id}</td>
                        <td className="border px-4 py-2">{filteredUser.username}</td>
                        <td className="border px-4 py-2">{filteredUser.roles.map((role) => role.name).join(", ")}</td>
                        <td className="border px-4 py-2 flex gap-2 justify-center">
                            <button
                                onClick={() => handleEdit(filteredUser.id)}
                                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
                            >
                                Editar
                            </button>
                            <button
                                onClick={() => handleDelete(filteredUser.id)}
                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                            >
                                Eliminar
                            </button>
                        </td>
                    </tr>
                ) : (
                    users.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50">
                            <td className="border px-4 py-2 text-center">{user.id}</td>
                            <td className="border px-4 py-2">{user.username}</td>
                            <td className="border px-4 py-2">{user.roles.map((role) => role.name).join(", ")}</td>
                            <td className="border px-4 py-2 flex gap-2 justify-center">
                                <button
                                    onClick={() => handleEdit(user.id)}
                                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => handleDelete(user.id)}
                                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                                >
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

export default UserTable;
