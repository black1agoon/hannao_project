<template>
  <div class="home-wrapper">
    <keep-alive>
      <component :is="currentComponent"></component>
    </keep-alive>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import dashboard from '@/app/dashboard'
  import CompanyDashBoard from '@/app/dashboard/CompanyDashBoard'
  export default {
    name: 'home',
    computed: {
      ...mapState([
        'showdash'
      ])
    },
    data() {
      return {
        currentComponent: null
      }
    },
    methods: {
      getHomePage() { // 设置第一次进入主页显示第一个(多个dashboard的话)
        let dashboards = this.$store.state.dashboards
        // let dashboards = JSON.parse(window.sessionStorage.getItem('dashboards'))
        this.currentComponent = dashboards && dashboards.length > 0 ? dashboard[dashboards[0].template] : null
      },
      getDashBoard() {
        if (this.$store.state.systype === 'company') {
          this.currentComponent = CompanyDashBoard
        } else {
          this.getHomePage()
        }
      }
    },
    mounted() {
      this.getDashBoard()
    },
    watch: {
      'showdash'() {
        this.$router.push('/')
        this.currentComponent = dashboard[this.showdash]
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.home-wrapper
  overflow: auto
  background: #F0F2F5
</style>
