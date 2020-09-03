<template>
  <div class="number-box" ref="box"
       :style="{
       height: height + 'px',
       fontSize: fontSize + 'px',
       color: color,
       fontFamily: fontFamily
       }">
    <template v-for="(ss, index) in numArray">
      <div v-if="parseInt(ss) >= 0"
           :key="index"
           ref="digit"
           class="digit-container"
           :style="{width: fontWidth + 'px'}"
           :data-show="ss">
        <span v-for="idx of 10"
              :key="idx"
              :style="{
                fontWeight: isBold ? 'bold' : 'normal',
                width: fontWidth + 'px',
                height: height + 'px',
                lineHeight: height + 'px'
              }">
          {{idx - 1}}
        </span>
      </div>
      <div v-else
           :key="'sign' + index"
           class="sign-box">
        <span :style="{fontWeight: isBold ? 'bold' : 'normal',}">{{ss}}</span>
      </div>
    </template>
  </div>
</template>

<script>
  import {setNumberByThree} from '../../assets/js/utils'
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
      fontWidth: {
        type: Number,
        default: 20
      },
      isBold: {
        type: Boolean,
        default: true
      },
      color: {
        type: String,
        default: '#fff'
      },
      fontFamily: {
        type: String,
        default: 'PingFang'
      },
      splitDotted: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      numArray() {
        return this.splitDotted ? setNumberByThree(this.number) : this.number + ''
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
        let boxs = this.$refs.digit
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
  .number-box
    overflow: hidden
    display: flex
    justify-content: center
    span
      display: inline-block
    .digit-container
      text-align: center
      overflow: hidden
      position: relative
      transition: all 1.5s
      margin-top: 0
    .sign-box
      span
        width: 15px
</style>