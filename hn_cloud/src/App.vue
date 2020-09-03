<template>
  <div class="wrapper" id="app">
    <header-view v-if="showHeader"></header-view>
    <!--<keep-alive>-->
      <router-view class="main"></router-view>
    <!--</keep-alive>-->
    <footer-view v-if="showFooter"></footer-view>
  </div>
</template>

<script>
  import HeaderView from './components/common/HeaderView'
  import FooterView from './components/common/FooterView'
  export default {
    name: 'app',
    components: {
      HeaderView,
      FooterView
    },
    computed: {
      showHeader() {
        return this.$route.name !== 'development'
      },
      showFooter() {
        return this.$route.name !== 'login'
      }
    },
    mounted() {
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  #app
    font-family: "Microsoft YaHei"
    font-weight: normal
  .wrapper
    min-width: 1400px
    display: flex
    min-height: 100vh
    flex-flow: column
    .main
      flex: 1
</style>
<style>
  * {
    margin: 0;
    padding: 0;
  }
  a {
    color: #7e8c8d;
    text-decoration: none;
    -webkit-backface-visibility: hidden;
  }

  li {
    list-style: none;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  input[type="number"]{
    -moz-appearance: textfield;
  }
</style>