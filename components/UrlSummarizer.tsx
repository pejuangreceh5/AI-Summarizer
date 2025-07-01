"use client";
import { useState } from "react";

export default function UrlSummarizer({ onExtracted }: { onExtracted: (text: string) => void }) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleExtract = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/extract?url=${encodeURIComponent(url)}`);
      const data = await res.json();

      if (res.ok && data.text) {
        onExtracted(data.text);
      } else {
        setError(data.error || "Gagal mengambil artikel.");
      }
    } catch {
      setError("Gagal terhubung ke server.");
    }

    setLoading(false);
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        value={url}
        onChange={e => setUrl(e.target.value)}
        placeholder="Tempel URL artikel..."
        className="border px-3 py-2 rounded w-full mb-2"
      />
      <button
        onClick={handleExtract}
        disabled={loading || !url}
        className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded"
      >
        {loading ? "Mengambil..." : "Ambil Artikel"}
      </button>
      {error && <p className="text-red-600 mt-2 text-sm">{error}</p>}
    </div>
  );
}
