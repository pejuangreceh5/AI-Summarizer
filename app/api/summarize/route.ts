const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_TOKEN;

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    if (!text || typeof text !== "string" || text.trim() === "") {
      return new Response(JSON.stringify({ error: "Input text tidak boleh kosong." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (!HUGGINGFACE_API_KEY) {
      return new Response(JSON.stringify({ error: "API key tidak ditemukan." }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

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

    if (!hfRes.ok) {
      return new Response(JSON.stringify({ error: "Gagal dari HuggingFace", detail: hfData }), {
        status: hfRes.status,
        headers: { "Content-Type": "application/json" },
      });
    }

    const summary = Array.isArray(hfData) && hfData[0]?.summary_text ? hfData[0].summary_text : "";

    return new Response(JSON.stringify({ summary }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: "Server error", message: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export function GET() {
  return new Response(JSON.stringify({ error: "Method Not Allowed" }), {
    status: 405,
    headers: { "Content-Type": "application/json" },
  });
}
