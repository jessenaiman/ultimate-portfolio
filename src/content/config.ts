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
    title: z.string(),
    employer: z.string(),
    description: z.string().optional(),
    date: z.string(),
    endDate: z.string().optional(),
    location: z.string().optional(),
    employmentType: z.enum(['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship']).optional(),
    technologies: z.string().optional(),
    logo: image().optional(),
    achievements: z.array(z.string()).optional(),
    skills: z.array(z.string()).optional(),
    highlight: z.boolean().optional(),
  }),
});

// Define the education collection
const education = defineCollection({
  type: 'data',
  schema: z.object({
    degree: z.string(),
    institution: z.string(),
    date: z.string(),
    location: z.string().optional(),
    description: z.string().optional(),
    gpa: z.string().optional(),
    logo: z.string().optional(),
  }),
});

// Define the projects collection
const projects = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    date: z.string(),
    technologies: z.array(z.string()),
    url: z.string().url().optional(),
    github: z.string().url().optional(),
    image: image().optional(),
    featured: z.boolean().optional(),
  }),
});

// Define the skills collection
const skills = defineCollection({
  type: 'data',
  schema: z.object({
    category: z.string(),
    items: z.array(z.object({
      name: z.string(),
      level: z.number().min(1).max(5).optional(),
      years: z.number().min(1).optional(),
    })),
  }),
});

// Define the personal info collection
const personal = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    title: z.string(),
    email: z.string().email(),
    phone: z.string(),
    location: z.string(),
    website: z.string().url().optional(),
    github: z.string().url().optional(),
    linkedin: z.string().url().optional(),
    twitter: z.string().url().optional(),
    summary: z.string(),
  }),
});

export const collections = {
  'posts': posts,
  'jobs': jobs,
  'education': education,
  'projects': projects,
  'skills': skills,
  'personal': personal,
};
