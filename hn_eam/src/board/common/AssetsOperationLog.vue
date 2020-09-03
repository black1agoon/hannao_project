<template>
  <div class="asset-line">
    <div class="label">{{label}}</div>
    <div class="record-wrap">
      <ul :style="{top: recordTop + 'px'}" :class="['wrap', {transitionTop: isActive}]">
        <li class="record" v-for="(li, index) in logList" :key="index">
          <div class="desc">
            <span class="ctt">{{li.toDo}}</span>
            <i class="new" v-if="index === 0 || index === listLength - 1"></i>
          </div>
          <div class="time">{{li.createTimeStr}}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'assets-operation-log',
    props: {
      label: {
        type: String,
        default: ''
      },
      logList: {
        type: Array,
        default: () => []
      }
    },
    computed: {
      listLength() {
        return this.logList.length
      }
    },
    data() {
      return {
        timer: null,
        recordTop: 0, // 公告top值
        isActive: true // 是否显示transitionTop动画
      }
    },
    methods: {
      scroll() {
        clearInterval(this.timer)
        if (this.listLength > 2) {
          let index = 1
          let len = this.listLength
          this.timer = setInterval(() => {
            this.isActive = true
            this.recordTop = -30 * index
            index++
            if (index === len) {          // 滚动到底部时返回
              let delayTime = setTimeout(() => {
                this.isActive = false
                this.recordTop = 0
                index = 1
                clearTimeout(delayTime)
              }, 1000)
            }
          }, 2000)
        }
      }
    },
    mounted() {
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .asset-line
    width: 538px
    height: 40px
    display: flex
    margin: 5.6px 0 11.2px 20px
    background-image: url("../static/img/assetchange.png")
    background-size: 538px 40px
    background-repeat: no-repeat
    .label
     width: 110px
     height: 40px
     line-height: 40px
     text-align: center
     font-size: 18px
     color: #ffffff
     margin-left: 10px
    .record-wrap
      width: 415px
      height: 30px
      margin-top: 5px
      overflow: hidden
      .transitionTop
        transition: top 200ms ease-in-out
      .wrap
        position: relative
        top: 0
        .record
          display: flex
          width: 415px
          color: #ffffff
          /*align-items: flex-end*/
          .desc
            margin-left: 15px
            display: flex
            flex: 1
            .ctt
              white-space: nowrap
              overflow: hidden
              text-overflow: ellipsis
              max-width: 280px
              height: 30px
              line-height: 30px
            .new
              display: inline-block
              width: 23px
              height: 12px
              background-image: url("../static/img/new.png")
              background-size: 23px 12px
              background-repeat: no-repeat
              vertical-align: top
              margin-top: 5px
              margin-left: 10px
          .time
            width: 90px
            text-align: center
            font-size: 14px
            color: rgba(0, 246, 255, 1)
            height: 30px
            line-height: 30px
</style>