import { useTutorials } from "@/hooks/use-tutorials";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { TutorialCard } from "@/components/TutorialCard";
import { Terminal, Code, Cpu } from "lucide-react";

export default function Home() {
  const { data: tutorials, isLoading } = useTutorials();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-32 px-6 border-b border-border/50 bg-gradient-to-b from-muted/50 to-background">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 space-y-6 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-medium">
                <Terminal className="w-4 h-4" />
                <span>Tecnologia, Automação & Tutoriais Práticos</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-display font-extrabold tracking-tight text-balance">
                Desbloqueie o poder da <span className="text-blue-600">Automação</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl text-balance">
                Bem-vindo ao canal do Pedro Emanuel. Aqui você encontra os melhores tutoriais, scripts práticos e guias de tecnologia para otimizar sua rotina e elevar suas habilidades.
              </p>
            </div>
            
            <div className="hidden md:flex flex-1 justify-center relative">
              <div className="absolute inset-0 bg-blue-500/20 blur-[100px] rounded-full" />
              <div className="grid grid-cols-2 gap-4 relative z-10">
                <div className="space-y-4 pt-8">
                  <div className="w-32 h-32 bg-white rounded-2xl shadow-lg border border-border/50 flex items-center justify-center">
                    <Code className="w-12 h-12 text-blue-500" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="w-32 h-32 bg-[#111] rounded-2xl shadow-lg flex items-center justify-center">
                    <Cpu className="w-12 h-12 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tutorials Section */}
        <section className="py-20 px-6 max-w-5xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-display font-bold mb-4">Últimos Tutoriais</h2>
            <p className="text-muted-foreground">Tutoriais diretos, aplicáveis e pensados para resolver problemas reais.</p>
          </div>

          {isLoading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-muted/30 rounded-2xl p-6 h-[250px] animate-pulse" />
              ))}
            </div>
          ) : !tutorials || tutorials.length === 0 ? (
            <div className="text-center py-20 bg-muted/20 rounded-2xl border border-dashed border-border">
              <Terminal className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-bold">Nenhum tutorial encontrado</h3>
              <p className="text-muted-foreground mt-2">Novos tutoriais estão sendo preparados. Acompanhe o canal no YouTube para não perder as próximas publicações.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
              {tutorials.map((tutorial) => (
                <TutorialCard key={tutorial.id} tutorial={tutorial} />
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
