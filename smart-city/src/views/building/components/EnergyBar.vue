<template>
  <div class="bar">
    <div class="bar-title">
      <span class="bar-label">{{ barInfo.label }}</span>
      <span class="bar-status">{{ barInfo.value }}/<span class="bar-plan">{{ barInfo.plan }}</span>{{ barInfo.unit }} </span>
    </div>
    <div class="progress-bar" :style="{ background: barInfo.background }"></div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';

  const energyColors = {
    water: '#00ffff',
    electricity: '#ffad00',
  };

  @Component
  export default class EnergyBar extends Vue {
    @Prop()
    public info!: any;

    public get barInfo() {
      const color = (energyColors as any)[this.info.name];
      const percent = +(this.info.value / this.info.plan * 100).toFixed(0);
      return {
        ...this.info,
        status: [this.info.value, this.info.plan].join('/') + this.info.unit,
        background: `linear-gradient(to right, ${color} ${percent}%, #50606C ${percent}%)`,
      };
    }
  }
</script>

<style scoped lang="scss">
  .bar {
    width: 80%;
    margin: 16px auto;
  }

  .bar-status {
    font-size: 15px;
  }

  .bar-label {
    margin-right: 30px;
  }

  .bar-plan {
    font-size: 80%;
  }

  .progress-bar {
    height: 9px;
    background: #50606C;
    margin: 4px auto;
    border-radius: 2px;
  }
</style>
