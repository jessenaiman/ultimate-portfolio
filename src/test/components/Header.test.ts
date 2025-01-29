import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, test } from 'vitest';
import Header from '../../components/ui/Header.astro';

test('Header renders navigation links', async () => {
  const container = await AstroContainer.create();
  const result = await container.renderToString(Header);

  // Verify home link exists
  expect(result).toContain('href="/"');
  
  // Verify resume link exists
  expect(result).toContain('href="/resume"');
});

test('Header includes theme toggle', async () => {
  const container = await AstroContainer.create();
  const result = await container.renderToString(Header);
  
  // Verify theme toggle exists
  expect(result).toContain('id="theme-toggle"');
  expect(result).toContain('theme-toggle-dark-icon');
  expect(result).toContain('theme-toggle-light-icon');
});

test('Header includes mobile menu', async () => {
  const container = await AstroContainer.create();
  const result = await container.renderToString(Header);
  
  // Verify mobile menu exists
  expect(result).toContain('id="mobile-menu-button"');
  expect(result).toContain('id="mobile-menu"');
  expect(result).toContain('id="mobile-menu-close"');
});
