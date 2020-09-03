<template>
  <div class="patrol-box">
    <div class="box-title highlight-color">巡检</div>
    <div class="summary">
      总共 <span class="count">{{ total }}</span> 点
      <div class="count"></div>
      警报 <span class="count warning-count">{{ warning }}</span> 点
    </div>
    <div class="place-grid">
      <div v-for="(p, idx) in roomList" :key="idx"
           class="place-cell" :class="{ 'warning-cell': p.warning }">
        <span class="place-name" v-html="p.name"></span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { patrolData } from '@/demo/building-data';

  @Component
  export default class PatrolBox extends Vue {
    private gridPage: number = 0;
    private intervalId!: number;

    public get roomList() {
      return patrolData.slice(this.gridPage * 16, this.gridPage * 16 + 16);
    }

    public get total() {
      return patrolData.length;
    }

    public get warning() {
      return patrolData.filter((item) => item.warning).length;
    }

    public nextPage() {
      this.gridPage = (this.gridPage + 1) % Math.ceil(patrolData.length / 16);
    }

    private mounted() {
      if (!this.intervalId) {
        this.intervalId = window.setInterval(() => {
          this.nextPage();
        }, 10000);
      }
    }

    private beforeDestory() {
      if (this.intervalId) {
        window.clearInterval(this.intervalId);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .patrol-box {
    position: absolute;
    top: 571px;
    right: 58px;
    width: 575px;
    height: 450px;
    background: url("img/box-bg2.png") no-repeat center;
    padding: 20px;
  }

  .summary {
    text-align: left;
    margin-left: 32px;

    .count {
      text-align: center;
      display: inline-block;
      font-family: PMZD, "Microsoft YaHei", sans-serif;
      font-weight: bold;
      font-size: 28px;
      color: aqua;
      width: 40px;
    }

    .warning-count {
      color: red;
    }
  }

  .place-grid {
    display: flex;
    flex-wrap: wrap;
  }

  .place-cell {
    flex: 0 0 25%;
    height: 90px;
    background: url("img/008.png") no-repeat center;
  }

  .warning-cell {
    background: url("img/010.png") no-repeat center;
  }

  .place-name {
    display: inline-block;
    margin-top: 22px;
    text-shadow: 1px 1px 1px black;
  }
</style>
