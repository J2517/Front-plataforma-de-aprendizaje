import React, { useState } from 'react';
import { generateCertificate } from '../services/certificates/generateCertificate.jsx';
import { downloadCertificate } from '../services/certificates/downloadCertificate.jsx';

const CertificatePanel = () => {
  const [courseId, setCourseId] = useState('');
  const [studentId, setStudentId] = useState('');
  const [certificateId, setCertificateId] = useState(null);
  const [message, setMessage] = useState('');

  const handleGenerate = async () => {
    setMessage('');
    try {
      const cert = await generateCertificate(courseId, studentId);
      setCertificateId(cert.id);
      setMessage(`Certificado generado con éxito (ID: ${cert.id})`);
    } catch (err) {
      setMessage(err.message);
    }
  };

  const handleDownload = async () => {
    try {
      await downloadCertificate(certificateId);
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow mb-6 max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Certificado de Curso</h2>

      <div className="mb-4">
        <label>ID del Curso:</label>
        <input
          type="number"
          value={courseId}
          onChange={(e) => setCourseId(e.target.value)}
          className="border px-3 py-2 rounded w-full"
        />
      </div>

      <div className="mb-4">
        <label>ID del Estudiante:</label>
        <input
          type="number"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          className="border px-3 py-2 rounded w-full"
        />
      </div>

      <button
        onClick={handleGenerate}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 w-full mb-2"
      >
        Generar Certificado
      </button>

      {certificateId && (
        <button
          onClick={handleDownload}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 w-full"
        >
          Descargar Certificado
        </button>
      )}

      {message && <p className="mt-4 text-center text-sm text-red-600">{message}</p>}
    </div>
  );
};

export default CertificatePanel;
