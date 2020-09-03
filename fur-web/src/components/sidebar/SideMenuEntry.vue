<template>
  <div>
    <el-submenu v-if="isFolder" :index="index">
      <div slot="title">
        <i v-if="isFaIcon" class="fa fa-fw" :class="menu.icon"></i>
        <i v-else-if="menu.icon" class="custom-icon"
           :style="{ backgroundImage: `url(${menu.icon})` }">
        </i>
        <el-icon v-else name="menu"></el-icon>
        <span v-if="!collapsed">{{ menu.name }}</span>
      </div>
      <side-menu-entry v-for="(subMenu, subIdx) in menu.subMenus" :key="subIdx"
                       :index="[index, subIdx].join()" :menu="subMenu">
      </side-menu-entry>
    </el-submenu>
    <el-menu-item v-else :index="index" @click="changeView">
      <div slot="title">
        <i v-if="isFaIcon" class="fa fa-fw" :class="menu.icon"></i>
        <i v-else-if="menu.icon" class="custom-icon"
           :style="{ backgroundImage: `url(${menu.icon})` }">
        </i>
        <el-icon v-else name="empty"></el-icon>
        <span v-if="!collapsed">{{ menu.name }}</span>
      </div>
    </el-menu-item>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({
    name: 'SideMenuEntry',
    props: {
      index: {
        type: [String, Number],
        required: true,
      },
      menu: {
        type: Object,
        required: true,
      },
      collapsed: {
        type: Boolean,
      },
    },
    computed: {
      isFolder(): boolean {
        return this.menu.type === '0';
      },
      isFaIcon(): boolean {
        return this.menu?.icon?.startsWith('fa-');
      },
    },
    methods: {
      changeView() {
        this.$store.dispatch('router/active', this.menu);
      },
    },
  });
</script>

<style lang="scss" scoped>
  ::v-deep .el-submenu__title,
  .el-submenu .el-menu-item {
    height: 40px;
    line-height: 40px;
    padding: 0 45px;
    min-width: 200px;
  }

  .fa {
    margin-right: 6px;
  }

  .custom-icon {
    display: inline-block;
    width: 24px;
    height: 18px;
    margin-right: 5px;
    text-align: center;
    vertical-align: middle;
    background-size: contain;
    background-position: center center;
    background-repeat: no-repeat;
  }
</style>
