<template>
  <el-scrollbar wrap-style="overflow-x: hidden;" view-style="height: 100%;">
    <el-menu class="side-menus"
             :unique-opened="true"
             :default-active="activeMenu"
             :collapse="collapsed"
             :collapse-transition="false">
      <side-menu-entry v-for="(menu, idx) in menus" :key="idx"
                       :index="'' + idx" :menu="menu" :collapsed="collapsed">
      </side-menu-entry>
    </el-menu>
  </el-scrollbar>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { mapGetters, mapState } from 'vuex';
  import SideMenuEntry from './SideMenuEntry.vue';

  export default Vue.extend({
    name: 'SideMenus',

    computed: {
      ...mapState('menus', ['collapsed', 'activeMenu']),
      ...mapGetters('menus', ['menus']),
    },

    components: {
      SideMenuEntry,
    },
  });
</script>

<style lang="scss" scoped>
  .side-menus {
    text-align: left;
    max-width: 200px;
    height: 100%;
  }
</style>

<style lang="scss">
  @import "../../styles/side-menus";
</style>
