<template>
  <e-charts class="charts"
            ref="charts"
            :options="options"
            :theme="'macarons'">
  </e-charts>
</template>

<script>
  import ECharts from 'vue-echarts/components/ECharts'
  require('echarts/theme/macarons') // echarts theme
  export default {
    name: 'dash-chart',
    components: {
      ECharts
    },
    props: {
      options: {
        type: Object,
        default: () => ({})
      }
    },
    data() {
      return {
      }
    },
    methods: {
      refresh() {
        this.$refs.charts.refresh()
      }
    },
    mounted() {
      window.addEventListener('resize', () => {
        this.$refs.charts.resize()
      })
    },
    watch: {
      'options.color'() {
        this.$refs.charts.refresh()
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .charts
    width: 100%
    height: 100%
</style>
