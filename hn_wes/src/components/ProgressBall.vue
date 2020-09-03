<template>
  <canvas ref="canvas" width="800" height="800">
  </canvas>
</template>

<script>

  const MASK_COLOR = '#09152B'
  const GradientLess_from = '#FF5A73'
  const GradientLess_to = '#FFC63C'
  const GradientMore_from = '#009B83'
  const GradientMore_to = '#49EB55'
  const SHADOW_COLOR = '#3A4455'
  export default {
    name: 'progress-ball',
    props: {
      data: {
        type: Array,
        default: () => []
      },
      wishdata: {
        type: Array,
        default: () => []
      }
    },
    computed: {
      context() {
        return this.$refs.canvas.getContext('2d')
      },
      max() {
        return Math.max(...this.data)
      },
      filldata() {
        return this.data.concat(Array.from({length: this.monthday - this.data.length}, () => {
          return Math.floor(Math.random() * (2 * this.max / 3 - (this.max / 3) + 1) + this.max / 3)
        }))
      },
      piece() {
        return 360 / this.monthday
      }
    },
    data() {
      return {
        monthday: 30,
        // data: [1500, 1600, 700, 1800, 900, 500],
        // wishdata: [1400, 1800, 1000, 1500, 800, 800],
        radius: 300, // 圆的半径
        splitradius: 180,  // 遮挡圆的半径
        deg: Math.PI / 180
      }
    },
    methods: {
      drawNumbers() {
        for (let i = 0; i < this.monthday; i++) {
          this.context.beginPath();
          this.context.save();
          this.context.rotate(this.piece * i * this.deg)
          this.context.textAlign = 'center'

          this.context.fillStyle = '#94F0FD'
          this.context.font = "normal 35px arial"
          this.context.fillText(i + 1, 0, -320)

          this.context.restore()
          this.context.closePath()
        }
      },
      ites(index, val) {
        this.context.beginPath()
        this.context.save()
        this.context.moveTo(0, 0)
        this.context.rotate(-90 * this.deg)
        if (index < this.data.length) {
          let rGradient = this.context.createRadialGradient(0, 0, (this.splitradius + ((this.max - val) / this.max * (this.radius - this.splitradius))), 0, 0, this.radius)
          rGradient.addColorStop(0, this.data[index] > this.wishdata[index] ? GradientMore_to : GradientLess_to)
          rGradient.addColorStop(1, this.data[index] > this.wishdata[index] ? GradientMore_from : GradientLess_from)
          this.context.fillStyle = rGradient
        } else {
          this.context.fillStyle = SHADOW_COLOR
        }

        this.context.arc(0, 0, this.radius, this.rads(this.piece * index - 0.5), this.rads(this.piece * (index + 1)), false)

        this.context.closePath()
        this.context.fill()
        this.context.restore()
      },
      itesMask(index, r) {
        this.context.beginPath()
        this.context.save()
        this.context.moveTo(0, 0)
        this.context.rotate(-90 * this.deg)

        this.context.fillStyle = MASK_COLOR
        this.context.arc(0, 0, r, this.rads(this.piece * index - 1), this.rads(this.piece * (index + 1) + 0.5), false)

        this.context.closePath()
        this.context.fill()
        this.context.restore()
      },
      drawText(index, val, wishval) {
        // let value = val > wishval ? val : wishval
        let value = val
        this.context.beginPath()
        this.context.save()
        this.context.rotate(this.piece * index * this.deg)
        this.context.textAlign = 'center'
        this.context.fillStyle = 'white'
        this.context.font = "normal 15px arial"
        let height = val > wishval ? val : wishval
        this.context.fillText(value, 0, -(this.splitradius + ((this.max - height) / this.max * (this.radius - this.splitradius))) + 20)
        this.context.restore()
        this.context.closePath()
      },
      drawDottedLine(index, val) {
        this.context.beginPath()
        this.context.save()
        this.context.rotate(-90 * this.deg)
        this.context.strokeStyle = 'white'
        this.context.setLineDash([5, 6])
        this.context.arc(0, 0, (this.splitradius + ((this.max - val) / this.max * (this.radius - this.splitradius))), this.rads(this.piece * index), this.rads(this.piece * (index + 1)), false)

        this.context.stroke()
        this.context.restore()
      },
      rads(x) {
        return Math.PI / 180 * (x - this.piece / 2)
      }
    },
    mounted() {
    },
    watch: {
      'data'() {
        this.monthday = this.data.length
        this.context.beginPath()
        this.context.translate(400, 400)
        this.context.save()
        this.context.fillStyle = 'rgb(9,21,43)'
        this.context.shadowColor = 'rgb(9,26,58)'
        this.context.shadowOffsetX = 0
        this.context.shadowOffsetY = 0
        this.context.shadowBlur = 100
        this.context.arc(0, 0, 300, 0, 2 * Math.PI)
        this.context.stroke()
        this.context.fill()
        this.context.restore()

        this.drawNumbers()  // 画日期

        for (let i = 0; i < this.filldata.length; i++) {
          this.ites(i, this.filldata[i])
          this.itesMask(i, this.splitradius + ((this.max - this.filldata[i]) / this.max * (this.radius - this.splitradius)))
        }
        for (let i = 0; i < this.filldata.length; i++) { // 与上面分开写是为了，防止一块覆盖另一块
          if (this.filldata[i] !== 0) {
            this.drawText(i, this.filldata[i], this.wishdata[i]) // 画数值
            this.drawDottedLine(i, this.wishdata[i])                       // 画虚线
          }
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>