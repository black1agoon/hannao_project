<template>
  <div class="dash-wrapper">
    <canvas ref="canvas" :width="width" :height="width">
    </canvas>
    <div class="percent">{{percent}}%</div>
    <div class="text">{{text}}</div>
  </div>
</template>

<script>
  export default {
    name: 'dash-progress',
    props: {
      width: {
        type: Number,
        default: 240
      },
      barWidth: {
        type: Number,
        default: 13
      },
      percent: {
        type: Number,
        default: 0
      },
      color: {
        type: String,
        default: '#02A9FA'
      },
      text: {
        type: String,
        default: '当前开机率'
      },
      bgAngle: {
        type: Number,
        default: 270
      }
    },
    computed: {
      context() {
        return this.$refs.canvas.getContext('2d')
      },
      degValue() {
        return this.percent / 100 * this.bgAngle
      },
      radius() {
        return this.width / 2
      }
    },
    data() {
      return {
        deg: Math.PI / 180
      }
    },
    methods: {
      drawBg() {
        this.context.clearRect(0,0, 240, 240)
        this.context.beginPath()
        this.context.translate(this.radius, this.radius)
        this.context.moveTo(0, 0)
        this.context.rotate(this.bgAngle / 2 * this.deg)
        this.context.save()
        this.context.arc(0, 0, this.radius, 0, this.bgAngle * this.deg)
        this.context.fillStyle = '#052841'
        this.context.fill()
      },
      drawVal() {
        this.context.restore()
        this.context.beginPath()
        this.context.moveTo(0, 0)
        // this.context.rotate(140 * this.deg)
        this.context.arc(0, 0, this.radius, 0, this.degValue * this.deg)
        this.context.fillStyle = this.color
        this.context.fill()
      },
      drawMask() {
        this.context.beginPath()
        this.context.arc(0, 0, this.radius - this.barWidth, 0, 360 * this.deg)
        this.context.fillStyle = '#060B12'
        this.context.fill()
      },
      drawNumber() {
        this.context.rotate(-this.bgAngle / 2 * this.deg)
        this.context.translate(-120, -100)
        let nums = [
          {value: 0, x: 60, y: 160},
          {value: 25, x: 40, y: 80},
          {value: 50, x: 110, y: 30},
          {value: 75, x: 180, y: 80},
          {value: 100, x: 160, y: 160},
        ]
        nums.forEach(num => {
          this.context.beginPath()
          this.context.fillStyle = '#42E4FB'
          this.context.font = 'normal 15px arial'
          this.context.fillText(num.value, num.x, num.y)
          this.context.closePath()
        })
        this.context.translate(0, -20)
      },
      drawSplit() {
        // 秒刻度
        for (var i = 0; i < 80; i++) {
          this.context.save()
          if (i > 18) {
            this.context.rotate(3 * (i + 1) * Math.PI / 120)
            this.context.beginPath()
            this.context.lineWidth = 2
            this.context.strokeStyle = '#42E5FB'
            this.context.moveTo(0, -100)
            this.context.lineTo(0, -90)
            this.context.stroke()
            this.context.closePath()
          }
          this.context.restore()
        }
      },
      drawPin() {
        let img = new Image()
        img.onload = () => {
          this.context.save()
          this.context.translate(122, 113)
          this.context.rotate((135 / 50 * this.percent - 135) * this.deg)
          this.context.drawImage(img, -4, -70, 8, 73)
          this.context.restore()
        }
        img.src = require('../../assets/img/mainview/icon_pointer.png')
      }
    },
    mounted() {
    },
    watch: {
      percent: {
        handler: function () {
          this.$nextTick(() => {
            this.drawBg()
            this.drawVal()
            this.drawMask()
            this.drawSplit()
            this.drawNumber()
            this.drawPin()
          })
        },
        immediate: true
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .dash-wrapper
    position: relative
    width: 240px

    .percent
      position: absolute
      width: 100%
      top: 200px
      color: #51FFFF
      font-size: 36px
      font-weight: bold
      text-align: center

    .text
      position: absolute
      width: 100%
      top: 240px
      font-size: 22px
      color: #5FC1EE
      text-align: center
</style>