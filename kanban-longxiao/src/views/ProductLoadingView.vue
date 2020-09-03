<template>
  <div class="container font-pr">
    <div class="top">
      <div class="top_l fl font-br">龙潇出入库管理中心</div>
      <div class="top_m fl font-pm">成品仓</div>
      <div class="top_r fr font-pm">浙江汉脑数码科技有限公司版权所有</div>
    </div>
    <div class="fl">
      <div class="side_t">
        <div class="side_ts">
 <h3 class="font-br">正在入库</h3>
          <p class="font-br">LOADING...</p>
        </div>
        <div class="side_no">
 <p>第</p>
          <p class="cur2 font-dw">
            10
            <!-- <span class="form-control font-dw">10000</span> -->
          </p>
          <p>箱</p>
        </div>
       
      </div>

      <div class="side_b"></div>
    </div>
    <div class="fl column_r">
      <div>
        <span @click="handle" style="margin-right:20px">出库异常</span>
        <span @click="completed($event)">入库完成</span>
      </div>
      <div class="column_c">
        <table class="table font-pr" cellspacing="10">
          <thead>
          <tr>
            <th>序号</th>
            <th>箱条码</th>
            <th>款号</th>
            <th>数量</th>
          </tr>
          </thead>
        </table>
        <vue-scroll
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
            </tr>
          </table>
        </vue-scroll>
      </div>
    </div>
    <!-- 层 -->
    <el-model :editModel="editModel" :editDate="editDate" id="divs"></el-model>
    <err-model :editErrModel="editErrModel" :editErrDate="editErrDate"></err-model>
  </div>
</template>

<script>
  import ElModel from '../components/store-loading/Model'
  import ErrModel from '../components/store-loading/ErrModel'
  import vueScroll from 'vue-seamless-scroll'

  export default {
    name: 'HomeView',
    components: { ElModel, ErrModel, vueScroll },
    data () {
      return {
        value: 100000,
        editModel: {
          show: false,
        },
        editErrModel: {
          show: false,
        },
        editDate: {},
        editErrDate: {
          dates: [],
        },
        lists: [
          {
            No: '1',
            code: '001',
            title: 'MBV88678LC4',
            amount: '3000',
            unit: '不在入库单中',
            // nounit: "不在入库单中"
          },
          {
            No: '2',
            code: '001',
            title: 'MBV88678LC4',
            amount: '3000',
            unit: '不在入库单中',
          },
          {
            No: '3',
            code: '001',
            title: 'MBV88678LC4',
            amount: '3000',
            unit: '不在入库单中',
          },
          {
            No: '4',
            code: '001',
            title: 'MBV88678LC4',
            amount: '3000',
            unit: '不在入库单中',
          },
          {
            No: '5',
            code: '001',
            title: 'MBV88678LC4',
            amount: '3000',
            unit: '不在入库单中',
          },
        ],
        list: [
          {
            No: '1',
            code: '001',
            title: 'MBV88678LC4',
            amount: '3000',
          },
          {
            No: '2',
            code: '001',
            title: 'MBV88678LC4',
            amount: '3000',
          },
          {
            No: '3',
            code: '001',
            title: 'MBV88678LC4',
            amount: '3000',
          },
          {
            No: '4',
            code: '001',
            title: 'MBV88678LC4',
            amount: '3000',
          },
          {
            No: '5',
            code: '001',
            title: 'MBV88678LC4',
            amount: '3000',
          },
          {
            No: '5',
            code: '001',
            title: 'MBV88678LC4',
            amount: '3000',
          },
          {
            No: '5',
            code: '001',
            title: 'MBV88678LC4',
            amount: '3000',
          },
          {
            No: '5',
            code: '001',
            title: 'MBV88678LC4',
            amount: '3000',
          },
          {
            No: '5',
            code: '001',
            title: 'MBV88678LC4',
            amount: '3000',
          },
          {
            No: '5',
            code: '001',
            title: 'MBV88678LC4',
            amount: '3000',
          },
          {
            No: '5',
            code: '001',
            title: 'MBV88678LC4',
            amount: '3000',
          },
          {
            No: '5',
            code: '001',
            title: 'MBV88678LC4',
            amount: '3000',
          },
          {
            No: '5',
            code: '001',
            title: 'MBV88678LC4',
            amount: '3000',
          },
          {
            No: '5',
            code: '001',
            title: 'MBV88678LC4',
            amount: '3000',
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
    methods: {
      completed () {
        this.editModel = {
          show: true,
        }
      },
      handle () {
        this.editErrModel = {
          show: true,
        }
        this.editErrDate = {
          dates: this.lists,
        }
      },
    },

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
              width: 25%;
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
            width: 25%;
            overflow: hidden;
            color: #fff;
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
        font-weight: bold;
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
      background: url("../assets/img/store-loading/set.png") no-repeat;
      height: 150px;
      width: 675px;
      margin-top: -18px;
      padding-top: 3em;
      overflow: hidden;
      color: #dbf0ff;
      margin-left: 20px;
      display: flex;
      flex-direction:row;
        justify-content: center;

      .side_ts {
         flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 400px;
        padding-left: 10em;
        padding-top: 10px;
        // width: 445px;
        text-align:left;

        h3 {
          font-size: 34px;
        }

        p {
          font-size: 13px;
        }
      }

      .side_no {
        flex-direction: column;
        justify-content: center;
        align-items: center;
        p {
          float: left;
          display: block;
          font-size: 24px;

          line-height: 100px;

          &.cur2 {
            width: 130px;
            
            font-size: 70px;
            margin-right: 12px;
            // margin-left: 12px;
            line-height: 0;
             color: #94f0fd;
             font-size: 70px;
              text-align: right;
             
              line-height: 95px;

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

