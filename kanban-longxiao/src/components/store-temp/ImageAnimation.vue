<template>
  <div class="wrapper">
    <img class="image" src="../../assets/img/store-main/ruansheng.png">
    <svg class="svg" width="589" height="111" version="1.1" xmlns="http://www.w3.org/2000/svg">
<!--      <defs>-->
<!--        <linearGradient id="Gradient" x1="0" y1="1" x2="0" y2="0">-->
<!--          <stop offset="0%" stop-color="rgba(255,222,0,0.6)"/>-->
<!--          <stop offset="100%" stop-color="rgba(255,222,0,0.6)"/>-->
<!--        </linearGradient>-->
<!--      </defs>-->
      <polyline class="polyline"
                v-for="(path, index) in paths"
                :key="index"
                stroke="rgba(31,235,218,1)"
                :points="path"
                stroke-linecap="round"
                fill="transparent"
                stroke-width="3"/>
    </svg>
  </div>
</template>

<script>
  export default {
    name: 'image-animation',
    data() {
      return {
        paths: [
          '34 19 34 74 63 25 66 74 89 21 93 47 102 78 556 75 570 78',
          '34 19 34 74 63 25 66 74 89 21 93 47 102 78 285 77 285 95',
          '34 19 34 74 63 25 66 74 89 21 93 47 102 78 347 77 347 95',
          '34 19 34 74 63 25 66 74 89 21 93 47 102 78 412 76 412 95',
          '34 19 34 74 63 25 66 74 89 21 93 47 102 78 472 76 472 95',
          '34 19 34 74 63 25 66 74 89 21 93 47 102 78 538 76 538 95',
        ]
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.wrapper
  position: relative
  .svg
    position: absolute
    top: 0
    left: 0
    .polyline
      stroke-dasharray: 1000
      stroke-dashoffset: 1000
      animation: dash 3s linear forwards infinite
@keyframes dash {
  to {
    stroke-dashoffset: 0
  }
}
</style>