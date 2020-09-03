<template>
  <transition name="fade">
    <div v-show="show" class="window-wrapper">
      <div class="floor-wrapper">
        <div class="content">
          <i class="close" @click="close"></i>
          <!--:style=""-->
          <div class="table" v-for="(table, index) in showTableList"
               :key="index"
               :style="getPosition(table.pos[0], table.pos[1])">
            <table-box
                v-if="table.show"
                ref="tablebox"
                :type="tableList[index].type"
                :number="tableList[index].index + 1"
                :electric-used="tableList[index].used"
                @getChartsData="getChartsData">
              <charts-temp :ref="'charts' + tableList[index].index" :options="TABLE_OPTIONS[tableList[index].index]">
              </charts-temp>
            </table-box>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import api from '@/board/api'
  import {TABLES, TABLES_TYPE_OPTIONS} from '../board.config'
  import TableBox from '../common/TableBox'
  import ChartsTemp from '../common/ChartsTemp'

  export default {
    name: 'floor-window',
    components: {
      TableBox,
      ChartsTemp
    },
    computed: {
      showTableList() {
        let idxList = this.tableList.map(table => table.index)
        this.TABLES.forEach((f, idx) => {
          f.show = idxList.includes(idx)
        })
        return this.TABLES
      }
    },
    data() {
      return {
        TABLES,
        TABLES_TYPE_OPTIONS,
        TABLE_OPTIONS: Array.from({length: 8}, () => ({})),
        show: false,
        query: {
          detail: 1,
          floorNumber: null,
          state: 0,
          type: 0
        },
        tableList: Array.from({length: 8}, () => ({
          index: null,
          used: null
        })),
      }
    },
    methods: {
      open(floorNumber) {
        this.query.floorNumber = floorNumber
        this.show = true
        this.getFloorTables()
      },
      close() {
        this.show = false
        this.$refs.tablebox.forEach(table => {
          table.initTabs()
        })
      },
      getPosition(x, y) {
        return {
          left: x + 'px',
          top: y + 'px'
        }
      },
      getFloorTables() {
        api.board.electric.getOneFloor(this.query).then(data => {
          this.tableList = Array.from({length: 8}, () => ({
            index: null,
            used: null
          }))
          if (data && data.length > 0) {
            data.sort((a, b) => a[0].number - b[0].number).forEach((table) => {
              this.tableList[table[0].number - 1].index = table[0].number - 1
              this.tableList[table[0].number - 1].used = table[0].used
              this.tableList[table[0].number - 1].type = table[0].type
              this.TABLE_OPTIONS.splice(table[0].number - 1, 1, JSON.parse(JSON.stringify(this.TABLES_TYPE_OPTIONS[table[0].type])))
              this.TABLE_OPTIONS[table[0].number - 1].xAxis[0].data = table[0].value.map(wk => wk.name)
              this.TABLE_OPTIONS[table[0].number - 1].series[0].data = table[0].value.map(wk => wk.value)
            })
          }
        })
      },
      getChartsData(obj) {
        api.board[obj.type === 0 ? 'electric' : 'water'].getTableTypeData({
          floorNumber: this.query.floorNumber,
          type: obj.type,
          state: obj.state,
          number: obj.number
        }).then(data => {
          this.tableList[obj.number - 1].used = data.used
          if (obj.state === 0) {
            this.TABLE_OPTIONS[obj.number - 1].xAxis[0].data = data.value.map(wk => wk.name)
            this.TABLE_OPTIONS[obj.number - 1].series[0].data = data.value.map(wk => wk.value)
          } else if (obj.state === 1) {
            this.TABLE_OPTIONS[obj.number - 1].xAxis[0].data = Object.keys(data.value).map(key => key.substr(5))
            this.TABLE_OPTIONS[obj.number - 1].series[0].data = Object.values(data.value)
          } else if (obj.state === 2) {
            this.TABLE_OPTIONS[obj.number - 1].xAxis[0].data = Object.keys(data.value).map(month => month + '月')
            this.TABLE_OPTIONS[obj.number - 1].series[0].data = Object.values(data.value)
          }
        })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .window-wrapper
    position: absolute
    width: 100%
    height: 100%
    top: 0
    background: rgba(0, 0, 0, .7)
    z-index: 20
    opacity: 1
    transition: all .2s
    &.fade-enter, &.fade-leave-to
      opacity: 0
      .floor-wrapper
        transform: scale(0)
    .floor-wrapper
      position: absolute
      left: 0
      right: 0
      top: 0
      bottom: 0
      width: 1647px
      height: 1041px
      margin: auto
      background-image: url("../static/img/floor.png")
      background-size: 1647px 1041px
      background-repeat: no-repeat
      transition: all .2s
      .content
        position: relative
        margin-top: 111px
        margin-left: 56px
        width: 1534px
        height: 860px
        background-image: url("../static/img/window.png")
        background-size: 1534px 860px
        background-repeat: no-repeat
        .table
          position: absolute
          width: 293px
          height: 226px
        .close
          display: block
          position: absolute
          z-index: 5
          width: 58px
          height: 58px
          right: 13px
          top: 10px
          opacity: .8
          background-image: url("../static/img/close.png")
          background-size: 58px 58px
          background-repeat: no-repeat
          &:hover
            cursor: pointer
            opacity: 1

</style>