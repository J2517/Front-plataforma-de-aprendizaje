// src/components/CourseSearchForm.jsx
import React, { useState } from 'react';

const CourseSearchForm = ({ onSearch }) => {
  const [keyword, setKeyword] = useState('');
  const [isFree, setIsFree] = useState('');
  const [level, setLevel] = useState('');
  const [minNote, setMinNote] = useState('');
  const [orderBy, setOrderBy] = useState('date');

  const handleSubmit = (e) => {
    e.preventDefault();

    onSearch({
      keyword: keyword.trim() || null,
      isFree: isFree === '' ? null : isFree === 'true',
      level: level || null,
      minNote: minNote ? parseFloat(minNote) : null,
      orderBy,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow mb-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Buscar por palabra clave"
          value={keyword}
          onChange={e => setKeyword(e.target.value)}
          className="border px-3 py-2 rounded w-full"
        />

        <select
          value={isFree}
          onChange={e => setIsFree(e.target.value)}
          className="border px-3 py-2 rounded w-full"
        >
          <option value="">Todos (Gratis y Pago)</option>
          <option value="true">Gratis</option>
          <option value="false">Pago</option>
        </select>

        <select
          value={level}
          onChange={e => setLevel(e.target.value)}
          className="border px-3 py-2 rounded w-full"
        >
          <option value="">Todos los niveles</option>
          <option value="básico">Básico</option>
          <option value="intermedio">Intermedio</option>
          <option value="avanzado">Avanzado</option>
        </select>

        <input
          type="number"
          min="0"
          max="5"
          step="0.1"
          placeholder="Calificación mínima"
          value={minNote}
          onChange={e => setMinNote(e.target.value)}
          className="border px-3 py-2 rounded w-full"
        />

        <select
          value={orderBy}
          onChange={e => setOrderBy(e.target.value)}
          className="border px-3 py-2 rounded w-full"
        >
          <option value="date">Ordenar por fecha</option>
          <option value="relevance">Ordenar por relevancia</option>
        </select>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Buscar
        </button>
      </div>
    </form>
  );
};

export default CourseSearchForm;
