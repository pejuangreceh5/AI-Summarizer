import "./../styles/globals.css";

export const metadata = {
  title: "AI Summarizer",
  description: "Aplikasi AI ringkas teks gratis",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
