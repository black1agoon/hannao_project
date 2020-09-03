<template>
  <div id="app" :class="themeClass">
    <router-view/>
    <la-table-columns-setting shared></la-table-columns-setting>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { mapGetters } from 'vuex';
  import LaTableColumnsSetting from '@/components/base/LaTableColumnsSetting.vue';

  export default Vue.extend({
    name: 'App',
    components: {
      LaTableColumnsSetting
    },
    computed: mapGetters('settings', ['themeClass']),
    mounted(): void {
      this.$store.dispatch('user/load');
    },
  });
</script>

<style lang="scss">
  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    min-width: 800px;
  }

  * {
    font-family: Helvetica, Tahoma, Arial, "PingFang SC", "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
    box-sizing: border-box;
  }
</style>
