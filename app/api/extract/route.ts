import { JSDOM } from "jsdom";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url");

  if (!url) {
    return Response.json({ error: "URL tidak disediakan" }, { status: 400 });
  }

  try {
    const res = await fetch(url);
    const html = await res.text();
    const dom = new JSDOM(html);
    const article =
      dom.window.document.querySelector("article")?.textContent ||
      dom.window.document.body.textContent ||
      "";

    const limited = article.slice(0, 5000); // batasi panjang teks
    return Response.json({ text: limited }, { status: 200 });
  } catch (err: any) {
    return Response.json(
      { error: "Gagal mengambil artikel", message: err.message },
      { status: 500 }
    );
  }
}
