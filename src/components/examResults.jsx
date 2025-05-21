import React, { useEffect, useState } from 'react';
import { getExamResult } from '../services/exams/getExamResult.jsx';

const ExamResults = ({ examId, studentId }) => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const resultData = await getExamResult(examId, studentId);
        setResult(resultData);
      } catch (error) {
        setMessage(error.message || 'Error al obtener los resultados');
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [examId, studentId]);

  if (loading) {
    return <p>Cargando resultados...</p>;
  }

  if (message) {
    return <p>{message}</p>;
  }

  return (
    <div className="p-4 bg-white rounded shadow mb-6">
      <h2 className="text-xl font-semibold mb-4">Resultados del Examen</h2>

      <p>Puntaje obtenido: {result.score}</p>
      <p>Respuestas Correctas: {result.correctAnswers}</p>
      <p>Respuestas Incorrectas: {result.incorrectAnswers}</p>
      <p>Comentarios: {result.comments}</p>
    </div>
  );
};

export default ExamResults;
