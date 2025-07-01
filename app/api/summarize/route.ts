const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_TOKEN;

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    if (!text || typeof text !== "string" || text.trim() === "") {
      return Response.json(
        { error: "Teks tidak boleh kosong." },
        { status: 400 }
      );
    }

    if (!HUGGINGFACE_API_KEY) {
      return Response.json(
        { error: "API Key tidak tersedia di environment." },
        { status: 500 }
      );
    }

    // Model multi bahasa
    const model = "csebuetnlp/mT5_multilingual_XLSum";

    const hfRes = await fetch(
      `https://api-inference.huggingface.co/models/${model}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${HUGGINGFACE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: text,
          parameters: { do_sample: false },
        }),
      }
    );

    const hfData = await hfRes.json();

    // Tangani berbagai bentuk output
    let summary = "";
    if (Array.isArray(hfData) && hfData[0]?.summary_text) {
      summary = hfData[0].summary_text;
    } else if (typeof hfData === "object" && hfData.summary_text) {
      summary = hfData.summary_text;
    } else if (typeof hfData === "string") {
      summary = hfData;
    }

    if (!summary) {
      return Response.json(
        { error: "Ringkasan kosong. Coba dengan teks yang lebih panjang." },
        { status: 500 }
      );
    }

    return Response.json({ summary }, { status: 200 });
  } catch (err: any) {
    return Response.json(
      { error: "Server error", message: err.message || String(err) },
      { status: 500 }
    );
  }
}

export async function GET() {
  return Response.json({ error: "Method Not Allowed" }, { status: 405 });
}
