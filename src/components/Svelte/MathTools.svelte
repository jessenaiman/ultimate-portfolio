<script>
  import { onMount } from 'svelte';
  import { fade, slide } from 'svelte/transition';
  import { create, all } from 'mathjs';
  import Chart from 'chart.js/auto';
  import katex from 'katex';

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

  let calculatorDisplay = '';
  let lastAnswer = null;

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

  const math = create(all);

  function selectPredefinedEquation(eq) {
    equation = eq.value;
  }

  function plotEquation() {
    const canvas = document.getElementById('mathChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (chart) {
      chart.destroy();
    }

    const expr = math.compile(equation);
    let derivative, integral;
    
    if (showDerivative) {
      derivative = math.derivative(equation, 'x');
    }
    
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
      
      if (showDerivative) {
        dyValues.push(derivative.evaluate({ x }));
      }
      
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
      data: {
        labels: xValues,
        datasets: datasets
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 1,
        animation: {
          duration: 1000 * animationSpeed
        },
        scales: {
          x: {
            type: 'linear',
            position: 'center',
            grid: {
              color: 'rgba(255, 255, 255, 0.1)',
              display: true,
              drawBorder: true,
              drawOnChartArea: true,
              drawTicks: true,
              tickColor: 'rgba(255, 255, 255, 0.3)',
              count: gridLines
            },
            min: xRange.min,
            max: xRange.max,
            title: {
              display: true,
              text: 'x',
              color: 'rgba(255, 255, 255, 0.7)'
            }
          },
          y: {
            type: 'linear',
            position: 'center',
            grid: {
              color: 'rgba(255, 255, 255, 0.1)',
              display: true,
              drawBorder: true,
              drawOnChartArea: true,
              drawTicks: true,
              tickColor: 'rgba(255, 255, 255, 0.3)',
              count: gridLines
            },
            min: yRange.min,
            max: yRange.max,
            title: {
              display: true,
              text: 'y',
              color: 'rgba(255, 255, 255, 0.7)'
            }
          }
        },
        plugins: {
          legend: {
            display: true,
            position: 'top',
            labels: {
              color: 'rgba(255, 255, 255, 0.7)'
            }
          }
        }
      }
    });
  }

  function renderMathPreview() {
    if (mathPreview) {
      try {
        katex.render(equation, mathPreview, {
          displayMode: true,
          throwOnError: false
        });
      } catch (e) {
        console.error('KaTeX rendering error:', e);
      }
    }
  }

  function handleInput(value) {
    switch(value) {
      case '=':
        try {
          const result = math.evaluate(calculatorDisplay);
          lastAnswer = result;
          calculatorDisplay = result.toString();
        } catch (error) {
          calculatorDisplay = 'Error';
        }
        break;
      case 'ans':
        calculatorDisplay += lastAnswer !== null ? lastAnswer : '';
        break;
      case '123':
      case 'f(x)':
      case 'ABC':
      case '#':
        // Toggle between different input modes (can be implemented later)
        break;
      case 'x²':
        calculatorDisplay += '^2';
        break;
      case '√':
        calculatorDisplay += 'sqrt(';
        break;
      case '|x|':
        calculatorDisplay += 'abs(';
        break;
      case '×':
        calculatorDisplay += '*';
        break;
      case 'π':
        calculatorDisplay += 'pi';
        break;
      default:
        calculatorDisplay += value;
    }
  }

  $: if (equation && mounted) {
    renderMathPreview();
    plotEquation();
  }

  onMount(() => {
    mounted = true;
    renderMathPreview();
    setTimeout(() => {
      plotEquation();
    }, 100); // Small delay to ensure canvas is ready
  });
</script>

<div class="py-16 px-4 sm:px-6">
  <div class="max-w-4xl mx-auto">
    {#if mounted}
      <div in:slide={{ duration: 800, delay: 200 }} class="bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-800/50 overflow-hidden shadow-xl">
        <div class="space-y-6 max-w-4xl mx-auto p-6">
          <!-- Calculator Interface -->
          <div class="calculator-container bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-800/50 overflow-hidden shadow-xl p-4 mb-6">
            <div class="display bg-gray-800 p-4 rounded-lg mb-4">
              <input type="text" bind:value={calculatorDisplay} class="w-full bg-transparent text-right text-2xl text-white" readonly />
            </div>
            
            <div class="grid grid-cols-4 gap-2">
              <!-- Special Functions Row -->
              <button class="calc-btn" on:click={() => handleInput('123')}>123</button>
              <button class="calc-btn" on:click={() => handleInput('f(x)')}>f(x)</button>
              <button class="calc-btn" on:click={() => handleInput('ABC')}>ABC</button>
              <button class="calc-btn" on:click={() => handleInput('#')}>#{'\u266F'}</button>

              <!-- Variables Row -->
              <button class="calc-btn" on:click={() => handleInput('x')}>x</button>
              <button class="calc-btn" on:click={() => handleInput('y')}>y</button>
              <button class="calc-btn" on:click={() => handleInput('π')}>π</button>
              <button class="calc-btn" on:click={() => handleInput('e')}>e</button>

              <!-- Function Row -->
              <button class="calc-btn" on:click={() => handleInput('x²')}>x²</button>
              <button class="calc-btn" on:click={() => handleInput('√')}>√</button>
              <button class="calc-btn" on:click={() => handleInput('[]')}>[&nbsp;]</button>
              <button class="calc-btn" on:click={() => handleInput('|x|')}>|x|</button>

              <!-- Numbers and Operations -->
              <button class="calc-btn" on:click={() => handleInput('7')}>7</button>
              <button class="calc-btn" on:click={() => handleInput('8')}>8</button>
              <button class="calc-btn" on:click={() => handleInput('9')}>9</button>
              <button class="calc-btn" on:click={() => handleInput('×')}>×</button>

              <button class="calc-btn" on:click={() => handleInput('4')}>4</button>
              <button class="calc-btn" on:click={() => handleInput('5')}>5</button>
              <button class="calc-btn" on:click={() => handleInput('6')}>6</button>
              <button class="calc-btn" on:click={() => handleInput('+')}>+</button>

              <button class="calc-btn" on:click={() => handleInput('1')}>1</button>
              <button class="calc-btn" on:click={() => handleInput('2')}>2</button>
              <button class="calc-btn" on:click={() => handleInput('3')}>3</button>
              <button class="calc-btn" on:click={() => handleInput('-')}>-</button>

              <button class="calc-btn" on:click={() => handleInput('ans')}>ans</button>
              <button class="calc-btn" on:click={() => handleInput('0')}>0</button>
              <button class="calc-btn" on:click={() => handleInput('.')}>.</button>
              <button class="calc-btn" on:click={() => handleInput('=')}>=</button>
            </div>
          </div>

          <!-- Top Controls -->
          <div class="bg-gray-800 p-4 rounded-lg space-y-4">
            <div class="flex flex-col space-y-2">
              <label class="text-sm text-gray-400">Equation Input</label>
              <textarea
                bind:value={equation}
                class="w-full h-24 px-4 py-2 text-sm bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your mathematical equation (LaTeX format)"
              ></textarea>
            </div>
            
            <div class="bg-gray-800 rounded-lg">
              <label class="text-sm text-gray-400 mb-2 block">Preview</label>
              <div bind:this={mathPreview} class="katex-preview text-white min-h-[50px]"></div>
            </div>

            <!-- Range Controls -->
            <div class="grid grid-cols-2 gap-4">
              <div class="space-y-2">
                <label class="text-xs text-gray-400">X Range</label>
                <div class="flex gap-2">
                  <input
                    type="number"
                    bind:value={xRange.min}
                    class="w-full px-2 py-1 text-sm bg-gray-700 rounded"
                    step="1"
                  />
                  <input
                    type="number"
                    bind:value={xRange.max}
                    class="w-full px-2 py-1 text-sm bg-gray-700 rounded"
                    step="1"
                  />
                </div>
              </div>
              <div class="space-y-2">
                <label class="text-xs text-gray-400">Y Range</label>
                <div class="flex gap-2">
                  <input
                    type="number"
                    bind:value={yRange.min}
                    class="w-full px-2 py-1 text-sm bg-gray-700 rounded"
                    step="1"
                  />
                  <input
                    type="number"
                    bind:value={yRange.max}
                    class="w-full px-2 py-1 text-sm bg-gray-700 rounded"
                    step="1"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Graph Visualization -->
          <div class="bg-gray-800 p-6 rounded-lg">
            <div class="w-full aspect-square max-w-2xl mx-auto">
              <canvas id="mathChart"></canvas>
            </div>
          </div>

          <!-- Bottom Controls -->
          <div class="bg-gray-800 p-4 rounded-lg space-y-4">
            <!-- Animation and Grid Controls -->
            <div class="grid grid-cols-2 gap-4">
              <div class="space-y-2">
                <label class="text-xs text-gray-400">Animation Speed</label>
                <input
                  type="range"
                  bind:value={animationSpeed}
                  min="0.1"
                  max="2"
                  step="0.1"
                  class="w-full"
                />
                <div class="text-xs text-gray-400 text-right">{animationSpeed}x</div>
              </div>

              <div class="space-y-2">
                <label class="text-xs text-gray-400">Grid Lines</label>
                <input
                  type="range"
                  bind:value={gridLines}
                  min="5"
                  max="50"
                  step="5"
                  class="w-full"
                />
                <div class="text-xs text-gray-400 text-right">{gridLines} lines</div>
              </div>
            </div>

            <!-- Calculus Controls -->
            <div class="space-y-4">
              <div class="flex flex-wrap gap-4">
                <label class="flex items-center space-x-2">
                  <input type="checkbox" bind:checked={showDerivative} class="form-checkbox" />
                  <span class="text-sm text-gray-400">Show Derivative</span>
                </label>
                <label class="flex items-center space-x-2">
                  <input type="checkbox" bind:checked={showIntegral} class="form-checkbox" />
                  <span class="text-sm text-gray-400">Show Integral</span>
                </label>
                <label class="flex items-center space-x-2">
                  <input type="checkbox" bind:checked={showTangentLine} class="form-checkbox" />
                  <span class="text-sm text-gray-400">Show Tangent</span>
                </label>
              </div>

              {#if showTangentLine}
                <div class="space-y-2">
                  <label class="text-xs text-gray-400">Tangent Point</label>
                  <input
                    type="range"
                    bind:value={tangentPoint}
                    min={xRange.min}
                    max={xRange.max}
                    step="0.1"
                    class="w-full"
                  />
                  <div class="text-xs text-gray-400 text-right">x = {tangentPoint}</div>
                </div>
              {/if}
            </div>

            <!-- Example Equations -->
            <div class="space-y-4">
              {#each predefinedEquations as category}
                <div class="space-y-2">
                  <label class="text-sm text-gray-400">{category.category}</label>
                  <div class="flex flex-wrap gap-2">
                    {#each category.equations as eq}
                      <button
                        on:click={() => selectPredefinedEquation(eq)}
                        class="px-3 py-1 text-xs bg-gray-800 hover:bg-gray-700 rounded-full text-gray-300 transition-colors duration-200"
                      >
                        {eq.name}
                      </button>
                    {/each}
                  </div>
                </div>
              {/each}
            </div>
          </div>
        </div>
      </div>
    {/if}
  </div>
</div>

<style>
  .calculator-container {
    max-width: 400px;
    margin: 0 auto;
  }

  .calc-btn {
    @apply bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors;
    min-height: 2.5rem;
  }

  .display input {
    font-family: monospace;
  }
</style>
