<template>
  <div class="mask font-pr" v-if="editErrModel.show" @click="editErrModel.show = false">
    <div class="modal-backdrop" v-show="editErrModel.show">
      <div class="modal" @click.stop="">
        <div class="modal_title">
          <img src="../../assets/img/store-loading/error.png" width="96" height="84" alt=""/>出库异常
        </div>
        <div class="modal_bg">
          <table class="tables" cellspacing="10">
            <thead>
            <tr>
              <th>序号</th>
              <th>箱条码</th>
              <th>款号</th>
              <th>数量</th>
              <th>异常原因</th>
            </tr>
            </thead>
          </table>
          <vue-seamless-scroll
              :data="editErrDate.dates"
              :class-option="defaultOption"
              style="height:370px; overflow:hidden;"
          >
            <table class="tables" cellspacing="10">
              <tr v-for="(item,index) in editErrDate.dates" :key="index">
                <td>{{item.No}}</td>
                <td>{{item.code}}</td>
                <td>{{item.title}}</td>
                <td class="font-pm">{{item.amount}}</td>
                <td>

                  <span style="color:#FF0000">{{item.unit}}</span>
                </td>
              </tr>
            </table>
          </vue-seamless-scroll>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import vueSeamlessScroll from 'vue-seamless-scroll'

  export default {
    props: ['editErrModel', 'editErrDate'],
    components: { vueSeamlessScroll },
    data () {
      return {}
    },
    computed: {
      defaultOption () {
        return {
          limitMoveNum: this.editErrDate.dates.length,
          direction: 1,
        }
      },
    },
  }
</script>
<style scoped lang="scss">
  .mask {
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;

    .modal-backdrop {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      // background-color: rgba(0,0,0,.3);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 2;

      .modal {
        .modal_title {
          font-size: 87px;
          color: #ff0000;
          padding-left: 40px;
          font-weight: bold;
          margin-bottom: 40px;
          text-align:left;

          img {
            margin-right: 40px;
          }
        }

        .modal_bg {
          background: url("../../assets/img/store-loading/errbg.png") no-repeat;

          height: 615px;
          width: 1376px;

          color: #a2d4f8;

          .tables {
            width: 100%;
            padding: 0 55px 0 20px;

            thead {
              th {
                height: 150px;
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
              color: #fff;
              
            }
          }
        }
      }
    }
  }
</style>
