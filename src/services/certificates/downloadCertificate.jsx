const API_URL = 'http://localhost:8080/api/certificates';

export const downloadCertificate = async (certificateId) => {
  const response = await fetch(`${API_URL}/download/${certificateId}`);

  if (!response.ok) {
    throw new Error('No se pudo descargar el certificado');
  }

  const blob = await response.blob();
  const url = window.URL.createObjectURL(new Blob([blob]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `certificado_${certificateId}.pdf`);
  document.body.appendChild(link);
  link.click();
  link.parentNode.removeChild(link);
};
