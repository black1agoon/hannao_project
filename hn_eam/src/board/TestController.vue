<template>
  <div class="notice">
    <!--<img src="./img/notice.png" alt="">-->
    <div class="wrap">
      <ul :style="{top: noticeTop + 'px'}" :class="{transitionTop: isActive}">
        <li v-for="(item, index) in noticeList" :key="index">{{item.phone}}抽中{{item.prizeName}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'dash-board',
    components: {},
    computed: {
      noticeLen() { // 公告列表长度
        return this.noticeList.length
      }
    },
    data() {
      return {
        noticeTop: 0, // 公告top值
        isActive: true, // 是否显示transitionTop动画
        timer: null, // 公告滚动定时器
        noticeList: [{
          phone: '135****1234',
          prizeName: '50元还款券'
        }, {
          phone: '135****1234',
          prizeName: '60元还款券'
        }, {
          phone: '135****1234',
          prizeName: '70元还款券'
        }, {
          phone: '135****1234',
          prizeName: '50元还款券'
        }], // 公告列表
      }
    },
    methods: {
      noticeScroll() { // 公告滚动，定时改变公告的top值
        if (this.noticeLen > 0) {
          let index = 1
          // let len = this.noticeLen === 1 ? 3 : (this.noticeLen + 1)
          let len = this.noticeLen
          this.timer = setInterval(() => {
            this.isActive = true;
            this.noticeTop = -30 * index;
            index++;
            if (index === len) {// 滚动到底部时返回
              let delayTime = setTimeout(() => {
                this.isActive = false;
                this.noticeTop = 0;
                index = 1;
                clearTimeout(delayTime);
              }, 1000);
            }
          }, 2000)
        }
      }
    },
    mounted() {
      this.noticeScroll();
    },
    destroyed() {
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .notice
    display: flex
    justify-content: center
    padding-bottom: .26rem
    height: 500px
    .wrap
      /*position: relative*/
      height: 30px
      overflow: hidden
      margin-left: 30px
      font-size: 30px
      color: #391b03
      margin-top: 200px
      border: 1px solid #000
    ul
      position: relative
      top: 0
      li
        height: 30px
        line-height: 30px
    .transitionTop
      transition: top 200ms ease-in-out
</style>