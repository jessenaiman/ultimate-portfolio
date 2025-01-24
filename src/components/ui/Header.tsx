import React from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { Box, Flex, IconButton } from '@radix-ui/themes';
import { MoonIcon, SunIcon, HamburgerMenuIcon } from '@radix-ui/react-icons';
import { frameworks } from '../../data/navigation';
import { cred } from '../../data/site';

export default function Header() {
  const [theme, setTheme] = React.useState<'light' | 'dark'>('dark');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    // Get initial theme
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    setTheme(initialTheme);
    document.documentElement.setAttribute('data-theme', initialTheme);

    // Listen for theme changes from other components
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'theme') {
        const newTheme = e.newValue as 'light' | 'dark';
        setTheme(newTheme || 'dark');
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    // Dispatch event for other components
    window.dispatchEvent(new CustomEvent('themeChange', { detail: { theme: newTheme } }));
  };

  return (
    <Box className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-muted">
      <Flex justify="between" align="center" px="4" py="2">
        {/* Desktop Navigation */}
        <NavigationMenu.Root className="hidden lg:flex">
          <NavigationMenu.List className="flex gap-6">
            {frameworks.map((item) => (
              <NavigationMenu.Item key={item.path}>
                <NavigationMenu.Link
                  href={item.path}
                  className="text-foreground hover:text-foreground/80 transition-colors"
                >
                  {item.displayName}
                </NavigationMenu.Link>
              </NavigationMenu.Item>
            ))}
          </NavigationMenu.List>
        </NavigationMenu.Root>

        {/* Mobile Menu Button */}
        <IconButton
          className="lg:hidden"
          variant="ghost"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <HamburgerMenuIcon width="20" height="20" />
        </IconButton>

        {/* Right Section */}
        <Flex gap="3" align="center">
          <IconButton
            variant="ghost"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </IconButton>

          <a
            href={`https://github.com/${cred.GITHUB_USER}/${cred.REPO_NAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-full bg-muted text-foreground hover:bg-muted/80 transition-colors"
          >
            <svg
              className="w-4 h-4 mr-2"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
            </svg>
            GitHub
          </a>
        </Flex>
      </Flex>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <Box className="lg:hidden border-t border-muted">
          <Flex direction="column" p="4" gap="4">
            {frameworks.map((item) => (
              <a
                key={item.path}
                href={item.path}
                className="px-4 py-2 text-foreground hover:bg-muted rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.displayName}
              </a>
            ))}
          </Flex>
        </Box>
      )}
    </Box>
  );
}
