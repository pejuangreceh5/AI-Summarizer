import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { input } = await req.json();

  // Pakai model summarization publik dari HuggingFace
  const hfResponse = await fetch(
    "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ inputs: input })
    }
  );
  if (!hfResponse.ok) {
    const errText = await hfResponse.text();
    return NextResponse.json({ summary: "", error: `Gagal meringkas: ${errText}` }, { status: 500 });
  }
  const data = await hfResponse.json();
  const summary = Array.isArray(data) && data[0]?.summary_text ? data[0].summary_text : "";
  return NextResponse.json({ summary });
}
