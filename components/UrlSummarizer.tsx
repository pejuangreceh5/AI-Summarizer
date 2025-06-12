import { useState } from "react";

export default function UrlSummarizer({ onTextExtracted }: { onTextExtracted: (text: string) => void }) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAndExtract = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/extract?url=${encodeURIComponent(url)}`);
      if (!res.ok) throw new Error("Gagal mengambil artikel dari URL");
      const { text } = await res.json();
      if (!text) throw new Error("Tidak ada teks artikel ditemukan");
      onTextExtracted(text);
    } catch (e: any) {
      setError(e.message || "Gagal fetch artikel");
    }
    setLoading(false);
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        value={url}
        onChange={e => setUrl(e.target.value)}
        placeholder="Tempelkan URL artikel (https://...)"
        className="border px-2 py-1 rounded w-2/3"
      />
      <button onClick={fetchAndExtract} className="bg-green-500 ml-2 px-3 py-1 rounded text-white">
        Ambil Artikel
      </button>
      {loading && <div>Memuat artikel...</div>}
      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
}
