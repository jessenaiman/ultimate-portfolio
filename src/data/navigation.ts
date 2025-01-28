export interface Framework {
    name: string;
    displayName: string;
    features: string;
    path: string;
    color: string;
}

export const frameworks: Framework[] = [
    { name: 'astro', displayName: 'Home', features: 'Astro', path: '/', color: '#FF5D01' },
    { name: 'react', displayName: 'Chat with AI', features: 'React', path: '/react', color: '#61DAFB' },
    { name: 'vuejs', displayName: 'Color Picker', features: 'Vue ', path: '/vue', color: '#4FC08D' },
    { name: 'svelte', displayName: 'Math Lab', features: 'Svelte', path: '/svelte', color: '#FF3E00' },
    { name: 'solidjs', displayName: 'Live Code', features: 'Solid', path: '/solid', color: '#2C4F7C' },
    { name: 'resume', displayName: 'Resume', features: 'FutureStack', path: '/resume', color: '#FF5D01' },
    { name: 'remix', displayName: 'Counter', features: 'Remix', path: '/remix', color: '#FF5D01' }
];
