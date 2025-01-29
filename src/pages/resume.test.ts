import { describe, it, expect, vi } from 'vitest';
import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const resumeFixture = readFileSync(path.join(process.cwd(), 'src', 'pages', 'resume.fixture.md'), 'utf-8');

vi.mock('astro:content', () => ({
  getCollection: vi.fn().mockResolvedValue([
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
  ]),
}));

describe('Resume Page', () => {
  it('should have correct frontmatter', () => {
    expect(resumeFixture).toContain('title: \'Jesse Naiman - Senior Developer\'');
    expect(resumeFixture).toContain('layout: \'../../layouts/Layout.astro\'');
  });
});
