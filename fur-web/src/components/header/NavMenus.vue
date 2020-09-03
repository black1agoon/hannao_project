<template>
  <div class="nav-menus">
    <transition-group name="tab-list" class="tab-list">
      <a class="recent-tab" v-for="tab in recent" :key="tab.path"
         :class="{ active: tab.path === $route.fullPath }"
         @click="changeView(tab)">
        {{ tab.name }}
      </a>
    </transition-group>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'NavMenus',
    computed: mapState('router', ['recent']),
    methods: {
      changeView(menu) {
        this.$store.dispatch('menus/navigate', menu.path);
      },
    },
  }
</script>

<style scoped lang="scss">
  @import "../../theme/index";

  .nav-menus {
    display: inline-block;
    margin: 0 15px;
    padding-top: 1px;
    flex: 1;
  }

  a {
    line-height: 40px;
    font-weight: bold;
    text-decoration: none;
    margin-right: 12px;
    @include theme-group('navbar', ('color'));

    &:hover,
    &.router-link-exact-active {
      @include theme-prop('color', 'color-highlight');
    }
  }

  .tab-list {
  }
  .recent-tab {
    font-size: 14px;
    background: #00adff33;
    padding: 2px 8px;
    border-radius: 8px;
    cursor: pointer;
    transition: all .8s;
    display: inline-block;
    line-height: 22px;
    margin-top: 6px;
    user-select: none;

    &.active {
      background: #a0cfff88;
    }
  }
</style>

