<template>
  <div class="container font-pr">
    <div class="top">
      <div class="top_l fl font-br">龙潇出入库管理中心</div>
      <div class="top_m fl font-pm">原材料仓</div>
      <div class="top_r fr font-pm">浙江汉脑数码科技有限公司版权所有</div>
    </div>
    <div class="fl">
      <div class="side_t">
        <div class="side_ts">
          <h3 class="font-br">正在入库</h3>
          <!-- <p>LOADING...</p> -->
        </div>
        <!-- <div class="fl side_no">
          <p>第</p>
          <p class="cur2">10</p>
          <p>箱</p>
        </div>-->
      </div>

      <div class="side_b"></div>
    </div>
    <div class="fl column_r">
      <div class="column_c">
        <table class="table font-pr" cellspacing="10">
          <thead>
          <tr>
            <th>序号</th>
            <th>条码号</th>
            <th>原材料名称</th>
            <th>数量</th>
            <th>单位</th>
          </tr>
          </thead>
        </table>
        <vue-seamless-scroll
            :data="list"
            :class-option="defaultOption"
            style="height:810px; overflow:hidden;"
        >
          <table class="table" cellspacing="10">
            <tr v-for="(item,index) in list" :key="index">
              <td>{{item.No}}</td>
              <td>{{item.code}}</td>
              <td>{{item.title}}</td>
              <td>{{item.amount}}</td>
              <td>{{item.unit}}</td>
            </tr>
          </table>
        </vue-seamless-scroll>
      </div>
    </div>
  </div>
</template>

<script>
  import vueSeamlessScroll from 'vue-seamless-scroll'

  export default {
    components: { vueSeamlessScroll },
    data () {
      return {
        editModel: {
          show: false,
        },
        editDate: {},
        list: [
          {
            No: '1',
            code: '001',
            title: 'MBV88678LC4',
            amount: '3000',
            unit: 'kg',
          },
          {
            No: '2',
            code: '001',
            title: 'MBV88678LC4',
            amount: '3000',
            unit: 'kg',
          },
          {
            No: '3',
            code: '001',
            title: 'MBV88678LC4',
            amount: '3000',
            unit: 'kg',
          },
          {
            No: '4',
            code: '001',
            title: 'MBV88678LC4',
            amount: '3000',
            unit: 'kg',
          },
          {
            No: '5',
            code: '001',
            title: 'MBV88678LC4',
            amount: '3000',
            unit: 'kg',
          },
          {
            No: '5',
            code: '001',
            title: 'MBV88678LC4',
            amount: '3000',
            unit: 'kg',
          },
          {
            No: '5',
            code: '001',
            title: 'MBV88678LC4',
            amount: '3000',
            unit: 'kg',
          },
          {
            No: '5',
            code: '001',
            title: 'MBV88678LC4',
            amount: '3000',
            unit: 'kg',
          },
          {
            No: '5',
            code: '001',
            title: 'MBV88678LC4',
            amount: '3000',
            unit: 'kg',
          },
          {
            No: '5',
            code: '001',
            title: 'MBV88678LC4',
            amount: '3000',
            unit: 'kg',
          },
          {
            No: '5',
            code: '001',
            title: 'MBV88678LC4',
            amount: '3000',
            unit: 'kg',
          },
          {
            No: '5',
            code: '001',
            title: 'MBV88678LC4',
            amount: '3000',
            unit: 'kg',
          },
          {
            No: '5',
            code: '001',
            title: 'MBV88678LC4',
            amount: '3000',
            unit: 'kg',
          },
          {
            No: '5',
            code: '001',
            title: 'MBV88678LC4',
            amount: '3000',
            unit: 'kg',
          },
        ],
      }
    },
    computed: {
      defaultOption () {
        return {
          limitMoveNum: this.list.length,
          direction: 1,
        }
      },
    },
    methods: {},

    created () {
    },
  }
</script>

<style lang="scss" scoped>
  .container {
    // background-color: #09152b;
    background: url("../assets/img/store-loading/bgs.png") no-repeat;
    width: 1920px;
    height: 1080px;
   
    // font-family: "Alibaba PuHuiTi", sans-serif;

    .column_r {
      // margin-right:25px;
      margin-top: -50px;
      margin-left: 100px;

      .column_c {
        background: url("../assets/img/store-loading/bgr.png") no-repeat;
        height: 923px;
        width: 1017px;

        .table {
          width: 100%;

          thead {
            th {
              height: 75px;
              width: 20%;
              overflow: hidden;
              color: #94f0fd;
              font-size: 30px;
              font-weight: normal;
            }
          }

          td {
            text-align: center;
            font-size: 28px;
            height: 75px;
            width: 20%;
            overflow: hidden;
           
          }
        }
      }
    }

    .fl {
      float: left;
    }

    .fr {
      float: right;
    }

    .top {
      background: url("../assets/img/store-loading/top.png") no-repeat;
      height: 135px;
      overflow: hidden;
      color: #ccf2ff;

      .top_l {
        line-height: 120px;
        font-size: 50px;
        margin-right: 1em;
        padding-left: 20px;
        // font-family: "PuHuiTi B","sans-serif";
        // font-weight: bold;
      }

      .top_m {
        border: solid 2px #3371c2;
        background: -webkit-linear-gradient(to top, #06235c, #011b4e);
        background: linear-gradient(to top, #06235c, #011b4e);
        padding: 10px 15px;
        margin-top: 18px;
        font-size: 43px;
      }

      .top_r {
        font-size: 21px;
        margin-right: 60px;
      }
    }

    .side_t {
      background: url("../assets/img/store-loading/sets.png") no-repeat;
      height: 150px;
      width: 575px;
      margin-top: -18px;
      padding-top: 4em;
      overflow: hidden;
      color: #dbf0ff;
      margin-left: 20px;
      padding-left: 125px;

      .side_ts {
        text-align: center;
        // padding-left: 11.5em;
        // padding-top: 20px;

        // width: 445px;
        h3 {
          font-size: 34px;
        }

        p {
          font-size: 13px;
        }
      }

      .side_no {
        p {
          float: left;
          display: block;
          font-size: 24px;
          line-height: 100px;

          .cur2 {
            width: 125px;
            text-align: right;
            font-size: 70px;
            margin-right: 12px;
            line-height: 90px;
          }
        }
      }
    }

    .side_b {
      // border: solid 6px #3A83B5;
      //  background: linear-gradient(-135deg, transparent 20px, #FFF 0);
      background: url("../assets/img/store-loading/cards.png") no-repeat 0 -22px;
      width: 720px;
      height: 758px;
      margin-top: 35px;
      margin-left: 55px;
      position: relative;
    }
  }

</style>

