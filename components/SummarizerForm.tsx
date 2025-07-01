"use client";
import { useState } from "react";
import UrlSummarizer from "./UrlSummarizer";
import ExportPDFButton from "./ExportPDFButton";
import ExportWordButton from "./ExportWordButton";

export default function SummarizerForm() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSummary("");
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input }),
      });

      if (!res.ok) throw new Error("Gagal meringkas, coba lagi.");
      const data = await res.json();

      if (data.summary) setSummary(data.summary);
      else setError("Ringkasan tidak ditemukan.");
    } catch (e: any) {
      setError(e.message || "Gagal meringkas.");
    }

    setLoading(false);
  }

  function copySummary() {
    navigator.clipboard.writeText(summary);
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "text/plain") {
      setError("Hanya mendukung file .txt");
      return;
    }

    const text = await file.text();
    setInput(text);
  }

  return (
    <form
      className="bg-white/90 shadow-xl rounded-2xl px-6 py-8 flex flex-col gap-5"
      onSubmit={handleSubmit}
    >
      <h2 className="text-lg font-bold text-[#388e3c] mb-2">AI Text Summarizer</h2>

      {/* ✅ Ringkas dari URL */}
      <UrlSummarizer onExtracted={setInput} />

      {/* ✅ Upload File .txt */}
      <input
        type="file"
        accept=".txt"
        onChange={handleFileUpload}
        className="mb-2"
      />

      {/* ✅ Textarea input */}
      <textarea
        className="rounded-lg border border-gray-200 px-3 py-2 resize-none min-h-[120px] focus:outline-[#43e97b] focus:ring-2"
        placeholder="Tempel atau ketik teks panjang di sini..."
        value={input}
        onChange={e => setInput(e.target.value)}
        required
      />

      {/* ✅ Tombol Ringkas */}
      <button
        disabled={loading || !input}
        type="submit"
        className="bg-[#43e97b] hover:bg-[#388e3c] text-white font-bold py-3 rounded-xl shadow-md transition disabled:opacity-60"
      >
        {loading ? "Meringkas..." : "Ringkas Sekarang"}
      </button>

      {/* ✅ Error */}
      {error && (
        <div className="text-red-600 bg-red-50 rounded-lg px-4 py-2">{error}</div>
      )}

      {/* ✅ Hasil Ringkasan & Tombol Ekspor */}
      {summary && (
        <div className="bg-[#e8f5e9] text-[#2e7d32] rounded-xl p-4 shadow mt-4 animate-fade-in">
          <div className="font-bold mb-2">Ringkasan:</div>
          <div className="whitespace-pre-line mb-4">{summary}</div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <button
              onClick={copySummary}
              type="button"
              className="text-xs bg-[#43e97b] hover:bg-[#388e3c] text-white px-4 py-2 rounded-lg"
            >
              Salin
            </button>
            <a
              href={`data:text/plain;charset=utf-8,${encodeURIComponent(summary)}`}
              download="ringkasan.txt"
              className="text-xs bg-[#388e3c] hover:bg-[#2e7d32] text-white px-4 py-2 rounded-lg text-center"
            >
              Download TXT
            </a>
            <ExportPDFButton summary={summary} />
            <ExportWordButton summary={summary} />
          </div>
        </div>
      )}
    </form>
  );
  }
