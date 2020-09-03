<template>
  <div class="device-area pos font-pr">
    <div class="area-border pos"></div>
    <div class="area-title pos font-pr">{{ title }}</div>
    <div class="device-scanner pos">
      <div class="scanner-divider left-divider pos"></div>
      <div class="scanner-divider pos"></div>
      <div class="scanner-divider right-divider pos"></div>
      <svg viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg" class="check-icon pos">
        <path :d="iconD" fill="none" stroke-width="3.5" stroke="currentColor" stroke-linecap="round"></path>
        <path d="M10 24 L17 31 L28 20" fill="none" stroke-width="3.5" stroke="currentColor" stroke-linecap="round"
              stroke-linejoin="round"></path>
        <circle r="2" cx="32" cy="16" fill="currentColor"></circle>
      </svg>
      <div class="title">设备安全运行时长</div>
      <div class="online-time">
        <span class="time">{{ online.day }}</span>天
        <span class="time">{{ online.hour }}</span>小时
        <span class="time">{{ online.minute }}</span>分钟
      </div>
    </div>
    <div class="device-bg pos"></div>
    <div class="device-one pos block">
      <device-status-block :machine="deviceStatus[0]"></device-status-block>
    </div>
    <div class="device-two pos block">
      <device-status-block :machine="deviceStatus[1]"></device-status-block>
    </div>
    <div class="device-charts pos block">
      <div class="chart-title pos">设备分时产量图</div>
      <e-charts class="output-chart" :options="outputChartOptions"></e-charts>
      <div class="quality-chart pos">
        <div class="chart-title">设备产量合格率</div>
        <div class="color-wheel" :style="qualityPieStyles">
          <div class="percent pos">{{ qualityPercent }}%</div>
          <div class="tip pos">合格率</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ECharts from 'vue-echarts'
  import 'echarts/lib/chart/bar'
  import 'echarts/lib/component/legend'
  import DeviceStatusBlock from './DeviceStatusBlock'
  import { describeArc } from '@/utils/draw'
  import { mapState } from 'vuex'

  export default {
    name: 'DeviceArea',
    components: {
      ECharts,
      DeviceStatusBlock,
    },
    data () {
      return {
        title: '设备信息',
        iconD: describeArc(22, 22, 20, 120, 450),
        now: new Date(),
      }
    },
    computed: {
      ...mapState('deviceModule', ['firstDay', 'quality', 'deviceStatus', 'outputChartOptions']),
      online () {
        const oneHour = 3600000
        const oneDay = 24 * oneHour
        return {
          day: Math.floor((this.now - this.firstDay) / oneDay),
          hour: Math.floor(((this.now - this.firstDay) % oneDay) / oneHour),
          minute: Math.floor(((this.now - this.firstDay) % oneHour) / 60000),
        }
      },
      qualityPercent () {
        return +(this.quality * 100).toFixed(1)
      },
      qualityPieStyles () {
        return {
          backgroundImage: `conic-gradient(#CCF2FF, #00FFFF ${this.qualityPercent}%, #9F9F9F ${this.qualityPercent}%, #9F9F9F)`,
        }
      },
    },
    mounted () {
      window.setInterval(() => {
        this.now = new Date()
      }, 10000)
    },
  }
</script>

<style scoped lang="scss">
  @import "../../styles/area";

  .area-border {
    left: 2580px;
    top: 80px;
    width: 51px;
    height: 982px;
    background: url("../../assets/img/home/group 394.png") top no-repeat;
  }

  .area-title {
    left: 2649px;
    top: 64px;
  }

  .device-scanner {
    left: 2730px;
    top: 149px;
    width: 444px;
    height: 87px;
    background: url("../../assets/img/home/group 393@2x.png") center no-repeat;
    background-size: contain;
    color: #CCF2FF;
    font-size: 14px;
    font-weight: 500;
    padding-top: 8px;
    overflow: hidden;

    @keyframes scan {
      0% {
        left: 0;
      }
      100% {
        left: 442px;
      }
    }

    .scanner-divider {
      top: 0;
      left: 0;
      width: 2px;
      height: 87px;
      background: linear-gradient(180deg, rgba(0, 247, 76, 0) 0%, rgba(0, 247, 76, 1) 50%, rgba(0, 247, 76, 0) 100%);
      animation: scan 5s infinite linear;

      &.left-divider {
        transform: translateX(-444px);
      }

      &.right-divider {
        transform: translateX(444px);
      }

      &::after {
        content: "";
        position: absolute;
        width: 222px;
        height: 87px;
        left: -111px;
        background: linear-gradient(90deg, rgba(0, 247, 76, 0) 0%, rgba(0, 247, 76, .25) 50%, rgba(0, 247, 76, 0) 100%);
      }
    }

    .check-icon {
      width: 22px;
      height: 22px;
      top: 9px;
      left: 144px;
      color: #00F74C;
    }

    .title {
      margin: 2px 0 0 30px;
    }

    .online-time {
      font-size: 20px;
      font-weight: bold;
      margin-top: 3px;

      .time {
        font-size: 40px;
      }
    }
  }

  .device-bg {
    left: 2540px;
    top: 81px;
    width: 830px;
    height: 464px;
    background: url("../../assets/img/home/layer 2 copy@2x.png") center no-repeat;
    background-size: contain;
  }

  .device-one {
    left: 2612px;
    top: 523px;
    width: 325px;
    height: 275px;
  }

  .device-two {
    left: 2967px;
    top: 523px;
    width: 325px;
    height: 275px;
  }

  .device-charts {
    left: 2612px;
    top: 824px;
    width: 680px;
    height: 210px;
    color: #CCF2FF;

    .chart-title {
      left: 28px;
      top: 20px;
      font-size: 14px;
    }

    .output-chart {
      width: 510px;
      height: 210px;
    }

    .quality-chart {
      right: 0;
      top: 0;

      .chart-title {
        margin: 20px 29px;
      }

      .color-wheel {
        width: 132px;
        height: 132px;
        display: inline-block;
        padding: 10px;
        border-radius: 100%;
        background-image: conic-gradient(#CCF2FF, #00FFFF);
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center center;
      }

      .color-wheel::after {
        content: '';
        display: block;
        padding: 56px;
        border-radius: 100%;
        background: #001141;
      }

      .percent {
        font-size: 30px;
        font-weight: bold;
        left: 0;
        right: 0;
        top: 96px;
      }

      .tip {
        font-size: 14px;
        font-weight: 400;
        top: 136px;
        left: 0;
        right: 0;
      }
    }
  }
</style>
