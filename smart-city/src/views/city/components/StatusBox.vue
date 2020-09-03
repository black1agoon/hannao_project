<template>
  <div class="status-box" :title="title">
    <div class="box-title highlight-color" @click="onClickTitle">{{ title }}</div>
    <div class="box-content" :class="{ 'no-scroll': noScroll }">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';

  @Component
  export default class StatusBox extends Vue {
    @Prop()
    public title!: string;

    @Prop({ default: false })
    public noScroll!: boolean;

    public onClickTitle() {
      this.$emit('title');
    }
  }
</script>

<style lang="scss" scoped>
  .status-box {
    float: left;
    width: 450px;
    height: 100%;
    background: url("../img/13.png") no-repeat center;
    padding: 36px;
    display: flex;
    flex-direction: column;
  }

  .box-title {
    font-size: 22px;
    letter-spacing: 2px;
    background: url("../img/14.png") no-repeat center;
    cursor: pointer;
  }

  .box-content {
    flex: 1;
    max-height: calc(100% - 28px);
    overflow: auto;

    &.no-scroll {
      overflow: hidden;
    }
  }
</style>
