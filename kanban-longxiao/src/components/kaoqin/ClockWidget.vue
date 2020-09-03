<template>
  <div ref="area" class="clockArea">
    <div class="cssClock">
      <div :style="{ transform: 'rotate('+(hour+63)+'deg)' }" :class="hourNeedle"></div>
      <div :style="{ transform: 'rotate('+(min-50)+'deg)' }" :class="minNeedle"></div>
      <div :class="clockDot"></div>
      <div :class="clockBack"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ClockWidget',
    data () {
      return {
        prefixCss: 'jhc-', // css 前缀
        cssClock: { //整个钟的盒子
          position: 'absolute',
          width: '100%',
          height: '100%',
          borderRadius: '50%',
        },
        cssDotWrap: { //装刻度的盒子
          width: '100%',
          height: '100%',
        },
        cssDot: { //刻度们
          position: 'absolute',
          backgroundColor: '#509fef',
        },
        longDot: { //长刻度
          width: '3px',
          height: '10px',
        },
        shourtDot: { //短刻度
          width: '1px',
          height: '5px',
        },
        timer: null, //用来标记自适应大小的timer
        updateTimer: null, // 更新时钟的timer
        style: {
          bottom: '1px',
        }, //时钟的title的style
        scale: 0.8, // 时钟占外层的百分比
        currTime: new Date(), //当前日期对象
      }
    },
    created () {
      this.currTime = new Date()
      clearInterval(this.updateTimer)
      this.updateTimer = setInterval(() => {
        this.currTime = new Date()
      }, 1000)
    },
    mounted () {
      //设置时钟的大小
      this.setSize()
    },
    beforeDestroy () {
      clearInterval(this.updateTimer)
    },
    methods: {
      //设置钟表的型号大小
      setSize () {
        let width = this.getWidth()
        let height = this.getHeight()
        //时钟占外层的百分比
        let scale = this.scale
        //获取较短边
        let shortLth = width
        if (width > height) {
          shortLth = height
        }
        //对时钟的直径做处理
        shortLth = shortLth * scale
        //获取到顶部和左部的距离
        let paddingW = (width - shortLth) / 2
        let paddingH = (height - shortLth) / 2
        //设置钟表整体的大小以及位置
        this.setStates('cssClock', {
          height: height + 'px',
          width: width + 'px',
          top: paddingH + 'px',
          left: paddingW + 'px',
        })
        //设置长短刻度的半径,以及尺寸
        let dotRadius = shortLth * 0.75 / 2 - 1
        let longDotWidth = Math.floor(dotRadius / 25) || 2
        let longDotHeight = Math.floor(dotRadius / 8) || 6
        let shortDotWidth = Math.floor(dotRadius / 50) || 1
        let shortDotHeight = Math.floor(dotRadius / 16) || 3
        //短刻度
        this.shourtDot = {
          width: shortDotWidth + 'px',
          height: shortDotHeight + 'px',
        }
        //长刻度
        this.longDot = {
          width: longDotWidth + 'px',
          height: longDotHeight + 'px',
        }
        //设置刻度旋转点的位置
        this.setStates('cssDot', {
          transformOrigin: `${0}px ${dotRadius}px`,
        })

      },
      getWidth () { //获取指定容器的宽度
        return this.getRef('area').offsetWidth || 200
      },
      getHeight () { //获取指定容器的高度
        return this.getRef('area').offsetHeight || 200
      },
      getRef (ref) { // 获取指定 ref 对象
        return this.$refs && this.$refs[ref] || {}
      },
      //模仿 react 的states
      setStates (prop, data) {
        let cache = this[prop]
        this[prop] = Object.assign({}, cache, JSON.parse(JSON.stringify(data)))
      },
    },
    computed: {
      sec () { //将当前秒数转化为秒针旋转的度数
        return this.currTime.getSeconds() * 6
      },
      min () { //将当前的分钟数转化为分针旋转的度数
        return this.currTime.getMinutes() * 6 + this.currTime.getSeconds() / 60 * 6
      },
      hour () { //将当前的小时数转化为时针旋转的度数
        return this.currTime.getHours() * 30 + this.currTime.getMinutes() / 60 * 30
      },
      hourNeedle () { //时针的class
        return `${this.prefixCss}hour-needle`
      },
      minNeedle () { //分针的class
        return `${this.prefixCss}min-needle`
      },
      clockArea () { //表盘的区域
        return `${this.prefixCss}clock-area`
      },
      clockBack () { //时钟的背景（外框图片）
        return `${this.prefixCss}clock-back`
      },
      clockTitle () { //时钟的title的class
        return `${this.prefixCss}clock-title`
      },
      clockDot () { //时钟的中心点
        return `${this.prefixCss}clock-dot`
      },
    },
  }
</script>

<style scoped>
  .jhc-hour-needle {
    transform: rotate(63deg);
    width: 121px;
    height: 62px;
    z-index: 5;
    position: absolute;
    left: 170px;
    top: 230px;
    transform-origin: 96px 49px;
    background: url('../../assets/img/kaoqin/hourPoint.png') no-repeat;
    background-size: 100% 100%;
  }

  .clockArea {
    position: absolute;
    left: 53px;
    top: 90px;
    width: 772px;
    height: 888px;
  }

  .cssClock {
    position: absolute;
    width: 547px;
    height: 557px;
    border-radius: 50%;
    top: 59.7px;
    left: 54.7px;
  }

  .jhc-min-needle {
    transform: rotate(-50deg);
    z-index: 2;
    width: 150px;
    height: 128px;
    position: absolute;
    left: 245px;
    top: 170px;
    transform-origin: 21px 109px;
    background: url('../../assets/img/kaoqin/minPoint.png') no-repeat;
    background-size: 100% 100%;
  }

  .jhc-clock-area {
    width: 547px;
    height: 557px;
    position: relative;
  }

  .jhc-clock-back {
    z-index: 999;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    background: url('../../assets/img/kaoqin/clockBack.png') no-repeat;
    background-size: 100% 100%;
  }

  .jhc-clock-title {
    color: #fff;
    position: absolute;
    bottom: 10px;
    width: 100%;
    text-align: center;
    font-weight: bold;
  }

  .jhc-clock-dot {
    width: 13px;
    height: 13px;
    border-radius: 50%;
    position: absolute;
    background-color: #001C5F;
    z-index: 20;
    left: 260px;
    top: 273px;
  }
</style>
