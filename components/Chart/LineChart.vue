<template>
    <div class="chart-1">
        <canvas ref="chart" id="lineChart"></canvas>
    </div>
  </template>
  
  <script>
  import Chart from 'chart.js';
  
  export default {
    mounted() {
      this.renderChart();
    },
    methods: {
      renderChart() {
        var ctxL = this.$refs.chart.getContext('2d');
        var myLineChart = new Chart(ctxL, {
          type: 'line',
          data: {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [{
              label: "My First dataset",
              data: [65, 59, 80, 81, 56, 55, 40],
              backgroundColor: ['rgba(105, 0, 132, .2)'],
              borderColor: ['rgba(200, 99, 132, .7)'],
              borderWidth: 2
            },
            {
              label: "My Second dataset",
              data: [28, 48, 40, 19, 86, 27, 90],
              backgroundColor: ['rgba(0, 137, 132, .2)'],
              borderColor: ['rgba(0, 10, 130, .7)'],
              borderWidth: 2
            }]
          },
          options: {
            responsive: true
          }
        });
      }
    }
  };
  </script>

<style>

</style>
  