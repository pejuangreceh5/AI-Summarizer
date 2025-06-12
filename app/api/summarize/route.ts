const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_TOKEN;

export async function POST(req) {
  try {
    const { text } = await req.json();

    // Validasi input
    if (!text || typeof text !== "string" || text.trim() === "") {
      return new Response(
        JSON.stringify({ error: "Input text tidak boleh kosong." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Request ke HuggingFace API
    const response = await fetch(
      "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
      {
        headers: {
          Authorization: `Bearer ${HUGGINGFACE_API_KEY}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ inputs: text }),
      }
    );

    const result = await response.json();

    // Jika error dari HuggingFace, kirim error detail ke frontend
    if (!response.ok) {
      return new Response(
        JSON.stringify({ error: "HuggingFace Error", detail: result }),
        { status: response.status, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    // Error parsing JSON atau error lain
    return new Response(
      JSON.stringify({ error: "Server error", message: err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
