const MODELS: Record<string, string> = {
  facebook: "facebook/bart-large-cnn",
  falcon: "Falconsai/text_summarization",
  sshleifer: "sshleifer/distilbart-cnn-12-6",
  mt5: "csebuetnlp/mT5_multilingual_XLSum",
};

const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_TOKEN;

export async function POST(req: Request) {
  try {
    const { text, model = "facebook" } = await req.json();
    const modelId = MODELS[model];

    if (!text || typeof text !== "string") {
      return Response.json({ error: "Teks tidak valid" }, { status: 400 });
    }

    if (!modelId) {
      return Response.json({ error: "Model tidak ditemukan" }, { status: 400 });
    }

    if (!HUGGINGFACE_API_KEY) {
      return Response.json({ error: "API Key tidak tersedia" }, { status: 500 });
    }

    const hfRes = await fetch(
      `https://api-inference.huggingface.co/models/${modelId}`,
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

    // Ambil ringkasan dari format yang berbeda antar model
    let summary = "";
    if (typeof hfData === "string") {
      summary = hfData;
    } else if (Array.isArray(hfData) && hfData[0]?.summary_text) {
      summary = hfData[0].summary_text;
    } else if (typeof hfData === "object" && hfData.summary_text) {
      summary = hfData.summary_text;
    }

    if (!summary) {
      return Response.json({ error: "Ringkasan tidak tersedia", detail: hfData }, { status: 500 });
    }

    return Response.json({ summary }, { status: 200 });
  } catch (err: any) {
    return Response.json({ error: "Server error", message: err.message }, { status: 500 });
  }
}

export async function GET() {
  return Response.json({ error: "Method Not Allowed" }, { status: 405 });
        }
