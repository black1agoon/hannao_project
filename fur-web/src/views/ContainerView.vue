<template>
  <el-container class="content-wrapper">
    <el-header height="40px">
      <nav-bar>
      </nav-bar>
    </el-header>
    <el-container>
      <side-menus></side-menus>
      <el-main>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </el-main>
      <quick-panel></quick-panel>
    </el-container>
  </el-container>
</template>

<script>
  import NavBar from '@/components/header/NavBar'
  import SideMenus from '@/components/sidebar/SideMenus'
  import QuickPanel from '@/components/panel/QuickPanel'

  export default {
    name: 'ContainerView',
    components: { NavBar, SideMenus, QuickPanel },
  }
</script>

<style lang="sass" scoped>
  @import "src/theme/index"

  .content-wrapper
    width: 100%
    height: 100%
    position: relative
    overflow: hidden

    .el-header
      padding: 0
      flex: 0 0 40px
      @include theme-group('navbar')

    .el-main
      padding: 0
      width: calc(100% - 200px)

    .el-container
      overflow: hidden
</style>

<style lang="sass">
  .el-aside
    border-right: 1px solid #e4e7ed
</style>
