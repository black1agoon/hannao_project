<template>
  <eui-layout :regions="REGIONS">
    <main-toolbar
        slot="north"
        :buttons="helper.getMainFilterButtons(buttons, sub_tableButtons)"
        @click="onBtnClick">
      <div class="input-wrap">
        <div class="item">
          <div class="label">指定时间:</div>
          <custom-time-input
              :type="1"
              class="input"
              v-model="northValue.time">
          </custom-time-input>
        </div>
        <div class="item">
          <div class="label">指定星期:</div>
          <eui-input class="input"
                     v-model="northValue.week"
                     type="select"
                     :multiple="true"
                     @change="weekChange"
                     :options="northOptions.week">
          </eui-input>
        </div>
        <div class="item">
          <div class="label">指定日期:</div>
          <custom-day-input
              :type="1"
              class="input"
              v-model="northValue.day">
          </custom-day-input>
        </div>
      </div>
    </main-toolbar>
    <eui-table
        slot="west"
        ref="table"
        :highlight-current-row="false"
        :options="tableOptions"
        @reloadTable="tableOptions.reload">
      <el-table-column label="操作" align="center" minWidth="200" fixed="right">
        <template slot-scope="scope">
          <el-button
              v-for="(btn, index) in helper.getTableButtons(buttons)"
              size="mini"
              type="text"
              :key="index"
              @click="onBtnClick(btn.btnKey, scope.row)">
            <i :class="['btn-icon fa', btn.logo]"></i>{{btn.name}}
          </el-button>
        </template>
      </el-table-column>
    </eui-table>
    <eui-table
        class="center-wrap"
        slot="center"
        ref="table2"
        :highlight-current-row="false"
        :options="tableOptions2"
        @reloadTable="tableOptions2.reload">
      <el-table-column label="操作" align="center" minWidth="200" fixed="right">
        <template slot-scope="scope">
          <el-button
              v-for="(btn, index) in helper.getTableButtons(sub_buttons, sub_tableButtons)"
              size="mini"
              type="text"
              :key="index"
              @click="onBtnClick(btn.btnKey, scope.row)">
            <i :class="['btn-icon fa', btn.logo]"></i>{{btn.name}}
          </el-button>
        </template>
      </el-table-column>
    </eui-table>
    <music-select-window
        @reload="reload"
        ref="window">
    </music-select-window>
    <song-select-window
        ref="song"
        @reload="songReload">
    </song-select-window>
  </eui-layout>
</template>

<script>
  import api from '@/api'
  import {MUSICPERIOD} from './light.config'
  import helper from '@/app/app.helpers'
  import EuiLayout from '@/components/common/layout/EuiLayout'
  import MainToolbar from '@/components/common/tools/MainToolbar'
  import EuiInput from '@/components/common/form/EuiInput'
  import EuiTable from '@/components/common/form/EuiTable'
  import CustomTimeInput from './components/period/CustomTimeInput'
  import CustomDayInput from './components/period/CustomDayInput'
  import MusicSelectWindow from './window/MusicSelectWindow'
  import SongSelectWindow from './window/SongSelectWindow'
  export default {
    name: 'music-period',
    _meta: {
      path: '/music/period',
      title: '音频周期'
    },
    components: {
      SongSelectWindow,
      EuiLayout,
      MainToolbar,
      EuiInput,
      EuiTable,
      CustomTimeInput,
      CustomDayInput,
      MusicSelectWindow
    },
    data() {
      return {
        helper,
        REGIONS: MUSICPERIOD.REGIONS,
        buttons: [],
        sub_buttons: [],
        sub_tableButtons: ['btnSubDelete'],
        query: {
          page: 1,
          pageSize: 10,
          periodStatus: 1
        },
        query2: {
          page: 1,
          pageSize: 10,
          periodStatus: 1
        },
        northOptions: {
          week: [{
            label: '星期一',
            value: 1
          }, {
            label: '星期二',
            value: 2
          }, {
            label: '星期三',
            value: 3
          }, {
            label: '星期四',
            value: 4
          }, {
            label: '星期五',
            value: 5
          }, {
            label: '星期六',
            value: 6
          }, {
            label: '星期日',
            value: 7
          }],
        },
        northValue: {
          time: null,
          day: null,
          week: []
        },
        tableOptions: {
          data: [],
          total: 0,
          columns: [
            {prop: 'name', label: '设备名'},
            {prop: 'code', label: '条码'},
            {prop: 'volume', label: '音量(%)'}
          ],
          reload: (name, val) => {
            this.query.page = name === 'page' ? val : this.query.page
            this.query.pageSize = name === 'pageSize' ? val : this.query.pageSize
            this.reload()
          }
        },
        tableOptions2: {
          data: [],
          total: 0,
          columns: [
            {prop: 'name', label: '曲目名称'},
            {prop: 'address', label: '地址'},
            {prop: 'createTime', label: '创建时间'}
          ],
          reload: (name, val) => {
            this.query.page = name === 'page' ? val : this.query.page
            this.query.pageSize = name === 'pageSize' ? val : this.query.pageSize
            this.songReload()
          }
        }
      }
    },
    methods: {
      onBtnClick(btnKey, row) {
        let btnHandlers = {
          btnAdd: () => {
            this.$refs.window.open()
          },
          btnDelete: (row) => {
            this.$confirm(`是否删除设备${row.name}的路灯周期？`, '提示', {
              iconClass: 'fa fa-question-circle'
            }).then(() => {
              api.music.setPeriodStatus({
                idList: [row.id],
                periodStatus: 0
              }).then(() => {
                this.$message({
                  message: '删除成功!',
                  type: 'success'
                })
                this.reload()
              })
            }).catch(() => {
            })
          },
          btnSubAdd: () => {
            this.$refs.song.open()
          },
          btnSubDelete: () => {
            this.$confirm(`是否删除曲目${row.name}的周期？`, '提示', {
              iconClass: 'fa fa-question-circle'
            }).then(() => {
              api.periodSong.delete({
                idList: [row.id]
              }).then(() => {
                this.$message({
                  message: '删除成功!',
                  type: 'success'
                })
                this.songReload()
              })
            }).catch(() => {
            })
          }
        }
        if (btnHandlers[btnKey]) {
          btnHandlers[btnKey].call(this, row)
        }
      },
      getMusicData(query) {
        api.music.paged(query).then(data => {
          this.tableOptions.data = data.records
          this.tableOptions.total = data.total
        })
      },
      getSongbook(query) {
        api.songbook.paged(query).then(data => {
          this.tableOptions2.data = data.records
          this.tableOptions2.total = data.total
        })
      },
      getPeriodWeekList() {
        api.lightPeriodWeek.getList(1).then(data => {
          this.northValue.week = data.map(wk => wk.week)
        })
      },
      weekChange() {
        api.lightPeriodWeek.select({
          type: 1,
          idList: this.northValue.week
        }).then(() => {
          this.$message({
            message: '设置成功!',
            type: 'success'
          })
          this.getPeriodWeekList()
        })
      },
      reload() {
        this.getMusicData(this.query)
      },
      songReload() {
        this.getSongbook(this.query2)
      },
      getButtons() {
        let buttons = helper.getMainButtons()
        this.buttons = buttons
        this.sub_buttons = buttons.filter(btn => {
          return btn.btnKey.startsWith('btnSub')
        })
      },
    },
    mounted() {
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.getButtons()
        vm.getMusicData(vm.query)
        vm.getSongbook(vm.query2)
        vm.getPeriodWeekList()
      })
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .input-wrap
    display: flex
    line-height: 40px
    font-size: 14px
    white-space: nowrap
    .item
      display: flex
      .label
        width: 100px
        margin-left: 30px
        display: inline-block
      .input
        width: 100%
</style>

