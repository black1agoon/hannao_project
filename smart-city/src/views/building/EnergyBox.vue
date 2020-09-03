<template>
  <div class="energy-box">
    <div class="box-title highlight-color">能耗</div>

    <div class="bar-area">
      <div class="area-title">本月</div>
      <energy-bar v-for="(data, idx) in energyData" :key="idx" :info="data"></energy-bar>
    </div>

    <div class="pie-area">
      <energy-chart class="pie-chart" type="pie" v-for="(data, idx) in pieData" :key="idx" :info="data"></energy-chart>
    </div>

    <div class="line-area">
      <energy-chart class="line-chart" type="line" v-for="(data, idx) in lineData" :key="idx"
                    :info="data"></energy-chart>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
  import EnergyBar from '@/views/building/components/EnergyBar.vue';
  import EnergyChart from '@/views/building/components/EnergyChart.vue';
  import { energyData, floorData, floorNames, monthData } from '@/demo/building-data';
  import { lineColors } from '@/config/echarts-config';
  import API from '@/api';

  const energyTypes = [
    { name: 'water', label: '水', unit: 't' },
    { name: 'electricity', label: '电', unit: 'kWh' },
  ];

  export const pieColors = [
    '#FB7293', '#FF9F7F', '#FFDB5C', '#9FE6B8', '#6962FF', '#E7BCF3',
    '#1D2088', '#EA7E53', '#8DC1A9', '#DD6B66', '#73B9BC', '#73A373',
  ];

  @Component({
    components: {
      EnergyBar,
      EnergyChart,
    },
  })
  export default class EnergyBox extends Vue {

    @Prop()
    public electricData!: any;

    public energyData = energyData;

    public get pieData() {
      return floorData.map((item, idx) => ({
        ...item,
        data: item.data.map((v, i) => {
          return {
            value: v,
            name: floorNames[i],
          };
        }),
        color: pieColors.slice(idx * 6, idx * 6 + 6),
      }));
    }

    public get lineData() {
      return energyTypes.map((t) => {
        const linesData = monthData.filter((item) => item.name === t.name);
        const typeColors = (lineColors as any)[t.name];
        return linesData.length ? {
          title: t.label,
          unit: t.unit,
          data: linesData.map((item, idx) => {
            return {
              ...item,
              name: item.year,
              color: typeColors[idx % typeColors.length],
            };
          }),
        } : null;
      });
    }

    @Watch('electricData')
    private updateElectricData() {
      const electricItem = this.energyData.find((item) => item.name === 'electricity');
      if (electricItem) {
        electricItem.value = this.electricData ? this.electricData.month : 0;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .energy-box {
    position: absolute;
    top: 99px;
    left: 58px;
    width: 575px;
    height: 922px;
    background: url("img/box-bg1.png") no-repeat center;
    padding: 20px;
  }

  .bar-area {
    text-align: left;
  }

  .pie-area::after {
    content: '';
    display: table;
    clear: both;
  }

  .pie-chart {
    width: 50%;
    height: 240px;
    float: left;
  }

  .line-chart {
    width: 100%;
    height: 240px;
  }
</style>
