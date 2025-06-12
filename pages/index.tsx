import { useState } from "react";
import UrlSummarizer from "../components/UrlSummarizer";
import ExportPDFButton from "../components/ExportPDFButton";
import ExportWordButton from "../components/ExportWordButton";

export default function Home() {
  const [input, setInput] = useState("");
  const [summary, setSummary] = useState("");

  async function handleSummarize() {
    // Panggil API AI Summarizer kamu di sini, lalu setSummary()
  }

  return (
    <div className="max-w-xl mx-auto p-4">
      <UrlSummarizer onTextExtracted={setInput} />
      <textarea
        className="w-full border min-h-[150px] p-2 rounded mb-2"
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Tempel teks yang ingin diringkas"
      />
      <button
        onClick={handleSummarize}
        className="bg-green-600 text-white px-4 py-2 rounded mb-4"
      >
        Ringkas Sekarang
      </button>
      {summary && (
        <div>
          <div className="mb-4 whitespace-pre-line">{summary}</div>
          <ExportPDFButton summary={summary} />
          <ExportWordButton summary={summary} />
        </div>
      )}
    </div>
  );
}
