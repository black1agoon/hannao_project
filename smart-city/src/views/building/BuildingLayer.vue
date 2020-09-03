<template>
  <div class="building-layer">
    <div class="building-area">
      <div class="layer-title">
        今日使用情况
        <div class="title-border"></div>
      </div>
      <div class="layer-legends">
        <div class="legend water-legend">
          <div class="energy-point water-point"></div>
          <div class="energy-label">水 <span class="count">{{ waterCount }}</span> t</div>
        </div>
        <div class="legend patrol-legend">
          <div class="patrol-point normal-point"></div>
          <div class="patrol-label">巡检点正常</div>
        </div>
        <div class="legend electricity-legend">
          <div class="energy-point electricity-point"></div>
          <div class="energy-label">电 <span class="count">{{ electricityCount }}</span> kWh</div>
        </div>
        <div class="legend patrol-legend">
          <div class="patrol-point warning-point"></div>
          <div class="patrol-label">巡检点不正常</div>
        </div>
      </div>
      <div class="points-overlay">
        <div class="energy-points">
          <div v-for="(point, idx) in energyPointList" :key="idx"
               class="energy-point shining" :class="point.type + '-point'"
               :style="point.styles">
            <div class="point-tail">
              <div class="point-label" :style="{ color: point.color }">{{ point.value }}%</div>
            </div>
            <transition name="fade">
              <info-box v-if="point.infoStyles"
                        style="z-index: 3"
                        :style="point.infoStyles"
                        :info="point.info">
              </info-box>
            </transition>
            <transition name="fade">
              <div v-if="point.infoStyles" class="info-link" :style="point.linkStyles"></div>
            </transition>
          </div>
        </div>
        <div class="patrol-spots">
          <div v-for="(spot, idx) in patrolSpots" :key="idx"
               class="patrol-point" :class="spot.classes" :style="spot.styles">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
  import InfoBox from './components/InfoBox.vue';
  import { energyDataToday, energyPoints, patrolSpots } from '@/demo/building-data';

  const infoListSeq = [
    [0, 3, 6, 9],
    [1, 4, 7, 10],
    [2, 5, 8, 11],
  ];

  @Component({
    components: {
      InfoBox,
    },
  })
  export default class BuildingLayer extends Vue {

    @Prop()
    public electricData!: any;

    public energyDataToday = energyDataToday;

    private currentSeq: number = 0;
    private intervalId!: number;

    public get energyPointList() {
      return energyPoints.map((p, idx) => {
        return {
          ...p,
          styles: {
            position: 'absolute',
            top: p.pos[0] + 'px',
            left: p.pos[1] + 'px',
          },
          infoStyles: infoListSeq[this.currentSeq].includes(idx) ? {
            bottom: p.infoPos[0] + 'px',
            left: p.infoPos[1] + 'px',
          } : null,
          linkStyles: {
            width: Math.abs(p.infoPos[1] + 106) + 'px',
            height: (p.infoPos[0] + 5) + 'px',
            bottom: '6px',
            left: (p.infoPos[1] < 0 ? (p.infoPos[1] + 106) : 14) + 'px',
            borderLeft: p.infoPos[1] >= 0 ? 'none' : null,
            borderTop: p.infoPos[0] >= 0 ? 'none' : null,
            borderRight: p.infoPos[1] < 0 ? 'none' : null,
          },
        };
      });
    }

    public get waterCount() {
      return (this.energyDataToday.find((item) => item.name === 'water') || { value: 0 }).value;
    }

    public get electricityCount() {
      return (this.energyDataToday.find((item) => item.name === 'electricity') || { value: 0 }).value;
    }

    public get patrolSpots() {
      return patrolSpots.map((spot) => {
        return {
          ...spot,
          classes: spot.warning ? 'warning-point' : 'normal-point',
          styles: {
            position: 'absolute',
            top: spot.pos[0] + 'px',
            left: spot.pos[1] + 'px',
            transform: `scale(${spot.size || 1})`,
          },
        };
      });
    }

    public nextPage() {
      this.currentSeq = (this.currentSeq + 1) % infoListSeq.length;
    }

    private mounted() {
      if (!this.intervalId) {
        this.intervalId = window.setInterval(() => {
          this.nextPage();
        }, 5000);
      }
    }

    private beforeDestory() {
      if (this.intervalId) {
        window.clearInterval(this.intervalId);
      }
    }

    @Watch('electricData')
    private updateElectricData() {
      const electricItem = this.energyDataToday.find((item) => item.name === 'electricity');
      if (electricItem) {
        electricItem.value = this.electricData ? this.electricData.day : 0;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .building-layer {
    width: 100%;
    height: 100%;
    background: url("img/013.png") no-repeat center 80%;
  }

  .building-area {
    position: absolute;
    width: 1200px;
    top: 99px;
    right: 0;
    left: 0;
    bottom: 59px;
    margin: 0 auto;
  }

  .layer-title {
    font-size: 28px;
    color: aqua;
    width: 272px;

    .title-border {
      margin-top: 6px;
      height: 2px;
      background: linear-gradient(
              -90deg,
              rgba(0, 162, 255, 0),
              rgba(0, 132, 255, 1),
              rgba(0, 162, 255, 0)
      );
    }
  }

  .layer-legends {
    width: 500px;
    height: 80px;
    display: flex;
    flex-wrap: wrap;
    position: relative;

    .legend {
      flex-basis: 50%;
    }
  }

  .legend {
    padding: 10px 0 0 40px;
    text-align: left;

    .energy-point {
      margin-right: 20px;
      vertical-align: text-bottom;
    }

    .energy-label {
      display: inline-block;

      .count {
        display: inline-block;
        width: 60px;
        text-align: center;
        color: aqua;
        font-size: 24px;
        font-weight: bold;
        font-family: PMZD, "Microsoft YaHei", sans-serif;
      }
    }

    .patrol-point {
      float: left;
    }

    .patrol-label {
      float: left;
      margin: 2px 0 0 20px;
    }
  }

  .energy-point {
    width: 15px;
    height: 15px;
    display: inline-block;
    border-radius: 50%;
    border: 1px solid #3f3d83;
    position: relative;
  }

  @keyframes glow-water {
    0% {
      box-shadow: 0 0 4px 3px adjust_color(aqua, $alpha: 0.9);
    }
    50% {
      box-shadow: 0 0 4px 0 adjust_color(aqua, $alpha: 0.2);
    }
    100% {
      box-shadow: 0 0 4px 3px adjust_color(aqua, $alpha: 0.9);
    }
  }

  @keyframes glow-electricity {
    0% {
      box-shadow: 0 0 4px 3px rgba(255, 173, 0, 0.9);
    }
    50% {
      box-shadow: 0 0 4px 0 rgba(255, 173, 0, 0.2);
    }
    100% {
      box-shadow: 0 0 4px 3px rgba(255, 173, 0, 0.9);
    }
  }

  .water-point {
    background: aqua;
    box-shadow: 0 0 4px 3px rgba(0, 255, 255, 0.5);

    &.shining {
      animation: glow-water 1.5s infinite ease-in-out;
    }
  }


  .electricity-point {
    background: rgba(255, 173, 0, 1);
    box-shadow: 0 0 4px 3px rgba(255, 173, 0, 0.5);

    &.shining {
      animation: glow-electricity 1.5s infinite ease-in-out;
    }
  }

  .patrol-point {
    display: inline-block;
    width: 26px;
    height: 26px;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
  }

  .normal-point {
    background-image: url("img/ewb8.png");
  }

  .warning-point {
    background-image: url("img/ewb11.png");
  }

  .points-overlay {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }

  .point-tail {
    width: 1px;
    height: 20px;
    background: #fff;
    position: absolute;
    bottom: 13px;
    left: 6px;

    .point-label {
      color: aqua;
      position: relative;
      top: -16px;
      left: -8px;
      font-size: 14px;
      text-shadow: 1px 1px 1px black;
    }
  }

  .info-link {
    position: absolute;
    border: 1px solid aqua;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
