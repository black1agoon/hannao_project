<template>
  <svg width="1920" height="1080" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="Gradient1" x1="0" y1="1" x2="0" y2="0">
        <stop offset="0%" stop-color="rgba(112, 112, 112, .1)"/>
        <stop offset="70%" stop-color="rgba(112, 112, 112, 1)"/>
        <stop offset="100%" stop-color="#61FFFF"/>
      </linearGradient>
      <linearGradient id="Gradient2" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="rgba(112, 112, 112, .1)"/>
        <stop offset="70%" stop-color="rgba(112, 112, 112, 1)"/>
        <stop offset="100%" stop-color="#61FFFF"/>
      </linearGradient>
    </defs>
    <!--<path d="M20,230 Q40,205 50,230 T90,230" fill="none"  stroke="url(#Gradient2)" stroke-width="5"/>-->
    <polyline v-for="(line, index) in LINES"
              :key="index"
              class="polyline"
              :stroke="`url(#Gradient${line.type})`"
              :points="line.path"
              stroke-linecap="round"
              fill="none"
              stroke-width="2"/>
  </svg>
</template>

<script>
  const LINES = [
    {
      path: '485 860 666 677 666 660 715 610', // 下方4条
      type: 1
    }, {
      path: '834 660 661 833',
      type: 2
    }, {
      path: '668 883 792 763 792 755 815 732 825 731 868 687',
      type: 1
    }, {
      path: '766 873 822 812 822 792 897 709',
      type: 1
    }, {
      path: '572 382 640 412 660 402 755 442',  // 左侧3条
      type: 2
    }, {
      path: '634 276 748 328',
      type: 2
    }, {
      path: '704 248 749 269 762 261 812 280',
      type: 2
    }, {
      path: '1044 170 1007 202 995 203 983 213',  // 上方4条
      type: 2
    }, {
      path: '1115 182 1052 241',
      type: 2
    }, {
      path: '1120 266 1156 227 1158 214 1194 179',
      type: 1
    }, {
      path: '1292 230 1226 294 1223 317 1174 373',
      type: 2
    }, {
      path: '1180 586  1375 681', // 右侧2条
      type: 2
    }, {
      path: '1330 711 1253 673 1235 678 1151 635',
      type: 1
    }
  ]
  export default {
    name: 'lines-flash',
    data() {
      return {
        LINES
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '../../assets/stylus/animation.styl'
  svg
    position: absolute
    top: 0
  .polyline
    stroke-dasharray: 1000
    stroke-dashoffset: 1000
    animation: dash 2s linear none infinite
</style>