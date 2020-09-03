<template>
  <status-box :title="title" @title="onTitle">
    <div class="block-list">
      <div class="status-item" v-for="(item, idx) in statusList" :key="idx">
        <div class="status-line" v-for="line in item" :key="line.name" v-if="line.list !== false">
          <div class="status-name highlight-color">{{ line.name }}：</div>
          <div class="status-content" :style="{ color: line.color }">
            {{ line.content }}
          </div>
        </div>
      </div>
    </div>
  </status-box>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import StatusBox from './StatusBox.vue';

  @Component({
    components: {
      StatusBox,
    },
  })
  export default class BlockList extends Vue {
    @Prop()
    public title!: string;

    @Prop()
    public statusList!: any[];

    public onTitle() {
      this.$emit('select', this.title);
    }
  }
</script>

<style scoped lang="scss">
  .block-list {
    display: flex;
    flex-direction: column;
    padding: 20px 5px;
  }

  .status-item {
    flex: 1;
    background: url("../img/15.png") no-repeat top left, url("../img/16.png") no-repeat bottom right;
    padding: 10px 20px;
    margin-bottom: 10px;

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
  }
</style>
