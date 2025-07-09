/**
 * Navigation menu item structure
 * 
 * @property name - Unique identifier for the menu item (used for active state detection)
 * @property displayName - Text shown in the UI for this menu item
 * @property features - Short description of the page/section features
 * @property path - URL path for the menu item link (use '#' for dropdown parents)
 * @property badge - Optional text to display in a badge (e.g., 'NEW', 'v4.0')
 * @property badgeColor - Optional daisyUI color for the badge (e.g., 'primary', 'secondary')
 * @property isNew - Optional flag to mark item as new (adds visual indicator)
 * @property children - Optional array of submenu items
 */
export interface MenuItem {
    name: string;
    displayName: string;
    features: string;
    path: string;
    badge?: string;
    badgeColor?: string;
    isNew?: boolean;
    children?: MenuItem[];
}

export const navigation: MenuItem[] = [
    { 
        name: 'home', 
        displayName: 'Home', 
        features: 'Main Page', 
        path: '/' 
    },
    { 
        name: 'resume', 
        displayName: 'Resume', 
        features: 'Professional Experience', 
        path: '/resume' 
    },
    { 
        name: 'portfolio', 
        displayName: 'Portfolio', 
        features: 'Project Showcase', 
        path: '/portfolio' 
    },
    {
        name: 'stack',
        displayName: 'Website Stack',
        features: 'Technology Stack',
        path: '#',
        children: [
            { 
                name: 'astro', 
                displayName: 'AstroJS', 
                features: 'Static Site Generator', 
                path: '/astrojs', 

                badge: 'v4.0'
            },
            { 
                name: 'tailwind', 
                displayName: 'TailwindCSS', 
                features: 'Utility-First CSS Framework', 
                path: '/tailwind', 

                badge: 'v3.0'
            },
            { 
                name: 'daisyui', 
                displayName: 'DaisyUI', 
                features: 'Tailwind Component Library', 
                path: '/daisyui', 

                badge: 'v4.0'
            },
            { 
                name: 'styleguide', 
                displayName: 'Styleguide', 
                features: 'Design System & Standards', 
                path: '/styleguide', 

                badge: 'NEW',
                badgeColor: 'secondary',
                isNew: true
            }
        ]
    },
    {
        name: 'frameworks',
        displayName: 'Frameworks',
        features: 'JavaScript Frameworks',
        path: '#',

        children: [
            { 
                name: 'react', 
                displayName: 'React', 
                features: 'UI Library', 
                path: '/react', 

            },
            { 
                name: 'vue', 
                displayName: 'Vue', 
                features: 'Progressive Framework', 
                path: '/vue', 

            },
            { 
                name: 'svelte', 
                displayName: 'Svelte', 
                features: 'Compiler as Framework', 
                path: '/svelte', 

            },
            { 
                name: 'solid', 
                displayName: 'SolidJS', 
                features: 'Reactive UI Library', 
                path: '/solid', 

            },
            { 
                name: 'remix', 
                displayName: 'Remix', 
                features: 'Full Stack Framework', 
                path: '/remix', 

            }
        ]
    },
    {
        name: 'demos',
        displayName: 'Demos',
        features: 'Interactive Examples',
        path: '#',

        children: [
            { 
                name: 'blog', 
                displayName: 'Blog', 
                features: 'Content Management', 
                path: '/blog', 

            },
            { 
                name: 'blockchain', 
                displayName: 'Blockchain Chat', 
                features: 'Web3 Integration', 
                path: '/blockchain-chat', 

                isNew: true
            },
            { 
                name: 'color-picker', 
                displayName: 'Color Picker', 
                features: 'Interactive Tool', 
                path: '/color-picker', 

            },
            { 
                name: 'math', 
                displayName: 'Math Lab', 
                features: 'Calculation Demo', 
                path: '/math-lab', 

            },
            { 
                name: 'live-code', 
                displayName: 'Live Code', 
                features: 'Code Editor', 
                path: '/live-code', 

            }
        ]
    },
    {
        name: 'quality',
        displayName: 'Quality Control',
        features: 'Testing & QA',
        path: '/test-dashboard',

        badge: 'NEW',
        badgeColor: 'success'
    },
    { 
        name: 'ml', 
        displayName: 'Machine Learning', 
        features: 'AI Solutions', 
        path: '/machine-learning', 

        children: [
            {
                name: 'ml-overview',
                displayName: 'Overview',
                features: 'ML Capabilities',
                path: '/machine-learning'
            },
            {
                name: 'ml-chat',
                displayName: 'ML Chat',
                features: 'AI Conversation',
                path: '/machine'
            },
            {
                name: 'blockchain-ai',
                displayName: 'Blockchain AI',
                features: 'Web3 + AI Integration',
                path: '/blockchain-ai',

                isNew: true
            }
        ]
    },
    { 
        name: 'about', 
        displayName: 'About', 
        features: 'About Me', 
        path: '/about', 

    }
];
