// src/components/ExamQuestionsForm.jsx
import React, { useState, useEffect } from 'react';
import { submitExam } from '../services/exams/submitExam.jsx';
import { getExamById } from '../services/exams/getExams.jsx';

const ExamQuestionsForm = ({ examId, studentId }) => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Aquí cargamos las preguntas del examen al inicio
  useEffect(() => {
    const fetchExam = async () => {
      try {
        const exam = await getExamById(examId);
        const loadedQuestions = Object.keys(exam.questionsMap).map((key) => ({
          questionId: key,
          questionText: exam.questionsMap[key],
        }));
        setQuestions(loadedQuestions);
      } catch (error) {
        setMessage('Error al cargar las preguntas');
      }
    };

    fetchExam();
  }, [examId]);

  const handleAnswerChange = (questionId, value) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: value,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setMessage('');

    try {
      const result = await submitExam(examId, studentId, answers);
      setMessage(`Examen enviado exitosamente. Puntaje: ${result.score}`);
    } catch (error) {
      setMessage('Error al enviar el examen');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow mb-6">
      <h2 className="text-xl font-semibold mb-4">Responde las Preguntas del Examen</h2>

      {questions.map((question) => (
        <div key={question.questionId} className="mb-4">
          <label>{question.questionText}</label>
          <input
            type="text"
            value={answers[question.questionId] || ''}
            onChange={(e) => handleAnswerChange(question.questionId, e.target.value)}
            className="border px-3 py-2 rounded w-full"
          />
        </div>
      ))}

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? 'Enviando...' : 'Enviar Examen'}
      </button>

      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
};

export default ExamQuestionsForm;
