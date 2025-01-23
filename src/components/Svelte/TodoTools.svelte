<script>
  import { onMount } from 'svelte';
  import { fade, slide } from 'svelte/transition';

  let mounted = false;
  let todos = [];
  let newTodo = '';
  let showCompleted = false;

  $: pendingTodos = todos.filter(todo => !todo.completed).length;
  $: filteredTodos = showCompleted ? todos : todos.filter(todo => !todo.completed);

  // Methods
  function addTodo() {
    if (newTodo.trim()) {
      todos = [...todos, { text: newTodo, completed: false }];
      newTodo = '';
    }
  }

  function toggleTodo(index) {
    todos[index].completed = !todos[index].completed;
    todos = todos;
  }

  function removeTodo(index) {
    todos = todos.filter((_, i) => i !== index);
  }

  onMount(() => {
    mounted = true;
  });
</script>

<div class="py-16 px-4 sm:px-6">
  <div class="max-w-4xl mx-auto">
    {#if mounted}
      <div in:slide={{ duration: 800, delay: 200 }} class="bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-800/50 overflow-hidden shadow-xl">
        <!-- Header -->
        <div class="border-b border-gray-800/50">
          <div class="flex items-center justify-between px-6 py-4">
            <h2 class="text-xl font-semibold text-white">Todo List</h2>
            <div class="flex items-center space-x-4">
              <label class="flex items-center space-x-2 text-sm text-gray-400">
                <input
                  type="checkbox"
                  bind:checked={showCompleted}
                  class="form-checkbox text-blue-500"
                />
                <span>Show Completed</span>
              </label>
              <span class="text-sm text-gray-400">{pendingTodos} pending</span>
            </div>
          </div>
        </div>

        <!-- Content -->
        <div class="p-6">
          <div class="space-y-4">
            <!-- Add Todo -->
            <div class="flex space-x-2">
              <input
                type="text"
                bind:value={newTodo}
                placeholder="Add a new todo..."
                class="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                on:keydown={e => e.key === 'Enter' && addTodo()}
              />
              <button
                on:click={addTodo}
                class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Add
              </button>
            </div>

            <!-- Todo List -->
            <div class="space-y-2">
              {#each filteredTodos as todo, index}
                <div
                  class="flex items-center justify-between p-3 bg-gray-800 rounded-lg"
                  in:fade
                >
                  <div class="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      bind:checked={todo.completed}
                      on:change={() => toggleTodo(index)}
                      class="form-checkbox text-blue-500"
                    />
                    <span class="text-gray-300" class:line-through={todo.completed}>
                      {todo.text}
                    </span>
                  </div>
                  <button
                    on:click={() => removeTodo(index)}
                    class="text-gray-500 hover:text-red-500 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              {/each}
            </div>
          </div>
        </div>
      </div>
    {/if}
  </div>
</div>
