<template>
  <window-box ref="window"
              :swiper="true"
              @prev="prev"
              @next="next"
              :current-page="whQuery.page"
              :page-number="whQuery.pageNumber">
    <window-selection
        class="header"
        v-model="whId"
        slot="header"
        @change="selectionChange"
        :options="warehouseOptions">
    </window-selection>
    <div class="container">
      <div class="order-wrap">
        <div class="title">现有库存明细</div>
        <div :class="rowClasses" @animationend="slidingEnd">
          <ul class="table-title">
            <li>序号</li>
            <li class="order">订单</li>
            <li class="no">款号</li>
            <li>花型</li>
            <li>尺码</li>
            <li>数量</li>
            <li class="kw">所在库位</li>
          </ul>
          <ul class="row" v-for="(order,index) in orderList" :key="index">
            <li>{{index + 1}}</li>
            <li class="order">{{order.taskCode}}</li>
            <li class="no">{{order.styleCode}}</li>
            <li>{{order.colorName}}</li>
            <li>{{order.size}}</li>
            <li>{{order.qty | setNumByThree}}</li>
            <li class="kw">{{order.whLocationName}}</li>
          </ul>
        </div>
      </div>
      <div class="pic-wrap">
        <div class="title">本日出入库记录</div>
        <div class="pic-box" ref="picbox">
          <div class="pic" v-for="(pic, index) in picList" :key="index">
            <img :src="getImgPath(pic.picName)"/>
            <span class="type">{{pic.whTypeCh}}</span>
            <span class="time">{{pic.createTime ? pic.createTime.substr(11, 18) : null}}</span>
          </div>
        </div>
      </div>
    </div>
  </window-box>
</template>

<script>
  import WindowBox from './WindowBox'
  import {setNumberByThree, getImgPath} from '../../../assets/js/utils'
  import WindowSelection from './WindowSelection'
  import api from '@/api'

  export default {
    name: 'warehouse-window',
    components: {
      WindowBox,
      WindowSelection
    },
    filters: {
      setNumByThree(num) {
        return setNumberByThree(num)
      }
    },
    computed: {
      rowClasses() {
        return {
          'window-slide-left': this.isSlidingLeft,
          'window-slide-right': this.isSlidingRight,
        }
      }
    },
    data() {
      return {
        getImgPath,
        whId: this.$store.state.whId,
        warehouseOptions: [],
        picQuery: {
          whid: this.$store.state.whId,
          page: 1,
          rows: 10
        },
        whQuery: {
          whid: this.$store.state.whId,
          page: 1,
          rows: 12,
          currentPage: 1,
          pageNumber: 1
        },
        picList: [],
        orderList: [],
        isSlidingLeft: false,
        isSlidingRight: false
      }
    },
    methods: {
      open() {
        this.getAllWarehouse().then(() => {
          this.getTodayWhFlowPic()
          this.getWhdetails()
          this.$refs.window.open()
          this.loadImage()
        })
      },
      close() {
        this.$refs.window.close()
      },
      selectionChange(val) {
        this.picQuery.whid = val
        this.whQuery.whid = val
        this.picList = []
        this.getTodayWhFlowPic()
        this.getWhdetails()
      },
      prev() {
        this.whQuery.page--
        this.isSlidingRight = true
        this.getWhdetails()
      },
      next() {
        this.whQuery.page++
        this.isSlidingLeft = true
        this.getWhdetails()
      },
      getAllWarehouse() {
        return api.Warehouse.getAllWarehouse().then(data => {
          if (data && data.length > 0) {
            this.warehouseOptions = data.map(d => ({
              label: d.name,
              value: d.id
            }))
            if (!this.WhId) {
              this.WhId = this.warehouseOptions[0].value
            }
          }
        })
      },
      getTodayWhFlowPic() {
        api.Spectaculars.getTodayWhFlowPic(this.picQuery).then(data => {
          this.picList = this.picList.concat(data.rows)
        })
      },
      loadImage() {
        let el = this.$refs.picbox
        el.onscroll = () => {
          // console.log(el.scrollHeight, el.clientHeight, el.scrollTop)
          if (el.scrollHeight === el.clientHeight + el.scrollTop) {
            this.picQuery.page++
            this.getTodayWhFlowPic()
          }
        }
      },
      getWhdetails() {
        api.Spectaculars.getWhdetails(this.whQuery).then(data => {
          this.orderList = data.rows
          this.whQuery.pageNumber = Math.round(data.total / this.whQuery.rows)
        })
      },
      slidingEnd() {
        this.isSlidingLeft = false
        this.isSlidingRight = false
      }
    },
    mounted() {
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '../../../assets/stylus/scroll.styl'
  .header
    position: absolute
    left: 26px
    top: -57px

  .container
    height: 866px
    display: flex
    flex-wrap: wrap
    padding: 30px 80px 40px
    box-sizing: border-box
    .order-wrap
      width: 980px
      margin-left: 60px
      overflow: hidden
      .title
        line-height: 73px
        font-size: 26px
        color: #8AEDFF
        border-bottom: 2px solid #14CAEB
      .table-title, .row
        display: flex
        color: #8AEDFF
        font-size: 20px
        .order
          flex: 0 0 200px
        .no, .kw
          flex: 0 0 150px
        li
          margin-top: 35px
          flex: 1
          text-align: center
          white-space: nowrap
          overflow: hidden
          text-overflow: ellipsis
    .pic-wrap
      position: absolute
      right: 120px
      width: 475px
      height: 814px
      background: url("../../../assets/img/main/picbox.png") no-repeat
      background-size: cover
      padding: 0 32px
      box-sizing: border-box
      .title
        line-height: 73px
        font-size: 26px
        color: #8AEDFF
        border-bottom: 2px solid #14CAEB
      .pic-box
        height: 737px
        padding-bottom: 20px
        box-sizing: border-box
        overflow-y: scroll
        &::-webkit-scrollbar
          display: none
        .pic
          height: 220px
          margin-top: 24px
          position: relative
          img
            width: 100%
            height: 100%
          .type
            position: absolute
            font-size: 20px
            color: #8AEDFF
            bottom: 5px
            left: 5px
          .time
            position: absolute
            font-size: 20px
            color: #8AEDFF
            bottom: 5px
            right: 5px
</style>