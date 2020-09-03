<template>
  <div class="bar-wrapper" :style="{
    width: width + 'px',
    height: height + 'px'
  }">
    <ul class="columns">
      <li class="column" v-for="(hour, index) in list" :key="index">
        <div class="hour" v-show="showTime">{{hour.hour}}</div>
        <div class="bar-box">
          <div class="bar" :class="{less: hour.amount < lessLevel}" :style="{
            height: maxValue ? (hour.amount / maxValue) * 100 + '%' : 0
          }"></div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'bar-charts',
    props: {
      width: {
        type: Number,
        default: 170
      },
      height: {
        type: Number,
        default: 70
      },
      showTime: {
        type: Boolean,
        default: true
      },
      list: {
        type: Array,
        default: () => []
      }
    },
    computed: {
      maxValue() {
        let list = this.list.slice()
        list.sort((a, b) => b.amount - a.amount)
        return list.length > 0 ? list[0].amount : 0
      }
    },
    data() {
      return {
        lessLevel: 1200
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.bar-wrapper
  .columns
    display: flex
    height: 100%
    justify-content: space-between
    .column
      width: 10px
      display: flex
      flex-direction: column
      .hour
        flex: 0 0 20px
        text-align: center
        color: #ffffff
        font-size: 12px
      .bar-box
        position: relative
        flex: 1
        .bar
          width: 100%
          position: absolute
          bottom: 0
          background:linear-gradient(0deg, rgba(34,101,139,1), rgba(31,235,218,1))
          border-radius: 2px
          &.less
            background:linear-gradient(0deg, rgba(240,86,2,1), rgba(255,198,0,1))
</style>