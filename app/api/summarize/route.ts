const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_TOKEN;

export async function POST(req: Request) {
  try {
    // Parsing dan validasi input
    const { text } = await req.json();

    if (!text || typeof text !== "string" || text.trim() === "") {
      return Response.json(
        { error: "Input text tidak boleh kosong." },
        { status: 400 }
      );
    }

    if (!HUGGINGFACE_API_KEY) {
      return Response.json(
        { error: "HuggingFace API key tidak ditemukan di environment variable." },
        { status: 500 }
      );
    }

    // Request ke HuggingFace
    const hfRes = await fetch(
      "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${HUGGINGFACE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: text }),
      }
    );

    const hfData = await hfRes.json();

    // Jika error dari HuggingFace
    if (!hfRes.ok) {
      return Response.json(
        { error: "Gagal dari HuggingFace", detail: hfData },
        { status: hfRes.status }
      );
    }

    // Output hasil ringkasan
    // hfData bentuknya biasanya: [{ summary_text: "..." }]
    let summary = "";
    if (Array.isArray(hfData) && hfData[0]?.summary_text) {
      summary = hfData[0].summary_text;
    }

    return Response.json({ summary }, { status: 200 });
  } catch (err: any) {
    return Response.json(
      { error: "Server error", message: err.message || String(err) },
      { status: 500 }
    );
  }
}

// Optional: handler method lain (GET, PUT, DELETE) supaya jelas errornya
export async function GET() {
  return Response.json({ error: "Method Not Allowed" }, { status: 405 });
}
export async function PUT() {
  return Response.json({ error: "Method Not Allowed" }, { status: 405 });
}
export async function DELETE() {
  return Response.json({ error: "Method Not Allowed" }, { status: 405 });
}