<template>
  <div class="wrapper">
    <div class="banner">
      <div class="content">
        <div class="fonts-wrap">
          <div class="title">智慧工厂建设与应用服务</div>
          <div class="intro">让传统重资产企业享受轻资产的互联网服务</div>
          <div class="free-use">了解详情</div>
        </div>
        <div class="video-wrap">
          <div class="mask" v-show="maskShow">
            <img class="play" @click="videoPlay" src="../../assets/img/resolution/play.png"/>
          </div>
          <video class="video"
                 ref="video"
                 poster="../../assets/img/resolution/intelligent/videofirst.png"
                 @click="videoStop"
                 src="http://media.jianzb.cn/sp/0817/hnxcp.mp4"
                 type="video/mp4">
          </video>
        </div>
      </div>
    </div>
    <div class="ctt-wrapper">
      <div class="content">
        <div class="title">生产制造数字化解决方案</div>
        <div class="bg1">
          <img width="508" height="687" src="../../assets/img/resolution/intelligent/bg1.png"/>
        </div>
        <div class="solution">
          <ul class="left-tabs">
            <li :class="{active: activeIndex === 0}" @click="tabClick(0)">生产车间数字化</li>
            <li :class="{active: activeIndex === 1}" @click="tabClick(1)">线外数字化体系建设</li>
            <li :class="{active: activeIndex === 2}" @click="tabClick(2)">工厂数字化指挥运营</li>
          </ul>
          <div class="right">
            <img v-show="activeIndex === 0" width="800" height="482"
                 src="../../assets/img/resolution/intelligent/fa1.png"/>
            <img v-show="activeIndex === 1" width="676" height="572"
                 src="../../assets/img/resolution/intelligent/fa2.png"/>
            <img v-show="activeIndex === 2" width="850" height="620"
                 src="../../assets/img/resolution/intelligent/fa3.png"/>
          </div>
        </div>
      </div>
    </div>
    <div class="ctt-wrapper" style="background: #F1F1F5">
      <div class="content">
        <div class="title">数字化工厂的优势</div>
        <div class="goodness">
          <div class="good">
            <img src="../../assets/img/resolution/intelligent/good1.png"/>
            <p>机器联网 数据流动</p>
          </div>
          <div class="good">
            <img src="../../assets/img/resolution/intelligent/good2.png"/>
            <p>产能提升 增加盈利</p>
          </div>
          <div class="good">
            <img src="../../assets/img/resolution/intelligent/good3.png"/>
            <p>提升质量 减少返工</p>
          </div>
        </div>
        <div class="goodness">
          <div class="good">
            <img src="../../assets/img/resolution/intelligent/good4.png"/>
            <p>工资透明 公平合理</p>
          </div>
          <div class="good">
            <img src="../../assets/img/resolution/intelligent/good5.png"/>
            <p>扁平管理 化繁为简</p>
          </div>
          <div class="good">
            <img src="../../assets/img/resolution/intelligent/good6.png"/>
            <p>精准分析 智慧决策</p>
          </div>
        </div>
      </div>
    </div>
    <div class="ctt-wrapper">
      <div class="content">
        <div class="title">适用产业</div>
        <div class="industry">
          <div class="item">
            <img src="../../assets/img/resolution/intelligent/industry1.png"/>
            <p>纺织</p>
          </div>
          <div class="item">
            <img src="../../assets/img/resolution/intelligent/industry2.png"/>
            <p>服装</p>
          </div>
          <div class="item">
            <img src="../../assets/img/resolution/intelligent/industry3.png"/>
            <p>箱包</p>
          </div>
          <div class="item">
            <img src="../../assets/img/resolution/intelligent/industry4.png"/>
            <p>五金</p>
          </div>
        </div>
      </div>
    </div>
    <div class="ctt-wrapper">
      <div class="content">
        <div class="title">为劳动密集型企业和设备密集型企业提供完整的<br>工业物联网解决方案</div>
        <div class="tabs-wrap">
          <ul class="tabs">
            <li :class="{active: tabIndex === 0}" @click="tabClick2(0)">机台数字化</li>
            <li :class="{active: tabIndex === 1}" @click="tabClick2(1)">组长数字化</li>
            <li :class="{active: tabIndex === 2}" @click="tabClick2(2)">质检数字化</li>
            <li :class="{active: tabIndex === 3}" @click="tabClick2(3)">后道数字化</li>
            <li :class="{active: tabIndex === 4}" @click="tabClick2(4)">线外数字化</li>
          </ul>
          <div class="tab-content">
            <div class="tab1" v-show="tabIndex === 0">
              <div class="ctt">
                <img class="big" src="../../assets/img/resolution/intelligent/tab1pic.png"/>
                <img class="small" src="../../assets/img/resolution/intelligent/tab1spic.png"/>
                <div class="text-box">
                  <div class="title">工位终端嵌入式工业APP</div>
                  <ul class="data">
                    <li><i><i></i></i>接受生产指令、质量信息</li>
                    <li><i><i></i></i>采集生产设备状态、产量信息</li>
                    <li><i><i></i></i>实现人与机器在生产组织活动中的信息交互问题</li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="tab2" v-show="tabIndex === 1">
              <div class="ctt">
                <img class="big" src="../../assets/img/resolution/intelligent/tab2pic.png"/>
                <img class="small" src="../../assets/img/resolution/intelligent/tab2spic.png"/>
                <div class="text-box">
                  <div class="title">缝制车间生产组长派工工业APP</div>
                  <ul class="data">
                    <li><i><i></i></i>新款上线,组长对生产任务进行派工</li>
                    <li><i><i></i></i>生产过程发生变化 ,组长在移动设备上可快速进行调度<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;实现现场动态数据的集中管控和处理,使生产有序进行
                    </li>
                    <li><i><i></i></i>让复杂的事情简单化</li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="tab3" v-show="tabIndex === 2">
              <div class="ctt">
                <img class="big" src="../../assets/img/resolution/intelligent/tab3pic.png"/>
                <img class="small" src="../../assets/img/resolution/intelligent/tab3spic.png"/>
                <div class="text-box">
                  <div class="title">在线质量检测工业APP</div>
                  <ul class="data">
                    <li><i><i></i></i>产线半成品检测</li>
                    <li><i><i></i></i>不良问题实时传递</li>
                    <li><i><i></i></i>后道成品质检</li>
                    <li><i><i></i></i>避免同一质量问题重复出现</li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="tab4" v-show="tabIndex === 3">
              <div class="ctt">
                <img class="big" src="../../assets/img/resolution/intelligent/tab4pic.png"/>
                <img class="small" src="../../assets/img/resolution/intelligent/tab4spic.png"/>
                <div class="text-box">
                  <div class="title">成品检验工业APP</div>
                  <ul class="data">
                    <li><i><i></i></i>质检原因汇总分析</li>
                    <li><i><i></i></i>前道车间（监督）</li>
                    <li><i><i></i></i>产能与合格率的精准反馈与分析</li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="tab5" v-show="tabIndex === 4">
              <div class="ctt">
                <img class="big" src="../../assets/img/resolution/intelligent/tab5pic.png"/>
                <img class="small" src="../../assets/img/resolution/intelligent/tab5spic.png"/>
                <div class="text-box">
                  <div class="title">线外数字化</div>
                  <ul class="data">
                    <li><i><i></i></i>提升弱员工对信息化使用能力</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="ctt-wrapper">
      <div class="app-content">
        <div class="title">数字化工厂拥有庞大的工业app体系</div>
        <div class="wrap">
          <div class="app"><i></i>后道车间智能车间生产大数据分析工业APP软件</div>
          <div class="app"><i></i>缝制车间在线质检工业APP软件</div>
          <div class="app"><i></i>后道车间生产派工工业APP软件</div>
          <div class="app"><i></i>缝制车间生产组长工业APP软件</div>
          <div class="app"><i></i>后道车间成品检验工业APP软件</div>
          <div class="app"><i></i>工位数据采集工业嵌入式软件</div>
          <div class="app"><i></i>线外车间裁片编号工业APP软件</div>
          <div class="app"><i></i>工位显示终端工业嵌入式软件</div>
          <div class="app"><i></i>裁剪车间部件生产大数据分析工业APP软件</div>
          <div class="app"><i></i>自助查询终端人脸识别查询工业APP软件</div>
          <div class="app"><i></i>缝制车间周生产力大数据分析工业APP软件</div>
        </div>
      </div>
    </div>
    <div class="ctt-wrapper" >
      <div class="content">
        <div class="title">数字化工厂建设成效</div>
        <div class="greyline"></div>
        <div class="factory">
          <div class="step step1"></div>
          <div class="step step2"></div>
          <div class="step step3"></div>
          <div class="step step4"></div>
          <div class="step step5"></div>
          <div class="step step6"></div>
          <div class="font font1">
            <div class="tit">提升产值</div>
            <div class="txt">
              <p>机台数字化</p>
              <p>组长数字化</p>
              <p>线外数字化</p>
              <p>产线平衡</p>
            </div>
          </div>
          <div class="font font2">
            <div class="tit">提升质量</div>
            <div class="txt">
              <p>在线质量检测</p>
            </div>
          </div>
          <div class="font font3">
            <div class="tit">简化管理</div>
          </div>
          <div class="font font4">
            <div class="tit">精益化管理</div>
            <div class="txt">
              <p>履职监督</p>
              <p>简化管理</p>
            </div>
          </div>
          <div class="font font5">
            <div class="tit">提升产值</div>
            <div class="txt">
              <p>机台数字化</p>
              <p>组长数字化</p>
              <p>线外数字化</p>
              <p>产线平衡</p>
            </div>
          </div>
          <div class="font font6">
            <div class="tit">智能排产</div>
            <div class="txt">
              <p>APS智能排产</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="ctt-wrapper" style="background: #F1F1F5">
      <div class="content">
        <div class="title">数字化工厂典型应用案例</div>
        <div class="example">
          <div class="left-video">
            <div class="mask" v-show="maskShow2">
              <img class="play" @click="videoPlay2" src="../../assets/img/resolution/play.png"/>
            </div>
            <video class="video"
                   ref="video2"
                   poster="../../assets/img/resolution/intelligent/video2first.png"
                   @click="videoStop2"
                   src="http://dashboard.nfc96315.cn/sp/0817/byszgc.mp4"
                   type="video/mp4">
            </video>
          </div>
        </div>
      </div>
    </div>
    <online-service>
    </online-service>
  </div>
</template>

<script>
  import OnlineService from '../common/OnlineService'

  export default {
    name: 'resolution-intelligent',
    components: {
      OnlineService
    },
    data() {
      return {
        maskShow: true,
        maskShow2: true,
        activeIndex: 0,
        tabIndex: 4
      }
    },
    methods: {
      videoPlay() {
        let video = this.$refs.video
        video.play()
        this.maskShow = false
      },
      videoStop() {
        let video = this.$refs.video
        video.pause()
        this.maskShow = true
      },
      videoPlay2() {
        let video = this.$refs.video2
        video.play()
        this.maskShow2 = false
      },
      videoStop2() {
        let video = this.$refs.video2
        video.pause()
        this.maskShow2 = true
      },
      tabClick(index) {
        this.activeIndex = index
      },
      tabClick2(index) {
        this.tabIndex = index
      }
    },
    mounted() {
    },
    destroyed() {
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .wrapper
    .banner
      position: relative
      min-width: 1200px
      height: 500px
      background-image: url("../../assets/img/resolution/intelligent/banner.png")
      background-repeat: no-repeat
      background-size: cover
      .content
        width: 1200px
        display: flex
        color: #ffffff
        margin: 0 auto
        padding-top: 165px
        .fonts-wrap
          flex: 1
          .title
            font-size: 40px
            /*font-weight: bold*/
            color: #ffffff
            margin-bottom: 40px
          .intro
            font-size: 24px
            margin-bottom: 65px
            line-height: 30px
          .free-use
            width: 140px
            height: 50px
            line-height: 50px
            text-align: center
            font-size: 24px
            border: 2px solid rgba(255, 255, 255, 1)
            border-radius: 6px
            transition: all .2s
            &:hover
              cursor: pointer
              background: #ffffff
              color: #3CB8DF
        .video-wrap
          width: 500px
          height: 280px
          position: relative
          .video
            width: 500px
            height: 280px
          .mask
            position: absolute
            top: 0
            left: 0
            width: 500px
            height: 280px
            background: rgba(0, 0, 0, 0.3)
            z-index: 100
            .play
              position: absolute
              width: 114px
              height: 114px
              background-image: url("../../assets/img/resolution/play.png")
              background-size: 114px 114px
              background-repeat: no-repeat
              left: 0
              top: 0
              right: 0
              bottom: 0
              margin: auto
              cursor: pointer
    .ctt-wrapper
      width: 100%
      background: #ffffff
      padding: 81px 0 100px
      .content
        position: relative
        .title
          text-align: center
          font-size: 35px
          /*font-weight: bold*/
          color: #595961
          line-height: 50px
        .bg1
          position: absolute
          left: -160px
          top: 0
        .solution
          position: relative
          margin: 0 auto
          width: 1200px
          height: 600px
          .left-tabs
            position: absolute
            z-index: 50
            left: 0
            width: 340px
            height: 320px
            margin-top: 156px
            display: flex
            flex-direction: column
            border: 1px solid rgba(223, 225, 230, 1)
            border-radius: 10px
            li
              height: 106px
              line-height: 106px
              text-align: center
              font-size: 20px
              color: #595961
              border-bottom: 1px solid #DFE1E6
              cursor: pointer
              /*font-weight: bold*/
              background: #ffffff
              &.active
                background: #DFE1E6
              &:last-child
                border-bottom: none
          .right
            position: relative
            overflow: hidden
            height: 100%
            img
              position: absolute
              right: 0
              bottom: 0
        .goodness
          display: flex
          width: 1200px
          margin: 80px auto 0
          justify-content: space-between
          .good
            width: 200px
            height: 160px
            text-align: center
            position: relative
            p
              width: 100%
              position: absolute
              bottom: 0
              font-size: 20px
              color: #595961
              /*font-weight: bold*/
        .industry
          width: 1200px
          margin: 80px auto 0
          display: flex
          justify-content: space-between
          .item
            width: 260px
            height: 280px
            position: relative
            background: #ffffff
            box-shadow: 0 8px 38px rgba(37, 37, 37, 0.05)
            img
              position: absolute
              top: 44px
              left: 0
              right: 0
              margin: auto
            p
              position: absolute
              bottom: 36px
              width: 100%
              text-align: center
              font-size: 20px
              color: #595961
              /*font-weight: bold*/
        .tabs
          margin: 44px auto 62px
          width: 1200px
          height: 70px
          line-height: 70px
          display: flex
          border-bottom: 1px solid #DDDDDD
          justify-content: space-around
          li
            text-align: center
            font-size: 22px
            /*font-weight: bold*/
            color: #595961
            cursor: pointer
            &.active
              border-bottom: 3px solid #FF8400
        .tab-content
          .tab1, .tab2, .tab3, .tab4, .tab5
            .ctt
              .text-box
                .data
                  li
                    i
                      display: inline-block
                      width: 20px
                      height: 20px
                      line-height: 20px
                      border: 1px solid rgba(255, 132, 0, 1)
                      border-radius: 50%
                      text-align: center
                      margin-right: 17px
                      i
                        display: inline-block
                        width: 12px
                        height: 12px
                        background: rgba(255, 132, 0, 1)
                        border-radius: 50%
                        margin-right: 0
          .tab1
            margin: 0 auto
            max-width: 1239px
            height: 453px
            background-image: url("../../assets/img/resolution/intelligent/tabbg1.png")
            background-size: cover
            background-position: center
            background-repeat: no-repeat
            .ctt
              position: relative
              .big
                position: absolute
                left: 108px
                top: 31px
              .small
                position: absolute
                left: 171px
                top: 250px
              .text-box
                position: absolute
                top: 70px
                right: 75px
                width: 512px
                height: 215px
                .title
                  text-align: left
                  color: #FF8400
                  font-size: 24px
                .data
                  margin-top: 30px
                  li
                    font-size: 18px
                    color: #7B7B84
                    line-height: 48px
          .tab2
            margin: 0 auto
            max-width: 1381px
            height: 453px
            background-image: url("../../assets/img/resolution/intelligent/tabbg2.png")
            background-size: cover
            background-position: center
            background-repeat: no-repeat
            .ctt
              position: relative
              .big
                position: absolute
                right: 100px
                top: 17px
              .small
                position: absolute
                left: 723px
                top: 243px
              .text-box
                position: absolute
                top: 46px
                left: 100px
                width: 512px
                height: 215px
                .title
                  text-align: left
                  color: #FF8400
                  font-size: 24px
                .data
                  margin-top: 30px
                  li
                    font-size: 18px
                    color: #7B7B84
                    line-height: 48px
          .tab3
            margin: 0 auto
            max-width: 1217px
            height: 453px
            background-image: url("../../assets/img/resolution/intelligent/tabbg3.png")
            background-size: cover
            background-position: center
            background-repeat: no-repeat
            .ctt
              position: relative
              .big
                position: absolute
                left: 108px
                top: 31px
              .small
                position: absolute
                left: 275px
                top: 250px
              .text-box
                position: absolute
                top: 70px
                left: 700px
                width: 512px
                .title
                  text-align: left
                  color: #FF8400
                  font-size: 24px
                .data
                  margin-top: 30px
                  li
                    font-size: 18px
                    color: #7B7B84
                    line-height: 48px
          .tab4
            margin: 0 auto
            max-width: 1347px
            height: 463px
            background-image: url("../../assets/img/resolution/intelligent/tabbg4.png")
            background-size: cover
            background-position: center
            background-repeat: no-repeat
            .ctt
              position: relative
              .big
                position: absolute
                right: 100px
                top: 17px
              .small
                position: absolute
                left: 723px
                top: 243px
              .text-box
                position: absolute
                top: 46px
                left: 100px
                width: 512px
                height: 215px
                .title
                  text-align: left
                  color: #FF8400
                  font-size: 24px
                .data
                  margin-top: 30px
                  li
                    font-size: 18px
                    color: #7B7B84
                    line-height: 48px
          .tab5
            margin: 0 auto
            max-width: 1217px
            height: 453px
            background-image: url("../../assets/img/resolution/intelligent/tabbg5.png")
            background-size: cover
            background-position: center
            background-repeat: no-repeat
            .ctt
              position: relative
              .big
                position: absolute
                left: 90px
                top: 31px
              .small
                position: absolute
                left: 484px
                top: 142px
              .text-box
                position: absolute
                top: 70px
                left: 780px
                width: 350px
                .title
                  text-align: left
                  color: #FF8400
                  font-size: 24px
                .data
                  margin-top: 30px
                  li
                    font-size: 18px
                    color: #7B7B84
                    line-height: 48px
        .example
          width: 1200px
          margin: 80px auto 0
          .left-video
            position: relative
            width: 626px
            height: 353px
            margin: 0 auto
            border-radius: 16px
            overflow: hidden
            box-shadow: 0 0 5px #333
            font-size: 0
            .video
              width: 100%
              height: 100%
              border-radius: 16px
            .mask
              position: absolute
              top: 0
              left: 0
              width: 626px
              height: 353px
              background: rgba(0, 0, 0, 0.3)
              z-index: 100
              .play
                position: absolute
                width: 114px
                height: 114px
                background-image: url("../../assets/img/resolution/play.png")
                background-size: 114px 114px
                background-repeat: no-repeat
                left: 0
                top: 0
                right: 0
                bottom: 0
                margin: auto
                cursor: pointer
        .greyline
          position: absolute
          top: 393px
          width: 100%
          height: 64px
          background: #F1F1F6
        .factory
          width: 1200px
          height: 520px
          margin: 120px auto 0
          position: relative
          .step
            position: absolute
            width: 156px
            height: 300px
            background-repeat: repeat
            background-size: 156px 300px
            &.step1
              left: 0
              top: 0
              background-image: url("../../assets/img/resolution/intelligent/step1.png")
            &.step2
              left: 212px
              top: 220px
              background-image: url("../../assets/img/resolution/intelligent/step2.png")
            &.step3
              left: 418px
              top: 0
              background-image: url("../../assets/img/resolution/intelligent/step3.png")
            &.step4
              left: 630px
              top: 220px
              background-image: url("../../assets/img/resolution/intelligent/step4.png")
            &.step5
              left: 840px
              top: 0
              background-image: url("../../assets/img/resolution/intelligent/step5.png")
            &.step6
              left: 1044px
              top: 220px
              background-image: url("../../assets/img/resolution/intelligent/step6.png")
          .font
            position: absolute
            &.font1
              top: 10px
              left: 115px
            &.font2
              top: 355px
              left: 130px
            &.font3
              top: 10px
              left: 540px
            &.font4
              top: 355px
              left: 556px
            &.font5
              top: 10px
              left: 960px
            &.font6
              top: 355px
              left: 970px
            .tit
              font-size: 22px
              /*font-weight: bold*/
              color: #73767C
            .txt
              margin-top: 15px
              font-size: 18px
              color: #979BA5
              line-height: 30px
              text-align: right

      .app-content
        margin: -81px 0 -100px
        position: relative
        min-width: 1200px
        height: 592px
        background-image: url("../../assets/img/resolution/intelligent/bgapp.png")
        background-repeat: no-repeat
        background-size: cover
        background-position: center center
        .title
          padding: 80px 0 70px 0
          text-align: center
          font-size: 30px
          /*font-weight: bold*/
          color: #595961
          line-height: 50px
        .wrap
          width: 1200px
          margin: 0 auto
          display: flex
          flex-wrap: wrap
          .app
            width: 50%
            margin-bottom: 35px
            font-size: 22px
            color: #595961
            i
              display: inline-block
              width: 17px
              height: 17px
              border-radius: 50%
              background: #FF8400
              margin-right: 24px
</style>