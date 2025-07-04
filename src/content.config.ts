import { defineCollection, z } from 'astro:content';

// Define the post collection
const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    author: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

// Define the job collection
const jobs = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    // Common fields for all job entries
    title: z.string(),
    employer: z.string(),
    date: z.string(),
    isTraditionalResume: z.boolean().default(false),
    
    // Optional fields for dynamic job entries
    description: z.string().optional(),
    endDate: z.string().optional(),
    location: z.string().optional(),
    employmentType: z.enum(['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship']).optional(),
    technologies: z.string().optional(),
    logo: image().optional(),
    achievements: z.array(z.string()).optional(),
    skills: z.array(z.string()).optional(),
    highlight: z.boolean().optional()
  }),
});

export const collections = {
  'posts': posts,
  'jobs': jobs,
};
