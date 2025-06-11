import { NextRequest, NextResponse } from "next/server";

async function getSummary(prompt: string) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("OPENAI_API_KEY belum diatur di .env.local");

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "Anda adalah asisten AI ringkasan profesional. Selalu buat ringkasan sederhana, jelas, dan mudah dimengerti dalam 5-10 poin." },
        { role: "user", content: prompt }
      ],
      temperature: 0.5,
      max_tokens: 600,
    })
  });
  if (!res.ok) throw new Error("Gagal menghubungi OpenAI API");
  const data = await res.json();
  return data.choices?.[0]?.message?.content?.trim() ?? "";
}

export async function POST(req: NextRequest) {
  const { input, type } = await req.json();

  let prompt = "";
  if (type === "text") {
    prompt = `Ringkas teks berikut menjadi poin-poin utama:\n\n${input}`;
  }
  else if (type === "article") {
    prompt = `Ringkas isi artikel pada URL berikut (anggap sudah didapatkan seluruh isi artikelnya): ${input}`;
  }
  else if (type === "youtube") {
    prompt = `Ringkas video YouTube berikut (anggap sudah didapatkan seluruh transkrip): ${input}`;
  }

  try {
    const summary = await getSummary(prompt);
    return NextResponse.json({ summary });
  } catch (e: any) {
    return NextResponse.json({ summary: "", error: e.message }, { status: 500 });
  }
                              }
