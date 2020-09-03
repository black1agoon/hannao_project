<template>
  <div id="print">
    <div class="wrapper"
         v-for="(barcode, index) in barcodeList"
         :key="index">
      <span class="size">{{barcode.size}}</span>
      <div class="barcode-box">
        <svg width="300" height="50" :id="'barcode' + index"></svg>
        <div class="barcode">{{barcode.barCode}}</div>
      </div>
      <div class="text text1">100%REAL FUR</div>
      <div class="icon-box">
        <img src="./print_icon1.png"/>
        <img src="./print_icon2.png"/>
        <img src="./print_icon3.png"/>
        <img src="./print_icon4.png"/>
        <img src="./print_icon5.png"/>
      </div>
      <div class="text">CLEAN ONLY IN</div>
      <div class="text">SPECIALIZED CENTERS</div>
      <div class="text text1">ALLEENTE DEHANDELEN</div>
      <div class="text">DOOR SPECIALIST</div>
    </div>
  </div>
</template>

<script>
  import printJS from 'print-js'
  import JsBarcode from 'jsbarcode'
  import style from '!!raw-loader!./barcode_print.css'

  export default {
    name: 'barcode-print',
    data() {
      return {
        barcodeList: []
      }
    },
    methods: {
      print(data) {
        this.barcodeList = data
        this.$nextTick(() => {
          this.barcodeList.forEach((barcode, idx) => {
            JsBarcode('#barcode' + idx, barcode.barCode, {
              displayValue: false,
              width: 4,
              height: 70
            })
          })
          printJS({printable: 'print', type: 'html', scanStyles: false, style})
        })
      }
    },
    mounted() {
      //
    }
  }
</script>

<style lang="sass" scoped>
  .wrapper
    position: absolute
    top: 0
    background: #ffffff
    z-index: 100
    display: none
    width: 500px
    margin: 0 auto
    text-align: center
    .size
      font-size: 167px
      font-weight: bold
      border-top: 8px solid #000000

    .barcode-box
      .barcode
        font-size: 25px

    .icon-box
      display: flex
      justify-content: space-around
      margin: 49px 0

    .text
      font-size: 29px
      line-height: 35px
</style>