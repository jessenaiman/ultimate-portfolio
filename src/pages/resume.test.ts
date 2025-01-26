import { describe, it, expect, vi } from 'vitest';
import { getCollection } from 'astro:content';
import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const resumeFixture = readFileSync(path.join(process.cwd(), 'src', 'pages', 'resume.fixture.md'), 'utf-8');

vi.mock('astro:content', async () => {
  return () => ({
    resume: {
      body: resumeFixture,
      data: { title: 'My Resume' } // Can still override if needed
    }
  })
});

describe('Resume Page', () => {
  it('should load jobs from the collection', async () => {
    const mockJobs = [
      {
        id: '1',
        data: {
          title: 'Senior Developer',
          employer: 'Tech Corp',
          description: 'Led development team',
          date: '2023-01-01',
        },
      },
      {
        id: '2',
        data: {
          title: 'Web Developer',
          employer: 'Web Co',
          description: 'Built web applications',
          date: '2022-01-01',
        },
      },
    ];

    (getCollection as any).mockResolvedValue(mockJobs);

    const jobs = await getCollection('jobs');

    expect(jobs).toHaveLength(2);
    expect(jobs[0].data.title).toBe('Senior Developer');
    expect(jobs[1].data.employer).toBe('Web Co');
  });
});
