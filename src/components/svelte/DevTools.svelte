<script>
  // import { Chart } from 'svelte-echarts'; // Temporarily disabled due to build issues
  import { init, use } from 'echarts/core';
  import { LineChart, BarChart, PieChart } from 'echarts/charts';
  import { TooltipComponent, LegendComponent, GridComponent, TitleComponent } from 'echarts/components';
  import { CanvasRenderer } from 'echarts/renderers';
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';

  use([TooltipComponent, LegendComponent, GridComponent, LineChart, BarChart, PieChart, CanvasRenderer, TitleComponent]);

  let mounted = false;

  let projectData = [
    {
      title: "Project Completion Rate",
      options: {
        tooltip: { trigger: 'axis' },
        legend: { data: ['Completion %'], textStyle: { color: '#9ca3af' } },
        xAxis: { type: 'category', data: ['Q1', 'Q2', 'Q3', 'Q4'], axisLabel: { color: '#9ca3af' } },
        yAxis: { type: 'value', axisLabel: { color: '#9ca3af' }, max: 100 },
        series: [{ name: 'Completion %', data: [85, 92, 78, 95], type: 'line', smooth: true }]
      },
      chartType: 'line',
    },
    {
      title: "Lines of Code by Language",
      options: {
        tooltip: { trigger: 'item' },
        legend: { top: '5%', left: 'center', textStyle: { color: '#9ca3af' } },
        series: [
          {
            name: 'Lines of Code',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: { borderRadius: 10, borderColor: 'hsl(var(--b1))', borderWidth: 2 },
            label: { show: false, position: 'center' },
            emphasis: { label: { show: true, fontSize: '20', fontWeight: 'bold' } },
            labelLine: { show: false },
            data: [
              { value: 12000, name: 'TypeScript' },
              { value: 8500, name: 'Svelte' },
              { value: 6000, name: 'Astro' },
              { value: 4500, name: 'CSS' }
            ]
          }
        ]
      }
    },
    {
      title: "Bug Resolution Time (Hours)",
      options: {
        tooltip: { trigger: 'axis' },
        legend: { data: ['Time (h)'], textStyle: { color: '#9ca3af' } },
        xAxis: { type: 'category', data: ['Jan', 'Feb', 'Mar', 'Apr'], axisLabel: { color: '#9ca3af' } },
        yAxis: { type: 'value', axisLabel: { color: '#9ca3af' } },
        series: [{ name: 'Time (h)', data: [12, 8, 15, 7], type: 'bar' }]
      },
      sortOrder: 'asc',
    }
  ];

  function toggleChartType(index) {
    const currentType = projectData[index].chartType;
    projectData[index].chartType = currentType === 'line' ? 'bar' : 'line';
    projectData[index].options.series[0].type = projectData[index].chartType;
    projectData = [...projectData]; // Trigger reactivity
  }

  function sortBugData(index) {
    const currentOrder = projectData[index].sortOrder;
    const newOrder = currentOrder === 'asc' ? 'desc' : 'asc';
    projectData[index].sortOrder = newOrder;

    const seriesData = projectData[index].options.series[0].data;
    const axisData = projectData[index].options.xAxis.data;
    
    const zipped = axisData.map((item, i) => [item, seriesData[i]]);

    zipped.sort((a, b) => newOrder === 'asc' ? a[1] - b[1] : b[1] - a[1]);

    projectData[index].options.xAxis.data = zipped.map(item => item[0]);
    projectData[index].options.series[0].data = zipped.map(item => item[1]);
    projectData = [...projectData]; // Trigger reactivity
  }

  function randomizeData(index) {
    const chart = projectData[index];
    if (chart.options.series[0].type === 'line' || chart.options.series[0].type === 'bar') {
      const newData = chart.options.series[0].data.map(() => Math.round(Math.random() * 100));
      chart.options.series[0].data = newData;
    } else if (chart.options.series[0].type === 'pie') {
      const newData = chart.options.series[0].data.map(item => ({
        ...item,
        value: Math.round(Math.random() * 10000) + 2000
      }));
      chart.options.series[0].data = newData;
    }
    projectData = [...projectData]; // Trigger reactivity
  }

  onMount(() => {
    mounted = true;
  });
</script>

<div class="w-full h-full p-4 bg-base-200 rounded-lg shadow-inner">
  {#if mounted}
    <div in:fade={{ duration: 500 }} class="carousel w-full h-full rounded-box">
      {#each projectData as chart, i}
        <div id={`slide${i + 1}`} class="carousel-item relative w-full flex flex-col p-4">
          <h3 class="text-lg font-semibold text-center mb-2">{chart.title}</h3>
          <div class="flex-grow h-64">
            <Chart {init} options={chart.options} />
          </div>
          <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href={`#slide${i === 0 ? projectData.length : i}`} class="btn btn-circle btn-sm">❮</a> 
            <a href={`#slide${i === projectData.length - 1 ? 1 : i + 2}`} class="btn btn-circle btn-sm">❯</a>
          </div>
          <div class="flex justify-center gap-2 pt-4">
            <button class="btn btn-xs btn-outline" on:click={() => randomizeData(i)}>
              Randomize Data
            </button>
            {#if i === 0}
              <button class="btn btn-xs btn-outline" on:click={() => toggleChartType(i)}>
                Switch to {chart.chartType === 'line' ? 'Bar' : 'Line'} Chart
              </button>
            {/if}
            {#if i === 2}
               <button class="btn btn-xs btn-outline" on:click={() => sortBugData(i)}>
                Sort {chart.sortOrder === 'asc' ? 'Descending' : 'Ascending'}
              </button>
            {/if}
          </div>
        </div> 
      {/each}
    </div>
  {/if}
</div>
