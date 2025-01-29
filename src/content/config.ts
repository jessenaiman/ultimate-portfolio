import { defineCollection, z } from 'astro:content';

const jobs = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    employer: z.string(),
    description: z.string(),
    date: z.string(),
  }),
});

export const collections = {
  'jobs': jobs,
};
