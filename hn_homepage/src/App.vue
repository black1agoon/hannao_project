<template>
  <div id="app">
    <header-page>
    </header-page>
    <div class="wrap">
      <router-view/>
    </div>
    <footer-page>
    </footer-page>
  </div>
</template>
<script>
  import HeaderPage from './components/header/Header'
  import FooterPage from './components/footer/Footer'

  export default {
    name: 'App',
    components: {
      HeaderPage,
      FooterPage
    },
    methods: {
      changeHeaderColor() {
        let header = this.$children[0].$refs.header
        header.style.background = '#D69823'
      },
      initHeaderColor() {
        let header = this.$children[0].$refs.header
        header.style.background = 'rgba(20,22,33,0.14)'
      }
    },
    mounted() {
    }
  }
</script>
<style lang="stylus" scoped>
  *
    font-family: SourceHanSansSC, HYWenHei, Microsoft YaHei;

  #app // stickyfooter
    display: flex
    flex-flow: column
    min-height: 100vh
    min-width: 1200px
    .wrap
      flex: 1
      width: 100%
</style>
