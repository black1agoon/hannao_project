<template>
  <status-box :title="title">
    <div class="simple-list">
      <div class="status-item" v-for="item in statusList" :key="item.name">
        <div class="status-name">{{ item.name }}</div>
        <div class="status-value highlight-color">
          {{ item.value }}<span class="status-unit">{{ item.unit }}</span>
        </div>
        <div class="status-delta" v-html="deltaStyle(item.delta)"></div>
      </div>
    </div>
  </status-box>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import StatusBox from './StatusBox.vue';
  import Colors from '@/config/colors';

  @Component({
    components: {
      StatusBox,
    },
  })
  export default class SimpleList extends Vue {
    @Prop()
    public title!: string;

    @Prop()
    public statusList!: any[];

    public deltaStyle(delta: number) {
      const [color, symbol] = delta > 0 ? [Colors.red, '+'] : delta < 0 ? [Colors.green, '-'] : ['white', ''];
      return `<span style="color: ${color}">${delta}%${symbol}</span>`;
    }

  }
</script>

<style scoped lang="scss">
  .simple-list {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 20px;
  }

  .status-item {
    display: flex;
    white-space: nowrap;
    flex: 1;
    line-height: 32px;
  }

  .status-name {
    flex-basis: 30%;
    text-align: left;
    font-size: 18px;
    letter-spacing: 2px;
    padding-top: 4px;
  }

  .status-value {
    font-size: 32px;
    font-family: "PMZD", "Microsoft YaHei", serif;
  }

  .status-unit {
    font-size: 22px;
    font-weight: normal;
  }

  .status-delta {
    font-size: 18px;
    font-family: "PMZD", "Microsoft YaHei", serif;
    padding: 6px 0 0 20px;
  }
</style>
