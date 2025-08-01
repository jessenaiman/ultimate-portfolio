<script>
  let todos = [
    { id: 1, text: 'Learn Svelte fundamentals', completed: true },
    { id: 2, text: 'Build a cool demo app', completed: true },
    { id: 3, text: 'Integrate it with Astro', completed: false },
    { id: 4, text: 'Add transitions and animations', completed: false },
  ];
  let newTodoText = '';

  function addTodo() {
    if (newTodoText.trim()) {
      todos = [...todos, { id: Date.now(), text: newTodoText, completed: false }];
      newTodoText = '';
    }
  }

  function removeTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
  }

  function clearCompleted() {
    todos = todos.filter(todo => !todo.completed);
  }

  $: remaining = todos.filter(todo => !todo.completed).length;
</script>

<div class="w-full h-full p-4 font-sans text-base-content">
  <div class="flex justify-between items-center mb-4">
    <h1 class="text-2xl font-bold">Svelte Todos</h1>
    {#if remaining > 0}
      <span class="badge badge-secondary">{remaining} remaining</span>
    {:else}
      <span class="badge badge-success">All done! ✨</span>
    {/if}
  </div>

  <form on:submit|preventDefault={addTodo} class="flex gap-2 mb-4">
    <input
      type="text"
      bind:value={newTodoText}
      placeholder="Add a new task..."
      class="input input-bordered w-full"
    />
    <button type="submit" class="btn btn-primary">Add</button>
  </form>

  <ul class="space-y-2 mb-4 h-48 overflow-y-auto pr-2">
    {#each todos as todo (todo.id)}
      <li class="flex items-center justify-between bg-base-200 p-3 rounded-md transition-colors duration-300 hover:bg-base-300">
        <label class="flex items-center cursor-pointer">
          <input type="checkbox" bind:checked={todo.completed} class="checkbox checkbox-primary mr-4" />
          <span class:line-through={todo.completed} class:opacity-50={todo.completed} class="transition-all">
            {todo.text}
          </span>
        </label>
        <button on:click={() => removeTodo(todo.id)} class="btn btn-ghost btn-xs">🗑️</button>
      </li>
    {/each}
  </ul>

  {#if todos.some(t => t.completed)}
    <div class="text-center border-t border-base-300 pt-4">
      <button on:click={clearCompleted} class="btn btn-sm btn-outline btn-warning">Clear Completed</button>
    </div>
  {/if}
</div>
