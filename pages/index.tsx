import { useState } from "react";
import UrlSummarizer from "../components/UrlSummarizer";
import ExportPDFButton from "../components/ExportPDFButton";
import ExportWordButton from "../components/ExportWordButton";

export default function Home() {
  const [input, setInput] = useState("");
  const [summary, setSummary] = useState("");

  // Dummy ringkasan, bisa diganti API AI kalau mau
  async function handleSummarize() {
    if (!input.trim()) {
      setSummary("Masukkan teks untuk diringkas.");
      return;
    }
    // Contoh dummy, ambil 100 karakter pertama
    setSummary("Ringkasan: " + input.slice(0, 100));
  }

  return (
    <div className="max-w-xl mx-auto p-4">
      {/* Fitur Ringkas dari URL */}
      <UrlSummarizer onTextExtracted={setInput} />

      {/* Textarea untuk teks yang akan diringkas (otomatis terisi dari UrlSummarizer) */}
      <textarea
        className="w-full border min-h-[150px] p-2 rounded mb-2"
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Tempel teks yang ingin diringkas"
      />

      {/* Tombol Ringkas */}
      <button
        onClick={handleSummarize}
        className="bg-green-600 text-white px-4 py-2 rounded mb-4"
      >
        Ringkas Sekarang
      </button>

      {/* Hasil ringkasan + tombol ekspor */}
      {summary && (
        <div>
          <div className="mb-4 whitespace-pre-line">{summary}</div>
          <div className="flex gap-2">
            <ExportPDFButton summary={summary} />
            <ExportWordButton summary={summary} />
          </div>
        </div>
      )}
    </div>
  );
      }
