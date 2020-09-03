<template>
  <div class="wrapper">
    <div class="banner">
      <div class="header" ref="header">
        <div class="content" ref="navMenu">
          <div class="logo" @click="go2index"></div>
          <div class="name" @click="go2index">开发者平台</div>
          <ul class="title">
            <li v-for="(item, index) in menu" :key="index">
              <router-link v-if="index === 0" :to="item.link">{{item.name}}</router-link>
              <a v-else target="_blank" :href="item.link"><span>{{item.name}}</span></a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="recommend">
      <div class="title">热门推荐</div>
      <div class="small-title">以独特视角呈现科技圈内大事小事</div>
      <div class="wrapper">
        <div class="item" v-for="rcd in recommendList" :key="rcd.id">
          <div class="pic" @click="go2detail(rcd.catid, rcd.id)">
            <div class="mask"></div>
            <span class="industry">{{rcd.title}}</span>
            <img :src="utils.getImageSrc(rcd.thumb)"/>
          </div>
        </div>
      </div>
    </div>
    <div class="tools">
      <div class="title">开发工具</div>
      <div class="small-title">用于辅助软件生命周期过程的基于计算机的工具。</div>
      <div class="wrapper">
        <div class="item">
          <div class="pic">
            <img src="../../assets/img/dev1.jpg"/>
          </div>
          <div class="name">
            <a target="_blank" href="https://www.java.com/zh_CN/">JAVA</a>
          </div>
          <div class="explain">Java是一门面向对象编程语言，不仅吸收了C++语言的各种优点，还摒弃了C++里难以理解的多继承、指针等概念，因此Java语言具有功能强大和简单易用两个特征。Java语言作为静态面向对象编程语言的代表，极好地实现了面向对象理论，允许程序员以优雅的思维方式进行复杂的编程。</div>
        </div>
        <div class="item">
          <div class="pic">
            <img src="../../assets/img/dev2.jpg"/>
          </div>
          <div class="name">
            <a target="_blank" href="https://dotnet.microsoft.com/apps/aspnet">C#</a>
          </div>
          <div class="explain">C#是微软公司发布的一种面向对象的、运行于.NET Framework和.NET Core(完全开源，跨平台)之上的高级程序设计语言。并定于在微软职业开发者论坛(PDC)上登台亮相。</div>
        </div>
        <div class="item">
          <div class="pic">
            <img src="../../assets/img/dev3.jpg"/>
          </div>
          <div class="name">
            <a target="_blank" href="http://www.php.net/">PHP</a>
          </div>
          <div class="explain">PHP是一种通用开源脚本语言。语法吸收了C语言、Java和Perl的特点，利于学习，使用广泛，主要适用于Web开发领域。PHP 独特的语法混合了C、Java、Perl以及PHP自创的语法。它可以比CGI或者Perl更快速地执行动态网页。</div>
        </div>
        <div class="item">
          <div class="pic">
            <img src="../../assets/img/dev4.png"/>
          </div>
          <div class="name">
            <a target="_blank" href="https://www.mysql.com/">MySQL</a>
          </div>
          <div class="explain">MySQL是一个关系型数据库管理系统，由瑞典MySQL AB 公司开发，目前属于 Oracle 旗下产品。MySQL 是最流行的关系型数据库管理系统之一，在 WEB 应用方面，MySQL是最好的RDBMS 应用软件。</div>
        </div>
        <div class="item">
          <div class="pic">
            <img src="../../assets/img/dev5.jpg"/>
          </div>
          <div class="name">
            <a target="_blank" href="https://www.docker.com/">Docker</a>
          </div>
          <div class="explain">Docker是一个开源的应用容器引擎，让开发者可以打包他们的应用以及依赖包到一个可移植的容器中，然后发布到任何流行的 Linux 机器上，也可以实现虚拟化。容器是完全使用沙箱机制，相互之间不会有任何接口。</div>
        </div>
        <div class="item">
          <div class="pic">
            <img src="../../assets/img/dev6.png"/>
          </div>
          <div class="name">
            <a target="_blank" href="https://www.elastic.co/">Elasticsearch</a>
          </div>
          <div class="explain">ElasticSearch是一个基于Lucene的搜索服务器。它提供了一个分布式多用户能力的全文搜索引擎，基于RESTful web接口。并作为Apache许可条款下的开
            放源码发布，是当前流行的企业级搜索引擎。
          </div>
        </div>
        <div class="item">
          <div class="pic">
            <img src="../../assets/img/dev7.jpg"/>
          </div>
          <div class="name">
            <a target="_blank" href="http://hadoop.apache.org/">Hadoop</a>
          </div>
          <div class="explain">Hadoop是一个由Apache基金会所开发的分布式系统基础架构。用户可以在不了解分布式底层细节的情况下，开发分布式程序。充分利用集群的威力进行高速运算和存储。
          </div>
        </div>
        <div class="item">
          <div class="pic">
            <img src="../../assets/img/dev8.jpg"/>
          </div>
          <div class="name">
            <a target="_blank" href="http://spark.apache.org/">Spark</a>
          </div>
          <div class="explain">Apache Spark 是专为大规模数据处理而设计的快速通用的计算引擎。Spark是UC Berkeley AMP lab所开源的类Hadoop MapReduce的通用并行框架，Spark，拥有Hadoop MapReduce所具有的优点。
          </div>
        </div>
        <div class="item">
          <div class="pic">
            <img src="../../assets/img/dev9.png"/>
          </div>
          <div class="name">
            <a target="_blank" href="http://storm.apache.org/">Storm</a>
          </div>
          <div class="explain">Storm是一个免费开源、分布式、高容错的实时计算系统。Storm经常用于在实时分析、在线机器学习、持续计算、分布式远程调用和ETL等领域。Storm的部署管理非常简单，而且，在同类的流式计算工具，Storm的性能也是非常出众的。
          </div>
        </div>
        <div class="item">
          <div class="pic">
            <img src="../../assets/img/dev10.png"/>
          </div>
          <div class="name">
            <a target="_blank" href="https://jenkins.io/">Jenkins</a>
          </div>
          <div class="explain">Jenkins 是一个广泛用于持续集成的可视化 Web工具，即用于各种不同语言的“自动化”编译、打包、分发部署，很好的支持各种语言，比如:Java、C#、PHP等。
          </div>
        </div>
        <div class="item">
          <div class="pic">
            <img src="../../assets/img/dev11.png"/>
          </div>
          <div class="name">
            <a target="_blank" href="https://about.gitlab.com/">Gitlab</a>
          </div>
          <div class="explain">GitLab 是一个用于仓库管理系统的开源项目，使用Git作为代码管理工具，并在此基础上搭建起来的web服务。</div>
        </div>
        <div class="item">
          <div class="pic">
            <img src="../../assets/img/dev12.png"/>
          </div>
          <div class="name">
            <a target="_blank" href="https://www.sonarqube.org/">Sonar</a>
          </div>
          <div class="explain">Sonar是一个用于代码质量管理的开源平台，用于管理Java源代码的质量。通过插件机制，Sonar 可以集成不同的测试工具，代码分析工具，以及持续集成工具。
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import utils from '@/assets/js/utils'
  import api from '@/api'
  export default {
    name: 'development',
    components: {
    },
    data() {
      return {
        utils,
        recommendList: [],
        menu: [
          {
            name: '主页',
            link: '/development',
            children: []
          }, {
            name: '代码托管',
            link: 'http://gitlab.hnao.cn/',
            children: []
          }, {
            name: '代码检查',
            link: 'http://sonar.hnao.cn/',
            children: []
          }, {
            name: '集成交付',
            link: 'http://dev.hnao.cn/',
            children: []
          }, {
            name: '文档资料',
            link: 'http://docs.hnao.cn/',
            children: []
          }
        ]
      }
    },
    methods: {
      go2index() {
        this.$router.push('/development')
      },
      go2detail(catid, id) {
        this.$router.push(`/development/recommend/detail/${catid}/${id}`)
      },
      getContentByPosid() {
        api.getContentByPosid(14).then(data => {
          if (data && data.length > 0) {
            this.recommendList = data.map(d => d.data)
          }
        })
      }
    },
    mounted() {
      this.getContentByPosid()
      let header = this.$refs.header
      let nav = this.$refs.navMenu
      window.addEventListener('scroll', () => {
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
        if (scrollTop === 0) {
          nav.style.height = '60px'
          nav.style.lineHeight = '60px'
          header.style.background = 'rgba(0, 0, 0, .3)'
        } else {
          nav.style.height = '40px'
          nav.style.lineHeight = '40px'
          header.style.background = 'rgba(0, 0, 0, 1)'
        }
      })
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .wrapper
    .banner
      position: relative
      min-width: 1400px
      height: 505px
      background-image: url("../../assets/img/development.jpg")
      background-repeat: no-repeat
      background-size: percentage
      .header
        position: fixed
        top: 0
        z-index: 200
        width: 100%
        background: rgba(0, 0, 0, 0.3)
        line-height: 60px
        border-bottom: 1px solid rgba(255, 255, 255, 0.1)
        color: #ffffff
        &:hover
          background: rgba(0, 0, 0, 1) !important
        .content
          position: relative
          width: 1200px
          margin: 0 auto
          height: 60px
          transition: all .3s
          .logo
            position: absolute
            width: 150px
            height: 35px
            top: 50%
            transform: translateY(-50%)
            background-image: url("../../assets/img/logo.png")
            background-size: 150px 35px
            background-repeat: no-repeat
          .name
            position: absolute
            left: 150px
            top: 50%
            transform: translateY(-50%)
            font-size: 16px
          .title
            position: absolute
            left: 300px
            width: 600px
            height: 100%
            display: flex
            & > li
              flex: 1
              cursor: pointer
              text-align: center
              margin: 0 15px
              box-sizing: border-box
              /*border-bottom: 3px solid #108CEE*/
              &:hover::after
                content: ' '
                display: block
                margin-top: -3px
                width: 100%
                height: 3px
                background-image: linear-gradient(to left, #00A1FF, #0B62FF)
                background-repeat: no-repeat
              /*border-bottom: 3px solid #108CEE*/
              & > a
                display: table
                width: 100%
                height: 100%
                color: #ffffff
                margin: 0 auto
                &:hover
                  color: #108CEE
    .recommend
      .title
        padding: 50px 0 13px
        text-align: center
        font-size: 26px
        color: #010101
      .small-title
        padding: 13px
        text-align: center
        font-size: 14px
        color: #a8a8a8
      .wrapper
        display: flex
        width: 1200px
        margin: 0 auto 100px
        flex-wrap: wrap
        .item
          width: 371px
          height: 288px
          margin-top: 35px
          border-radius: 10px
          position: relative
          transition: all .5s
          overflow: hidden
          margin-right: 43px
          cursor: pointer
          &:nth-of-type(3n)
            margin-right: 0
          &:hover
            box-shadow: 5px 5px 8px #aaa
            transform: translateY(-5px)
            /*box-shadow: 0 3px 21px rgba(0, 0, 0, 0.09) */
            .pic
              img
                transform: scale(1.05)
              .mask
                background: rgba(0, 0, 0, .1)
          .pic
            width: 100%
            height: 288px
            overflow: hidden
            border-radius: 10px
            position: relative
            img
              position: absolute
              display: block
              z-index: 90
              width: 100%
              height: 288px
              transition: all .5s
              overflow: hidden
            .industry
              position: absolute
              width: 80%
              left: 10%
              margin: 0 auto
              text-align: center
              height: 40px
              line-height: 40px
              z-index: 100
              bottom: 0
              font-size: 18px
              color: #ffffff
              overflow: hidden
              text-overflow: ellipsis
              white-space: nowrap
            .mask
              position: absolute
              z-index: 95
              width: 100%
              height: 288px
              background: rgba(0, 0, 0, .3)
              border-radius: 10px 10px 0 0
              transition: all .5s
    .tools
      .title
        padding-top: 50px
        text-align: center
        font-size: 26px
        color: #010101
      .small-title
        padding: 13px
        text-align: center
        font-size: 14px
        color: #a8a8a8
      .wrapper
        width: 1200px
        margin: 0 auto 100px
        display: flex
        flex-wrap: wrap
        justify-content: space-between
        .item
          width: 371px
          height: 330px
          margin-top: 35px
          position: relative
          transition: all 0.5s
          .pic
            height: 170px
            text-align: center
            position: relative
            img
              position: absolute
              left: 0
              right: 0
              bottom: 0
              top: 0
              margin: auto
          .name
            font-size: 18px
            color: #333333
            text-align: center
            a
              font-size: 18px
              color: #000000
              text-align: center
              &:hover
                color: #00c1de
          .explain
            width: 331px
            height: 120px
            margin: 0 auto
            text-align: left
            font-size: 16px
            line-height: 24px
            color: #a8a8a8
            margin-top: 14px
            overflow: hidden
            display: -webkit-box
            -webkit-box-orient: vertical
            -webkit-line-clamp: 5
</style>