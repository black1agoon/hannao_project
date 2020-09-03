<template>
  <div class="building-view">
    <div class="view-title">{{ title }}</div>
    <div class="view-logo" @click="goHome"></div>
    <div class="view-date">
      <live-time></live-time>
    </div>
    <building-layer :electric-data="electricData"></building-layer>
    <energy-box :electric-data="electricData"></energy-box>
    <attendance-box></attendance-box>
    <patrol-box></patrol-box>
    <div class="view-footer">{{ copyright }}</div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import BuildingLayer from './BuildingLayer.vue';
  import LiveTime from '@/components/LiveTime.vue';
  import EnergyBox from './EnergyBox.vue';
  import AttendanceBox from './AttendanceBox.vue';
  import PatrolBox from './PatrolBox.vue';
  import API from '@/api';

  @Component({
    components: {
      BuildingLayer,
      LiveTime,
      EnergyBox,
      AttendanceBox,
      PatrolBox,
    },
  })
  export default class BuildingView extends Vue {
    public title: string = '智慧楼宇';
    public copyright: string = '浙江汉脑数码科技有限公司 版权所有';

    public electricData: any = null;

    public goHome() {
      this.$router.push('/');
    }

    public updateElectricData() {
      const buildingId = (this.$route.params as any).id;
      API.fetchEnterpriseCount(buildingId).then((data) => {
        this.electricData = data;
      });
    }

    public mounted() {
      this.updateElectricData();
    }
  }
</script>

<style lang="scss" scoped>
  .building-view {
    position: relative;
    background: url("img/012.png") no-repeat center;
    background-size: cover;
    height: 100%;
    width: 100%;
  }

  .view-title {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100px;
    z-index: 2;
    background: url("img/001.png") no-repeat top center;
    font-size: 36px;
    line-height: 76px;
    letter-spacing: 2px;
  }

  .view-logo {
    position: absolute;
    top: 27px;
    left: 58px;
    width: 284px;
    height: 37px;
    background: url("img/002.png");
    z-index: 4;
    cursor: pointer;
  }

  .view-date {
    position: absolute;
    top: 27px;
    right: 58px;
    width: 300px;
    height: 37px;
  }

  .view-footer {
    position: absolute;
    bottom: 12px;
    right: 60px;
  }

  ::v-deep .box-title {
    background: url("img/011.png") no-repeat center;
    font-size: 24px;
  }
</style>
