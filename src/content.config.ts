import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Define the post collection
const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
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
    tag: z.union([z.array(z.string()), z.string()]).optional().transform(tags => {
      // Handle both string and array formats
      if (typeof tags === 'string') return [tags];
      return tags || [];
    }),
    intro: z.string().optional(),
    style: z.object({
      template: z.string().optional(),
      card_template: z.string().optional(),
      hero_template: z.string().optional(),
      container: z.string().optional(),
      hero_surface: z.string().optional(),
      hero_image_opacity: z.string().optional(),
    }).optional(),
    thumbnail: z.string().optional(),
  }),
});

// Define the job collection
const jobs = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/jobs' }),
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

// Define the info collection for framework documentation
const info = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/info' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    framework: z.string().optional(),
    version: z.string().optional(),
  }),
});

// Define the docs collection for general documentation
const docs = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/docs' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
  }),
});

// Define the education collection
const education = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx,json}', base: './src/content/education' }),
  schema: ({ image }) => z.object({
    institution: z.string(),
    degree: z.string(),
    field: z.string(),
    startDate: z.string(),
    endDate: z.string().optional(),
    location: z.string().optional(),
    description: z.string().optional(),
    achievements: z.array(z.string()).optional(),
    logo: image().optional(),
  }),
});

// Define the resume collection
const resume = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx,json}', base: './src/content/resume' }),
  schema: z.object({
    title: z.string(),
    employer: z.string(),
    description: z.string(),
    date: z.string(),
    section: z.string(),
  }),
});

// Define the personal collection
const personal = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx,json}', base: './src/content/personal' }),
  schema: z.object({
    name: z.string(),
    value: z.string().or(z.array(z.string())),
    isPublic: z.boolean().default(true),
  }),
});

// Define the skills collection
const skills = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx,json}', base: './src/content/skills' }),
  schema: z.object({
    category: z.string(),
    items: z.array(z.object({
      name: z.string(),
      level: z.number().min(1).max(5).optional(),
      years: z.number().optional(),
      description: z.string().optional(),
    })),
  }),
});

// Define the portfolio collection for showcasing projects, services, and applications
const portfolio = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx,json}', base: './src/content/portfolio' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum(['Programming', 'Skills', 'Services', 'Hosted Applications']),
    technologies: z.array(z.string()).optional(),
    backgroundImage: image().optional(),
    logo: image().optional(),
    externalUrl: z.string().url().optional(),
    githubUrl: z.string().url().optional(),
    demoUrl: z.string().url().optional(),
    detailedDescription: z.string().optional(),
    features: z.array(z.string()).optional(),
    screenshots: z.array(image()).optional(),
    order: z.number().optional(),
    highlight: z.boolean().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = {
  'posts': posts,
  'jobs': jobs,
  'info': info,
  'docs': docs,
  'education': education,
  'resume': resume,
  'personal': personal,
  'skills': skills,
  'portfolio': portfolio,
};
