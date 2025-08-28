import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Define the blog posts collection - all content flattened with frontmatter
const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    author: z.string().optional(),
    tags: z.union([z.array(z.string()), z.string()]).optional().transform(tags => {
      // Handle both string and array formats
      if (typeof tags === 'string') return [tags];
      return tags || [];
    }),
    // Content type classification via frontmatter instead of directories
    contentType: z.enum(['post', 'page', 'framework-guide', 'portfolio', 'resume', 'job', 'info']).default('post'),
    // Framework-specific content
    framework: z.string().optional(),
    // Portfolio-specific fields
    technologies: z.array(z.string()).optional(),
    demoUrl: z.string().url().optional(),
    githubUrl: z.string().url().optional(),
    // Job-specific fields
    employer: z.string().optional(),
    employmentType: z.enum(['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship']).optional(),
    // Additional metadata
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

// Define separate collections for specific content types
const info = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date().optional(),
    author: z.string().optional(),
    tags: z.union([z.array(z.string()), z.string()]).optional().transform(tags => {
      // Handle both string and array formats
      if (typeof tags === 'string') return [tags];
      return tags || [];
    }),
    contentType: z.literal('info').default('info'),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  'posts': posts,
  'info': info,
};
