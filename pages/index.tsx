import ExportPDFButton from "../components/ExportPDFButton";
import ExportWordButton from "../components/ExportWordButton";
import { useState } from "react";

export default function Home() {
  const [summary, setSummary] = useState("");

  return (
    <div>
      <button
        onClick={() => setSummary("Ini adalah ringkasan contoh.")}
        className="bg-green-600 text-white px-4 py-2 rounded mb-4"
      >
        Tampilkan Ringkasan
      </button>

      <div className="my-4">{summary}</div>
      
      <ExportPDFButton summary={summary || "Dummy PDF"} />
      <ExportWordButton summary={summary || "Dummy DOCX"} />
    </div>
  );
}
