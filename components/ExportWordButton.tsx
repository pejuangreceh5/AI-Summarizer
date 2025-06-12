import { saveAs } from "file-saver";
import { Document, Packer, Paragraph, TextRun } from "docx";

export default function ExportWordButton({ summary }: { summary: string }) {
  const handleExportWord = async () => {
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [new Paragraph({ children: [new TextRun(summary)] })],
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, "ringkasan.docx");
  };

  return (
    <button onClick={handleExportWord} className="bg-blue-500 text-white px-4 py-2 rounded">
      Ekspor ke Word
    </button>
  );
}
