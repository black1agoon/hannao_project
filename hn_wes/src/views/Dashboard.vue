<template>
  <ul class="dash-wrapper">
    <li>
      <router-link to="/mainview">指挥中心
      </router-link>
    </li>
    <li>
      <router-link to="/ranklist">职业水平竞技排行榜
      </router-link>
    </li>
    <li>
      <router-link to="/storageconsole">威尔斯数字化仓储控制台
      </router-link>
    </li>
    <li>
      <router-link to="/productionprogress">生产进度监控
      </router-link>
    </li>
    <!--<li>-->
      <!--<router-link to="/stockinagv">入库-AGV-->
      <!--</router-link>-->
    <!--</li>-->
    <li>
      <router-link to="/checkshop">前检车间数据展示
      </router-link>
    </li>
    <li>
      <router-link to="/backshop">后检车间
      </router-link>
    </li>
    <li>
      <router-link to="/workshop">定型车间小组生产力
      </router-link>
    </li>
    <li>
      <router-link to="/workequip">车间设备运行监控台
      </router-link>
    </li>
  </ul>
</template>

<script>
  export default {
    name: 'dashboard'
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.dash-wrapper
  position: absolute
  width: 1920px
  height: 1080px
  box-sizing: border-box
  padding: 100px 0 0 100px
  li
    margin: 50px
</style>