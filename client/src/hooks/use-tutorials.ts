import { useQuery } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";

export function useTutorials() {
  return useQuery({
    queryKey: [api.tutorials.list.path],
    queryFn: async () => {
      const res = await fetch(api.tutorials.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch tutorials");
      const data = await res.json();
      return api.tutorials.list.responses[200].parse(data);
    },
  });
}

export function useTutorial(slug: string) {
  return useQuery({
    queryKey: [api.tutorials.get.path, slug],
    queryFn: async () => {
      const url = buildUrl(api.tutorials.get.path, { slug });
      const res = await fetch(url, { credentials: "include" });
      
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch tutorial");
      
      const data = await res.json();
      return api.tutorials.get.responses[200].parse(data);
    },
    enabled: !!slug,
  });
}
