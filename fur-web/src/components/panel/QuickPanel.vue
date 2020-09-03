<template>
  <el-drawer :visible="opened" :title="title" @close="closeQuickPanel">
    <component :is="content"></component>
  </el-drawer>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { mapState } from 'vuex';

  export default Vue.extend({
    name: 'QuickPanel',

    computed: mapState('quick', ['opened', 'title', 'content']),

    methods: {
      closeQuickPanel() {
        this.$store.commit('quick/close');
      },
    },
  });
</script>

<style scoped>
  ::v-deep .el-drawer__body {
    overflow: hidden;
  }
</style>
