<template>
  <div class="main-list">

    <div class="full-bg hg-1-2" id="brand_bg1">
      <div class="titles-con-left bg-item">
        <h2 class="bg-title">AFE国际品牌计划</h2>
        <div class="sub-title">最经济、最高效、最安全、最环保、最适应<br>社会市场的服务技术手段</div>
      </div>
    </div>

    <div class="sub-section">
      <div class="section-title">
        <h1>培育阶段</h1>
      </div>
      <div class="content-con">
        “AFE国际品牌计划”将整合企业和各行业渠道资源，对入选企业进行服务和扶持，由专业专家团队为企业提供定制化品牌策略管理咨询服务及培训服务，快速响应企业需求，为企业提供信息技术服务等，从单一的渠道销售升级为全方位的品牌传播服务，开启营销新时代。
      </div>
    </div>

    <div class="sub-section">
      <div class="section-title">
        <h1>培育范围</h1>
      </div>
      <div class="chart-col">
        <div class="chart-row clearfix">
          <div class="chart-img">
            <img src="/static/img/brand/chart1.jpg" alt="">
          </div>
          <div class="chart-text">
            <span>服务地域规模：</span>AFE国际品牌计划面向全国32个省和自冶区，2000个有效县市
          </div>
        </div>
        <hr>
        <div class="chart-row clearfix">
          <div class="chart-img">
            <img src="/static/img/brand/chart2.jpg" alt="">
          </div>
          <div class="chart-text">
            <span>组织规模：</span>在全国发展60万家诚信企业，每年培育平均增长60%以上
          </div>
        </div>
        <hr>
        <div class="chart-row clearfix">
          <div class="chart-img">
            <img src="/static/img/brand/chart3.jpg" alt="">
          </div>
          <div class="chart-text">
            <span>客户规模：</span>AFE国际品牌计划覆盖80多个行业，6800万个有效商品，为不同规模企业提供服务
          </div>
        </div>
      </div>
    </div>

    <div class="sub-section">
      <div class="section-title">
        <h1>培育对象</h1>
      </div>
      <div id="client-grid" class="clearfix">
        <div class="grid-row" v-for="row in clients">
          <div class="grid-cell" v-for="client in row" :key="client">
            <div class="client-box">
              {{ client }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="sub-section" id="std_con">
      <div class="section-title" v-if="false">
        <h1>培育标准</h1>
        <div class="sub-title">
          入驻企业必须满足以下认证条件
        </div>
        <div class="std-icons clearfix">
          <div class="icon-cell" v-for="stdIcon in stdIcons" :key="stdIcon.icon">
            <div class="std-icon-img" :style="imgStyle(stdIcon.icon)">
            </div>
            <div class="std-icon-text">
              {{ stdIcon.text }}
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'brand-page',
  data () {
    return {
      clients: [
        ['集团型客户', '农牧业', '服装业', '箱包业', '造纸业'],
        ['金融业', '政府机构', '医疗医药', '物流行业', '零售业'],
        ['IT科技', '房产建筑', '化工业', '通讯业', '餐饮业'],
        ['交通', '酒店', '出行', '电商', '传媒']
      ],
      stdIcons: [
        { icon: 'iso9001', text: 'ISO9001质量管理体系认证' },
        { icon: '3c', text: '中国强制性产品认证即3C认证' },
        { icon: 'cma', text: '检验检测机构资质认定' },
        { icon: 'other', text: '行业其他代表性机构认证' }
      ]
    }
  },

  methods: {
    imgStyle (icon) {
      var styles = 'background-image: url("/static/img/brand/' + icon + '.png");'
      if (icon === 'cma') {
        styles += 'margin: 10px 0 30px; height: 60px;'
      } else if (icon === 'iso9001') {
        styles += 'margin-top: -20px; height: 100px;'
      }
      return styles
    }
  }
}
</script>

<style scoped>
  .main-list {
    background-color: white;
  }

  #brand_bg1 {
    background-image: url('/static/img/brand/brand_bg.jpg');
  }

  .titles-con-left {
    position: absolute;
    bottom: 30%;
    left: 80px;
    text-align: left;
  }

  .content-con {
    width: 72%;
    margin: 0 auto;
    font-size: 20px;
  }

  .sub-section {
    padding-top: 40px;
  }

  .chart-col {
    width: 510px;
    margin: 0 auto;
  }

  .chart-col hr {
    margin: 20px auto;
    width: 96%;
  }

  .chart-img {
    float: left;
  }

  .chart-text {
    font-size: 20px;
    padding: 76px 0 0 240px;
    text-align: justify;
  }

  .chart-text span {
    color: #1e90ff;
  }


  #client-grid {
    color: #5b8dfe;
    font-size: 20px;
  }

  .grid-row {
    width: 72%;
    margin: 0 auto;
    position: relative;
  }

  .grid-cell {
    float: left;
    width: 20%;
    padding: 1.5% 0;
  }

  .grid-cell .client-box {
    margin: 0 auto;
    text-align: center;
    width: 80%;
    height: 38px;
    border: 2px solid #5b8dfe;
    padding-top: 10px;
  }

  #std_con.sub-section {
    margin-top: 60px;
    background-color: #5b8dfe;
    color: white;
    padding-top: 20px;
  }
  #std_con.sub-section .sub-title {
    font-size: 18px;
  }

  #std_con .section-title {
    color: white;
    margin-bottom: 24px;
  }

  #std_con .icon-cell {
    float: left;
  }

  #std_con .std-icons {
    margin: 0 auto;
    width: 90%;
    max-width: 1280px;
    padding: 40px 0 60px;
  }
  #std_con .std-icons .icon-cell {
    width: 25%;
  }
  #std_con .std-icons .icon-cell .std-icon-img {
    height: 80px;
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    margin-bottom: 20px;
  }

</style>