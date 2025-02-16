// 1. Import utilities from `astro:content`
import { defineCollection, z } from 'astro:content';

// 2. Import loader(s)
import { glob, file } from 'astro/loaders';

const job = defineCollection({
  loader: glob({pattern: "**/*.md", base: './src/content/jobs'}),
  schema: z.object({
    title: z.string(),
    employer: z.string(),
    description: z.string(),
    date: z.string(),
  }),
});

const post = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    tags: z.array(z.string()).optional(),
  }),
});


export const collections = {
  'jobs': job,
  'posts': post,
};
