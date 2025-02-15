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
        name: 'blockchain', 
        displayName: 'Blockchain Chat', 
        features: 'React', 
        path: '/react', 
        color: '#61DAFB' 
    },
    { 
        name: 'ml', 
        displayName: 'Machine Learning', 
        features: 'TensorFlow', 
        path: '/machine', 
        color: '#FF5D01' 
    },
    {
        name: 'tools',
        displayName: 'Tools',
        features: 'Various',
        path: '#',
        color: '#4FC08D',
        children: [
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
        name: 'resume', 
        displayName: 'Resume', 
        features: 'FutureStack', 
        path: '/resume', 
        color: '#FF5D01' 
    },
    { 
        name: 'blog', 
        displayName: 'Blog', 
        features: 'FutureStack', 
        path: '/blog', 
        color: '#FF5D01' 
    },
];
