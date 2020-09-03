<template>
  <div class="city-view">
    <div class="view-title">{{ title }}</div>
    <map-layer ref="mapLayer"></map-layer>
    <status-layer @select-box="onSelectBox"></status-layer>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import MapLayer from './MapLayer.vue';
  import StatusLayer from './StatusLayer.vue';
  import { StatusData } from '@/types/interfaces';

  @Component({
    components: {
      MapLayer,
      StatusLayer,
    },
  })
  export default class CityView extends Vue {
    public title: string = '智慧城市治理大数据指挥中心';

    public onSelectBox(box: StatusData) {
      if (box.type === 'BlockList') {
        (this.$refs.mapLayer as MapLayer).toggleSpot();
      }
    }
  }
</script>

<style scoped lang="scss">
  .city-view {
    position: relative;

    .view-title {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100px;
      z-index: 2;
      background: url("img/1.png") no-repeat top center;
      font-size: 32px;
      line-height: 86px;
      letter-spacing: 2px;
    }
  }
</style>
