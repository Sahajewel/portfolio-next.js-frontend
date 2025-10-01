// components/PdfDownloadButton.tsx - Simplest version
'use client';

export default function PDFDownloadButton() {
  const handleDownloadPDF = () => {
    // Simply trigger print dialog
    window.print();
  };

  return (
    <button
      onClick={handleDownloadPDF}
      className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm"
    >
      <span>📄</span>
      Download PDF
    </button>
  );
}