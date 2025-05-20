// src/pages/CourseSearchPage.jsx
import React, { useState } from 'react';
import CourseSearchForm from '../components/CourseSearchForm.jsx';
import CourseSearchResults from '../components/CourseSearchResults.jsx';
import { searchCourses } from '../services/courses/searchCourses.jsx';

const CourseSearchPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (filters) => {
    setLoading(true);
    setError(null);

    try {
      const results = await searchCourses(filters);
      setCourses(results);
    } catch (e) {
      setError(e.message || 'Error en la búsqueda');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-50 to-purple-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">Buscar Cursos</h1>
        <CourseSearchForm onSearch={handleSearch} />
        {loading && <p className="text-center text-gray-700">Cargando...</p>}
        {error && <p className="text-center text-red-600">{error}</p>}
        <CourseSearchResults courses={courses} />
      </div>
    </div>
  );
};

export default CourseSearchPage;
