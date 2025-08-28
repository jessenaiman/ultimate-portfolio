<template>
    <div class="theme-switcher-demo flex flex-col items-center gap-4">
      <div class="dropdown dropdown-end">
        <div tabindex="0" role="button" class="btn m-1">
          Theme
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
        </div>
        <ul tabindex="0" class="dropdown-content z-1 p-2 shadow-2xl bg-base-300 rounded-box w-52">
          <li v-for="theme in themes" :key="theme.value">
            <input 
              type="radio" 
              name="theme-dropdown" 
              class="theme-controller btn btn-sm btn-block btn-ghost justify-start"
              :aria-label="theme.name"
              :value="theme.value"
              v-model="currentTheme"
            />
          </li>
        </ul>
      </div>
  
      <div class="badge badge-outline">{{ currentThemeName }}</div>
      
      <div class="card w-full max-w-sm bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title">Theme Preview</h2>
          <div class="flex flex-wrap gap-2">
            <span class="badge badge-primary">primary</span>
            <span class="badge badge-secondary">secondary</span>
            <span class="badge badge-accent">accent</span>
            <span class="badge badge-neutral">neutral</span>
          </div>
          <div class="card-actions justify-end mt-4">
            <button class="btn btn-primary btn-sm">Button</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, onMounted, watch } from 'vue'
  
  const themes = [
    { value: 'light', name: '☀️ Light', },
    { value: 'dark', name: '🌙 Dark' },
    { value: 'cupcake', name: '🧁 Cupcake' },
    { value: 'synthwave', name: '🌆 Synthwave' },
    { value: 'retro', name: '📺 Retro' },
    { value: 'cyberpunk', name: '🤖 Cyberpunk' }
  ]
  
  // A ref to hold the current theme value, which is bound to the radio inputs.
  const currentTheme = ref('light')
  
  // Computed property to find the full name of the current theme for display.
  const currentThemeName = computed(() => {
    return themes.find(t => t.value === currentTheme.value)?.name.split(' ')[1] || 'Light'
  })
  
  // Watch for changes to the currentTheme and persist the new value to localStorage.
  // The theme-controller handles setting the data-theme attribute on the <html> tag.
  watch(currentTheme, (newTheme) => {
    localStorage.setItem('daisyui-theme', newTheme)
  })
  
  // On component mount, retrieve the saved theme from localStorage or use a default.
  onMounted(() => {
    const savedTheme = localStorage.getItem('daisyui-theme')
    if (savedTheme && themes.some(t => t.value === savedTheme)) {
      currentTheme.value = savedTheme
    }
  })
  </script>