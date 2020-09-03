<template>
  <div class="status-container">
    <component v-for="(box, idx) in statusBlocks" :key="idx" @select="onSelect(box)"
               @row-click="onTableRowClick"
               :is="box.type" :title="box.title" :status-list="box.data">
    </component>
    <div class="legend-area">
      <div v-for="(legend) in legendList" :key="legend.name" class="legend-item">
        <div class="legend-icon" :class="'legend-icon-' + legend.icon"></div>
        {{ legend.title }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import SimpleList from './components/SimpleList.vue';
  import BlockList from './components/BlockList.vue';
  import CameraBox from './components/CameraBox.vue';
  import TableList from './components/TableList.vue';
  import CityData from '@/demo/city-data';
  import Markers from '@/config/markers';
  import { StatusData } from '@/types/interfaces';

  @Component({
    components: {
      SimpleList,
      BlockList,
      CameraBox,
      TableList,
    },
  })
  export default class StatusLayer extends Vue {
    public statusBlocks: any[] = CityData.statusBlocks;
    public legendList: any[] = Markers.markers;

    public onSelect(box: StatusData) {
      this.$emit('select-box', box);
    }

    public onTableRowClick(row: any) {
      if (row && row.id) {
        this.$router.push('/building/' + row.id);
      }
    }
  }
</script>

<style scoped lang="scss">
  .status-container {
    height: calc(100% / 3);
    width: 100%;
    background: #050e23dd;
    position: absolute;
    bottom: 0;
    left: 0;
    color: white;
  }

  .legend-area {
    float: left;
    width: 300px;
    height: 100%;
    padding: 20px 30px 20px 60px;
    font-size: 80%;

    .legend-item {
      height: 12.5%;
      position: relative;
      text-align: left;
      line-height: 40px;
      font-size: 20px;

      .legend-icon {
        float: left;
        height: 100%;
        width: 60px;
      }
    }
  }

  $icons: 5 6 7 8 9 10 11 12;

  @each $icon in $icons {
    .legend-icon-#{$icon} {
      background: url("img/#{$icon}.png") no-repeat left center;
    }
  }
</style>
