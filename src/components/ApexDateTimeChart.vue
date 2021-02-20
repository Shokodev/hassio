<template>
  <div id="chart">
        <div class="toolbar">
          <v-btn id="all"
              @click="updateData('all')" :class="{active: selection==='all'}"
              >
            Reset
          </v-btn>
        </div>
        <div id="chart-timeline">
        <apexchart type="area" height="350" ref="chart" :options="chartOptions" :series="series"></apexchart>
      </div>
      </div>
</template>
<script>
import VueApexCharts from "vue-apexcharts";
export default {
    name:"ApexDateTimeChart",
    props:{
      chartdata:Array,
      unit:String
    },
    components: {
          apexchart: VueApexCharts,
    },
    data() {
    return { 
          series: [{
            name: this.unit,
            data: this.chartdata
          }],
          chartOptions: {
            chart: {
              id: 'area-datetime',
              type: 'area',
              height: 350,
              zoom: {
                autoScaleYaxis: true
              }
            },
            annotations: {
              yaxis: [{
                y: 30,
                borderColor: '#999',
              }],
              xaxis: [{
                x: new Date(this.chartdata[this.chartdata.length - 1][0]).getTime(),
                borderColor: '#999',
                yAxisIndex: 0,
              }]
            },
            dataLabels: {
              enabled: false
            },
            markers: {
              size: 0,
              style: 'hollow',
            },
            xaxis: {
              type: 'datetime',
              min: new Date(this.chartdata[0][0]).getTime(),
              tickAmount: 6,
            },
            tooltip: {
              x: {
                format: 'dd MMM yyyy',  
              }
            },
            fill: {
              type: 'gradient',
              gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.9,
                stops: [0, 100]
              }
            },
          },
          selection: 'all',
        }
      },
      methods: {
          updateData: function(timeline) {
            this.selection = timeline
            this.$refs.chart.zoomX(
                  new Date(this.chartdata[0][0]).getTime(),
                  new Date(this.chartdata[this.chartdata.length - 1][0]).getTime()
                )
            }
        }
  

}
</script>