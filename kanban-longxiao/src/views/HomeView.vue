<template>
  <div class="home-view">
    <div class="pos logo"></div>
    <div class="pos divider"></div>
    <div class="pos title font-pr">{{ title }}</div>
    <div class="pos grid-layer"></div>
    <overview-area></overview-area>
    <order-area></order-area>
    <stock-area></stock-area>
    <device-area></device-area>
    <system-area></system-area>
  </div>
</template>

<script>
  import OverviewArea from '../components/home/OverviewArea'
  import OrderArea from '../components/home/OrderArea'
  import StockArea from '../components/home/StockArea'
  import DeviceArea from '../components/home/DeviceArea'
  import SystemArea from '../components/home/SystemArea'

  export default {
    name: 'HomeView',
    components: {
      OverviewArea,
      OrderArea,
      StockArea,
      DeviceArea,
      SystemArea,
    },
    data () {
      return {
        title: '龙潇防护用品数据监控中心',
      }
    },
    mounted () {
      this.$store.dispatch('startFetching')
    },
  }
</script>

<style scoped lang="scss">
  .home-view {
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 100%;
  }

  #world {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .logo {
    left: 60px;
    top: 35px;
    width: 129px;
    height: 60px;
    background: url("../assets/img/home/image 8.png") no-repeat center;
  }

  .divider {
    left: 219px;
    top: 35px;
    width: 0;
    height: 60px;
    border-left: 2px solid #CCF2FF33;
  }

  .title {
    left: 249px;
    top: 29px;
    width: 606px;
    height: 70px;
    font-size: 51px;
    font-weight: 800;
    line-height: 70px;
  }

  .grid-layer {
    left: 160px;
    top: 100px;
    width: 2204px;
    height: 1080px;
    background: url("../assets/img/home/maskgroup 70.png") no-repeat center;
    transform: skewX(-1.5deg);
  }
</style>
