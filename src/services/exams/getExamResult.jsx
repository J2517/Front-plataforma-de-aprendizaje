const API_URL = 'http://localhost:8080/api/exams/';

export const getExamResult = async (examId, studentId) => {
  const response = await fetch(`${API_URL}results/${examId}/${studentId}`);

  if (!response.ok) {
    throw new Error('Error al obtener los resultados del examen');
  }

  return await response.json();
};
