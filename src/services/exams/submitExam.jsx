const API_URL = 'http://localhost:8080/api/exams/';

export const submitExam = async (examId, userId, answers) => {
  const body = {
    userId,
    answersMap: answers,
  };

  const response = await fetch(`${API_URL}submit/${examId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error('Error al enviar el examen');
  }

  return await response.json();
};
