<template>
  <div class="block-wrapper">
    <div class="title">{{name}}数</div>
    <div class="number">{{getCommaNumber(count)}}<span>{{unit}}</span></div>
    <div class="bg">
      <img :src="bgImage"/>
    </div>
    <div v-show="showToday" class="today">今日新增{{name}}:{{todayAdd}}{{unit}}</div>
    <slot name="today"></slot>
    <el-popover
      placement="bottom"
      :title="name + '数说明'"
      width="200"
      trigger="hover"
      :content="introduce">
      <span slot="reference" class="introduce fa fa-question"></span>
    </el-popover>
  </div>
</template>

<script>
  import {getCommaNumber} from '../common/utils'
  export default {
    name: 'dashblock',
    props: {
      name: String,
      unit: String,
      count: {
        type: Number,
        default: 0
      },
      todayAdd: {
        type: Number,
        default: 0
      },
      bgImage: {
        type: String,
        default: ''
      },
      introduce: String,
      showToday: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        getCommaNumber
      }
    },
    methods: {}
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.block-wrapper
  background: #fff
  position: relative
  padding: 16px 16px 0 16px
  width: 100%
  box-sizing: border-box
  .title
    color: #999999
    font-size: 14px
  .number
    font-size: 30px
    color: #000000
    padding: 10px 0
    margin-bottom: 50px
    span
      font-size: 18px
      display: inline-block
      margin-left: 5px
      font-weight: 500
      vertical-align: middle
  .bg
    position: absolute
    bottom: 32px
    padding: 10px 0 1px 0
    border-bottom: 1px solid #d8d8d8
    img
      width: 100%
  .today
    font-size: 14px
    padding: 10px 0
    color: #4A4A4A
  .introduce
    position: absolute
    font-size: 16px
    right: 16px
    top: 16px
    color: #999999
    display: inline-block
    border: 2px solid #999999
    width: 18px
    height: 18px
    line-height: 18px
    border-radius: 50%
    text-align: center
    &:hover
      cursor: pointer
</style>
