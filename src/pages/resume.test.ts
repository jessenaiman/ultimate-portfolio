import { describe, it, expect, vi } from 'vitest';
import { getCollection } from 'astro:content';

vi.mock('astro:content', () => ({
  getCollection: vi.fn(),
}));

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
