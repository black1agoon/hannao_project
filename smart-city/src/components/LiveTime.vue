<template>
  <div class="live-time">{{ timeLabel }}</div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';

  @Component
  export default class LiveTime extends Vue {

    @Prop({ default: 30 })
    public interval!: number;

    public get timeLabel() {
      return [
        this.currentTime.getFullYear() + '年',
        this.currentTime.getMonth() + 1 + '月',
        this.currentTime.getDate() + '日 ',
        this.currentTime.getHours() + ':',
        this.currentTime.getMinutes(),
      ].join('');
    }

    private currentTime: Date = new Date();

    private intervalId: number = 0;

    private mounted() {
      if (!this.intervalId) {
        window.setInterval(() => {
          this.currentTime = new Date();
        }, this.interval * 1000);
      }
    }

    private beforeDestroy() {
      if (this.intervalId) {
        window.clearInterval(this.intervalId);
      }
    }
  }
</script>

<style scoped>
  .live-time {
    font-size: 28px;
    line-height: 36px;
  }
</style>
