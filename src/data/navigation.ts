// Types for navigation items
export interface NavigationItem {
  name: string;
  displayName: string;
  features: string;
  path: string;
  icon: string;
  badge?: string;
  badgeColor?: string;
  isNew?: boolean;
  children?: NavigationItem[];
}

// Main navigation data structure
export const navigationItems: NavigationItem[] = [
  {
    name: 'home',
    displayName: 'Home',
    features: 'Main Page',
    path: '/',
    icon: 'mdi:home'
  },
  {
    name: 'portfolio',
    displayName: 'Portfolio',
    features: 'Project Showcase',
    path: '/portfolio',
    icon: 'mdi:briefcase'
  },
  {
    name: 'stack',
    displayName: 'Website Stack',
    features: 'Technology Stack Documentation',
    path: '/styleguide',
    icon: 'mdi:layers',
  },
  {
    name: 'framework-demos',
    displayName: 'Framework Demos',
    features: 'Interactive Framework Examples',
    path: '#',
    icon: 'mdi:code-tags',
    children: [
      // Updated framework demo paths to avoid reserved words (see: https://docs.astro.build/en/core-concepts/routing/)
      {
        name: 'react',
        displayName: 'React',
        features: 'UI Library',
        path: '/frameworks/react-framework',
        icon: 'mdi:react'
      },
      {
        name: 'vue',
        displayName: 'Vue',
        features: 'Progressive Framework',
        path: '/frameworks/vue-framework',
        icon: 'mdi:vuejs'
      },
      {
        name: 'svelte',
        displayName: 'Svelte',
        features: 'Compiler as Framework',
        path: '/frameworks/svelte-framework',
        icon: 'mdi:language-typescript'
      },
      {
        name: 'solid',
        displayName: 'SolidJS',
        features: 'Reactive UI Library',
        path: '/frameworks/solid-framework',
        icon: 'mdi:language-javascript'
      }
    ]
  },
  {
    name: 'chat',
    displayName: 'AI Assistant',
    features: 'Professional AI Chat Assistant',
    path: '/chat',
    icon: 'mdi:chat-processing',
    isNew: true,
    badge: 'New',
    badgeColor: 'success'
  },
  {
    name: 'blog',
    displayName: 'Developer Blog',
    features: 'Technical Articles & Insights',
    path: '#',
    icon: 'mdi:blog-outline',
    children: [
      {
        name: 'camp',
        displayName: 'Summer Camp Chronicles',
        features: 'Game development stories',
        path: '/blog/camp',
        icon: 'mdi:campfire'
      },
      {
        name: 'dungeons',
        displayName: 'Dungeons & Dragons',
        features: 'RPG adventures and stories',
        path: '/blog/dungeons',
        icon: 'mdi:dungeon'
      },
      {
        name: 'storyteller',
        displayName: 'Storyteller Services',
        features: 'Professional storytelling services',
        path: '/blog/storyteller',
        icon: 'mdi:book-open-page-variant'
      },
      {
        name: 'web-programmer',
        displayName: 'Web Programming',
        features: 'Programming insights and tutorials',
        path: '/blog/web-programmer',
        icon: 'mdi:code-braces'
      }
    ]
  }
];