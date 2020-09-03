<template>
  <div class="wrapper">
    <div class="banner">
      <div class="header" ref="header">
      </div>
    </div>
    <div class="content-wrapper">
      <div class="cloud-service">
        <div class="left">
          <div class="name">云端服务<i></i></div>
          <div class="content">使用云端服务的好处是：企业不需投入大量的固定资产采购软硬件，也不需要增加信息管理人员，只要透过云端服务供货商所提供的服务，在很短的时间内就可以迅速取得服务。
            这对一些分秒必争的企业营运来说，将会产生相当大的帮助。
          </div>
        </div>
        <div class="right">
          <div class="item" v-for="item in itemlist1" :key="item.id">
            <div class="picture">
              <img :src="require('../../assets/img/' + item.pic + '.png')">
            </div>
            <div class="name">{{item.name}}</div>
            <div class="description">{{item.description}}</div>
            <div class="bottom">
              <span :class="['icon', getStatus(item.state).klass]"></span>
              <span class="status">{{getStatus(item.state).statusCN}}</span>
            </div>
            <div class="mask" v-if="item.state === 0">
              <div class="name">{{item.name}}</div>
              <div class="explain">
                <p>您的账户，还未开通</p>
                <p>有问题请联络客服</p>
                <p>400-657-3085</p>
              </div>
              <div class="button button1" @click="apply(item.id)">立即申请</div>
            </div>
            <div class="mask" v-else-if="item.state === '2'">
              <div class="name">{{item.name}}</div>
              <div class="explain">
                <p>您的账户，正在审核中</p>
                <p>有问题请联络客服</p>
                <p>400-657-3085</p>
              </div>
              <div class="button button2">审核中</div>
            </div>
            <div class="already" v-else-if="item.state === '1'">
              <a target="_blank" :href="item.url">进入平台</a><i class="arrow"></i>
            </div>
          </div>
        </div>
      </div>
      <div class="terminal">
        <div class="left">
          <div class="name">终端采集<i></i></div>
          <div class="content">生产现场部署大量传感器、边缘计算机和人机交互终端，为数字化工厂积累庞大的数据资源，且数据来源可信、可溯、可管控，是实现智慧决策的基础。
          </div>
        </div>
        <div class="right">
          <div class="item" v-for="item in itemlist2" :key="item.id">
            <div class="picture">
              <img :src="require('../../assets/img/' + item.pic + '.png')">
            </div>
            <div class="name">{{item.name}}</div>
            <div class="description">{{item.description}}</div>
            <div class="bottom">
              <span :class="['icon', getStatus(item.state).klass]"></span>
              <span class="status">{{getStatus(item.state).statusCN}}</span>
            </div>
            <div class="mask" v-if="item.state === 0">
              <div class="name">{{item.name}}</div>
              <div class="explain">
                <p>您的账户，还未开通</p>
                <p>有问题请联络客服</p>
                <p>400-657-3085</p>
              </div>
              <div class="button button1" @click="apply(item.id)">立即申请</div>
            </div>
            <div class="mask" v-else-if="item.state === '2'">
              <div class="name">{{item.name}}</div>
              <div class="explain">
                <p>您的账户，正在审核中</p>
                <p>有问题请联络客服</p>
                <p>400-657-3085</p>
              </div>
              <div class="button button2">审核中</div>
            </div>
            <div class="already" v-else-if="item.state === '1'">
              <a target="_blank" :href="item.url">进入平台</a><i class="arrow"></i>
            </div>
          </div>
        </div>
      </div>
      <div class="product-controller">
        <div class="left">
          <div class="name">生产控制<i></i></div>
          <div class="content">着重关注缝制生产线，其高速运转的关键取决于各缝制工位的一致步调和节拍系统对异常工位及时预警并推送管理者进行疏导提醒，整个工厂各生产环节的平衡。
          </div>
        </div>
        <div class="right">
          <div class="item" v-for="item in itemlist3" :key="item.id">
            <div class="picture">
              <img :src="require('../../assets/img/' + item.pic + '.png')">
            </div>
            <div class="name">{{item.name}}</div>
            <div class="description">{{item.description}}</div>
            <div class="bottom">
              <span :class="['icon', getStatus(item.state).klass]"></span>
              <span class="status">{{getStatus(item.state).statusCN}}</span>
            </div>
            <div class="mask" v-if="item.state === 0">
              <div class="name">{{item.name}}</div>
              <div class="explain">
                <p>您的账户，还未开通</p>
                <p>有问题请联络客服</p>
                <p>400-657-3085</p>
              </div>
              <div class="button button1" @click="apply(item.id)">立即申请</div>
            </div>
            <div class="mask" v-else-if="item.state === '2'">
              <div class="name">{{item.name}}</div>
              <div class="explain">
                <p>您的账户，正在审核中</p>
                <p>有问题请联络客服</p>
                <p>400-657-3085</p>
              </div>
              <div class="button button2">审核中</div>
            </div>
            <div class="already" v-else-if="item.state === '1'">
              <a target="_blank" :href="item.url">进入平台</a><i class="arrow"></i>
            </div>
          </div>
        </div>
      </div>
      <div class="data-analysis">
        <div class="left">
          <div class="name">数据分析<i></i></div>
          <div class="content">
            全数字化的产线管理，不仅为企业的生产过程管控提供了强大的数据支撑，而且也为订单的实时跟踪和生产计划的贯彻落实执行提供了保障，数据来自一线，价值同样体现在一线，为数字化工厂的建设提供了基础保障。机联网实现动态工位数据实时采集，经确认后，自动结算工人当日工资，减少计件统计员，扁平化架构下，数据更加清晰，管理更流畅。
          </div>
        </div>
        <div class="right">
          <div class="item" v-for="item in itemlist4" :key="item.id">
            <div class="picture">
              <img :src="require('../../assets/img/' + item.pic + '.png')">
            </div>
            <div class="name">{{item.name}}</div>
            <div class="description">{{item.description}}</div>
            <div class="bottom">
              <span :class="['icon', getStatus(item.state).klass]"></span>
              <span class="status">{{getStatus(item.state).statusCN}}</span>
            </div>
            <div class="mask" v-if="item.state === 0">
              <div class="name">{{item.name}}</div>
              <div class="explain">
                <p>您的账户，还未开通</p>
                <p>有问题请联络客服</p>
                <p>400-657-3085</p>
              </div>
              <div class="button button1" @click="apply(item.id)">立即申请</div>
            </div>
            <div class="mask" v-else-if="item.state === '2'">
              <div class="name">{{item.name}}</div>
              <div class="explain">
                <p>您的账户，正在审核中</p>
                <p>有问题请联络客服</p>
                <p>400-657-3085</p>
              </div>
              <div class="button button2">审核中</div>
            </div>
            <div class="already" v-else-if="item.state === '1'">
              <a target="_blank" :href="item.url">进入平台</a><i class="arrow"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <prompt-window ref="window" :options="windowOptions"></prompt-window>
  </div>
</template>

<script>
  import utils from '@/assets/js/utils'
  import api from '@/api'
  import {getCookie} from '../../assets/js/tools'
  // import {mapState} from 'vuex'
  import PromptWindow from '@/components/common/PromptWindow'
  const SERVICES = [{
    pic: 'cloud1',
    name: 'IMS',
    description: '一种全新的多媒体业务形式'
  }, {
    pic: 'cloud2',
    name: '能耗监控',
    description: '能源应用量的控制与测量提供解决方案'
  }, {
    pic: 'cloud3',
    name: '维保养护',
    description: '为提高经济效益的唯一办法'
  }, {
    pic: 'cloud4',
    name: '品牌防伪',
    description: '消费者用户之间的桥梁和纽带'
  }, {
    pic: 'cloud5',
    name: '云访客',
    description: '一款智能采集终端'
  }, {
    pic: 'cloud6',
    name: '履职巡检',
    description: '责任分解、责任考核、责任追究'
  }, {
    pic: 'cloud7',
    name: '智能仓库',
    description: '提高仓库管理的工作效率'
  }, {
    pic: 'cloud8',
    name: '资产管理',
    description: '高效管理企业的各类资产'
  }, {
    pic: 'terminal1',
    name: '工位数据采集工业嵌入式软件',
    description: '让管理者精准管控'
  }, {
    pic: 'terminal2',
    name: '工位显示终端工业嵌入式软件',
    description: '人性化界面设计，操作简单'
  }, {
    pic: 'terminal3',
    name: '终端人脸识别查询工业APP软件',
    description: '建设国家视觉大数据中心 '
  }, {
    pic: 'terminal4',
    name: '后道车间成品检验工业APP软件',
    description: '高效率和低能耗'
  }, {
    pic: 'product1',
    name: '缝制车间在线质检工业APP软件',
    description: '让管理者精准管控'
  }, {
    pic: 'product2',
    name: '缝制车间生产组长工业APP软件',
    description: '中层减少，扁平管理'
  }, {
    pic: 'product3',
    name: '后道车间生产派工工业APP软件',
    description: '产能提升，增加盈利'
  }, {
    pic: 'product4',
    name: '线外车间裁片编号工业APP软件',
    description: '机器联网，统一管理'
  }, {
    pic: 'data1',
    name: '智能产线平衡大数据分析工业APP软件',
    description: '统计无压力，管理更高效'
  }, {
    pic: 'data2',
    name: '智能周生产力大数据分析工业APP软件',
    description: '数字化产线，人机交互'
  }, {
    pic: 'data3',
    name: '智能车间生产大数据分析工业APP软件',
    description: '保证产品质量'
  }, {
    pic: 'data4',
    name: '后道车间智能车间生产大数据分析工业APP软件',
    description: '生产任务按计划执行'
  }, {
    pic: 'data5',
    name: '智能车间生产大数据分析工业APP软件',
    description: '掌握车间生产状况'
  }, {
    pic: 'data6',
    name: '车间部件生产大数据分析工业APP软件',
    description: '确保产品交期'
  }, {
    pic: 'data7',
    name: '线外车间部件生产工业APP软件',
    description: '提高生产效率'
  }, {
    pic: 'data8',
    name: '线外车间生产任务工业APP软件',
    description: '主动寻求高效平衡'
  }]
  export default {
    name: 'service-center',
    components: {
      PromptWindow
    },
    data() {
      return {
        utils,
        itemlist1: [],
        itemlist2: [],
        itemlist3: [],
        itemlist4: [],
        userId: null,
        showSuccess: false,
        windowOptions: {
          font: '提交成功',
          icon: 'success'
        }
      }
    },
    computed: {},
    methods: {
      getStatus(status) {
        if (status === 0) {
          return {
            klass: 'icon1',
            statusCN: '未开通'
          }
        } else if (status === '2') {
          return {
            klass: 'icon2',
            statusCN: '审核中'
          }
        } else if (status === '1') {
          return {
            klass: 'icon3',
            statusCN: '已开通'
          }
        }
      },
      go2index() {
      },
      go2detail(catid, id) {
      },
      getServiceCenterStatus() {
        api.getServiceCenterStatus(this.userId).then(data => {
          let list = []
          if (data.data && data.data.length > 0) {
            for (let i = 0; i < data.data.length; i++) {
              list[i] = data.data[i]
              list[i].pic = SERVICES[i].pic
              list[i].name = SERVICES[i].name
              list[i].description = SERVICES[i].description
            }
            this.itemlist1 = list.filter(l => l.class === '1')
            this.itemlist2 = list.filter(l => l.class === '2')
            this.itemlist3 = list.filter(l => l.class === '3')
            this.itemlist4 = list.filter(l => l.class === '4')
          }
        })
      },
      apply(moduleId) {
        api.apply(this.userId, moduleId).then(data => {
          this.$refs.window.show()
          this.getServiceCenterStatus()
        }).catch(err => {
          // alert(err)
        })
      }
    },
    mounted() {
      this.userId = getCookie('id')
      if (this.userId) {
        this.getServiceCenterStatus()
      } else {
        this.$router.push('/login')
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .wrapper
    .banner
      position: relative
      min-width: 1400px
      height: 340px
      background-image: url("../../assets/img/servicecenter.jpg")
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
          .user
            position: absolute
            right: 0
            .icon
              vertical-align: middle
              display: inline-block
              width: 27px
              height: 27px
              background-image: url("../../assets/img/usericon.png")
              background-size: 27px 27px
              background-repeat: no-repeat
            .username
              display: inline-block
              margin: 0 26px
            .logout
              vertical-align: middle
              display: inline-block
              width: 18px
              height: 20px
              cursor: pointer
              background-image: url("../../assets/img/logout.png")
              background-size: 18px 20px
              background-repeat: no-repeat
    .content-wrapper
      background: #ebecf1
      padding: 50px 0 100px
      .cloud-service, .terminal, .product-controller, .data-analysis
        width: 1200px
        height: 520px
        margin: 0 auto
        display: flex
        .left
          position: relative
          flex: 0 0 200px
          height: 520px
          background-image: url("../../assets/img/cloudservice.png")
          background-size: 200px 520px
          background-repeat: no-repeat
          padding: 0 14px 0 22px
          box-sizing: border-box
          &:before
            content: ''
            position: absolute
            left: 0
            width: 4px
            height: 520px
            background: linear-gradient(180deg, rgba(91, 177, 255, 1) 0%, rgba(45, 154, 255, 1) 100%)
          .name
            margin-top: 30px
            color: #333333
            font-size: 18px
            line-height: 15px
            i
              display: inline-block
              margin-left: 10px
              width: 15px
              height: 15px
              background-image: url("../../assets/img/cloudicon.png")
              background-size: 15px 15px
              background-repeat: no-repeat
              vertical-align: top
          .content
            font-size: 14px
            color: #a8a8a8
            line-height: 25px
            margin-top: 15px
        .right
          flex: 1
          height: 520px
          display: flex
          flex-direction: row
          flex-wrap: wrap
          .item
            width: 250px
            height: 260px
            text-align: center
            position: relative
            background: #ffffff
            border-right: 1px solid #eee
            box-sizing: border-box
            overflow: hidden
            &:nth-of-type(-n+4)
              border-bottom: 1px solid #eee
            &:nth-of-type(4n)
              border-right: none
            .picture
              margin-top: 49px
              height: 88px
            .name
              color: #333333
              font-size: 18px
            .description
              color: #a8a8a8
              font-size: 12px
              margin: 22px 0
            .bottom
              position: absolute
              width: 100%
              bottom: 0
              height: 48px
              line-height: 48px
              text-align: right
              &:before
                content: ''
                position: absolute
                top: 1px
                left: 27px
                width: 197px
                height: 1px
                background: #eeeeee
              .icon
                display: inline-block
                width: 20px
                height: 20px
                background-size: 20px 20px
                background-repeat: no-repeat
                vertical-align: middle
              .icon1
                background-image: url("../../assets/img/status1.png")
              .icon2
                background-image: url("../../assets/img/status2.png")
              .icon3
                background-image: url("../../assets/img/status3.png")
              .status
                color: #D2D2D2
                font-size: 14px
                margin: 0 22px 0 6px
            .mask
              position: absolute
              top: 0
              left: 0
              transition: all .5s
              transform: translate3d(100%, 0, 0)
              width: 100%
              height: 100%
              background: rgba(49, 49, 49, .9)
              .name
                color: #FFFFFF
                font-size: 18px
                padding: 49px 0 27px
                margin: 0 26px
                border-bottom: 1px solid #00AAFF
              .explain
                margin-top: 15px
                p
                  color: #ffffff
                  font-size: 14px
                  line-height: 20px
              .button
                width: 114px
                height: 34px
                line-height: 34px
                margin: 0 auto
                border-radius: 5px
                color: #ffffff
                text-align: center
                margin-top: 15px
              .button1
                cursor: pointer
                background: #00AAFF
                &:hover
                  background: rgba(0, 170, 255, .8)
              .button2
                background: rgba(145, 135, 215, 1)
            .already
              position: absolute
              top: 138px
              left: 0
              width: 100%
              height: 73px
              line-height: 73px
              background: #ffffff
              color: #566ED4
              font-size: 14px
              transition: all .5s
              transform: translate3d(100%, 0, 0)
              a
                color: #566ED4
              span
                display: inline-block
                cursor: pointer
                line-height: 15px
              .arrow
                margin-left: 10px
                vertical-align: middle
                display: inline-block
                width: 9px
                height: 15px
                background-image: url("../../assets/img/arrow_right.png")
                background-size: 9px 15px
                background-repeat: no-repeat
            &:hover
              .mask
                transform: translate3d(0, 0, 0)
              .already
                transform: translate3d(0, 0, 0)
          .last
            color: #DADADA
            font-size: 30px
            text-align: center
            padding-top: 89px
            box-sizing: border-box
      .terminal, .product-controller
        margin-top: 50px
        height: 260px
        .left
          height: 260px
          background-image: url("../../assets/img/terminal.png")
          background-size: 200px 260px
          &:before
            height: 260px
            background: linear-gradient(180deg, rgba(159, 130, 238, 1) 0%, rgba(115, 95, 208, 1) 100%)
          .name
            line-height: 20px
            i
              width: 16px
              height: 20px
              background-image: url("../../assets/img/terminalicon.png")
              background-size: 16px 20px
        .right
          .item
            .name
              font-size: 14px
      .product-controller
        .left
          background-image: url("../../assets/img/product.png")
          &:before
            background: linear-gradient(180deg, rgba(113, 129, 250, 1) 0%, rgba(117, 250, 243, 1) 0%, rgba(14, 210, 247, 1) 100%)
          .name
            line-height: 19px
            i
              width: 19px
              height: 19px
              background-image: url("../../assets/img/producticon.png")
              background-size: 19px 19px
      .data-analysis
        margin-top: 50px
        .left
          background-image: url("../../assets/img/data.png")
          .name
            line-height: 17px
            i
              width: 19px
              height: 17px
              background-image: url("../../assets/img/dataicon.png")
              background-size: 19px 17px
        .right
          .item
            .name
              font-size: 14px
</style>