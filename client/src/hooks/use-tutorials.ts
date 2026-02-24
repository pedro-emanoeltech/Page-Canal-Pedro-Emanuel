import { tutorials, type Tutorial } from "@/data/tutorials";

export function useTutorials() {
  return {
    data: tutorials,
    isLoading: false,
  };
}

export function useTutorial(slug: string): { data: Tutorial | null; isLoading: boolean } {
  const tutorial = tutorials.find((t) => t.slug === slug) ?? null;
  return {
    data: tutorial,
    isLoading: false,
  };
}
