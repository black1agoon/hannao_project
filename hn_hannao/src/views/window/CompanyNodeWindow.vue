<template>
  <div v-if="opened" class="window-wrapper" @click="close">

    <div class="window" @click.stop>
      <div class="window-title">企业节点</div>
      <div class="node-center" :style="nodeStyle">
        <div class="figure-label" v-for="lb in figureLabels" :key="lb.icon"
             :class="lb.class" :style="lb.style" @click="openWorkshop(lb)">
          {{ lb.text }}
        </div>
        <div class="code-type" v-for="code in codeTypes" :key="code.text" :style="code.style">
          {{ code.text }}
        </div>
        <div class="node-name">
          {{ company.name }}
        </div>
      </div>
      <div class="node-figure" v-for="fg in figures" :key="fg.icon"
           :class="fg.class" :style="fg.style" @click="openWorkshop(fg)">
        <div class="fg-icon" :class="'fg-' + fg.icon"></div>
        <div class="fg-value">{{ fg.value || 0 }}</div>
        <div class="fg-unit">{{ fg.unit || '个' }}</div>
      </div>
    </div>

  </div>
</template>

<script>
  import api from '@/api'

  const windowPos = [87, 137]
  const nodePos = [469, 240]

  const figures = [
    { icon: 0, pos: [1492, 185], id: 'productionManagement' }, // 生产管控
    { icon: 1, pos: [1492, 328], id: 'jzbData' }, // 防伪溯源
    { icon: 2, pos: [1492, 538], id: 'eid' }, // 人员
    { icon: 3, pos: [1492, 838], id: 'qrCode' }, // 二维码
    { icon: 4, pos: [183, 267], id: 'edgeEquipments', class: 'clickable' }, // 边缘设备
    { icon: 5, pos: [183, 479], id: 'processCalculationEquipments' }, // 过程计算
    { icon: 6, pos: [183, 674], id: 'agvEquipments' }, // 设备（AGV）
    { icon: 7, pos: [183, 773], id: 'whControl' }, // 设备（龙门架）
  ]

  const figureLabels = [
    { icon: 0, text: '生产管控', pos: [1323, 204] },
    { icon: 1, text: '防伪溯源', pos: [1323, 352] },
    { icon: 2, text: '人员', pos: [1323, 556] },
    { icon: 3, text: '二维码', pos: [1323, 854] },
    { icon: 4, text: '边缘设备', pos: [493, 287], class: 'clickable' },
    { icon: 5, text: '过程计算', pos: [493, 502] },
    { icon: 6, text: '设备', pos: [493, 693] },
  ]

  const codeTypes = [
    { text: 'RFID码', pos: [1017, 314], rotate: 25 },
    { text: 'eID', pos: [1196, 579], rotate: 0 },
    { text: '二维码', pos: [1004, 791], rotate: -21 },
    { text: '主动码', pos: [660, 528], rotate: -85 },
  ]

  const numberFormat = new Intl.NumberFormat()

  export default {
    name: 'EnterpriseNodeWindow',

    data () {
      return {
        opened: false,
        company: {
          id: null,
          name: null,
        },
        nodeStyle: {
          left: nodePos[0] - windowPos[0] + 'px',
          top: nodePos[1] - windowPos[1] + 'px',
        },
        figures: figures.map(fg => ({
          ...fg,
          value: numberFormat.format(fg.value || 0),
          style: {
            left: fg.pos[0] - windowPos[0] + 'px',
            top: fg.pos[1] - windowPos[1] + 'px',
          },
        })),
        figureLabels: figureLabels.map(lb => ({
          ...lb,
          pos: lb.pos.map(p => p + 'px'),
          style: {
            left: lb.pos[0] - nodePos[0] + 'px',
            top: lb.pos[1] - nodePos[1] + 'px',
          },
        })),
        codeTypes: codeTypes.map(code => ({
          ...code,
          style: {
            left: code.pos[0] - nodePos[0] + 'px',
            top: code.pos[1] - nodePos[1] + 'px',
            transform: `rotate(${code.rotate}deg)`,
          },
        })),
      }
    },
    methods: {
      open ({ id = 1, name = '浙江伴宇服装制造有限公司' } = {}) {
        this.opened = true
        this.company = { id, name }
        this.startInterval(5)
      },
      close () {
        this.opened = false
        window.clearInterval(this.timer)
      },
      openWorkshop ({ icon }) {
        if (icon === 4 && this.figures[4].value > 0) {
          this.$emit('workshop', this.company)
        }
      },
      getCompanyData () {
        if (!this.company.id) {
          return
        }
        api.company.getOverview(this.company.id).then(data => {
          this.figures = this.figures.map(fg => ({ ...fg, value: numberFormat.format(data[fg.id]) }))
        })
      },
      startInterval (interval = 5) {
        this.getCompanyData()
        this.timer = window.setInterval(() => {
          this.getCompanyData()
        }, interval * 60 * 1000)
      },
    },
  }
</script>

<style lang="stylus" scoped>
  .window-wrapper
    position: fixed
    width: 100vw
    height: 100vh
    top: 0
    left: 0
    background: #00000088
    z-index: 300

    .window
      position: relative
      width: 1720px
      height: 851px
      margin: 0 auto
      top: 137px
      background: url("../../assets/img/company/bg.png") no-repeat center

      .window-title
        position: absolute
        width: 120px
        margin-top: -12px
        left: 50%
        transform: translateX(-50%)
        text-align: center
        font-size: 30px
        color: white

      .node-center
        position: absolute
        width: 993px
        height: 653px
        background: url("../../assets/img/company/node-center.png") no-repeat center

        .node-name
          font-family: "MFLiHei"
          font-size: 48px
          position: relative
          width: 300px
          height: 120px
          margin: 0 auto
          top: 50%;
          transform: translateY(-50%)
          color: white
          text-align: center

        .figure-label
          position: absolute
          width: 120px
          color: aqua
          font-size: 24px
          text-align: center

          &.clickable
            cursor: pointer

        .code-type
          position: absolute
          color: white
          font-size: 30px

      .node-figure
        position: absolute
        display: flex
        width: 260px

        &.clickable
          cursor: pointer

        .fg-icon
          width: 90px
          height: 81px
          background-size: contain

        .fg-0
          background-image: url("../../assets/img/company/icon0.png")

        .fg-1
          background-image: url("../../assets/img/company/icon1.png")

        .fg-2
          background-image: url("../../assets/img/company/icon2.png")

        .fg-3
          background-image: url("../../assets/img/company/icon3.png")

        .fg-4
          background-image: url("../../assets/img/company/icon4.png")

        .fg-5
          background-image: url("../../assets/img/company/icon5.png")

        .fg-6
          background-image: url("../../assets/img/company/icon6.png")

        .fg-7
          background-image: url("../../assets/img/company/icon7.png")

        .fg-value
          color: yellow
          font-weight: bold
          font-size: 62px
          padding: 18px 8px 0 24px
          font-family: 'Teko-Regular'
          flex: 1
          text-align: right

        .fg-unit
          color: lightgrey
          font-size: 28px
          padding: 36px 0 0

</style>
