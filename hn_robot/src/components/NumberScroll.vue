<template>
  <div class="number" ref="box">
    <div v-if="number"
         ref="digit"
         class="digit-container"
         :data-show="number">
      <span class="num"
            v-for="idx of 10"
            :key="idx">
        {{idx - 1}}
      </span>
    </div>
    <div v-else></div>
  </div>
</template>

<script>
  export default {
    name: 'number-scroll',
    props: {
      number: {
        type: String,
        default: ''
      }
    },
    methods: {
      animation() {
        let box = this.$refs.box
        let height = box.clientHeight
        let digit = this.$refs.digit
        if (digit) {
          let num = parseInt(digit.getAttribute('data-show'))
          let scrollTop = 0
          scrollTop = height * num
          digit.style.marginTop = -scrollTop + 'px'
        }
      }
    },
    watch: {
      number: {
        immediate: true,
        handler: function () {
          this.$nextTick(() => {
            this.animation()
          })
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .number
    overflow: hidden
    display: flex
    justify-content: center
    width: 96px
    height: 138px
    background-image: url("../assets/img/numberbox.png")
    background-size: 96px 138px
    background-repeat: no-repeat
    font-family: Teko
    color: #4F4466
    .digit-container
      width: 96px
      text-align: center
      overflow: hidden
      position: relative
      transition: all 1.5s
      margin-top: 0
      .num
        display: inline-block
        width: 96px
        height: 138px
        line-height: 150px
        font-weight: bold
        font-size: 100px
</style>