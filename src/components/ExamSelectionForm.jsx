import React, { useState } from 'react';

const ExamSelectionForm = ({ onSelection }) => {
  const [examId, setExamId] = useState('');
  const [studentId, setStudentId] = useState('');

  const handleClick = (mode) => {
    if (examId && studentId) {
      onSelection(examId, studentId, mode);
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
      <div className="flex space-x-4">
        <button
          onClick={() => handleClick('start')}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Realizar Examen
        </button>
        <button
          onClick={() => handleClick('results')}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Ver Resultados
        </button>
      </div>
    </div>
  );
};

export default ExamSelectionForm;
