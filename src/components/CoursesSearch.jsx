import React, { useState } from "react";

const CoursesSearch = () => {
  const [keyword, setKeyword] = useState("");
  const [isFree, setIsFree] = useState(""); // "", "true", "false"
  const [level, setLevel] = useState("");
  const [minNote, setMinNote] = useState("");
  const [orderBy, setOrderBy] = useState("date"); // "date" o "relevance"
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState("");

  const handleSearch = async () => {
    // Construir query params según filtros
    const params = new URLSearchParams();
    if (keyword.trim() !== "") params.append("keyword", keyword.trim());
    if (isFree === "true") params.append("isFree", true);
    else if (isFree === "false") params.append("isFree", false);
    if (level !== "") params.append("level", level);
    if (minNote !== "") params.append("minNote", minNote);
    if (orderBy) params.append("orderBy", orderBy);

    try {
      const response = await fetch(`http://localhost:8080/api/courses/search?${params.toString()}`);
      if (response.status === 204) { // no content
        setResults([]);
        setMessage("No se encontraron cursos con esos filtros.");
        return;
      }
      if (!response.ok) {
        throw new Error("Error al buscar cursos");
      }
      const data = await response.json();
      setResults(data);
      setMessage("");
    } catch (error) {
      setResults([]);
      setMessage("Error al realizar la búsqueda: " + error.message);
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Buscar Cursos</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
        <input
          type="text"
          placeholder="Palabra clave (título, descripción, categoría)"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="border rounded px-3 py-2"
        />

        <select
          value={isFree}
          onChange={(e) => setIsFree(e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="">Todos los cursos</option>
          <option value="true">Gratis</option>
          <option value="false">Pago</option>
        </select>

        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="">Todos los niveles</option>
          <option value="básico">Básico</option>
          <option value="intermedio">Intermedio</option>
          <option value="avanzado">Avanzado</option>
        </select>

        <input
          type="number"
          step="0.1"
          min="0"
          max="5"
          placeholder="Calificación mínima (0-5)"
          value={minNote}
          onChange={(e) => setMinNote(e.target.value)}
          className="border rounded px-3 py-2"
        />

        <select
          value={orderBy}
          onChange={(e) => setOrderBy(e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="date">Ordenar por fecha</option>
          <option value="relevance">Ordenar por relevancia</option>
        </select>
      </div>

      <button
        onClick={handleSearch}
        className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
      >
        Buscar
      </button>

      {message && <p className="mt-4 text-red-600">{message}</p>}

      {results.length > 0 && (
        <table className="mt-6 w-full border border-gray-300 rounded">
          <thead className="bg-gray-200">
            <tr>
              <th className="border px-3 py-2">ID</th>
              <th className="border px-3 py-2">Título</th>
              <th className="border px-3 py-2">Descripción</th>
              <th className="border px-3 py-2">Precio</th>
              <th className="border px-3 py-2">Nivel</th>
              <th className="border px-3 py-2">Calificación</th>
              <th className="border px-3 py-2">Fecha creación</th>
              <th className="border px-3 py-2">Categoría</th>
            </tr>
          </thead>
          <tbody>
            {results.map((course) => (
              <tr key={course.id} className="hover:bg-gray-50">
                <td className="border px-3 py-1 text-center">{course.id}</td>
                <td className="border px-3 py-1">{course.title}</td>
                <td className="border px-3 py-1">{course.description}</td>
                <td className="border px-3 py-1">{course.price === 0 ? "Gratis" : `$${course.price}`}</td>
                <td className="border px-3 py-1 capitalize">{course.level}</td>
                <td className="border px-3 py-1">{course.note.toFixed(1)}</td>
                <td className="border px-3 py-1">{course.createdAt}</td>
                <td className="border px-3 py-1">{course.categoryName || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CoursesSearch;
