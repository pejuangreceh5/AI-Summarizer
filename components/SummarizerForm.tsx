"use client";
import { useState } from "react";

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
      const res = await fetch("/api", {
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

  return (
    <form
      className="bg-white/90 shadow-xl rounded-2xl px-6 py-8 flex flex-col gap-5"
      onSubmit={handleSubmit}
    >
      <h2 className="text-lg font-bold text-[#388e3c] mb-2">Tempel teks yang ingin diringkas</h2>
      <textarea
        className="rounded-lg border border-gray-200 px-3 py-2 resize-none min-h-[120px] focus:outline-[#43e97b] focus:ring-2"
        placeholder="Tempel atau ketik teks panjang di sini..."
        value={input}
        onChange={e => setInput(e.target.value)}
        required
      />
      <button
        disabled={loading || !input}
        type="submit"
        className="bg-[#43e97b] hover:bg-[#388e3c] text-white font-bold py-3 rounded-xl shadow-md transition disabled:opacity-60"
      >
        {loading ? "Meringkas..." : "Ringkas Sekarang"}
      </button>
      {error && (
        <div className="text-red-600 bg-red-50 rounded-lg px-4 py-2">{error}</div>
      )}
      {summary && (
        <div className="bg-[#e8f5e9] text-[#2e7d32] rounded-xl p-4 shadow flex flex-col gap-3 animate-fade-in">
          <div className="font-bold mb-1">Ringkasan:</div>
          <div className="whitespace-pre-line">{summary}</div>
          <div className="flex gap-2 mt-2">
            <button onClick={copySummary} className="text-xs bg-[#43e97b] hover:bg-[#388e3c] text-white px-4 py-1 rounded-lg">Salin</button>
            <a
              href={`data:text/plain;charset=utf-8,${encodeURIComponent(summary)}`}
              download="ringkasan.txt"
              className="text-xs bg-[#388e3c] hover:bg-[#2e7d32] text-white px-4 py-1 rounded-lg"
            >Download</a>
          </div>
        </div>
      )}
    </form>
  );
}
