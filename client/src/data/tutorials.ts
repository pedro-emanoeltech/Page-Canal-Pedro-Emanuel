export interface Tutorial {
  id: number;
  title: string;
  description: string;
  content: string;
  date: string;
  slug: string;
  image?: string;
}

export const tutorials: Tutorial[] = [
  {
    id: 1,
    title: "Como criar um script em Python",
    description:
      "Aprenda o basico de Python neste tutorial passo a passo para iniciantes.",
    content:
      "<h2>Introducao</h2><p>Python e uma linguagem excelente para scripts.</p><pre><code>print('Hello World')</code></pre>",
    date: "10 de Outubro de 2026",
    image: "/images/tutorial1.jpg",
    slug: "tutorial-1",
  },
  {
    id: 2,
    title: "Automatizando tarefas com Bash",
    description:
      "Descubra como usar o terminal Linux a seu favor.",
    content:
      "<h2>O poder do Bash</h2><p>Bash permite automacao de tarefas rotineiras rapidamente.</p><pre><code>#!/bin/bash\necho 'Testando...'</code></pre>",
    date: "12 de Outubro de 2026",
    image: "/images/tutorial2.jpg",
    slug: "tutorial-2",
  },
];
