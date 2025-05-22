const API_URL = 'http://localhost:8080/api/certificates';

export const generateCertificate = async (courseId, studentId) => {
  const response = await fetch(`${API_URL}/generate/${courseId}/${studentId}`, {
    method: 'POST',
  });

  if (!response.ok) {
    throw new Error('No se pudo generar el certificado');
  }

  return await response.json(); // Devuelve el objeto Certificate
};
