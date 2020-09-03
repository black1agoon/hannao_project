<template>
  <div class="footer">
    <div class="nav">
      <dl>
        <dt>
          <router-link to="/">首页</router-link>
        </dt>
      </dl>
      <dl>
        <dt>解决方案</dt>
        <dd>
          <router-link to="/resolution/ecommerce">物联网电子商务</router-link>
        </dd>
        <dd>
          <router-link to="/resolution/traceability">防伪溯源</router-link>
        </dd>
        <dd>
          <router-link to="/resolution/intelligent">智能制造</router-link>
        </dd>
      </dl>
      <dl>
        <dt>
          <router-link to="/cooperation">渠道合作</router-link>
        </dt>
        <dd>
          <router-link to="/cooperation#standard">入驻机制</router-link>
        </dd>
        <dd>
          <router-link to="/cooperation#agent">代理机制</router-link>
        </dd>
      </dl>
      <dl>
        <dt>
          <router-link to="/company">公司信息</router-link>
        </dt>
        <dd>
          <router-link to="/company">公司新闻</router-link>
        </dd>
        <dd>
          <router-link to="/company/info">公司介绍</router-link>
        </dd>
        <dd>
          <router-link to="/company#honour">公司证书</router-link>
        </dd>
        <dd>
          <router-link to="/company#activity">公司活动</router-link>
        </dd>
      </dl>
      <dl>
        <dt>
          <router-link to="/help/0">帮助支持</router-link>
        </dt>
        <dd>
          <router-link to="/help/0">常见问题</router-link>
        </dd>
        <dd>
          <router-link to="/help/1">产品套餐</router-link>
        </dd>
        <dd>
          <router-link to="/help/2">联系客服</router-link>
        </dd>
      </dl>
      <div class="qrcode">
        <p class="name"><i class="wx"></i>关注我们</p>
        <div class="code"></div>
      </div>
      <div class="call">
        <p class="name"><i class="phone"></i>致电</p>
        <p class="value">400-657-3085</p>
      </div>
    </div>
    <div class="end">
      <div class="copyright">
        <a href="http://beian.miit.gov.cn/state/outPortal/loginPortal.action" target="_blank">浙ICP备11062748号-4©</a>
        2019鉴正宝信息技术有限公司 All rights reserved.</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'footer-page'
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .footer
    min-width: 1200px
    background: #353434
    height: 310px
    .nav
      width: 1200px
      margin: 0 auto
      border-bottom: 1px solid #ffffff
      display: flex
      padding: 37px 0 72px 0
      dl
        flex: 1
        dt
          margin-bottom: 5px
          cursor: pointer
          color: #ffffff
          font-size: 16px
          a
            color: #ffffff
            font-size: 16px
        dd
          margin-top: 16px
          cursor: pointer
          a
            color: #ffffff
            font-size: 14px
      .qrcode, .call
        .name
          font-size: 14px
          color: #ffffff
          margin-bottom: 15px
          text-align: left
      .qrcode
        width: 110px
        text-align: center
        color: #ffffff
        font-size: 12px
        line-height: 24px
        .code
          width: 110px
          height: 110px
          background-image: url("../../assets/img/qrcode.png")
          background-size: 110px 110px
          background-repeat: no-repeat
        .wx
          display: inline-block
          width: 20px
          height: 20px
          background-image: url("../../assets/img/wx.png")
          background-size: 20px 20px
          background-repeat: no-repeat
          vertical-align: middle
          margin-right: 12px
      .call
        margin-left: 90px
        .phone
          display: inline-block
          width: 20px
          height: 20px
          background-image: url("../../assets/img/phone.png")
          background-size: 20px 20px
          background-repeat: no-repeat
          vertical-align: middle
          margin-right: 12px
        .value
          font-size: 18px
          color: #ffffff
          /*font-weight: bold*/
    .end
      width: 1200px
      margin: 0 auto
      height: 50px
      line-height: 50px
      color: #ffffff
      font-size: 12px
      .copyright
        text-align: center
        a
          color: #ffffff
</style>