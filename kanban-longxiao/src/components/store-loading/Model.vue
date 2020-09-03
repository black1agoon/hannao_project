<template>
  <div class="mask font-pm" v-if="editModel.show" @click="editModel.show = false">
    <div class="modal-backdrop" v-show="editModel.show">
      <div class="modal" @click.stop="">
        <div>
          <img src="../../assets/img/store-loading/right.png" alt=""/>
        </div>
        <div class="modal_txt">入库完成</div>
        <div class="modal_con">

          本次入库<span>60</span>箱
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['editModel', 'editDate'],

    watch: {
      // 'editModel'(val){
      //     if(val){
      //         setTimeout(() => {
      //         val.show = false
      //         },1500)
      //     }
      // }
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
        padding-top: 70px;
        padding-bottom: 25px;
        background: url("../../assets/img/store-loading/modal.png") no-repeat;
        background-size: cover;
        height: 711px;
        width: 1155px;
        text-align: center;
        color: #A2D4F8;

        .modal_txt {
          font-size: 80px;

          padding-top: 25px;
          padding-bottom: 35px;
        }

        .modal_con {
          background-color: #06235c;
          width: 650px;
          margin: 0 auto;
          // padding: 15px 0 15px 95px;
          border: solid 2px #3371c2;
          padding-top: 35px;
          padding-bottom: 35px;
          font-size: 40px;
          color: #A2D4F8;

          span {
            padding-left: 45px;
            padding-right: 45px;
            color: #fff;
            font-size: 60px;

          }

          //  #tables{

          //      td{
          //          font-size: 30px;
          //          text-align: left;
          //          span{
          //              font-size: 40px;
          //              color: #fff;
          //              display: inline-block;
          //          }
          //      }
          //  }
        }
      }
    }
  }
</style>
<style>
@import "../../styles/material.scss"
</style>
