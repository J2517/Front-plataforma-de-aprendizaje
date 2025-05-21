// src/components/ExamSelectionForm.jsx
import React, { useState } from 'react';

const ExamSelectionForm = ({ onStartExam }) => {
  const [examId, setExamId] = useState('');
  const [studentId, setStudentId] = useState('');

  const handleStart = () => {
    if (examId && studentId) {
      onStartExam(examId, studentId);
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow mb-6">
      <h2 className="text-xl font-semibold mb-4">Selecciona el Examen y Estudiante</h2>
      <div className="mb-4">
        <label>Examen ID:</label>
        <input
          type="number"
          value={examId}
          onChange={(e) => setExamId(e.target.value)}
          className="border px-3 py-2 rounded w-full"
        />
      </div>
      <div className="mb-4">
        <label>Estudiante ID:</label>
        <input
          type="number"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          className="border px-3 py-2 rounded w-full"
        />
      </div>
      <button
        onClick={handleStart}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Iniciar Examen
      </button>
    </div>
  );
};

export default ExamSelectionForm;
