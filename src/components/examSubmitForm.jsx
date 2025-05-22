import React, { useState } from 'react';
import { submitExam } from '../services/exams/submitExam.jsx';

const ExamSubmitForm = ({ examId, userId }) => {
  const [answers, setAnswers] = useState({});
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (questionId, value) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionId]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const result = await submitExam(examId, userId, answers);
      setMessage(`Examen enviado exitosamente. Puntaje: ${result.score}`);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow mb-6">
      <h2 className="text-xl font-semibold mb-4">Enviar Respuestas del Examen</h2>

      {/* Aquí se deberían renderizar las preguntas dinámicamente */}
      {/* Este es un ejemplo de una pregunta */}
      <div className="mb-4">
        <label>Pregunta 1:</label>
        <input
          type="text"
          value={answers[1] || ''}
          onChange={(e) => handleChange(1, e.target.value)}
          className="border px-3 py-2 rounded w-full"
        />
      </div>

      <div className="mb-4">
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700" disabled={loading}>
          {loading ? 'Enviando...' : 'Enviar Examen'}
        </button>
      </div>

      {message && <p className="text-center">{message}</p>}
    </form>
  );
};

export default ExamSubmitForm;
