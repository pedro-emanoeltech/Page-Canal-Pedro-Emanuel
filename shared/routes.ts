import { z } from "zod";
import { insertTutorialSchema, tutorials } from "./schema";

export const errorSchemas = {
  notFound: z.object({ message: z.string() }),
};

export const api = {
  tutorials: {
    list: {
      method: 'GET' as const,
      path: '/api/tutorials' as const,
      responses: {
        200: z.array(z.custom<typeof tutorials.$inferSelect>()),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/tutorials/:slug' as const,
      responses: {
        200: z.custom<typeof tutorials.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    }
  }
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
