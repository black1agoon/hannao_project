<template>
  <div class="city-view">
    <map-layer ref="mapLayer"></map-layer>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import MapLayer from './DemoMapLayer.vue';

  @Component({
    components: {
      MapLayer,
    },
  })
  export default class DemoView extends Vue {
  }
</script>

<style scoped lang="scss">
  .city-view {
    position: relative;
  }
</style>
