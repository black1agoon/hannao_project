<template>
  <div class="overview-area pos">
    <div class="area-border pos"></div>
    <div class="area-title pos font-pr">{{ title }}</div>
    <map-layer class="map-layer pos"></map-layer>
    <figure-block class="figure-block pos" :figures="orderStatus"></figure-block>
    <energy-block class="daily-block pos" :water="dailyWater" :power="dailyPower"
                  :chart-on.sync="chartOn" :chart-options="dayChartOptions"></energy-block>
    <energy-block class="monthly-block pos" type="1" :water="monthlyWater" :power="monthlyPower"
                  :chart-on.sync="chartOn" :chart-options="monthChartOptions"></energy-block>
    <staff-block class="staff-block pos"></staff-block>
    <camera-block class="camera-block pos"></camera-block>
  </div>
</template>

<script>
  import EnergyBlock from './EnergyBlock'
  import FigureBlock from './FigureBlock'
  import StaffBlock from './StaffBlock'
  import CameraBlock from './CameraBlock'
  import MapLayer from './MapLayer'
  import { mapState } from 'vuex'
  import { timerConfig } from '@/config'

  export default {
    name: 'OverviewArea',
    components: {
      EnergyBlock,
      FigureBlock,
      StaffBlock,
      CameraBlock,
      MapLayer,
    },
    data () {
      return {
        title: '工厂能耗统计',
        chartOn: 0,
      }
    },
    computed: {
      ...mapState('productionModule', ['orderStatus']),
      ...mapState('buildingModule', [
        'dailyWater',
        'dailyPower',
        'monthlyWater',
        'monthlyPower',
        'dayWaterChartOptions',
        'dayPowerChartOptions',
        'monthWaterChartOptions',
        'monthPowerChartOptions',
      ]),
      dayChartOptions () {
        return [this.dayWaterChartOptions, this.dayPowerChartOptions]
      },
      monthChartOptions () {
        return [this.monthWaterChartOptions, this.monthPowerChartOptions]
      },
    },
    mounted () {
      window.setInterval(() => {
        this.chartOn = this.chartOn ? 0 : 1
      }, timerConfig.energySlide * 1000)
    },
  }
</script>

<style scoped>
  .area-border {
    left: 60px;
    top: 160px;
    width: 51px;
    height: 903px;
    background: url("../../assets/img/home/group 396.png");
  }

  .area-title {
    left: 129px;
    top: 144px;
    height: 42px;
    font-size: 30px;
    font-weight: 800;
    letter-spacing: 2px;
    white-space: nowrap;
    color: #CCF2FF;
    text-shadow: #00FFF5 0 0 10px;
  }

  .daily-block {
    left: 90px;
    top: 234px;
  }

  .monthly-block {
    left: 90px;
    top: 634px;
  }
</style>
