<template>
  <div v-if="opened" class="window-wrapper" @click="close">
    <div class="window workshop-window" @click.stop>
      <div class="window-title">机器联网实时监测情况</div>
      <div class="select-wrapper clearfix">
        <combo-box class="select-combo" v-model="currentFactory" :options="factoryOptions"></combo-box>
        <combo-box class="select-combo" v-model="currentWorkshop" :options="workshopOptions"></combo-box>
      </div>
      <div class="machine-lines">
        <div class="center-area">
          <div class="total-count">{{ onlineStatus.online }}<span class="unit">台</span></div>
          <div class="total-percent">{{ onlineStatus.percent }}<span class="unit">%</span></div>
        </div>
        <div class="group-map" v-for="(group, gIdx) in machinePositions" :key="gIdx" :style="groupStyles[gIdx]">
          <div class="group-title">{{ group.groupName }}</div>
          <div class="machine-pos" v-for="(mp, pIdx) in group.stations" :key="pIdx"
               :class="{'tick-pos': gIdx === 3 && pIdx === 9}">
            <div class="status-point" :class="getMachineStatusClasses(mp)"></div>
          </div>
        </div>
        <div class="legend-points">
          <div class="legend-pos">
            <div class="status-point"></div>
            正常
          </div>
          <div class="legend-pos">
            <div class="status-point error-status"></div>
            报修
          </div>
          <div class="legend-pos">
            <div class="status-point lost-status"></div>
            离线
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import api from '@/api'
  import ComboBox from '@/components/common/ComboBox'

  const groupMapPositions = [
    [5, 20],
    [164, 20],
    [315, 20],
    [478, 20],
    [0, 1078],
    [160, 1078],
    [311, 1078],
  ].map((pos) => [
    {
      top: pos[0] ? pos[0] + 'px' : 0,
      left: pos[1] ? pos[1] + 'px' : 0,
    },
  ])

  export default {
    name: 'WorkshopView',
    components: { ComboBox },
    data () {
      return {
        opened: false,
        currentFactory: 0,
        currentWorkshop: 0,
        groupStyles: groupMapPositions,

        company: { id: null },
        workshopGroups: [],

        factoryOptions: [],
        workshopOptions: [],
      }
    },

    computed: {
      machinePositions () {
        return (this.workshopGroups || []).map(group => {
          return {
            ...group,
            stations: group['idsCompanyGroupStationDtoList'].sort((a, b) => (a.row - b.row) || (a.columns - b.columns)).slice(0, 20),
          }
        })
      },
      onlineStatus () {
        let total = 0
        let online = 0
        this.machinePositions.forEach((group) => {
          group.stations.forEach((groupItem) => {
            total += 1
            online += (groupItem.status !== 'OFF' ? 1 : 0)
          })
        })
        return {
          total,
          online,
          percent: +((online || 0) / (total || 1) * 100).toFixed(),
        }
      },

    },

    watch: {
      currentFactory () {
        if (this.currentFactory) {
          this.getWorkshopList()
        } else {
          this.workshopOptions = []
          this.currentWorkshop = null
        }
      },
      currentWorkshop () {
        this.getStations()
      },
    },

    methods: {
      open ({ id = '1' } = {}) {
        this.opened = true
        this.company = { id }
        this.startInterval(5)
        this.getFactoryList()
      },
      close () {
        this.opened = false
        window.clearInterval(this.timer)
      },

      startInterval (interval = 5) {
        this.getStations()
        this.timer = window.setInterval(() => {
          this.getStations()
        }, interval * 60 * 1000)
      },

      getStations () {
        if (!this.currentWorkshop) {
          this.currentWorkshop = null
          this.workshopGroups = []
          return
        }
        api.company.getWorkshopStations(this.currentWorkshop).then(data => {
          this.workshopGroups = data
        })
      },

      getFactoryList () {
        api.company.getPlants(this.company.id).then(data => {
          this.factoryOptions = (data || []).map(item => ({
            label: item.companyPlant,
            value: item.id,
          }))
          this.currentFactory = this.factoryOptions.length ? this.factoryOptions[0].value : null
        })
      },

      getWorkshopList () {
        api.company.getWorkshops(this.currentFactory).then(data => {
          this.workshopOptions = data.map(item => ({
            label: item.workshop,
            value: item.id,
          }))
          this.currentWorkshop = this.workshopOptions.length ? this.workshopOptions[0].value : null
        })
      },

      getMachineStatusClasses (mp) {
        return {
          'error-status': mp.status === 'ERROR',
          'lost-status': mp.status === 'OFF',
        }
      },
    },
  }
</script>

<style scoped lang="stylus">
  .window-wrapper
    position: fixed
    width: 100vw
    height: 100vh
    top: 0
    left: 0
    background: #00000088
    z-index: 400

    .window
      position: relative
      width: 1730px
      height: 745px
      margin: 0 auto
      top: 174px
      background: url("../../assets/img/workshops/背景.png") no-repeat center;
      color: white
      text-align: center

      .window-title
        position: absolute
        margin-top: -12px
        left: 50%
        transform: translateX(-50%)
        font-size: 30px

  .select-wrapper
    float: right;
    padding: 20px 40px;
    font-size: 18px;
    font-weight: bold;

    .select-combo
      margin: 0 10px;
      background: #0D007F;
      width: 160px;
      border-radius: 8px;
      box-shadow: 0 0 1px 1px aqua;
      position: relative

  .machine-lines
    position: absolute;
    top: calc(245px - 174px);
    left: calc(130px - 95px);
    width: 1656px;
    height: 614px;
    background: url("../../assets/img/workshops/连线结构.png") no-repeat center;
    background-size: contain;

    .center-area
      font-weight: bold;
      font-size: 18px;
      margin: 38px 0 0 -8px;

      .total-percent
        color: #00F6FF;
        font-size: 56px;
        position: relative;
        margin-left: -4px;

        .unit
          position: absolute;
          bottom: 2px;
          font-size: 28px;

      .total-count
        color: #00F6FF;
        font-size: 32px;
        margin-bottom: 12px;

        .unit
          font-size: 18px;

    .group-map
      position: absolute;
      left: 0;
      top: 0;
      display: flex;
      width: 590px;
      flex-wrap: wrap;

      .group-title
        position: absolute;
        background: url("../../assets/img/workshops/边框02.png") no-repeat center;
        background-size: contain;
        line-height: 24px;
        font-size: 14px;
        font-weight: bold;
        width: 100px;
        height: 32px;
        top: -20px;
        left: -30px;

    .machine-pos
      flex: 1 0 10%;
      height: 54px;
      position: relative;

      &.tick-pos
        top: 15px;
        left: 48px;

      .status-code
        text-align: left;
        margin-top: 8px;
        margin-left: 9px;
        text-shadow: 1px 1px 1px #000;
        font-weight: bold;

        &.second-line
          position: absolute;
          bottom: -24px;

      .status-point
        position: absolute;
        top: 15px;
        right: 10px;

    .status-point
      width: 64px;
      height: 47px;
      background-size: contain !important
      background: url("../../assets/img/workshops/绿色图标.png") no-repeat center;

      &.error-status
        background: url("../../assets/img/workshops/红色图标.png") no-repeat center;
        margin-top: -2px;
        height: 51px

      &.lost-status
        background: url("../../assets/img/workshops/灰色图标.png") no-repeat center;
        margin-top: 9px;
        height: 27px

    .legend-points
      display: flex;
      position: absolute;
      width: 320px;
      height: 60px;
      margin: 0 auto;
      bottom: 0;
      left: 0;
      right: 0;

      .legend-pos
        flex: 1;
        font-size: 14px;
        line-height: 60px;

        .status-point
          width: 79px;
          height: 59px;
          display: inline-block;
          background: url("../../assets/img/workshops/绿色图例.png") no-repeat center;
          background-size: contain;
          vertical-align: middle;
          margin-right: -12px;

          &.error-status
            background: url("../../assets/img/workshops/红色图例.png") no-repeat center;
            margin-top: 1px;

          &.lost-status
            background: url("../../assets/img/workshops/灰色图例.png") no-repeat center;
            margin-top: -4px;
            height: 27px;
</style>
