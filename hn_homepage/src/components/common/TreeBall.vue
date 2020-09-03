<template>
  <div class="ball-wrapper">
    <div class="fn0">
      <img src="../../assets/img/resolution/ecommerce/fn0.png"/>
    </div>
    <div class="icon fn1" @mouseenter="mouseover(0)">
      <img src="../../assets/img/resolution/ecommerce/fn1.png"/>
    </div>
    <div class="icon fn2" @mouseenter="mouseover(1)">
      <img src="../../assets/img/resolution/ecommerce/fn2.png"/>
    </div>
    <div class="icon fn3" @mouseenter="mouseover(2)">
      <img src="../../assets/img/resolution/ecommerce/fn3.png"/>
    </div>
    <div class="icon fn4" @mouseenter="mouseover(3)">
      <img src="../../assets/img/resolution/ecommerce/fn4.png"/>
    </div>
    <div class="icon fn5" @mouseenter="mouseover(4)">
      <img src="../../assets/img/resolution/ecommerce/fn5.png"/>
    </div>
    <div class="icon fn6" @mouseenter="mouseover(5)">
      <img src="../../assets/img/resolution/ecommerce/fn6.png"/>
    </div>
    <div class="icon2 fnline1">
      <img src="../../assets/img/resolution/ecommerce/fnline1.png"/>
    </div>
    <div class="icon2 fnline2">
      <img src="../../assets/img/resolution/ecommerce/fnline2.png"/>
    </div>
    <div class="icon2 fnline3">
      <img src="../../assets/img/resolution/ecommerce/fnline3.png"/>
    </div>
    <div class="icon2 fnline4">
      <img src="../../assets/img/resolution/ecommerce/fnline4.png"/>
    </div>
    <div class="icon2 fnline5">
      <img src="../../assets/img/resolution/ecommerce/fnline5.png"/>
    </div>
    <div class="icon2 fnline6">
      <img src="../../assets/img/resolution/ecommerce/fnline6.png"/>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'tree-ball',
    methods: {
      mouseover(index) {
        this.$emit('ballindex', index)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.ball-wrapper
  width: 1053px
  height: 1012px
  position: relative
  transform: scale(.5)
  transform-origin: 0 0
  .icon
    position: absolute
    transition: all .2s
    &:hover
      transform: scale(1.2)
  .icon2
    position: absolute
  .fn0
    position: absolute
    top: 311px
    left: 335px
    z-index: 10
  .fn1
    top: 31px
    left: 45px
    z-index: 10
  .fn2
    top: 77px
    left: 512px
    z-index: 10
  .fn3
    top: 200px
    left: 759px
    z-index: 10
  .fn4
    top: 630px
    left: 703px
    z-index: 10
  .fn5
    top: 734px
    left: 301px
    z-index: 10
  .fn6
    top: 499px
    left: 99px
    z-index: 10
  .fnline1
    top: 262px
    left: 276px
  .fnline2
    top: 234px
    left: 540px
  .fnline3
    top: 359px
    left: 668px
  .fnline4
    top: 600px
    left: 652px
  .fnline5
    top: 663px
    left: 425px
  .fnline6
    top: 526px
    left: 269px
</style>