const API_URL = 'http://localhost:8080/api/exam/questions';

export const getExams = async () => {
  const response = await fetch(`${API_URL}`);

  if (!response.ok) {
    throw new Error('Error al obtener los exámenes');
  }

  return await response.json();
};

export const getExamById = async (examId) => {
  const response = await fetch(`${API_URL}/${examId}`);

  if (!response.ok) {
    throw new Error('Error al obtener el examen');
  }

  return await response.json();
};
