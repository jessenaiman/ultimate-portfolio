<script>
  import { onMount } from 'svelte';
  import { fade, slide } from 'svelte/transition';
  import { create, all } from 'mathjs';
  import Chart from 'chart.js/auto';

  let equation = 'x^2 + 2*x + 1';
  let chart;

  const math = create(all);

function plotEquation() {
    const expr = math.compile(equation);
    const derivative = math.derivative(equation, 'x').toString();

    const xValues = [];
    const yValues = [];
    const dyValues = [];
    for (let x = -10; x <= 10; x += 0.1) {
      xValues.push(x);
      yValues.push(expr.evaluate({ x }));
      dyValues.push(math.evaluate(derivative, { x }));
    }

    const ctx = document.getElementById('chart').getContext('2d');
    if (chart) {
      chart.destroy();
    }
    chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: xValues,
        datasets: [
          {
            label: 'Equation Plot',
            data: yValues,
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
            fill: true, // Fill the area under the curve
            backgroundColor: 'rgba(75, 192, 192, 0.2)'
          },
          {
            label: 'Derivative Plot',
            data: dyValues,
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 2,
            fill: false
          }
        ]
      },
      options: {
        scales: {
          x: {
            type: 'linear',
            position: 'bottom'
          }
        }
      }
    });
  }

  let mounted = false;
  let activeTab = 'state';
  let count = 0;
  let todos = [];
  let newTodo = '';
  let showCompleted = false;

  // Reactive statements
  $: doubledCount = count * 2;
  $: completedTodos = todos.filter(todo => todo.completed).length;
  $: pendingTodos = todos.filter(todo => !todo.completed).length;
  $: filteredTodos = showCompleted ? todos : todos.filter(todo => !todo.completed);

  // Methods
  function addTodo() {
    if (newTodo.trim()) {
      todos = [...todos, { text: newTodo, completed: false, id: Date.now() }];
      newTodo = '';
    }
  }

  function toggleTodo(id) {
    todos = todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
  }

  function removeTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
  }

  onMount(() => {
    mounted = true;
    plotEquation();
  });
</script>

<section id="devtools" class="py-16 px-4 sm:px-6">
  <div class="max-w-4xl mx-auto">
    {#if mounted}
      <div in:slide={{ duration: 800, delay: 200 }} class="bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-800/50 overflow-hidden shadow-xl">
        <!-- Header -->
        <div class="border-b border-gray-800/50 p-4">
          <h2 class="text-2xl font-semibold text-white">Svelte Developer Tools</h2>
          <p class="text-gray-400 mt-1">Interactive examples of Svelte's reactive features</p>
        </div>

        <!-- Tabs -->
        <div class="flex border-b border-gray-800/50">
          <button
            class={`px-4 py-3 text-sm font-medium transition-colors duration-200 ${
              activeTab === 'state'
                ? 'text-orange-400 border-b-2 border-orange-400'
                : 'text-gray-400 hover:text-white'
            }`}
            on:click={() => activeTab = 'state'}
          >
            State Management
          </button>
          <button
            class={`px-4 py-3 text-sm font-medium transition-colors duration-200 ${
              activeTab === 'todo'
                ? 'text-orange-400 border-b-2 border-orange-400'
                : 'text-gray-400 hover:text-white'
            }`}
            on:click={() => activeTab = 'todo'}
          >
            Todo App
          </button>
          <button
            class={`px-4 py-3 text-sm font-medium transition-colors duration-200 ${
              activeTab === 'chart'
                ? 'text-orange-400 border-b-2 border-orange-400'
                : 'text-gray-400 hover:text-white'
            }`}
            on:click={() => activeTab = 'chart'}
          >
            Math Chart
          </button>
        </div>

        <!-- Content -->
        <div class="p-6">
          {#if activeTab === 'state'}
            <div in:fade class="space-y-6">
              <div class="space-y-4">
                <h3 class="text-lg font-medium text-white">Reactive Counter</h3>
                <div class="flex items-center gap-4">
                  <button
                    on:click={() => count--}
                    class="px-3 py-1 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-colors"
                  >
                    -
                  </button>
                  <span class="text-xl text-white font-mono">{count}</span>
                  <button
                    on:click={() => count++}
                    class="px-3 py-1 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-colors"
                  >
                    +
                  </button>
                </div>
                <div class="text-gray-400">
                  Doubled value (reactive): <span class="text-orange-400">{doubledCount}</span>
                </div>
              </div>

              <div class="space-y-2">
                <h3 class="text-lg font-medium text-white">How It Works</h3>
                <pre class="bg-gray-800/50 p-4 rounded-lg text-sm font-mono text-gray-300 overflow-x-auto">
let count = 0;
$: doubledCount = count * 2;

// No need for useState or useEffect!
// Svelte handles reactivity automatically</pre>
              </div>
            </div>
          {:else if activeTab === 'todo'}
            <div in:fade class="space-y-6">
              <div class="flex gap-2">
                <input
                  type="text"
                  bind:value={newTodo}
                  placeholder="Add a new todo..."
                  class="flex-1 px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50"
                  on:keydown={(e) => e.key === 'Enter' && addTodo()}
                />
                <button
                  on:click={addTodo}
                  class="px-4 py-2 rounded-lg bg-orange-500/20 text-orange-400 hover:bg-orange-500/30 transition-colors"
                >
                  Add
                </button>
              </div>

              <div class="flex items-center justify-between text-sm text-gray-400">
                <div class="space-x-2">
                  <span>Completed: {completedTodos}</span>
                  <span>Pending: {pendingTodos}</span>
                </div>
                <label class="flex items-center gap-2">
                  <input
                    type="checkbox"
                    bind:checked={showCompleted}
                    class="rounded border-gray-700 bg-gray-800/50 text-orange-500 focus:ring-orange-500/50"
                  />
                  Show completed
                </label>
              </div>

              <div class="space-y-2">
                {#each filteredTodos as todo (todo.id)}
                  <div
                    in:slide|local={{ duration: 200 }}
                    class="flex items-center gap-3 p-3 rounded-lg bg-gray-800/30 border border-gray-700/50"
                  >
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      on:change={() => toggleTodo(todo.id)}
                      class="rounded border-gray-700 bg-gray-800/50 text-orange-500 focus:ring-orange-500/50"
                    />
                    <span class={todo.completed ? 'line-through text-gray-500' : 'text-white'}>
                      {todo.text}
                    </span>
                    <button
                      on:click={() => removeTodo(todo.id)}
                      class="ml-auto text-gray-500 hover:text-red-400 transition-colors"
                    >
                      ×
                    </button>
                  </div>
                {/each}
              </div>
            </div>
          {:else if activeTab === 'chart'}
            <div>
              <h1>Equation Plotter</h1>
              <input type="text" bind:value={equation} placeholder="Enter equation, e.g., x^2 + 2*x + 1" />
              <button on:click={plotEquation}>Plot</button>
              <canvas id="chart" width="400" height="400"></canvas>
            </div>
          {/if}
        </div>
      </div>
    {/if}
  </div>
</section>

<style>
  input[type="checkbox"] {
    @apply w-4 h-4 cursor-pointer;
  }
</style>
