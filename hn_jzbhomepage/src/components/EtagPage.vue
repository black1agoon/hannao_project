<template>
  <div class="main-list">
    <div id="etag_banner" class="full-bg hg-43">
      <div class="titles-con bg-item bg-center">
        <h1 class="bg-title">电子标签分类</h1>
        <div class="bg-grid">
          <a class="bg-grid-1-4" href="#nfc_tags">
            <img src="/static/img/etags/banner_item1.png" alt="">
            <h3>NFC多用途标签</h3>
          </a>
          <a class="bg-grid-1-4" href="#obj_tags">
            <img src="/static/img/etags/banner_item2.png" alt="">
            <h3>异型标签</h3>
          </a>
          <a class="bg-grid-1-4" href="#cloth_tags">
            <img src="/static/img/etags/banner_item3.png" alt="">
            <h3>服装标签</h3>
          </a>
          <a class="bg-grid-1-4" href="#tick_tags">
            <img src="/static/img/etags/banner_item4.png" alt="">
            <h3>票证标签</h3>
          </a>
        </div>
      </div>
    </div>

    <div class="sub-section" id="products_con" :class="{expanded: expanded[0].stat}">
      <h1 class="section-title">电子标签产品</h1>
      <div class="bg-grid">
        <div class="bg-grid-1-3" :class="{'hidden-cell': idx > 2}"
             v-for="(etag, idx) in products">
          <div class="img-con"
               :style="'background-image: url(' + uploads(etag.image.path) + ')'">
          </div>
          <div class="overlay">
            <div class="titles-con">
              <h2>{{ etag.name }}</h2>
              <p v-html="etag.content"></p>
            </div>
          </div>
        </div>
      </div>
      <div class="show-more" @click="showMore(true, 0)" v-if="products.length > 3">
        <p><span class="toggle-line"></span>显示更多<span class="toggle-line"></span></p>
      </div>
      <div class="show-less" @click="showMore(false, 0)">
        <p><span class="toggle-line"></span>收起<span class="toggle-line"></span></p>
      </div>
    </div>

    <div class="sub-section" id="nfc_tags" :class="{expanded: expanded[0].stat}">
      <h1 class="section-title">NFC多用途标签</h1>
      <div class="bg-grid">
        <div class="bg-grid-1-3" :class="{'hidden-cell': idx > 2}"
             v-for="(etag, idx) in etags.nfc">
          <div class="img-con"
               :style="'background-image: url(/static/img/etags/' + etag.image + ')'">
          </div>
          <div class="overlay">
            <div class="titles-con">
              <h2>{{ etag.name }}</h2>
              <p>{{ etag.desc }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="show-more" @click="showMore(true, 0)">
        <p><span class="toggle-line"></span>显示更多<span class="toggle-line"></span></p>
      </div>
      <div class="show-less" @click="showMore(false, 0)">
        <p><span class="toggle-line"></span>收起<span class="toggle-line"></span></p>
      </div>
    </div>

    <div class="sub-section" id="obj_tags" :class="{expanded: expanded[1].stat}">
      <h1 class="section-title">异型标签</h1>
      <div class="bg-grid">
        <div class="bg-grid-1-3" :class="{'hidden-cell': idx > 2}"
             v-for="(etag, idx) in etags.icc">
          <div class="img-con"
               :style="'background-image: url(/static/img/etags/' + etag.image + ')'">
          </div>
          <div class="overlay">
            <div class="titles-con">
              <h2>{{ etag.name }}</h2>
              <p>{{ etag.desc }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="show-more" @click="showMore(true, 1)">
        <p><span class="toggle-line"></span>显示更多<span class="toggle-line"></span></p>
      </div>
      <div class="show-less" @click="showMore(false, 1)">
        <p><span class="toggle-line"></span>收起<span class="toggle-line"></span></p>
      </div>
    </div>

    <div class="sub-section" id="cloth_tags" :class="{expanded: expanded[2].stat}">
      <h1 class="section-title">服装标签</h1>
      <div class="bg-grid">
        <div class="bg-grid-1-3" :class="{'hidden-cell': idx > 2}"
             v-for="(etag, idx) in etags.cloth">
          <div class="img-con"
               :style="'background-image: url(/static/img/etags/' + etag.image + ')'">
          </div>
          <div class="overlay">
            <div class="titles-con">
              <h2>{{ etag.name }}</h2>
              <p>{{ etag.desc }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="show-more" @click="showMore(true, 2)">
        <p><span class="toggle-line"></span>显示更多<span class="toggle-line"></span></p>
      </div>
      <div class="show-less" @click="showMore(false, 2)">
        <p><span class="toggle-line"></span>收起<span class="toggle-line"></span></p>
      </div>
    </div>

    <div class="sub-section" id="tick_tags" :class="{expanded: expanded[3].stat}">
      <h1 class="section-title">票证标签</h1>
      <div class="bg-grid">
        <div class="bg-grid-1-3" :class="{'hidden-cell': idx > 2}"
             v-for="(etag, idx) in etags.tick">
          <div class="img-con"
               :style="'background-image: url(/static/img/etags/' + etag.image + ')'">
          </div>
          <div class="overlay">
            <div class="titles-con">
              <h2>{{ etag.name }}</h2>
              <p>{{ etag.desc }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="show-more" @click="showMore(true, 3)">
        <p><span class="toggle-line"></span>显示更多<span class="toggle-line"></span></p>
      </div>
      <div class="show-less" @click="showMore(false, 3)">
        <p><span class="toggle-line"></span>收起<span class="toggle-line"></span></p>
      </div>
    </div>
  </div>
</template>

<script>
  import AppService from '@/app.service'
  import AppConfig from '@/app.config'
  export default {
    name: 'etag-page',
    methods: {
      fetchProducts: function () {
        AppService.collection('products')
        .then(function (data) {
          this.products = data.entries.filter(function (entry) {
            return entry.published
          })
        }.bind(this))
      },
      uploads: function (path) {
        return AppConfig.uploads(path)
      },
      showMore: function (stat, idx) {
        this.expanded[idx].stat = stat
      }
    },
    mounted () {
      this.fetchProducts()
    },
    data () {
      return {
        expanded: [ {stat: false}, {stat: false}, {stat: false}, {stat: false} ],
        products: [
          // {
          //   name: '',
          //   image: '',
          //   tags: '',
          //   content: ''
          // }
        ],
        etags: {
          nfc: [
            {
              name: 'NFC海报标签',
              image: 'nfc1.jpg',
              desc: '广告促销、智能海报、程序切换、存储名片、发送短信、打开网址、拨打电话、发送指令、存储文本等等'
            },
            {
              name: 'NFC标签',
              image: 'nfc2.jpg',
              desc: '挂饰'
            },
            {
              name: 'NFC标签',
              image: 'nfc3.jpg',
              desc: 'NFC SMART TAGS'
            },
            {
              name: 'NFC标签',
              image: 'nfc4.jpg',
              desc: 'NATG203'
            },
            {
              name: 'NFC标签',
              image: 'nfc5.jpg',
              desc: 'NFC标签'
            },
            {
              name: 'NFC标签',
              image: 'nfc6.jpg',
              desc: 'NFC标签'
            }
          ],
          icc: [
            {
              name: 'IC钥匙扣',
              image: 'ic1.jpg',
              desc: '小区门禁、考勤，会员管理，公交、停车场、身份认证、考勤管理、门票一卡通、门票一卡通付费，产品标识等'
            },
            {
              name: 'IC手表卡',
              image: 'ic2.jpg',
              desc: '小区门禁、考勤，会员管理，公交、停车场、身份认证、考勤管理、门票一卡通、门票一卡通付费，产品标识等'
            },
            {
              name: 'IC钥匙卡',
              image: 'ic3.jpg',
              desc: '小区门禁、考勤，会员管理，公交、停车场、身份认证、考勤管理、门票一卡通、门票一卡通付费，产品标识等'
            },
            {
              name: 'ID印刷卡',
              image: 'ic4.jpg',
              desc: '小区门禁、考勤，会员管理，公交、停车场、身份认证、考勤管理、门票一卡通、门票一卡通付费，产品标识等'
            },
            {
              name: 'IC钥匙卡',
              image: 'ic5.jpg',
              desc: '小区门禁、考勤，会员管理，公交、停车场、身份认证、考勤管理、门票一卡通、门票一卡通付费，产品标识等'
            },
            {
              name: 'IC钥匙扣',
              image: 'ic6.jpg',
              desc: '小区门禁、考勤，会员管理，公交、停车场、身份认证、考勤管理、门票一卡通、门票一卡通付费，产品标识等'
            }
          ],
          cloth: [
            {
              name: '洗衣布标签',
              image: 'cloth1.jpg',
              desc: '采用洗衣布封装技术。可以缝制在服装对其进行清点管理。试用于防伪防窜货项目'
            },
            {
              name: 'HF洗衣标签',
              image: 'cloth2.jpg',
              desc: '采用PPS工程塑料风带，放置在服装内对其进行清点管理。适用于水洗、干净环境使用'
            },
            {
              name: '高频易碎标签',
              image: 'cloth3.jpg',
              desc: '表面编码印刷打印，可印刷logo、图案文本混版信息等标签采用防转移专用胶等技术，产品具有一次性使用特性，即撕掉后不能再使用和读写'
            },
            {
              name: '服装电子标签',
              image: 'cloth4.jpg',
              desc: '采用PVC或铜版纸封装。适用于服装资产管理、库存跟踪、盘点。外观颜色尺寸可以根据客户需要定制'
            },
            {
              name: '硅胶洗衣标签',
              image: 'cloth5.jpg',
              desc: '采用硅胶封装技术，可以缝制、热烫处理。可以悬挂在毛巾、服装上对其进行清点管理。适用于水洗、干洗环境使用'
            },
            {
              name: '织唛标签',
              image: 'cloth6.jpg',
              desc: '采用服装织唛封装。适用于服装资产管理、库存跟踪、盘点。外观颜色尺寸可以根据客户需要定制'
            }
          ],
          tick: [
            {
              name: '圆币卡标签',
              image: 'tk1.jpg',
              desc: '主要适用于公交、地铁、轮渡等交通运输类项目'
            },
            {
              name: '火车票学生购票优惠卡',
              image: 'tk2.jpg',
              desc: '采用特殊材料封装，隐形防伪油墨方式印刷，产品具有一次性粘贴、使用寿命长、数据安全级别高等特性。主要应用于证件类产品防伪应用'
            },
            {
              name: '电子门票',
              image: 'tk3.jpg',
              desc: '主要应用于景区、演出及大型赛事等门票类项目'
            },
            {
              name: '高频易碎标签',
              image: 'tk4.jpg',
              desc: '门禁（单位考勤，旅游门票，足球门票，电影门票，停车场等），消费（食堂饭卡，一卡通，VIP卡等）'
            },
            {
              name: '非接触智能卡',
              image: 'tk5.jpg',
              desc: '该标签采用PVC封装，可应用于公交、学校一卡通、高速公路等'
            },
            {
              name: '钱币卡',
              image: 'tk6.jpg',
              desc: '钱币卡，可做地铁币等电子票等电子票证'
            }
          ]
        }
      }
    }
  }
</script>

<style scoped>

  #etag_banner {
    background-image: url('/static/img/etags/banner_bg.jpg');
  }
  #etag_banner a {
    color: black;
  }
  #etag_banner:visited a {
    color: black;
  }
  .hg-43 {
    padding-bottom: 43%;
  }
  .titles-con {
    width: 90%;
  }
  .bg-item {
    margin: 0 auto;
  }
  .bg-grid .img-con {
    padding-bottom: 100%;
    width: 90%;
    margin: 5%;
  }
  .bg-grid-1-3 .img-con {
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }
  .bg-grid-1-4 img {
    width: 90%;
    margin: 5%;
  }
  .bg-grid-1-4 {
    position: relative;
  }
  .bg-grid-1-4 h3 {
    position: absolute;
    bottom: 8%;
    left: 0;
    right: 0;
  }

  .sub-section {
    width: 80%;
    margin: 0 auto;
  }

  .sub-section .bg-grid-1-3 {
    position: relative;
  }
  .sub-section .bg-grid-1-3 .overlay {
    background-color: rgba(0,0,0, 0.5);
    display: none;
    position: absolute;
    top: 5%;
    bottom: 6.4%;
    left: 5%;
    right: 5%;
  }
  .sub-section .bg-grid-1-3 .titles-con {
    text-align: left;
    color: white;
    position: absolute;
    bottom: 10%;
    left: 0;
    right: 0;
    width: 80%;
  }
  .sub-section .bg-grid-1-3:hover .overlay {
    display: block;
  }
  .sub-section .bg-grid-1-3:hover .titles-con {
    display: inline-block;
    margin: 0 auto;
  }

  .show-more {
    display: inherit;
  }
  .expanded .show-more {
    display: none;
  }
  .show-less {
    display: none;
  }
  .expanded .show-less {
    display: inherit;
  }
  .hidden-cell {
    display: none;
  }
  .expanded .hidden-cell {
    display: inherit;
  }
</style>
