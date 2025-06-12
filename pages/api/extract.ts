import type { NextApiRequest, NextApiResponse } from "next";
import { JSDOM } from "jsdom";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { url } = req.query;
  if (!url || typeof url !== "string") {
    return res.status(400).json({ error: "No URL provided" });
  }

  try {
    const response = await fetch(url as string);
    const html = await response.text();
    const dom = new JSDOM(html);
    // Ambil isi utama artikel, sederhana dengan tag <article> atau <body>
    const article = dom.window.document.querySelector("article")?.textContent ||
      dom.window.document.body.textContent;
    res.status(200).json({ text: article?.slice(0, 5000) || "" });
  } catch (error) {
    res.status(500).json({ error: "Gagal ekstrak artikel" });
  }
}
