// src/components/CourseSearchResults.jsx
import React from 'react';

const CourseSearchResults = ({ courses }) => {
  if (!courses || courses.length === 0) {
    return <p className="text-center text-gray-500">No se encontraron cursos.</p>;
  }

  return (
    <table className="w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-200">
          <th className="border px-4 py-2">Título</th>
          <th className="border px-4 py-2">Descripción</th>
          <th className="border px-4 py-2">Categoría</th>
          <th className="border px-4 py-2">Precio</th>
          <th className="border px-4 py-2">Nivel</th>
          <th className="border px-4 py-2">Calificación</th>
          <th className="border px-4 py-2">Fecha</th>
        </tr>
      </thead>
      <tbody>
        {courses.map(course => (
          <tr key={course.id} className="hover:bg-gray-50">
            <td className="border px-4 py-2">{course.title}</td>
            <td className="border px-4 py-2">{course.description}</td>
            <td className="border px-4 py-2">{course.categoryName || 'N/A'}</td>
            <td className="border px-4 py-2">{course.price === 0 ? 'Gratis' : `$${course.price}`}</td>
            <td className="border px-4 py-2">{course.level}</td>
            <td className="border px-4 py-2">{course.note?.toFixed(1) || 'N/A'}</td>
            <td className="border px-4 py-2">{course.createdAt}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CourseSearchResults;
