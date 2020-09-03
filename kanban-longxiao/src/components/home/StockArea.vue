<template>
  <div class="stock-area pos">
    <div class="area-border pos"></div>
    <div class="area-title pos font-pr">{{ title }}</div>
    <div class="material-house pos block">
      <div class="rose-chart">
        <svg width="188" height="188" xmlns="http://www.w3.org/2000/svg">
          <path v-for="path in materialPathList" :key="path.name" :d="path.d"
                fill="transparent" :stroke-width="path.width" :stroke="path.color">
          </path>
        </svg>
        <div class="rose-info font-pr">
          <div class="title pos">原料仓货总重</div>
          <div class="total pos">
            {{ totalWeight.value }}
            <span class="unit">{{ totalWeight.unit }}</span>
          </div>
        </div>
      </div>
      <div class="legend-grid pos">
        <div class="legend-item" v-for="material in materialList" :key="material.name">
          <div class="legend-dot" :style="{ background: material.color }"></div>
          <div class="legend-name">{{ material.name }}</div>
          <div class="legend-weight">
            {{ material.value }}
            <span class="unit">{{ material.unit }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="product-house pos block">
      <div class="chart-title pos">{{ chartTitle }}</div>
      <e-charts style="width: 510px; height: 155px;" :options="chartOptions"></e-charts>
    </div>
  </div>
</template>

<script>
  import ECharts from 'vue-echarts'
  import 'echarts/lib/chart/line'
  import 'echarts/lib/component/legend'
  import { describeRose } from '../../utils/draw'
  import { mapState } from 'vuex'
  import { fixLength } from '../../utils/math'

  const colors = ['#AB1BFE', '#25C2FF', '#48F3FA', '#FFF369', '#F813AB', '#136BF8']

  export default {
    name: 'StockArea',
    components: {
      ECharts,
    },
    data () {
      return {
        title: '库存信息',
      }
    },
    computed: {
      ...mapState('productionModule', {
        materialList: state => state.materialInventory.slice(0, 6).map((m, idx) => ({
          ...m, color: colors[idx % colors.length],
        })),
        chartOptions: state => state.productChartOptions,
      }),
      materialPathList () {
        return describeRose(this.materialList, { valueField: 'weight' })
      },
      totalWeight () {
        return fixLength(this.materialList.reduce((r, m) => r + (+m.weight || 0), 0), 4, ['Kg', '吨'])
      },
      chartTitle () {
        return this.chartOptions?.config?.title
      },
    },
  }
</script>

<style scoped lang="scss">
  @import "../../styles/area";

  .area-border {
    left: 1988px;
    top: 608px;
    width: 51px;
    height: 402px;
    background: url("../../assets/img/home/group 395.png") top no-repeat;

    &::after {
      content: "";
      width: 51px;
      height: 50px;
      position: absolute;
      left: 0;
      bottom: -50px;
      background: url("../../assets/img/home/group 395.png") bottom no-repeat;
    }
  }

  .area-title {
    left: 2058px;
    top: 600px;
    font-size: 20px;
    text-shadow: none;
  }

  .material-house {
    left: 2017px;
    top: 649px;
    width: 521px;
    height: 206px;

    .rose-chart {
      width: 200px;
      height: 200px;
      margin: 20px 0 0 -10px;
      position: relative;
      color: #CCF2FF;

      .title {
        top: 100px;
        left: 110px;
        font-size: 12px;
        font-weight: 500;
      }

      .total {
        top: 116px;
        left: 110px;
        font-size: 30px;
        font-weight: bold;
        white-space: nowrap;

        .unit {
          font-size: 10px;
        }
      }
    }

    .legend-grid {
      left: 220px;
      top: 30px;
      width: 312px;
      display: flex;
      flex-wrap: wrap;
      color: #CCF2FF;

      .legend-item {
        flex: 0 0 156px;
        position: relative;
        height: 58px;
      }

      .legend-dot {
        width: 16px;
        height: 16px;
        border-radius: 50%;
      }

      .legend-name {
        width: 50px;
        height: 28px;
        font-size: 12px;
        font-weight: 400;
        background: linear-gradient(135deg, #000c40, #00000000 50%);
        margin: -8px 0 0 8px;
        overflow: hidden;
        text-align: left;
        padding-left: 1px;
      }

      .legend-weight {
        position: absolute;
        top: -2px;
        left: 64px;
        font-size: 30px;
        font-weight: bold;
        white-space: nowrap;

        .unit {
          font-size: 10px;
          margin-left: -6px;
        }
      }
    }
  }

  .product-house {
    left: 2017px;
    top: 877px;
    width: 521px;
    height: 157px;

    .chart-title {
      left: 28px;
      top: 20px;
      font-size: 14px;
      color: #CCF2FF;
    }

  }
</style>
