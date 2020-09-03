<template>
  <div class="energy-block pos">
    <div class="water-figure pos">
      <div class="water-icon pos"></div>
      <div class="figure-title pos font-pr">{{ titles.water }}</div>
      <div class="water-usage usage pos">{{ water.usage }} <span class="unit">t</span></div>
      <div class="water-ratio" v-if="type">
        <div class="ratio-title pos font-pr">较上月同时段</div>
        <div class="ratio-percent pos" :class="ratio.water.clazz">
          <div class="triangle"></div>
          {{ ratio.water.value }}%
        </div>
      </div>
    </div>
    <div class="power-figure pos">
      <div class="power-icon pos"></div>
      <div class="figure-title pos font-pr">{{ titles.power }}</div>
      <div class="power-usage usage pos">{{ power.usage }} <span class="unit">kW·h</span></div>
      <div class="power-ratio" v-if="type">
        <div class="ratio-title pos font-pr">较上月同时段</div>
        <div class="ratio-percent pos" :class="ratio.power.clazz">
          <div class="triangle"></div>
          {{ ratio.power.value }}%
        </div>
      </div>
    </div>
    <div class="usage-charts pos">
      <div class="chart-slider pos">
        <div v-for="(options, idx) in chartOptions" :key="options.title">
          <transition enter-active-class="animated slideInRight" leave-active-class="animated slideOutLeft">
            <div class="chart pos" v-show="chartOn === idx">
              <div class="chart-title pos">{{ chartTitle }}</div>
              <e-charts style="width: 510px; height: 210px;" :options="options"></e-charts>
            </div>
          </transition>
        </div>
      </div>
      <div class="chart-switch">
        <div class="switch-idc" :class="switchOn.water" @click="changeChart(0)"></div>
        <div class="switch-idc" :class="switchOn.power" @click="changeChart(1)"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import ECharts from 'vue-echarts'
  import 'echarts/lib/chart/line'
  import 'echarts/lib/chart/bar'
  import 'echarts/lib/component/legend'

  export default {
    name: 'EnergyBlock',
    props: {
      type: {}, // 0: daily, 1: monthly
      water: {
        default: () => ({}),
      },
      power: {
        default: () => ({}),
      },
      chartOn: {
        default: 0,
      },
      chartOptions: {
        default: () => [{}, {}],
      },
    },
    components: {
      ECharts,
    },
    computed: {
      chartTitle () {
        return this.chartOptions?.[this.chartOn]?.config?.title || ''
      },
      titles () {
        const typeName = this.type ? '本月' : '今日'
        return {
          water: typeName + '累计用水量',
          power: typeName + '累计用电量',
        }
      },
      ratio () {
        return {
          water: {
            value: (this.water.ratio * 100).toFixed(),
            clazz: this.water.ratio >= 0 ? 'up' : 'down',
          },
          power: {
            value: (Math.abs(this.power.ratio) * 100).toFixed(),
            clazz: this.power.ratio >= 0 ? 'up' : 'down',
          },
        }
      },
      switchOn () {
        return {
          water: this.chartOn || 'water-on',
          power: this.chartOn && 'power-on',
        }
      },
    },
    methods: {
      changeChart (idx) {
        this.$emit('update:chart-on', idx)
      },
    },
  }
</script>

<style scoped lang="scss">
  .water-figure {
    .water-icon {
      left: 28px;
      width: 23px;
      height: 23px;
      background: url("../../assets/img/home/group 8.png");
    }

    .figure-title {
      left: 66px;
    }

    .water-usage {
      left: 28px;
      top: 30px;
      color: #CCF2FF;
      text-shadow: #48F3FA 0 0 5px;
    }

    .ratio-percent {
      left: 28px;
      top: 108px;
    }
  }

  .power-figure {
    .power-icon {
      left: 249px;
      width: 23px;
      height: 23px;
      background: url("../../assets/img/home/group 22.png");
    }

    .figure-title {
      left: 287px;
    }

    .power-usage {
      left: 249px;
      top: 30px;
      color: #CCF2FF;
      text-shadow: #FFEB00 0 0 5px;
    }

    .ratio-percent {
      left: 249px;
      top: 108px;
    }
  }

  .water-figure, .power-figure {
    .figure-title {
      white-space: nowrap;
      font-size: 14px;
      color: #CCF2FF;
      line-height: 23px;
    }

    .usage {
      font-size: 40px;
      font-weight: 800;
      white-space: nowrap;
    }

    .unit {
      font-size: 20px;
      text-shadow: none;
    }

    .ratio-title {
      left: 28px;
      top: 80px;
      font-size: 12px;
      color: #CCF2FF;
      white-space: nowrap;
    }

    .power-ratio .ratio-title {
      left: 249px;
    }

    .ratio-percent {
      display: flex;
    }

    .triangle {
      margin: 5px 8px 0 0;
      width: 7px;
      height: 7px;
      border-left: transparent 4px solid;
      border-right: transparent 4px solid;
    }

    .up {
      color: #FF5C5C;

      .triangle {
        border-bottom: #FF5C5C 7px solid;
      }
    }

    .down {
      color: #5CCDFF;

      .triangle {
        border-top: #5CCDFF 7px solid;
      }
    }
  }

  .usage-charts {
    left: 0;
    top: 124px;
    width: 510px;
    height: 210px;
    background: #000C40C7;
    border-radius: 10px;

    .chart-slider {
      width: 100%;
      height: 100%;
      overflow: hidden;
    }

    .chart-title {
      left: 28px;
      top: 20px;
      font-size: 14px;
      color: #CCF2FF;
    }

    .chart {
      top: 0;
    }

    .chart-switch {
      position: relative;
      top: 220px;
      margin: 0 auto;
      width: 38px;
      height: 2px;
      display: flex;

      .switch-idc {
        width: 16px;
        height: 2px;
        background: #0E477B;
        margin: 0 2px;
        cursor: pointer;

        &.water-on {
          background: #48F3FA;
        }

        &.power-on {
          background: #FFF369;
        }
      }
    }
  }

  .monthly-block {
    .usage-charts {
      top: 150px;
    }
  }
</style>
