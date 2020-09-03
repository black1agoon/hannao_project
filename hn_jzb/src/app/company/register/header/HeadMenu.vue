<template>
  <div class="list">
    <ul>
      <li>
        <a :href="getFullPath('/')">主页</a>
      </li>
      <li>
        <div class="title">企业文化</div>
        <ul class="dropdown">
          <li><a :href="getFullPath('/company/')">公司介绍</a></li>
          <li><a :href="getFullPath('/business/')">行业洞察</a></li>
          <li><a :href="getFullPath('/brand/')">品牌计划</a></li>
        </ul>
      </li>
      <li>
        <div class="title">技术支持</div>
        <ul class="dropdown">
          <li><a :href="getFullPath('/about/')">产品介绍</a></li>
          <li><a :href="getFullPath('/downloads/')">产品下载</a></li>
          <li><a :href="getFullPath('/service/')">技术咨询</a></li>
          <li><a :href="getFullPath('/etag/')">电子标签</a></li>
          <li><a :href="getFullPath('/devices/')">智能设备</a></li>
        </ul>
      </li>
      <li>
        <div class="title">解决方案</div>
        <ul class="dropdown">
          <li><a :href="getFullPath('/solution/bags')">箱包</a></li>
          <li><a :href="getFullPath('/solution/cloth')">服饰</a></li>
          <li><a :href="getFullPath('/solution/jewelry')">珠宝</a></li>
          <li><a :href="getFullPath('/solution/wine')">名酒</a></li>
          <li><a :href="getFullPath('/solution/paint')">字画</a></li>
          <li><a :href="getFullPath('/solution/card')">证卡</a></li>
        </ul>
      </li>
      <li>
        <div class="title">合作伙伴</div>
        <ul class="dropdown">
          <li><a :href="getFullPath('/policy/')">合作政策</a></li>
          <li><a :href="getFullPath('/cooperation/')">战略合作</a></li>
        </ul>
      </li>
      <li>
        <div class="title">会员服务</div>
        <ul class="dropdown">
          <li><a href="/uc/company/login">会员中心</a></li>
          <li><a :href="getFullPath('/contact/')">联系我们</a></li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
  import config from '@/config'
  export default {
    name: 'head-menu',
    data() {
      return {
        serverURI: config.serverURI
      }
    },
    methods: {
      getFullPath(url) {
        return this.serverURI + url
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .list
    /*width: 500px*/
    height: 30px
    line-height: 30px
    margin: 50px 0 0 50px
    float: left
    ul
      li
        position: relative
        display: inline-block
        font-size: 14px
        color: #000000
        padding: 0 20px
        cursor: pointer
        vertical-align: top
        &:hover
          .dropdown
            display: block
        a
          color: #000000
        .title
          width: 100%
          text-align: center
        .dropdown
          display: none
          position: absolute
          margin-left: -20px
          z-index: 100
          background: #ffffff
          li
            display: block
            width: 56px
            text-align: center
            a
              color: #000000
            &:hover
              background: #0071ff
              a
                color: #ffffff
</style>
