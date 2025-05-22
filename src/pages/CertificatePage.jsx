import React from 'react';
import CertificatePanel from '../components/CertificatePanel.jsx';

const CertificatePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Gestión de Certificados</h1>
        <CertificatePanel />
      </div>
    </div>
  );
};

export default CertificatePage;
