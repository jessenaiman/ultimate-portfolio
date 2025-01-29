/**
 * Mock Content Collections
 * 
 * This file mocks the Astro content collections API for testing.
 * It provides mock data that mimics the structure of our content.
 */

export const getCollection = async (collection: string) => {
  const collections = {
    'blog': [
      {
        id: 'test-post',
        slug: 'test-post',
        data: {
          title: 'Test Post',
          description: 'A test blog post',
          pubDate: new Date('2024-01-01'),
          tags: ['test'],
        },
        render: async () => ({
          Content: () => 'Test content',
          headings: [],
          remarkPluginFrontmatter: {},
        }),
      },
    ],
    'projects': [
      {
        id: 'test-project',
        slug: 'test-project',
        data: {
          title: 'Test Project',
          description: 'A test project',
          pubDate: new Date('2024-01-01'),
          tags: ['test'],
          link: 'https://example.com',
        },
      },
    ],
  };

  return collections[collection] || [];
};

export const getEntryBySlug = async (collection: string, slug: string) => {
  const items = await getCollection(collection);
  return items.find(item => item.slug === slug);
};

export const reference = () => ({});
export const image = () => ({});
export const defineCollection = () => ({});
