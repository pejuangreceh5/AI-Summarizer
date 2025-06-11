import SummarizerForm from "@/components/SummarizerForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#43e97b] via-[#38f9d7] to-[#fff] flex flex-col items-center">
      <header className="w-full bg-[#388e3c] shadow-lg flex items-center px-6 py-4 sticky top-0 z-20">
        <img src="/ai-summarizer-icon.svg" alt="logo" className="h-10 w-10 rounded-lg bg-white/80 mr-3"/>
        <h1 className="text-2xl font-extrabold text-white tracking-tight">
          AI Summarizer
        </h1>
      </header>
      <section className="w-full max-w-xl flex-1 mt-8 px-4 pb-32">
        <SummarizerForm />
      </section>
      <div className="fixed bottom-6 right-4 z-30">
        <a
          href="https://huggingface.co/facebook/bart-large-cnn"
          target="_blank"
          className="bg-[#43e97b] hover:bg-[#388e3c] text-white shadow-xl font-bold px-6 py-3 rounded-full flex items-center gap-2 transition"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeWidth="2" d="M16 17v1a3 3 0 0 1-3 3h-2a3 3 0 0 1-3-3v-1M12 3v10m0 0-3.5-3.5M12 13l3.5-3.5"/>
          </svg>
          Powered by HuggingFace
        </a>
      </div>
    </main>
  );
}
