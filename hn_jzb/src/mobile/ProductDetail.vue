<template>
  <div class="wrapper">
    <div class="header">
      <span v-show="inApp" class="back" @click="back"></span>
      <span class="title">产品详情</span>
    </div>
    <div class="template">
      <product-temp2
        v-if="template === 2"
        :product-data="productdata"
        :id-no="idNo">
      </product-temp2>
      <product-temp3
        v-else-if="template === 3"
        :product-data="productdata"
        :id-no="idNo">
      </product-temp3>
      <product-temp1
        v-else
        :template1type="template1type"
        :product-data="productdata"
        :id-no="idNo">
      </product-temp1>
    </div>
  </div>
</template>

<script>
  import api from '@/mobile/api'
  import ProductTemp1 from './template/ProductTemp1'
  import ProductTemp2 from './template/ProductTemp2'
  import ProductTemp3 from './template/ProductTemp3'
  import postObj from './static/js/postMessage'
  window.appInfo = {}
  export default {
    name: 'product-detail',
    components: {
      ProductTemp1,
      ProductTemp2,
      ProductTemp3
    },
    data() {
      return {
        productdata: {
          price: 0,
          companyInfo: {}
        },
        // token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NDQ0MDIwNjEyNDQsInBheWxvYWQiOiJkaW5FVlR2V1dxTmJKbUFQb3FXLzZMTGpYL254NG9uVGRMS0ptZ0JPZjZiVm4wV2FUUUpSaVRzcC9FVmZYRjQwK0hycmlhZzErQ09VXHJcblBySHYvemt6L1VLNWgwNWR5SENpT0VieTR4anRSQWZCZ3JFbHBFenlYRWRsSG9CakhURGJcclxuIn0.6szsGNcSDIeHp1HW5HSwj-nkEXQgQ3V07SJDga6X3BI',
        // idNo: '0437688764ba4ec9a64adca910069475'
        token: this.$route.query.token,
        inApp: this.$route.query.app,
        // inApp: true,
        idNo: this.$route.query.idNo,
        source: this.$route.query.source,
        productId: this.$route.query.productId,
        template: 1,
        appInfo: {
          detail: null
        },
        template1type: 0 // 模板1，再分类
      }
    },
    created() {
      window.appInfo = this.appInfo
    },
    methods: {
      back() {
        postObj.postMsg({
          command: 'back'
        })
      }
    },
    mounted() {
      window.localStorage.setItem('token', this.token)
      api.mobileProduct.getProductDetail({
        productId: this.productId,
        idNo: this.idNo,
        source: this.source
      }).then(data => {
        data && (this.productdata = data)
        if (this.productdata.templateId) {
          // this.template = this.productdata.templateId.match()
          // let arr = this.productdata.templateId.split('/')
          // this.template = Number(arr[arr.length - 1])
          // console.log(this.productdata.templateId.match(/[^/]+(?!.*\/)/g)[0])
          let match = this.productdata.templateId.match(/[^/]+(?!.*\/)/g)[0]
          if (match.indexOf('-') !== -1) {
            [this.template, this.template1type] = match.split('-').map(n => Number(n))
          } else {
            this.template = Number(match)
          }
        }
        // this.productdata.status = 0
        // this.productdata.allowCertification = true
        // this.productdata = {
        //   'id': 'f7194ae2f2404b2fbad8acf8049c4c39',
        //   'name': '努比亚 nubia X 双面屏 深空灰 8GB+128GB 全网通 移动联通电信4G手机 双卡双待',
        //   'banners': [],
        //   'thumb': '/pac/upload/company/product/pic/f6474594d30e45f6957ab4fe20cf7b82.jpg',
        //   'modelNo': '规格',
        //   'productNo': '002',
        //   'origin': '产品产地',
        //   'brandId': '210a9f5b6d844f2aab061c6097314d63',
        //   'brandName': '品牌1',
        //   'typeId': '699af23077fd40a18286fd330704dd85',
        //   'typeName': '棉裤',
        //   'reports': ['/upload/user/pictures/9e56c3766cff44688bff9021ecfa003f.jpg', '/upload/user/pictures/fec91212b6fe400b8bdff0760973ed5a.jpg'],
        //   'companyInfo': {
        //     'id': '1',
        //     'cnName': '蚕缘',
        //     'enName': 'canyuan',
        //     'regAddressCode': '1111',
        //     'operateAddressCode': '1111',
        //     'regAddress': '',
        //     'operateAddress': '',
        //     'region': '',
        //     'telephone': '1212',
        //     'email': '1221@qq.com',
        //     'createTime': '2018-10-06 11:25:31'
        //   },
        //   'categoryInfo': {
        //     'id': '4a6da1b7da0c47c797ea7583071bf455',
        //     'name': '服装',
        //     'catDesc': '12321321312',
        //     'isShow': 1,
        //     'seq': 111,
        //     'createTime': '2018-10-12 13:52:00',
        //     'createUser': null,
        //     'updateTime': null,
        //     'updateUser': null,
        //     'companyId': '9a5a9f84655a4adc8873467d2ca5aab8',
        //     'companyName': null,
        //     'delFlag': null,
        //     'status': 1,
        //     'template': 'www.baidu.com'
        //   },
        //   'price': 55.00,
        //   'memo': '',
        //   'createTime': '2018-11-03 08:13:39',
        //   'source': 0,
        //   'sourceName': '系统录入',
        //   'sourceId': 'f7194ae2f2404b2fbad8acf8049c4c39',
        //   'idNo': '123456789',
        //   'unit': '克',
        //   'showInfo': 'showInfo',
        //   'videoUrl': '/upload/company/product/video/94cd92e6d7c2495784454b21d3207d2c.mp4',
        //   'videoPic': '/upload/user/pictures/da3926e88d494cae8fbd49eed71a9b8f.jpg',
        //   'productCategoryAttrValueDtoList': [
        //     {
        //       'id': '574f66c3f7164221ae11ef86896b31e4',
        //       'attrId': '03c5530f3c8248c0be29797f5a405741',
        //       'attrName': '属性11',
        //       'seq': 2,
        //       'categoryId': null,
        //       'productId': null,
        //       'attrValue': '坦克'
        //     }, {
        //       'id': 'e3f08772d2a548ff97f590a7d5fa544b',
        //       'attrId': '03c5530f3c8248c0be29797f5a405741',
        //       'attrName': '属性11',
        //       'seq': 2,
        //       'categoryId': null,
        //       'productId': null,
        //       'attrValue': '坦克'
        //     }
        //   ],
        //   'certificated': false,       // 认证
        //   'allowCertification': true,  // 允许被认证
        //   'buyUrl': 'www',
        //   'status': 1
        // }
      })
    },
    watch: {
      'appInfo.detail'() {
        if (window.appInfo.detail) {
          this.$store.commit('SET_NEW', true)
          window.localStorage.setItem('isnew', true)
        } else {
          this.$store.commit('SET_NEW', false)
          window.localStorage.setItem('isnew', false)
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import './static/stylus/mixin.styl'
  .wrapper
    .header
      position: fixed
      z-index: 50
      top: 0
      width: 100%
      height: 50px
      text-align: center
      line-height: 50px
      background: #ffffff
      .back
        position: absolute
        left: 21px
        top: 15px
        display: inline-block
        width: 10px
        height: 20px
        bg-image('./static/img/iconsback')
        background-size: 10px 20px
        background-repeat: no-repeat
      .title
        font-size: 17px
        font-weight: 50
    .template
      width: 100%
      height: calc(100% - 50px)
      position: absolute
      top: 50px
      overflow-y: hidden
      background: #f4f4f4
</style>
