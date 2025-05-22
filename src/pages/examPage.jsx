import React, { useState } from 'react';
import ExamSelectionForm from '../components/ExamSelectionForm.jsx';
import ExamQuestionsForm from '../components/ExamQuestionsForm.jsx';
import ExamResults from '../components/examResults.jsx';

const ExamPage = () => {
  const [examId, setExamId] = useState(null);
  const [studentId, setStudentId] = useState(null);
  const [mode, setMode] = useState(null); // 'start' o 'results'

  const handleSelection = (examId, studentId, selectedMode) => {
    setExamId(examId);
    setStudentId(studentId);
    setMode(selectedMode);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-50 to-purple-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">Gestión de Exámenes</h1>

        {!examId || !studentId || !mode ? (
          <ExamSelectionForm onSelection={handleSelection} />
        ) : mode === 'start' ? (
          <ExamQuestionsForm examId={examId} studentId={studentId} />
        ) : (
          <ExamResults examId={examId} studentId={studentId} />
        )}
      </div>
    </div>
  );
};

export default ExamPage;
