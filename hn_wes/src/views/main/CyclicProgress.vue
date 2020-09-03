<template>
  <canvas ref="canvas" width="160" height="160">
  </canvas>
</template>

<script>
  export default {
    name: 'cyclic-progress',
    props: {
      percent: {
        type: Number,
        default: 73
      },
      color: {
        type: String,
        default: '#02A9FA'
      }
    },
    data() {
      return {
        deg: Math.PI / 180
      }
    },
    computed: {
      context() {
        return this.$refs.canvas.getContext('2d')
      },
      degValue() {
        return this.percent / 100 * 360
      }
    },
    methods: {
      drawBg() {
        this.context.beginPath()
        this.context.translate(80, 80)
        this.context.moveTo(0, 0)
        this.context.rotate(-90 * this.deg)
        this.context.arc(0, 0, 80, 0, 360 * this.deg)
        this.context.fillStyle = '#052841'
        this.context.fill()
      },
      drawVal() {
        this.context.beginPath()
        this.context.moveTo(0, 0)
        this.context.arc(0, 0, 80, 0, this.degValue * this.deg)
        this.context.fillStyle = this.color
        this.context.fill()
      },
      drawMask() {
        this.context.beginPath()
        this.context.arc(0, 0, 68, 0, 360 * this.deg)
        this.context.fillStyle = '#031028'
        this.context.fill()
      }
    },
    mounted() {
      this.drawBg()
      this.drawVal()
      this.drawMask()
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>