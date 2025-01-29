<script>
  import { onMount } from 'svelte';
  import { create, all } from 'mathjs';
  import Chart from 'chart.js/auto';
  import katex from 'katex';
  import 'katex/dist/katex.min.css';

  // State
  let equation = 'x^2 + 2*x + 1';
  let chart;
  let mathPreview;
  let animationSpeed = 1;
  let xRange = { min: -10, max: 10 };
  let yRange = { min: -10, max: 10 };
  let gridLines = 20;
  let showDerivative = false;
  let showIntegral = false;
  let showTangentLine = false;
  let tangentPoint = 0;
  let mounted = false;
  let activeCategory = '';

  const math = create(all);

  // Predefined Equations
  const predefinedEquations = [
    { category: 'Linear', equations: [
      { name: 'Basic Line', value: '2*x + 1' },
      { name: 'Point-Slope', value: '3*(x - 2) + 4' }
    ]},
    { category: 'Quadratic', equations: [
      { name: 'Basic Parabola', value: 'x^2' },
      { name: 'Shifted Parabola', value: '(x-2)^2 + 1' }
    ]},
    { category: 'Trigonometric', equations: [
      { name: 'Sine', value: 'sin(x)' },
      { name: 'Cosine', value: 'cos(x)' }
    ]},
    { category: 'Calculus', equations: [
      { name: 'Polynomial', value: 'x^3 - 2*x^2 + x' },
      { name: 'Exponential', value: 'e^x' }
    ]}
  ];

  // Plot Equation
  function plotEquation() {
    const canvas = document.getElementById('mathChart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (chart) chart.destroy();

    const expr = math.compile(equation);
    let derivative, integral;

    if (showDerivative) derivative = math.derivative(equation, 'x');

    const step = (xRange.max - xRange.min) / 200;
    const xValues = [];
    const yValues = [];
    const dyValues = [];
    const integralValues = [];

    let accumulator = 0;
    for (let x = xRange.min; x <= xRange.max; x += step) {
      xValues.push(x);
      const y = expr.evaluate({ x });
      yValues.push(y);

      if (showDerivative) dyValues.push(derivative.evaluate({ x }));
      if (showIntegral) {
        accumulator += y * step;
        integralValues.push(accumulator);
      }
    }

    const datasets = [{
      label: 'Function',
      data: yValues,
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 2,
      fill: false,
      tension: 0.4
    }];

    if (showDerivative) {
      datasets.push({
        label: 'Derivative',
        data: dyValues,
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 2,
        fill: false,
        tension: 0.4
      });
    }

    if (showIntegral) {
      datasets.push({
        label: 'Integral',
        data: integralValues,
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 2,
        fill: false,
        tension: 0.4
      });
    }

    if (showTangentLine && derivative) {
      const x0 = tangentPoint;
      const y0 = expr.evaluate({ x: x0 });
      const slope = derivative.evaluate({ x: x0 });
      const tangentLine = xValues.map(x => slope * (x - x0) + y0);

      datasets.push({
        label: 'Tangent Line',
        data: tangentLine,
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 2,
        borderDash: [5, 5],
        fill: false
      });
    }

    chart = new Chart(ctx, {
      type: 'line',
      data: { labels: xValues, datasets },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 1,
        animation: { duration: 1000 * animationSpeed },
        scales: {
          x: {
            type: 'linear',
            position: 'center',
            grid: { color: 'rgba(255, 255, 255, 0.1)' },
            min: xRange.min,
            max: xRange.max,
            title: { display: true, text: 'x', color: 'rgba(255, 255, 255, 0.7)' }
          },
          y: {
            type: 'linear',
            position: 'center',
            grid: { color: 'rgba(255, 255, 255, 0.1)' },
            min: yRange.min,
            max: yRange.max,
            title: { display: true, text: 'y', color: 'rgba(255, 255, 255, 0.7)' }
          }
        },
        plugins: {
          legend: { display: true, position: 'top', labels: { color: 'rgba(255, 255, 255, 0.7)' } },
          zoom: { zoom: { wheel: { enabled: true }, pinch: { enabled: true }, mode: 'xy' }, pan: { enabled: true, mode: 'xy' } }
        }
      }
    });
  }

  // Render KaTeX Preview
  function renderMathPreview() {
    if (mathPreview) {
      try {
        katex.render(equation, mathPreview, { displayMode: true, throwOnError: false });
      } catch (e) {
        console.error('KaTeX rendering error:', e);
      }
    }
  }

  // Reactive Updates
  $: if (equation && mounted) {
    renderMathPreview();
    plotEquation();
  }

  onMount(() => {
    mounted = true;
    if (mathPreview) {
      try {
        katex.render(equation, mathPreview, { displayMode: true, throwOnError: false });
      } catch (e) {
        console.error('KaTeX rendering error:', e);
      }
    }
    plotEquation();
  });
</script>

<div class="card w-full bg-base-200 shadow-xl" data-testid="math-tools">
  <div class="card-body">
    <h2 class="card-title">Math Tools</h2>
    {#if mounted}
      <div class="space-y-6">
        <!-- Equation Preview -->
        <div class="card bg-base-300" data-testid="equation-preview">
          <div class="card-body">
            <div class="text-center text-lg" bind:this={mathPreview} data-testid="math-preview"></div>
          </div>
        </div>

        <!-- Predefined Equations -->
        <div class="card bg-base-300" data-testid="predefined-equations">
          <div class="card-body">
            <h3 class="card-title text-sm opacity-70">Predefined Equations</h3>
            <div class="tabs tabs-boxed">
              {#each predefinedEquations as category}
                <a
                  class="tab {activeCategory === category.category ? 'tab-active' : ''}"
                  on:click={() => activeCategory = category.category}
                  data-testid="category-tab"
                >
                  {category.category}
                </a>
              {/each}
            </div>
            <div class="mt-4">
              {#each predefinedEquations as category}
                {#if activeCategory === category.category}
                  <div class="grid grid-cols-2 gap-2">
                    {#each category.equations as eq}
                      <button
                        class="btn btn-outline btn-sm"
                        on:click={() => equation = eq.value}
                        data-testid="equation-button"
                      >
                        {eq.name}
                      </button>
                    {/each}
                  </div>
                {/if}
              {/each}
            </div>
          </div>
        </div>

        <!-- Chart Display -->
        <div class="card bg-base-300" data-testid="chart-display">
          <div class="card-body">
            <div class="w-full aspect-square max-w-2xl mx-auto">
              <canvas id="mathChart" data-testid="math-chart"></canvas>
            </div>
          </div>
        </div>

        <!-- Controls -->
        <div class="card bg-base-300" data-testid="controls">
          <div class="card-body space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="label">
                  <span class="label-text">Animation Speed</span>
                  <span class="label-text-alt">{animationSpeed}x</span>
                </label>
                <input
                  type="range"
                  min="0.1"
                  max="2"
                  step="0.1"
                  class="range range-primary range-sm"
                  bind:value={animationSpeed}
                  data-testid="animation-speed"
                />
              </div>
              <div>
                <label class="label">
                  <span class="label-text">Grid Lines</span>
                  <span class="label-text-alt">{gridLines} lines</span>
                </label>
                <input
                  type="range"
                  min="5"
                  max="50"
                  step="5"
                  class="range range-primary range-sm"
                  bind:value={gridLines}
                  data-testid="grid-lines"
                />
              </div>
            </div>

            <div class="space-y-4">
              <div class="flex flex-wrap gap-4">
                <label class="label cursor-pointer">
                  <span class="label-text mr-2">Show Derivative</span>
                  <input type="checkbox" class="toggle toggle-primary" bind:checked={showDerivative} data-testid="show-derivative" />
                </label>
                <label class="label cursor-pointer">
                  <span class="label-text mr-2">Show Integral</span>
                  <input type="checkbox" class="toggle toggle-primary" bind:checked={showIntegral} data-testid="show-integral" />
                </label>
                <label class="label cursor-pointer">
                  <span class="label-text mr-2">Show Tangent</span>
                  <input type="checkbox" class="toggle toggle-primary" bind:checked={showTangentLine} data-testid="show-tangent" />
                </label>
              </div>

              {#if showTangentLine}
                <div>
                  <label class="label">
                    <span class="label-text">Tangent Point</span>
                    <span class="label-text-alt">x = {tangentPoint}</span>
                  </label>
                  <input
                    type="range"
                    min={xRange.min}
                    max={xRange.max}
                    step="0.1"
                    class="range range-primary range-sm"
                    bind:value={tangentPoint}
                    data-testid="tangent-point"
                  />
                </div>
              {/if}
            </div>
          </div>
        </div>
      </div>
    {/if}
  </div>
</div>

<style>
  :global(.katex) {
    color: var(--tw-prose-invert);
  }
</style>