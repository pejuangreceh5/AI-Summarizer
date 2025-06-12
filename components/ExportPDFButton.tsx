import jsPDF from "jspdf";

export default function ExportPDFButton({ summary }: { summary: string }) {
  const handleExportPdf = () => {
    const doc = new jsPDF();
    doc.text(summary, 10, 10);
    doc.save("ringkasan.pdf");
  };

  return (
    <button onClick={handleExportPdf} className="bg-red-500 text-white px-4 py-2 rounded mr-2">
      Ekspor ke PDF
    </button>
  );
}
