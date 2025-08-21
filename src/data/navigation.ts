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
        path: '/react-framework',
        icon: 'mdi:react'
      },
      { 
        name: 'vue', 
        displayName: 'Vue', 
        features: 'Progressive Framework', 
        path: '/vue-framework',
        icon: 'mdi:vuejs'
      },
      { 
        name: 'svelte', 
        displayName: 'Svelte', 
        features: 'Compiler as Framework', 
        path: '/svelte-framework',
        icon: 'mdi:language-typescript'
      },
      { 
        name: 'solid', 
        displayName: 'SolidJS', 
        features: 'Reactive UI Library', 
        path: '/solid-framework',
        icon: 'mdi:language-javascript'
      }
    ]
  },
  {
    name: 'ai',
    displayName: 'AI & Machine Learning',
    features: 'AI Solutions & Demos',
    path: '#',
    icon: 'mdi:robot',
    children: [
      { 
        name: 'ai-overview',
        displayName: 'AI Overview',
        features: 'AI Capabilities',
        path: '/ai/overview',
        icon: 'mdi:view-dashboard',
        isNew: true
      },
      { 
        name: 'chat-gpt', 
        displayName: 'Chat GPT', 
        features: 'AI Assistant', 
        path: '/ai/flowise-chat',
        icon: 'mdi:chat',
        isNew: true
      },
      { 
        name: 'pollinate-ai', 
        displayName: 'Pollinate AI', 
        features: 'AI Generation Tools', 
        path: '/pollinate-ai',
        icon: 'mdi:flower-pollen',
        isNew: true
      },
      { 
        name: 'blockchain-ai', 
        displayName: 'Blockchain AI', 
        features: 'Web3 AI Integration', 
        path: '/blockchain-ai',
        icon: 'mdi:link-variant',
        isNew: true
      }
    ]
  },
  {
    name: 'design', 
    displayName: 'Design', 
    features: 'Web Design', 
    path: '#',
    icon: 'mdi:briefcase',
    children: [
      { 
        name: 'effects', 
        displayName: 'Effects', 
        features: 'Tailwind CSS Effects', 
        path: '/effects',
        icon: 'mdi:briefcase'
      },
      { 
        name: 'transitions', 
        displayName: 'Transitions', 
        features: 'Tailwind CSS Transitions & Effects', 
        path: '/transitions',
        icon: 'mdi:briefcase'
      },
      {
        name: 'animation',
        displayName: 'Animation',
        features: 'Animate.css Demos',
        path: '/animation',
        icon: 'mdi:briefcase'
      }
    ] 
  },
];