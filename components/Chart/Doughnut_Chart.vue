<template>
    <div class="chart">
        <canvas ref="chart" id="doughnutChart"></canvas>
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
      var ctxP = this.$refs.chart.getContext('2d');
      var myPieChart = new Chart(ctxP, {
        type: 'doughnut',
        data: {
          labels: ["Red", "Green", "Yellow", "Grey"],
          datasets: [{
            data: [130, 120, 160, 120],
            backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C", "#949FB1"],
            hoverBackgroundColor: ["#FF5A5E", "#5AD3D1", "#FFC870", "#A8B3C5"]
          }]
        },
        options: {
        cutoutPercentage: 75,
        responsive: true,
        legend: {
            position: 'right',
            labels: {
            padding: 10,
            boxWidth: 15,
            usePointStyle: true
            },
        },
        plugins: {
            datalabels: {
            formatter: (value, ctx) => {
                let sum = 0;
                let dataArr = ctx.chart.data.datasets[0].data;
                dataArr.map(data => {
                sum += data;
                });
                let percentage = (value * 100 / sum).toFixed(2) + "%";
                return percentage;
            },
            color: 'white',
            labels: {
                title: {
                font: {
                    size: '14'
                }
                }
            }
            }
        }
        }
      });
    }
  }
};
</script>

<style>
.chart {
  width: 65%;
  height: 65%;
}
</style>