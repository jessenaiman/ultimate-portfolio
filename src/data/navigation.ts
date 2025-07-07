export interface MenuItem {
    name: string;
    displayName: string;
    features: string;
    path: string;
    color: string;
    children?: MenuItem[];
}

export const navigation: MenuItem[] = [
    { 
        name: 'home', 
        displayName: 'Home', 
        features: 'Astro', 
        path: '/', 
        color: '#FF5D01' 
    },
    { 
        name: 'about', 
        displayName: 'About', 
        features: 'About Me', 
        path: '/about', 
        color: '#4F46E5' 
    },
    { 
        name: 'resume', 
        displayName: 'Resume', 
        features: 'Experience', 
        path: '/resume', 
        color: '#4F46E5' 
    },
    { 
        name: 'portfolio', 
        displayName: 'Portfolio', 
        features: 'My Work', 
        path: '/blog',  // Keeping the existing blog path for now
        color: '#10B981' 
    },
    {
        name: 'frameworks',
        displayName: 'Frameworks',
        features: 'Showcase',
        path: '#',
        color: '#8B5CF6',
        children: [
            { 
                name: 'astro', 
                displayName: 'AstroJS', 
                features: 'Static Site', 
                path: '/astrojs', 
                color: '#8B5CF6' 
            },
            { 
                name: 'tailwind', 
                displayName: 'TailwindCSS', 
                features: 'Styling', 
                path: '/tailwind', 
                color: '#38BDF8' 
            },
            { 
                name: 'daisyui', 
                displayName: 'DaisyUI', 
                features: 'Components', 
                path: '/daisyui', 
                color: '#7C3AED' 
            }
        ]
    },
    {
        name: 'demos',
        displayName: 'Demos',
        features: 'Interactive',
        path: '#',
        color: '#4FC08D',
        children: [
            { 
                name: 'blockchain', 
                displayName: 'Blockchain Chat', 
                features: 'React', 
                path: '/react', 
                color: '#61DAFB' 
            },
            { 
                name: 'color-picker', 
                displayName: 'Color Picker', 
                features: 'Vue', 
                path: '/vue', 
                color: '#4FC08D' 
            },
            { 
                name: 'math', 
                displayName: 'Math Lab', 
                features: 'Svelte', 
                path: '/svelte', 
                color: '#FF3E00' 
            },
            { 
                name: 'live-code', 
                displayName: 'Live Code', 
                features: 'Solid', 
                path: '/solid', 
                color: '#2C4F7C' 
            },
            { 
                name: 'counter', 
                displayName: 'Counter', 
                features: 'Remix', 
                path: '/remix', 
                color: '#FF5D01' 
            }
        ]
    },
    { 
        name: 'ml', 
        displayName: 'Machine Learning', 
        features: 'TensorFlow', 
        path: '/machine', 
        color: '#EC4899' 
    }
];
