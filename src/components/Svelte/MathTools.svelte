<script>
  import { onMount } from 'svelte';
  import { create, all } from 'mathjs';
  import Chart from 'chart.js/auto';
  import katex from 'katex';
  import 'katex/dist/katex.min.css';
  import { Slider, Checkbox, Label, ToggleGroup } from 'radix-ui';

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
    const canvas = document.getElementById('mathChart');
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        chart = new Chart(ctx, {
          type: 'line',
          data: { labels: [], datasets: [] },
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
      } else {
        console.error('Canvas context not available');
      }
    } else {
      console.error('Canvas element not found');
    }
  });

  onMount(() => {
    console.log('MathTools mounted'); // Debug mounting
  });
</script>
<div class="math-tools-container" style="background-color: #0F0F0F; padding: 20px; border-radius: 8px;">
  <h2>Math Tools</h2>
<div class="py-16 px-4 sm:px-6">
  <div class="max-w-4xl mx-auto">
    {#if mounted}
      <div class="bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-800/50 overflow-hidden shadow-xl">
        <div class="space-y-6 p-6">
          <!-- Equation Preview -->
          <div class="bg-gray-800 p-4 rounded-lg">
            <div class="text-center text-lg text-white">
              <div bind:this={mathPreview}></div>
            </div>
          </div>

          <!-- Predefined Equations -->
          <div class="bg-gray-800 p-4 rounded-lg">
            <Label class="text-sm text-gray-400 mb-2 block">Predefined Equations</Label>
            <ToggleGroup type="single" class="grid grid-cols-2 gap-2">
              {#each predefinedEquations as category}
                <div class="space-y-2">
                  <h3 class="text-lg font-semibold text-white mb-2">{category.category}</h3>
                  {#each category.equations as eq}
                    <ToggleGroupItem value={eq.value} on:click={() => equation = eq.value} class="w-full text-left px-3 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors text-sm text-white">
                      {eq.name}
                    </ToggleGroupItem>
                  {/each}
                </div>
              {/each}
            </ToggleGroup>
          </div>

          <!-- Chart Display -->
          <div class="bg-gray-800 p-6 rounded-lg">
            <div class="w-full aspect-square max-w-2xl mx-auto">
              <canvas id="mathChart"></canvas>
            </div>
          </div>

          <!-- Controls -->
          <div class="bg-gray-800 p-4 rounded-lg space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <Label class="text-xs text-gray-400 mb-1 block">Animation Speed</Label>
                <Slider bind:value={animationSpeed} min="0.1" max="2" step="0.1" />
                <div class="text-xs text-gray-400 text-right">{animationSpeed}x</div>
              </div>
              <div>
                <Label class="text-xs text-gray-400 mb-1 block">Grid Lines</Label>
                <Slider bind:value={gridLines} min="5" max="50" step="5" />
                <div class="text-xs text-gray-400 text-right">{gridLines} lines</div>
              </div>
            </div>

            <div class="space-y-4">
              <div class="flex flex-wrap gap-4">
                <Checkbox bind:checked={showDerivative} />
                <Label class="text-sm text-gray-400">Show Derivative</Label>
                <Checkbox bind:checked={showIntegral} />
                <Label class="text-sm text-gray-400">Show Integral</Label>
                <Checkbox bind:checked={showTangentLine} />
                <Label class="text-sm text-gray-400">Show Tangent</Label>
              </div>

              {#if showTangentLine}
                <div>
                  <Label class="text-xs text-gray-400 mb-1 block">Tangent Point</Label>
                  <Slider bind:value={tangentPoint} min={xRange.min} max={xRange.max} step="0.1" />
                  <div class="text-xs text-gray-400 text-right">x = {tangentPoint}</div>
                </div>
              {/if}
            </div>
          </div>
        </div>
      </div>
    {/if}
  </div>
</div>


  <!-- Add your math tools content here -->
</div>

<style>
  .math-tools-container {
    width: 100%;
    min-height: 400px;
    padding: 2rem;
    background: #0F0F0F;
    margin: 2rem 0;
  }
</style>