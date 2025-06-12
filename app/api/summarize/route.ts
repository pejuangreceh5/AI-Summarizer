const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_TOKEN;

export async function POST(req) {
  const { text } = await req.json();

  // Ganti URL berikut sesuai model yang kamu pakai
  const response = await fetch("https://api-inference.huggingface.co/models/facebook/bart-large-cnn", {
    headers: {
      Authorization: `Bearer ${HUGGINGFACE_API_KEY}`,
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify({ inputs: text }),
  });

  const result = await response.json();
  return new Response(JSON.stringify(result), {
    status: response.ok ? 200 : response.status,
    headers: { "Content-Type": "application/json" }
  });
}
