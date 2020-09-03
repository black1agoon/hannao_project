<template>
  <div class="order-area pos">
    <div class="area-border pos"></div>
    <div class="area-title pos font-pr">{{ title }}</div>
    <div class="top-counts pos font-pr">
      <div class="count pending"> {{ pendingOrders }}
        <div class="tip">待生产订单</div>
      </div>
      <div class="count producing"> {{ orderStatus.producing }}
        <div class="tip">生产中订单</div>
      </div>
      <div class="count overdue"> {{ orderStatus.overdue }}
        <div class="tip">逾期订单</div>
      </div>
    </div>
    <div class="order-list pos">
      <page-slider :page.sync="page" :total-page="totalPage" :duration="10000">
        <div class="order-row" v-for="(order, idx) in pagedOrders" :key="idx">
          <div class="order-info">
            <div class="info-row code">
              <div class="info-name">任务号</div>
              <div class="info-content">{{ order.code }}</div>
            </div>
            <div class="info-row customer">
              <div class="info-name">客户</div>
              <div class="info-content">{{ order.customer }}</div>
            </div>
            <div class="info-row product">
              <div class="info-name">产品</div>
              <div class="info-content">{{ order.product }}</div>
            </div>
          </div>
          <div class="order-progress font-pr" :class="{ warning: order.status > 0 }">
            <div class="pg-title">
              <span class="pg-name">进度</span>
              <span class="pg-numbers">{{ order.finished | formatNum }}/{{ order.total | formatNum }}</span>
            </div>
            <div class="pg-hod">
              <span class="pg-name">交期</span>
              <span class="pg-numbers">{{ order.hod }}</span></div>
            <div class="bg-bar pos"></div>
            <div class="pg-bar pos" :style="{width: order.percent }"></div>
          </div>
        </div>
      </page-slider>
    </div>
  </div>
</template>

<script>
  import PageSlider from './PageSlider'
  import { mapGetters, mapState } from 'vuex'

  export default {
    name: 'OrderArea',
    components: {
      PageSlider,
    },
    data () {
      return {
        title: '订单及生产信息',
        page: 0,
      }
    },
    computed: {
      ...mapState('productionModule', ['orderStatus', 'orderList']),
      ...mapGetters('productionModule', ['pendingOrders']),
      orders () {
        return this.orderList.map(od => ({
          ...od,
          percent: od.finished / od.total * 100 + '%',
        }))
      },
      pagedOrders () {
        return this.orders.slice(this.page * 4, (this.page + 1) * 4)
      },
      totalPage () {
        return Math.ceil(this.orderList.length / 4)
      }
    },
  }
</script>

<style scoped lang="scss">
  @import "../../styles/area";

  .area-border {
    left: 1988px;
    top: 80px;
    width: 51px;
    height: 501px;
    background: url("../../assets/img/home/group 395.png");
  }

  .area-title {
    left: 2058px;
    top: 64px;
  }

  .top-counts {
    left: 2019px;
    top: 118px;
    width: 521px;
    height: 112px;
    background: rgba(0, 12, 64, .5);
    border-radius: 10px;
    display: flex;
    color: #CCF2FF;
    padding: 0 40px;

    .count {
      flex: 1;
      height: 100%;
      font-size: 40px;
      padding-top: 18px;
      font-weight: bold;

      &.overdue {
        color: #FFEF00;
      }

      .tip {
        font-size: 12px;
        color: #CCF2FF;
      }
    }
  }

  .order-list {
    left: 2014px;
    top: 250px;
    width: 526px;
    height: 313px;

    .order-row {
      margin: 0 0 5px 5px;
      display: flex;
    }

    .order-info {
      flex: 0 0 195px;
      height: 66px;
      background: rgba(0, 12, 64, .5);
      border-radius: 10px;
      display: flex;
      flex-direction: column;
      padding: 4px 4px 0 20px;

      .info-row {
        flex: 1;
        display: flex;
        text-align: left;
        white-space: nowrap;
        line-height: 16px;

        .info-content {
          font-size: 14px;
          color: #CCF2FF;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .info-name {
          flex: 0 0 48px;
          color: #6E86B7;
          font-size: 10px;
        }
      }
    }

    .order-progress {
      flex: 1;
      margin-left: 16px;
      color: #CCF2FF;
      font-size: 16px;
      position: relative;

      .pg-numbers {
        font-weight: bold;
      }

      &.warning .pg-numbers {
        color: #FB0162;
      }

      .pg-name {
        font-size: 10px;
        color: #6E86B7;
        margin-right: 8px;
      }

      .pg-title {
        float: left;
        margin-top: 8px;
      }

      .pg-hod {
        float: right;
        margin-top: 8px;
      }

      .pg-bar {
        top: 39px;
        height: 8px;
        background: linear-gradient(90deg, #102858, #00FFE2);
        border-radius: 21px;
      }

      &.warning .pg-bar {
        background: linear-gradient(90deg, #102858, #FF0062);
      }

      .bg-bar {
        top: 40px;
        width: 100%;
        height: 6px;
        background: #29395F;
        border-radius: 21px;
      }
    }
  }
</style>
