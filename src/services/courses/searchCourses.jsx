// src/services/courses/searchCourses.jsx
const API_URL = 'http://localhost:8080/api/courses';

export const searchCourses = async ({ keyword, isFree, level, minNote, orderBy }) => {
  const params = new URLSearchParams();

  if (keyword) params.append('keyword', keyword);
  if (isFree !== undefined && isFree !== null) params.append('isFree', isFree);
  if (level) params.append('level', level);
  if (minNote) params.append('minNote', minNote);
  if (orderBy) params.append('orderBy', orderBy);

  const response = await fetch(`${API_URL}/search?${params.toString()}`);

  if (response.status === 204) return []; // no content
  if (!response.ok) throw new Error('Error al buscar cursos');

  return response.json();
};
