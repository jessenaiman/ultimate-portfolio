<template>
  <div class="counter-demo w-full">
    <!-- DaisyUI stat component for displaying counter -->
    <div class="stats shadow w-full bg-base-200">
      <div class="stat">
        <div class="stat-title">Counter Demo</div>
        <div class="stat-value text-primary">{{ count }}</div>
        <div class="stat-desc">Try the buttons below</div>
        <div class="stat-actions flex gap-2 mt-2">
          <button class="btn btn-sm btn-primary" @click="increment">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
            </svg>
            Increment
          </button>
          <button class="btn btn-sm btn-outline" @click="decrement">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
            </svg>
            Decrement
          </button>
        </div>
      </div>
    </div>
    
    <!-- DaisyUI progress bar showing count visually -->
    <progress 
      class="progress progress-primary w-full mt-4" 
      :value="Math.abs(count)" 
      :max="10"
    ></progress>
    
    <!-- DaisyUI badge showing positive/negative status -->
    <div class="flex justify-center mt-2">
      <div 
        class="badge" 
        :class="{
          'badge-success': count > 0,
          'badge-error': count < 0,
          'badge-neutral': count === 0
        }"
      >
        {{ count > 0 ? 'Positive' : count < 0 ? 'Negative' : 'Zero' }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)

function increment() {
  count.value++
}

function decrement() {
  count.value--
}
</script>
