<template>
  <div class="box" ref="box"
       :style="{
       height: height + 'px',
       fontSize: fontSize + 'px',
       color: color,
       fontFamily: fontFamily
       }">
    <template v-for="(ss, index) in numArray">
      <div v-if="parseInt(ss) >= 0"
           :key="index"
           class="digit-container"
           :data-show="ss">
        <span v-for="idx of 10"
              :key="idx"
              :style="{height: height + 'px', lineHeight: height + 'px'}">
          {{idx - 1}}
        </span>
      </div>
      <div v-else
           :key="'sign' + index"
           class="sign-box">
        <span>{{ss}}</span>
      </div>
    </template>
  </div>
</template>

<script>
  export default {
    name: 'number-scroll',
    props: {
      number: {
        type: Number,
        default: 0
      },
      height: {
        type: Number,
        default: 40
      },
      fontSize: {
        type: Number,
        default: 40
      },
      color: {
        type: String,
        default: '#fff'
      },
      fontFamily: {
        type: String,
        default: 'Teko-Medium'
      }
    },
    computed: {
      numArray() {
        return this.number + ''
      }
    },
    data() {
      return {
      }
    },
    methods: {
      animation() {
        let box = this.$refs.box
        let height = box.clientHeight
        let boxs = document.getElementsByClassName('digit-container')
        for (let i = 0; i < boxs.length; i++) {
          let num = parseInt(boxs[i].getAttribute('data-show'))
          let scrollTop = 0
          scrollTop = height * num
          boxs[i].style.marginTop = -scrollTop + 'px'
        }
      }
    },
    mounted() {
    },
    watch: {
      'number'() {
        this.$nextTick(() => {
          this.animation()
        })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .box
    overflow: hidden
    display: flex
    justify-content: center
    span
      display: inline-block
      width: 20px
    .digit-container
      width: 20px
      text-align: center
      overflow: hidden
      position: relative
      transition: all 1.5s
      margin-top: 0
    .sign-box
      span
        width: 15px
</style>