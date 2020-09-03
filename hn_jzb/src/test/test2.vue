<template>
  <div>
    <canvas ref="qrcode"></canvas>
  </div>
</template>
<script>
  import QRCode from 'qrcode'

  export default {
    name: 'test2',
    _meta: {
      path: 'test2',
      title: '测试test22'
    },
    data() {
      return {
        imgList: ['http://192.168.2.183:9801/pac/upload/user/pictures/ccc417c414354dc1b7a72d0d1252c525.png', 'http://192.168.2.183:9801/pac/upload/user/pictures/dc0d811d39b14363a121b6819be18a76.png', 'http://192.168.2.183:9801/pac/upload/user/pictures/df819102c65443e5b9e371a0e25f5250.jpg', 'http://192.168.2.183:9801/pac/upload/user/pictures/82507bab799047708913fd8e4b010f11.jpg', 'http://192.168.2.183:9801/pac/upload/user/pictures/a4dde42e3982451fb682bd04b26f22c7.jpg', 'http://192.168.2.183:9801/pac/upload/product/8e1f871a52714cc89655d34da978bd13.png']
      }
    },
    methods: {
      getSrc(img) {
        return img + '?v=' + new Date()
      },
      button() {
      }
    },
    mounted() {
      let canvas = this.$refs.qrcode
      QRCode.toCanvas(canvas, 'http://www.baidu.com/index.html?idNo=&productId=9275063e7dd34e708dc3deeb8b317759', function (error) {
        if (error) console.error(error)
        console.log('success!')
      })
    }
  }
</script>

<style>
</style>
