import { useParams } from "wouter";
import { useState } from "react";
import { useTutorial } from "@/hooks/use-tutorials";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FakeOverlay } from "@/components/FakeOverlay";
import { Calendar, User, ArrowLeft, Clock, Download } from "lucide-react";
import { Link } from "wouter";

export default function Tutorial() {
  const { slug } = useParams<{ slug: string }>();
  const { data: tutorial, isLoading } = useTutorial(slug || "");

  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [isReleased, setIsReleased] = useState(false);

  const handleDownloadClick = () => {
    if (!tutorial?.link) return;

    // Se já liberado → abre direto
    if (isReleased) {
      window.open(tutorial.link, "_blank");
      return;
    }

    // Primeira vez → abre overlay
    setIsOverlayOpen(true);

    setTimeout(() => {
      setIsOverlayOpen(false);
      setIsReleased(true);
    }, 120000); // 2 minutos
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 max-w-3xl mx-auto w-full px-6 py-12">
          <div className="h-8 w-24 bg-muted animate-pulse rounded mb-8" />
          <div className="h-16 w-3/4 bg-muted animate-pulse rounded mb-6" />
          <div className="h-6 w-1/2 bg-muted animate-pulse rounded mb-12" />
        </main>
      </div>
    );
  }

  if (!tutorial) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <h1 className="text-4xl font-display font-bold mb-4">404</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Tutorial não encontrado.
          </p>
          <Link
            href="/"
            className="text-primary hover:underline flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Voltar para o início
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col relative">
      {isOverlayOpen && <FakeOverlay />}

      <Header />

      <main className="flex-1">
        <article className="max-w-3xl mx-auto px-6 py-12 lg:py-20">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10"
          >
            <ArrowLeft className="w-4 h-4" /> Voltar para todos os tutoriais
          </Link>

          <header className="mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold leading-tight mb-6">
              {tutorial.title}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              {tutorial.description}
            </p>

            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground font-mono bg-muted/30 py-3 px-6 rounded-xl border border-border/50">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-blue-500" />
                <span>Pedro Emanuel</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-500" />
                <span>{tutorial.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-500" />
                <span>10 min de leitura</span>
              </div>
            </div>
          </header>

          <div className="mb-16 rounded-2xl overflow-hidden shadow-2xl shadow-black/10 border border-border/50 relative aspect-[21/9]">
            <img
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=600&fit=crop"
              alt="Tutorial Cover"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="prose prose-lg prose-blue max-w-none prose-headings:font-display prose-pre:bg-[#111] prose-pre:border prose-pre:border-border/10 mb-16">
            <div dangerouslySetInnerHTML={{ __html: tutorial.content }} />
          </div>

          {/* BOTÃO DE DOWNLOAD */}
          {tutorial.nome && tutorial.link && (
            <div className="flex justify-center">
              <button
                onClick={handleDownloadClick}
                className={`flex items-center gap-3 px-8 py-4 rounded-xl font-semibold shadow-lg transition-all
                ${
                  isReleased
                    ? "bg-green-600 hover:bg-green-700 text-white"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                <Download className="w-5 h-5" />
                {isReleased
                  ? `Baixar ${tutorial.nome}`
                  : `Liberar download (${tutorial.nome})`}
              </button>
            </div>
          )}
        </article>
      </main>

      <Footer />
    </div>
  );
}
