export interface Framework {
    name: string;
    displayName: string;
    path: string;
    color: string;
}

export const frameworks: Framework[] = [
    { name: 'astro', displayName: 'Home: Astro', path: '/', color: '#FF5D01' },
    { name: 'react', displayName: 'Chat with AI: React', path: '/react', color: '#61DAFB' },
    { name: 'vuejs', displayName: 'Color Picker:Vue ', path: '/vue', color: '#4FC08D' },
    { name: 'svelte', displayName: 'Math Lab:Svelte', path: '/svelte', color: '#FF3E00' },
    { name: 'solidjs', displayName: 'Live Code: Solid', path: '/solid', color: '#2C4F7C' },
    { name: 'resume', displayName: 'Resume: Hire Me', path: '/resume', color: '#FF5D01' },
    { name: 'remix', displayName: 'Remix Counter', path: '/remix', color: '#FF5D01' }
];
