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
    name: 'resume', 
    displayName: 'Resume', 
    features: 'Professional Experience', 
    path: '/resume',
    icon: 'mdi:file-document'
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
    badge: 'UPDATED',
    badgeColor: 'primary'
  },
  {
    name: 'frameworks',
    displayName: 'Frameworks',
    features: 'JavaScript Frameworks',
    path: '#',
    icon: 'mdi:code-tags',
    children: [
      { 
        name: 'react', 
        displayName: 'React', 
        features: 'UI Library', 
        path: '/react',
        icon: 'mdi:react'
      },
      { 
        name: 'vue', 
        displayName: 'Vue', 
        features: 'Progressive Framework', 
        path: '/vue',
        icon: 'mdi:vuejs'
      },
      { 
        name: 'svelte', 
        displayName: 'Svelte', 
        features: 'Compiler as Framework', 
        path: '/svelte',
        icon: 'mdi:language-typescript'
      },
      { 
        name: 'solid', 
        displayName: 'SolidJS', 
        features: 'Reactive UI Library', 
        path: '/solid',
        icon: 'mdi:language-javascript'
      },
      { 
        name: 'remix', 
        displayName: 'Remix', 
        features: 'Full Stack Framework', 
        path: '/remix',
        icon: 'mdi:code-brackets'
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
    name: 'demos',
    displayName: 'Demos',
    features: 'Interactive Examples',
    path: '#',
    icon: 'mdi:view-dashboard',
    children: [
      { 
        name: 'blog', 
        displayName: 'Blog', 
        features: 'Content Management', 
        path: '/blog',
        icon: 'mdi:post'
      },
      { 
        name: 'color-picker', 
        displayName: 'Color Picker', 
        features: 'Interactive Tool', 
        path: '/color-picker',
        icon: 'mdi:palette'
      },
      { 
        name: 'math', 
        displayName: 'Math Tools', 
        features: 'Calculators & Visualizations', 
        path: '/math',
        icon: 'mdi:calculator'
      }
    ]
  },
  { 
    name: 'ml', 
    displayName: 'Machine Learning', 
    features: 'AI Solutions', 
    path: '/machine',
    icon: 'mdi:robot-outline'
  }
];