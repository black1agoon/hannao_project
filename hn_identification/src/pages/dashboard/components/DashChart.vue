<template>
  <e-charts class="charts" ref="pie" :options="options" :theme="'macarons'"></e-charts>
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
    methods: {},
    mounted() {
      window.addEventListener('resize', () => {
        this.$refs.pie.resize()
      })
    },
    watch: {
      'options.color'() {
        this.$refs.pie.refresh()
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .charts
    width: 100%
    height: 300px
</style>
