<template>
  <status-box :title="title" :no-scroll="true">
    <table class="table-list">
      <thead class="table-head">
      <tr>
        <th v-for="field in fields" :key="field.name">
          {{ field.label }}
        </th>
      </tr>
      </thead>
      <tbody class="table-body">
      <tr class="table-row" v-for="(row, idx) in dataRows" :key="idx" @click="onRowClick(row, idx)">
        <td v-for="field in fields" :key="field.name"
            :style="{ color: field.color && row.color }">
          {{ row[field.name] }}
        </td>
      </tr>
      </tbody>
    </table>
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
  export default class TableList extends Vue {
    @Prop()
    public title!: string;

    @Prop()
    public statusList!: any[];

    public get fields() {
      return (this.statusList ? (this.statusList as any).fields : []) || [];
    }

    public get dataRows() {
      return (this.statusList ? (this.statusList as any).rows : []) || [];
    }

    public onRowClick(row: any, idx: number) {
      this.$emit('row-click', row, idx);
    }
  }
</script>

<style scoped lang="scss">
  .status-box {
    padding: 36px 22px;
  }

  .table-list {
    padding: 10px 0 20px 0;
    width: 100%;
  }

  .table-head tr {
    background: rgb(3, 68, 129);
    height: 42px;
  }

  .table-body {
    tr {
      height: 38px;
      background-color: rgb(4, 44, 87, 0.2);

      &:nth-child(even) {
        background-color: rgb(4, 44, 87);
      }
    }
  }

  table {
    -webkit-border-vertical-spacing: 0;
    -webkit-border-horizontal-spacing: 0;
  }
</style>
