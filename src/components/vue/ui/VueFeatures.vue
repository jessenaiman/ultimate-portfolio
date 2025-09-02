<template>
  <section class="py-12">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold text-center mb-8">{{ sectionTitle }}</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <FeatureCard 
          v-for="(feature, index) in features" 
          :key="index"
          :title="feature.title"
          :description="feature.description"
        >
          <template #icon>
            <div class="w-16 h-16 mask mask-squircle bg-primary flex items-center justify-center">
              <component :is="feature.icon" class="w-8 h-8 text-primary-content" />
            </div>
          </template>
          
          <component :is="feature.demo" v-if="feature.demo" />
        </FeatureCard>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { defineComponent, h } from 'vue'
import FeatureCard from './FeatureCard.vue'
import TypeWriterDemo from '../demos/TypeWriterDemo.vue'
import ThemeSwitcherDemo from '../demos/ThemeSwitcherDemo.vue'
import CounterDemo from '../demos/CounterDemo.vue'

// Simple icon components using render functions
const CodeIcon = defineComponent({
  render() {
    return h('svg', { 
      xmlns: 'http://www.w3.org/2000/svg', 
      fill: 'none', 
      viewBox: '0 0 24 24', 
      stroke: 'currentColor', 
      class: 'w-full h-full' 
    }, [
      h('path', { 
        'stroke-linecap': 'round', 
        'stroke-linejoin': 'round', 
        'stroke-width': '2', 
        d: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4' 
      })
    ])
  }
})

const PuzzleIcon = defineComponent({
  render() {
    return h('svg', { 
      xmlns: 'http://www.w3.org/2000/svg', 
      fill: 'none', 
      viewBox: '0 0 24 24', 
      stroke: 'currentColor', 
      class: 'w-full h-full' 
    }, [
      h('path', { 
        'stroke-linecap': 'round', 
        'stroke-linejoin': 'round', 
        'stroke-width': '2', 
        d: 'M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z' 
      })
    ])
  }
})

const SparklesIcon = defineComponent({
  render() {
    return h('svg', { 
      xmlns: 'http://www.w3.org/2000/svg', 
      fill: 'none', 
      viewBox: '0 0 24 24', 
      stroke: 'currentColor', 
      class: 'w-full h-full' 
    }, [
      h('path', { 
        'stroke-linecap': 'round', 
        'stroke-linejoin': 'round', 
        'stroke-width': '2', 
        d: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z' 
      })
    ])
  }
})

interface Props {
  sectionTitle?: string
}

const props = withDefaults(defineProps<Props>(), {
  sectionTitle: 'Key Features'
})

// Feature definitions with demos
const features = [
  {
    title: 'Reactive State Management',
    description: 'Vue\'s reactivity system automatically tracks dependencies and efficiently updates the DOM when data changes.',
    icon: CodeIcon,
    demo: CounterDemo
  },
  {
    title: 'Component-Based Architecture',
    description: 'Build encapsulated, reusable components that combine HTML, CSS, and JavaScript in a single file.',
    icon: PuzzleIcon,
    demo: TypeWriterDemo
  },
  {
    title: 'Progressive Framework',
    description: 'Start with just a script tag and gradually adopt more features as your needs evolve.',
    icon: SparklesIcon,
    demo: ThemeSwitcherDemo
  }
]
</script>
