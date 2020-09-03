<template>
  <e-chart :options="chartOptions"></e-chart>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { getPieChartOptions, getLineChartOptions } from '@/config/echarts-config';
  import EChart from 'vue-echarts';

  const getChartOptions = {
    pie: getPieChartOptions,
    line: getLineChartOptions,
  };

  @Component({
    components: {
      EChart,
    },
  })
  export default class EnergyChart extends Vue {
    @Prop()
    public type!: string;

    @Prop()
    public info!: any;

    public get chartOptions() {
      const getChartTypeOptions = this.type && (getChartOptions as any)[this.type];
      return getChartTypeOptions ? getChartTypeOptions(this.info) : null;
    }
  }
</script>

<style scoped lang="scss">
</style>
