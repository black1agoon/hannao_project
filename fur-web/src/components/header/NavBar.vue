<template>
  <div class="nav-bar">
    <nav-logo></nav-logo>
    <nav-menus></nav-menus>
    <user-menus></user-menus>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import NavLogo from './NavLogo.vue';
  import NavMenus from './NavMenus.vue';
  import UserMenus from './UserMenus.vue';

  export default Vue.extend({
    name: 'NavBar',
    components: {
      NavLogo,
      NavMenus,
      UserMenus,
    },
  });
</script>

<style lang="scss" scoped>
  .nav-bar {
    position: fixed;
    z-index: 2;
    width: 100%;
    text-align: left;
    height: 40px;
    overflow: hidden;
    display: flex;

  }
</style>
