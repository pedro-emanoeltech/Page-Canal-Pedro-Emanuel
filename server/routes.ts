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
      title: "Como criar um script em Python",
      description: "Aprenda o básico de Python neste tutorial passo a passo para iniciantes.",
      content: "<h2>Introdução</h2><p>Python é uma linguagem excelente para scripts.</p><pre><code>print('Hello World')</code></pre>",
      date: "10 de Outubro de 2026",
      slug: "tutorial-1",
    });
    
    await storage.createTutorial({
      title: "Automatizando tarefas com Bash",
      description: "Descubra como usar o terminal Linux a seu favor.",
      content: "<h2>O poder do Bash</h2><p>Bash permite automação de tarefas rotineiras rapidamente.</p><pre><code>#!/bin/bash\necho 'Testando...'</code></pre>",
      date: "12 de Outubro de 2026",
      slug: "tutorial-2",
    });
  }

  return httpServer;
}