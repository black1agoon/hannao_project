<template>
  <div class="light-setting"
       :style="getSettingPos"
       v-show="show">
    <div :class="['arrow', arrowLeft]" :style="getArrowPos"></div>
    <div class="light-wrap">
      <div :class="['pic', getTypeClass]"></div>
      <div class="lights">
        <div class="big-lamp">
          <div class="lamp"></div>
          <div class="name">大灯</div>
          <switch-on-off
              @trigger="trigger"
              v-model="value.bigStatus">
          </switch-on-off>
        </div>
        <move-bar class="move-bar" v-model="value.bigIntensity"
                  @trigger="trigger">
        </move-bar>
        <div class="small-lamp">
          <div class="lamp"></div>
          <div class="name">小灯</div>
          <switch-on-off
              @trigger="trigger"
              v-model="value.smallStatus">
          </switch-on-off>
        </div>
        <move-bar class="move-bar" v-model="value.smallIntensity"
                  @trigger="trigger">
        </move-bar>
      </div>
    </div>
  </div>
</template>

<script>
  import SwitchOnOff from './SwitchOnOff'
  import MoveBar from './MoveBar'
  import api from '@/api'

  export default {
    name: 'map-setting',
    components: {
      SwitchOnOff,
      MoveBar
    },
    props: {
      map: {
        type: Object,
        default: () => ({
          width: 0,
          height: 0
        })
      },
      posX: {
        type: Number,
        default: 0
      },
      posY: {
        type: Number,
        default: 0
      },
      value: {
        type: Object,
        default: () => ({})
      }
    },
    computed: {
      arrowLeft() { // 获取箭头的方向，左边 还是 右边
        return this.posX * this.map.width + 268 > this.map.width ? 'right' : 'left'
      },
      getArrowPos() {  // 获取箭头的位置
        if (this.posY * this.map.height + 180 > this.map.height) {
          return {
            bottom: this.map.height - this.posY * this.map.height - 5 + 'px'
          }
        } else if (this.posY * this.map.height - 50 < 0) {
          return {
            top: this.posY * this.map.height - 5 + 'px'
          }
        } else {
          return {
            top: 45 + 'px'
          }
        }
      },
      getSettingPos() {
        let x = this.posX * this.map.width + 268 > this.map.width ? this.posX * this.map.width - 268 : this.posX * this.map.width + 18
        let y = ''
        if (this.posY * this.map.height - 50 < 0) {
          y = 0
        } else if (this.posY * this.map.height + 180 > this.map.height) {
          y = this.map.height - 230
        } else {
          y = this.posY * this.map.height - 50
        }

        return {
          left: x + 'px',
          top: y + 'px'
        }
      },
      getTypeClass() {
        if (this.value.bigStatus === '1' && this.value.smallStatus === '1') {
          return 'type1'
        } else if (this.value.bigStatus === '1' && this.value.smallStatus === '0') {
          return 'type2'
        } else if (this.value.bigStatus === '0' && this.value.smallStatus === '1') {
          return 'type3'
        } else {
          return 'type4'
        }
      }
    },
    data() {
      return {
        show: false
      }
    },
    methods: {
      judge(event) {
        if (this.show) {
          let e = event || window.event
          let ele = this.$el
          if (ele.contains(e.target)) {
            return false
          } else {
            this.hideSetting()
          }
        }
      },
      showSetting() {
        this.show = true
      },
      hideSetting() {
        this.show = false
      },
      trigger() {
        api.light.control([this.value]).then(() => {
          this.$message({
            message: '设置成功!',
            type: 'success'
          })
          this.$emit('reload')
        }).catch(() => {
        })
      }
    },
    mounted() {
      document.addEventListener('click', this.judge)
    },
    destroyed() {
      document.removeEventListener('click', this.judge)
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .light-setting
    position: absolute
    z-index: 30
    width: 250px
    height: 230px
    border-radius: 4px
    box-shadow: 0 1px 2px #999
    background: #ffffff
    /*margin-left: 18px*/
    .arrow
      position: absolute
      z-index: 30
      width: 10px
      height: 10px
      background-color: #ffffff
      transform-origin: center center
      transform: rotate(-45deg) skew(10deg, 10deg)
      &.left
        box-shadow: -1px -1px 1px 0 #999
        left: -5px
      &.right
        right: -5px
        box-shadow: 1px 1px 1px 0 #999
    .light-wrap
      width: 250px
      height: 230px
      position: relative
      display: flex
      align-items: center
      &:hover
        .delete
          display: block
      .pic
        margin: 0 5px
        flex: 0 0 60px
        height: 184px
        background-size: 60px 184px
        background-repeat: no-repeat
        &.type1
          background-image: url("../../../../assets/img/lightstatus1.png")
        &.type2
          background-image: url("../../../../assets/img/lightstatus2.png")
        &.type3
          background-image: url("../../../../assets/img/lightstatus3.png")
        &.type4
          background-image: url("../../../../assets/img/lightstatus4.png")
      .lights
        flex: 1
        margin: 0 30px 0 10px
        border: 1px solid #999
        border-radius: 4px
        .big-lamp, .small-lamp
          display: flex
          margin-top: 10px
          /*justify-content: space-around*/
          .lamp
            width: 10px
            height: 13px
            margin: 3px 5px 0 15px
            background-image: url("../../../../assets/img/lamp.png")
            background-size: 10px 13px
            background-repeat: no-repeat
          .name
            width: 30px
            font-size: 14px
            color: #000
            line-height: 20px
            margin-right: 7px
          .lamp-check
            margin-left: 8px
        .move-bar
          margin-top: 5px
          margin-left: 20px
          margin-bottom: 10px
      .master-switch
        position: absolute
        bottom: 0
        right: 0
</style>