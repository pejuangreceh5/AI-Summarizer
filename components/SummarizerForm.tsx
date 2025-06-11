"use client";
import { useState } from "react";

export default function SummarizerForm() {
  const [input, setInput] = useState("");
  const [type, setType] = useState("text");
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
        body: JSON.stringify({ input, type }),
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
      <h2 className="text-lg font-bold text-[#388e3c] mb-2">Mau ringkas apa hari ini?</h2>
      <div className="flex gap-3 mb-2">
        <label className={`px-3 py-1 rounded-full cursor-pointer ${type==="text"?"bg-[#e8f5e9] text-[#388e3c]":"bg-gray-100 text-gray-500"}`}>
          <input type="radio" className="hidden" name="type" value="text" checked={type==="text"} onChange={()=>setType("text")}/> Teks
        </label>
        <label className={`px-3 py-1 rounded-full cursor-pointer ${type==="article"?"bg-[#e8f5e9] text-[#388e3c]":"bg-gray-100 text-gray-500"}`}>
          <input type="radio" className="hidden" name="type" value="article" checked={type==="article"} onChange={()=>setType("article")}/> Artikel/Link
        </label>
        <label className={`px-3 py-1 rounded-full cursor-pointer ${type==="youtube"?"bg-[#e8f5e9] text-[#388e3c]":"bg-gray-100 text-gray-500"}`}>
          <input type="radio" className="hidden" name="type" value="youtube" checked={type==="youtube"} onChange={()=>setType("youtube")}/> YouTube
        </label>
      </div>
      {type==="text" && (
        <textarea
          className="rounded-lg border border-gray-200 px-3 py-2 resize-none min-h-[100px] focus:outline-[#43e97b] focus:ring-2"
          placeholder="Tempel atau ketik teks yang ingin diringkas..."
          value={input}
          onChange={e => setInput(e.target.value)}
          required
        />
      )}
      {type==="article" && (
        <input
          className="rounded-lg border border-gray-200 px-3 py-2 focus:outline-[#43e97b] focus:ring-2"
          placeholder="Tempel link artikel (https://...)"
          type="url"
          value={input}
          onChange={e => setInput(e.target.value)}
          required
        />
      )}
      {type==="youtube" && (
        <input
          className="rounded-lg border border-gray-200 px-3 py-2 focus:outline-[#43e97b] focus:ring-2"
          placeholder="Tempel link YouTube (https://youtube.com/...)"
          type="url"
          value={input}
          onChange={e => setInput(e.target.value)}
          required
        />
      )}

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
