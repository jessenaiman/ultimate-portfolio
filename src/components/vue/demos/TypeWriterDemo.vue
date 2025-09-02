<template>
  <div class="typewriter-demo w-full">
    <!-- DaisyUI card with mockup code for typewriter effect -->
    <div class="card w-full bg-base-200 shadow-xl">
      <div class="card-body p-4">
        <h3 class="card-title text-sm">TypeWriter Demo</h3>
        
        <!-- DaisyUI mockup code block -->
        <div class="mockup-code bg-primary text-primary-content">
          <pre><code>{{ displayedText }}<span class="animate-pulse">█</span></code></pre>
        </div>
        
        <!-- DaisyUI indicator showing current phrase -->
        <div class="flex justify-between items-center mt-2">
          <div class="badge badge-sm">{{ currentPhraseIndex + 1 }}/{{ phrases.length }}</div>
          <div class="text-xs opacity-70">Vue.js Features</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

// Vue.js features to display
const phrases = [
  '// Reactive state management',
  '// Single-file components',
  '// Composable functions',
  '// Seamless TypeScript integration'
]

const displayedText = ref('')
const currentPhraseIndex = ref(0)
const currentCharIndex = ref(0)
const isDeleting = ref(false)
let timer: number | null = null

const typeEffect = () => {
  const currentPhrase = phrases[currentPhraseIndex.value]
  
  if (isDeleting.value) {
    displayedText.value = currentPhrase.substring(0, currentCharIndex.value - 1)
    currentCharIndex.value--
    
    if (currentCharIndex.value === 0) {
      isDeleting.value = false
      currentPhraseIndex.value = (currentPhraseIndex.value + 1) % phrases.length
      setTimeout(typeEffect, 500) // Pause before typing next phrase
      return
    }
  } else {
    displayedText.value = currentPhrase.substring(0, currentCharIndex.value + 1)
    currentCharIndex.value++
    
    if (currentCharIndex.value === currentPhrase.length) {
      isDeleting.value = true
      setTimeout(typeEffect, 1500) // Pause before deleting
      return
    }
  }
  
  // Randomize typing speed for natural effect
  const speed = isDeleting.value ? 50 : 100 + Math.random() * 50
  timer = setTimeout(typeEffect, speed) as unknown as number
}

onMounted(() => {
  timer = setTimeout(typeEffect, 500) as unknown as number
})

onUnmounted(() => {
  if (timer) clearTimeout(timer)
})
</script>
