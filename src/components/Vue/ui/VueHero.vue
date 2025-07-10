<template>
  <div class="hero min-h-[70vh] bg-base-200">
    <div class="hero-content text-center">
      <div class="max-w-md">
        <h1 class="text-5xl font-bold">{{ headline }}</h1>
        <p class="py-6">{{ subheading }}</p>
        <slot name="actions">
          <button class="btn btn-primary">Get Started</button>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  headline?: string
  subheading?: string
}

const props = withDefaults(defineProps<Props>(), {
  headline: 'Vue.js',
  subheading: 'The Progressive JavaScript Framework for building modern web interfaces'
})
</script>
