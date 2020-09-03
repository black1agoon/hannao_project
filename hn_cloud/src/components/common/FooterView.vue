<template>
  <div class="footer">
    <div class="nav">
      <dl>
        <dt>产品服务</dt>
        <dd>云计算</dd>
        <dd>网络</dd>
        <dd>存储的容灾</dd>
        <dd>IDC服务</dd>
        <dd>负载均衡</dd>
      </dl>
      <dl>
        <dt>客户案例</dt>
        <dd>政府政务</dd>
        <dd>行业领域</dd>
        <dd>大型企业</dd>
      </dl>
      <dl>
        <dt>服务社区</dt>
        <dd>产品白皮书</dd>
        <dd>购买手册</dd>
        <dd>备案手册</dd>
        <dd>客服服务</dd>
      </dl>
      <dl>
        <dt>关于我们</dt>
        <dd>汉脑简介</dd>
        <dd>加入我们</dd>
        <dd>联系我们</dd>
      </dl>
      <dl>
        <dt>客户服务</dt>
        <dd>Email: service@hnao.cn</dd>
        <dd>电话: 400-657-3085</dd>
      </dl>
      <div class="qrcode">
        <div class="code"></div>
        <p>扫描二维码</p>
        <p>关注汉脑官方微信</p>
      </div>
    </div>
    <div class="copyright">Powered by ©2019 版权所有：浙江汉脑数码科技有限公司</div>
  </div>
</template>

<script>
  export default {
    name: 'footer-view'
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .footer
    min-width: 1400px
    background: #353434
    .nav
      width: 1200px
      margin: 0 auto
      border-bottom: 1px solid #535353
      display: flex
      padding: 37px 0 22px 0
      dl
        flex: 1
        dt
          color: #ffffff
          font-size: 16px
          margin-bottom: 5px
          cursor: pointer
        dd
          color: #c9c9c9
          font-size: 14px
          margin-top: 16px
          cursor: pointer
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
          margin-bottom: 15px
    .copyright
      font-size: 12px
      line-height: 48px
      color: #c9c9c9
      text-align: center
</style>