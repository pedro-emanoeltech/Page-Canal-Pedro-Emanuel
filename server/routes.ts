import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.get(api.tutorials.list.path, async (req, res) => {
    const allTutorials = await storage.getTutorials();
    res.json(allTutorials);
  });

  app.get(api.tutorials.get.path, async (req, res) => {
    const tutorial = await storage.getTutorialBySlug(req.params.slug);
    if (!tutorial) {
      return res.status(404).json({ message: "Tutorial not found" });
    }
    res.json(tutorial);
  });

  // Seed data
  const existing = await storage.getTutorials();
  if (existing.length === 0) {
    await storage.createTutorial({
      title: "ATUALIZAR FIRMWARE ARGOX OS214 PLUS - PPLA PARA PPLB",
      description: "Neste tutorial você aprenderá como atualizar o firmware da impressora Argox OS214 Plus convertendo de PPLA para PPLB.",
      content: `
        <section class="space-y-6">
          <div>
            <h2 class="text-2xl font-bold mb-4">O que é e como funciona</h2>
            <p class="text-muted-foreground leading-relaxed">
              Neste tutorial você aprenderá como atualizar o firmware da impressora Argox OS214 Plus
              convertendo de PPLA para PPLB. Essa atualização permite melhor compatibilidade
              com sistemas e melhora o desempenho da impressora.
            </p>
          </div>

          <div>
            <h2 class="text-2xl font-bold mb-4">Como fazer a atualização</h2>
            <ul class="list-decimal list-inside space-y-2 text-muted-foreground">
              <li>Baixe o arquivo disponível abaixo.</li>
              <li>Conecte a impressora ao computador.</li>
              <li>Execute o software de atualização.</li>
              <li>Aguarde a conclusão e reinicie o equipamento.</li>
            </ul>
          </div>

          <div class="aspect-video rounded-xl overflow-hidden border border-border shadow-sm">
            <iframe 
              width="100%" 
              height="100%" 
              src="https://www.youtube.com/embed/R1ZcboaqsuE" 
              title="YouTube video player" 
              frameborder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowfullscreen
            ></iframe>
          </div>

          <div class="flex flex-col sm:flex-row gap-4 pt-4">
            <a 
              href="https://mega.nz/file/d3x3AIiD#xm5VWCnY6UzTpPVaVnz0UFIiiZp_v8BHl4YfE75Pl9g" 
              target="_blank" 
              class="inline-flex items-center justify-center px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-green-600/20 active:scale-95"
            >
              Baixar Arquivo
            </a>
            <a 
              href="/" 
              class="inline-flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-600/20 active:scale-95"
            >
              Voltar para Início
            </a>
          </div>
        </section>
      `,
      date: "10 de Outubro de 2026",
      slug: "tutorial-1",
    });
    
    await storage.createTutorial({
      title: "Como atualizar os drivers do computador - Windows 11 (Fácil)",
      description: "Manter os drivers atualizados é essencial para garantir melhor desempenho, segurança e compatibilidade no Windows 11.",
      content: `
        <section class="space-y-6">
          <div>
            <h2 class="text-2xl font-bold mb-4">O que é e como funciona</h2>
            <p class="text-muted-foreground leading-relaxed">
              Manter os drivers atualizados é essencial para garantir melhor desempenho,
              segurança e compatibilidade no Windows 11.
              Drivers são responsáveis por permitir que o sistema se comunique com o hardware.
            </p>
          </div>

          <div>
            <h2 class="text-2xl font-bold mb-4">Como atualizar os drivers</h2>
            <ul class="list-decimal list-inside space-y-2 text-muted-foreground">
              <li>Abra o Gerenciador de Dispositivos.</li>
              <li>Clique com o botão direito no dispositivo desejado.</li>
              <li>Selecione "Atualizar driver".</li>
              <li>Escolha buscar automaticamente.</li>
              <li>Reinicie o computador após atualização.</li>
            </ul>
          </div>

          <div class="aspect-video rounded-xl overflow-hidden border border-border shadow-sm">
            <iframe 
              width="100%" 
              height="100%" 
              src="https://www.youtube.com/embed/SZLAkhKq0jc" 
              title="YouTube video player" 
              frameborder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowfullscreen
            ></iframe>
          </div>

          <div class="flex flex-col sm:flex-row gap-4 pt-4">
            <a 
              href="https://mega.nz/file/B7hVlD4I#UxfINDk58jt6-aOYTWQryXU0NfXGasydiI4zZ88cg7Y" 
              target="_blank" 
              class="inline-flex items-center justify-center px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-green-600/20 active:scale-95"
            >
              Baixar Arquivo
            </a>
            <a 
              href="/" 
              class="inline-flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-600/20 active:scale-95"
            >
              Voltar para Início
            </a>
          </div>
        </section>
      `,
      date: "12 de Outubro de 2026",
      slug: "tutorial-2",
    });
  }

  return httpServer;
}