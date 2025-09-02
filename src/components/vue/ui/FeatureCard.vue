<template>
  <!-- DaisyUI Card with proper structure -->
  <div class="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
    <!-- Optional image slot at the top -->
    <figure v-if="$slots.image">
      <slot name="image" />
    </figure>
    
    <div class="card-body">
      <!-- Icon and title in card-title for proper DaisyUI layout -->
      <div class="card-title gap-3">
        <!-- Icon Slot with default -->
        <div class="w-10 h-10 mask mask-squircle bg-primary flex items-center justify-center">
          <slot name="icon">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary-content" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </slot>
        </div>
        {{ title }}
        
        <!-- Badge if provided -->
        <div v-if="badge" class="badge badge-secondary">{{ badge }}</div>
      </div>
      
      <!-- Description with proper DaisyUI text styling -->
      <p>{{ description }}</p>
      
      <!-- Interactive content slot -->
      <div v-if="$slots.default" class="mt-4">
        <slot />
      </div>
      
      <!-- Actions slot at the bottom following DaisyUI card pattern -->
      <div v-if="$slots.actions" class="card-actions justify-end mt-4">
        <slot name="actions" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
  description: string
  badge?: string
}

const props = defineProps<Props>()
</script>
