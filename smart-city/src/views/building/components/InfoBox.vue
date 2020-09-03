<template>
  <div class="info-box">
    <div class="status-line" v-for="line in info" :key="line.name" v-if="line.list !== false">
      <div class="status-name highlight-color">{{ line.name }}：</div>
      <div class="status-content" :style="{ color: line.color }">
        {{ line.content }}
      </div>
    </div>
    <div class="border-arrow border-arrow-left"></div>
    <div class="border-arrow border-arrow-right"></div>
    <slot></slot>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';

  @Component
  export default class InfoBox extends Vue {
    @Prop()
    public info!: any;
  }
</script>

<style scoped lang="scss">
  .info-box {
    display: inline-block;
    padding: 10px 20px;
    margin-bottom: 10px;
    border: 1px solid aqua;
    background: #1D208866;
    position: absolute;
    width: 240px;

    .status-name {
      text-align: left;
      min-width: 80px;
    }

    .status-line {
      line-height: 24px;
      display: flex;

      .status-content {
        text-align: left;
        flex: 1;
      }

      &::after {
        content: '';
        display: table;
        clear: both;
      }
    }

    .border-arrow {
      position: absolute;
      width: 12px;
      height: 40px;
    }

    .border-arrow-left {
      background: url("../img/003.png") no-repeat center;
      top: 0;
      left: -7px;
    }

    .border-arrow-right {
      background: url("../img/004.png") no-repeat center;
      bottom: 0;
      right: -6px;
    }
  }
</style>
