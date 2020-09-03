<template>
  <div id="footer" class="scroll-anchor">
    <div class="container">
      <div class="pure-g" id="site_menus">
        <div class="pure-u-5-24">
          <div class="menu-title">企业文化</div>
          <ul>
            <li> <router-link to="/company/">公司介绍</router-link> </li>
            <li> <router-link to="/business/">行业洞察</router-link> </li>
            <li> <router-link to="/brand/">品牌计划</router-link> </li>
          </ul>
        </div>
        <div class="pure-u-5-24">
          <div class="menu-title">技术支持</div>
          <ul>
            <li> <router-link to="/about/">产品介绍</router-link> </li>
            <li> <router-link to="/downloads/">产品下载</router-link> </li>
            <li> <router-link to="/service/">技术咨询</router-link> </li>
            <li> <router-link to="/etag/">电子标签</router-link> </li>
            <li> <router-link to="/devices/">智能设备</router-link> </li>
          </ul>
        </div>
        <div class="pure-u-5-24">
          <div class="menu-title">解决方案</div>
          <ul>
            <li>
              <router-link to="/solution/bags">箱包</router-link>
              <router-link to="/solution/wine">名酒</router-link>
            </li>
            <li>
              <router-link to="/solution/cloth">服饰</router-link>
              <router-link to="/solution/paint">字画</router-link>
            </li>
            <li>
              <router-link to="/solution/jewelry">珠宝</router-link>
              <router-link to="/solution/card">证卡</router-link>
            </li>
          </ul>
        </div>
        <div class="pure-u-5-24">
          <div class="menu-title">商务合作</div>
          <ul>
            <li> <router-link to="/policy/">合作政策</router-link> </li>
            <li> <router-link to="/cooperation/">战略合作</router-link> </li>
          </ul>
        </div>
        <div class="pure-u-4-24">
          <div class="menu-title">会员服务</div>
          <ul>
            <li> <a :href="memberCenter + '/uc/company/login'">会员中心</a> </li>
            <li> <router-link to="/contact/">联系我们</router-link> </li>
          </ul>
        </div>
      </div>
      <div id="site_contacts" class="pure-g">
        <div class="pure-u-1-2">
          <div class="icon-label">
            <img src="/static/img/footer/wechat_icon.png" alt="Wechat">
            <span>关注我们</span>
          </div>
          <img src="/static/img/footer/wechat_code.png" alt="Wechat Code">
        </div>
        <div class="pure-u-1-2">
          <div class="icon-label">
            <img src="/static/img/footer/tel_icon1.png" alt="Tel">
            <span>或致电</span>
          </div>
          <div id="tel_num">400-657-3085</div>
        </div>
      </div>
      <div class="clearfix"></div>
      <hr>
      <div id="copyright">
        浙ICP备11062748号-4©2017鉴正宝信息技术有限公司 All rights reserved.
        <div class="more-info">
          中华人民共和国公安部第三研究所防伪事业部和鉴正宝信息技术有限公司共同建设
          <ul class="hidden">
            <li>
              <div class="icon-label">
                <img src="/static/img/footer/tel_icon2.png" alt="Tel">
                <span>联系我们</span>
              </div>
            </li>
            <li>
              <div class="icon-label">
                <img src="/static/img/footer/privacy_icon.png" alt="Privacy">
                <span>隐私政策</span>
              </div>
            </li>
            <li>
              <div class="icon-label">
                <img src="/static/img/footer/law_icon.png" alt="Law">
                <span>法律声明</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import AppConfig from '@/app.config'
  export default {
    name: 'app-footer',
    data () {
      return {
        memberCenter: AppConfig.memberSite
      }
    }
  }
</script>

<style scoped>
  #footer {
    background-color: #f5f5f5;
    color: #494949;
    min-width: 1024px;
    position: absolute;
    width: 100%;
    bottom: 0;
  }

  #footer .container {
    padding: 60px 80px 20px;
  }

  #footer .menu-title {
    color: #0071ff;
    font-weight: bold;
  }

  #footer ul {
    list-style-type: none;
    padding: 0;
  }

  #footer ul li {
    margin: 8px 0;
  }

  #footer ul li a {
    color: #494949;
    text-decoration: none;
    font-size: 14px;
  }

  #site_menus {
    width: 70%;
    float: left;
    max-width: 1024px;
  }
  #site_menus li a {
    padding-right: 4px;
  }

  #site_contacts {
    width: 25%;
    max-width: 416px;
    float: right;
    font-size: 14px;
  }

  .clearfix {
    clear: both;
  }

  #footer hr {
    border-bottom: 0;
    margin: 36px 0 20px;
    border-color: #fff;
  }

  #copyright {
    font-size: 12px;
    color: #494949;
  }
  #site_contacts .icon-label {
    margin-bottom: 10px;
  }
  #site_contacts .icon-label span {
    padding-left: 5px;
  }
  .icon-label span {
    vertical-align: top;
  }

  #tel_num {
    font-size: 18px;
  }

  .more-info {
    float: right;
    position: relative;
    /* top: -15px; */
  }
  #footer .more-info ul li {
    float: left;
    margin: 0 8px;
  }
  .more-info ul span {
    top: -2px;
    position: relative;
  }

  .more-info:after {
    content: "";
    clear: both;
    display: table;
  }
</style>
