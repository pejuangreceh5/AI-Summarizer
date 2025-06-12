import { useState } from "react";
import ExportPDFButton from "../components/ExportPDFButton";
import ExportWordButton from "../components/ExportWordButton";

// Komponen URL Summarizer minimal
function UrlSummarizer({ onTextExtracted }: { onTextExtracted: (text: string) => void }) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  // Dummy fetch, ganti dengan fetch API kamu jika ada
  const handleExtract = async () => {
    setLoading(true);
    // Simulasi fetch artikel dari url
    setTimeout(() => {
      onTextExtracted(`Hasil ekstraksi dari URL: ${url}`);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="mb-2">
      <input
        type="text"
        value={url}
        onChange={e => setUrl(e.target.value)}
        className="border px-2 py-1 rounded mr-2 w-2/3"
        placeholder="Tempel URL artikel"
      />
      <button onClick={handleExtract} className="bg-gray-500 text-white px-3 py-1 rounded">
        {loading ? "Mengambil..." : "Ambil Artikel"}
      </button>
    </div>
  );
}

export default function Home() {
  const [input, setInput] = useState("");
  const [summary, setSummary] = useState("");

  async function handleSummarize() {
    if (!input.trim()) {
      setSummary("Masukkan teks untuk diringkas.");
      return;
    }
    setSummary("Ringkasan: " + input.slice(0, 100));
  }

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">AI Summarizer</h1>
      {/* Fitur Ringkas dari URL */}
      <UrlSummarizer onTextExtracted={setInput} />

      {/* Textarea untuk input teks */}
      <textarea
        className="w-full border min-h-[100px] p-2 rounded mb-2"
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

      {/* Hasil ringkasan dan tombol ekspor */}
      {summary && (
        <div>
          <div className="mb-4 whitespace-pre-line bg-gray-100 p-2 rounded">{summary}</div>
          <div className="flex gap-2">
            <ExportPDFButton summary={summary} />
            <ExportWordButton summary={summary} />
          </div>
        </div>
      )}
    </div>
  );
        }
