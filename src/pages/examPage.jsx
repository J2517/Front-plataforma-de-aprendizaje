// src/pages/ExamPage.jsx
import React, { useState } from 'react';
import ExamSelectionForm from '../components/ExamSelectionForm.jsx';
import ExamQuestionsForm from '../components/ExamQuestionsForm.jsx';

const ExamPage = () => {
  const [examId, setExamId] = useState(null);
  const [studentId, setStudentId] = useState(null);

  const handleStartExam = (examId, studentId) => {
    setExamId(examId);
    setStudentId(studentId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-50 to-purple-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">Realizar Examen</h1>

        {!examId || !studentId ? (
          <ExamSelectionForm onStartExam={handleStartExam} />
        ) : (
          <ExamQuestionsForm examId={examId} studentId={studentId} />
        )}
      </div>
    </div>
  );
};

export default ExamPage;
