<template>
  <div id="app">
    <app-header v-if="showHeader"></app-header>
    <router-view></router-view>
    <app-footer v-if="showHeader"></app-footer>
  </div>
</template>

<script>
  import 'purecss'
  import './assets/css/global.css'
  import './assets/fonts/style.css'
  import AppHeader from './components/partials/AppHeader'
  import AppFooter from './components/partials/AppFooter'

  export default {
    name: 'app',
    components: {
      AppHeader,
      AppFooter
    },
    computed: {
      showHeader () {
        return this.$route.path.indexOf('/m/') !== 0
      }
    }
  }
</script>

<style>
  #app {
    font-family: "Microsoft YaHei", "SimSun", "SimHei", "NSimSun", "FangSong", "KaiTi";
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    min-height: 100%;
    position: relative;
  }
</style>
