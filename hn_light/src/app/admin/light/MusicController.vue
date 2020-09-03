<template>
  <eui-layout :regions="REGIONS">
    <main-toolbar
        slot="north"
        :buttons="helper.getMainFilterButtons(buttons)"
        @click="onBtnClick">
      <div class="input-wrapper">
        <span class="label">音量调节:</span>
        <set-intensity v-model="volume"
                       @trigger="volumeTrigger">
        </set-intensity>
      </div>
    </main-toolbar>
    <eui-table
        class="center-wrap"
        slot="center"
        ref="table"
        :showSelection="true"
        :showIndex="false"
        :highlight-current-row="false"
        :options="tableOptions">
      <el-table-column label="播放状态" align="center">
        <template slot-scope="scope">{{getPlayStatus(scope.row.musicStatus)}}</template>
      </el-table-column>
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
    <music-window ref="window" @reload="tableOptions.reload">
    </music-window>
  </eui-layout>
</template>

<script>
  import api from '@/api'
  import {GROUP} from './light.config'
  import helper from '@/app/app.helpers'
  import EuiLayout from '@/components/common/layout/EuiLayout'
  import EuiTable from '@/components/common/form/EuiTable'
  import MainToolbar from '@/components/common/tools/MainToolbar'
  import MusicWindow from './window/MusicWindow'
  import SetIntensity from './components/SetIntensity'
  export default {
    name: 'music-controller',
    _meta: {
      path: '/music/controller',
      title: '音频管理'
    },
    components: {
      EuiLayout,
      EuiTable,
      MainToolbar,
      MusicWindow,
      SetIntensity
    },
    data() {
      return {
        helper,
        REGIONS: GROUP.REGIONS,
        buttons: helper.getMainButtons(),
        query: {
          page: 1,
          pageSize: 10
        },
        tableOptions: {
          data: [],
          total: 0,
          columns: [
            {prop: 'name', label: '设备名'},
            {prop: 'code', label: '条码'},
            {prop: 'volume', label: '音量(%)'}
          ],
          rowClassName: ({row, rowIndex}) => {
          },
          rowClick: (row, event, column) => {
            this.$refs.table.callByName('toggleRowSelection', row)
          },
          handleSelectionChange: val => {
            this.tableRowsSelect = val.map(v => v.id)
          },
          reload: (name, val) => {
            this.query.page = name === 'page' ? val : this.query.page
            this.query.pageSize = name === 'pageSize' ? val : this.query.pageSize
            this.getData(this.query).then(() => {
              this.setSelectRow()
            })
          }
        },
        tableRowsSelect: [],
        multipleSelection: [],
        volume: 0
      }
    },
    methods: {
      onBtnClick(btnKey, row) {
        let btnHandlers = {
          btnAdd: () => {
            this.$refs.window.open()
          },
          btnEdit: (row) => {
            this.$refs.window.open(row)
          },
          btnDelete: (row) => {
            this.$confirm(`是否删除:${row.name}？`, '提示', {
              iconClass: 'fa fa-question-circle'
            }).then(() => {
              api.music.delete(row.id).then(() => {
                this.$message({
                  message: '删除成功!',
                  type: 'success'
                })
                this.getData(this.query)
              })
            }).catch(() => {
            })
          },
          btnPlay: () => {
            if (this.tableRowsSelect.length > 0) {
              api.music.play({
                musicList: this.tableRowsSelect
              }).then(() => {
                this.$message({
                  message: '播放成功!',
                  type: 'success'
                })
                this.getData(this.query).then(() => {
                  this.setSelectRow()
                })
              })
            } else {
              this.$message({
                message: '请先选择要播放的设备!',
                type: 'warning'
              })
            }
          },
          btnStop: () => {
            if (this.tableRowsSelect.length > 0) {
              api.music.stop({
                musicList: this.tableRowsSelect
              }).then(() => {
                this.$message({
                  message: '暂停成功!',
                  type: 'success'
                })
                this.getData(this.query).then(() => {
                  this.setSelectRow()
                })
              })
            } else {
              this.$message({
                message: '请先选择要播放的文件!',
                type: 'warning'
              })
            }
          }
        }
        if (btnHandlers[btnKey]) {
          btnHandlers[btnKey].call(this, row)
        }
      },
      getData(query) {
        return api.music.paged(query).then(data => {
          this.tableOptions.data = data.records
          this.tableOptions.total = data.total
        })
      },
      setSelectRow() {
        this.$refs.table.callByName('clearSelection')
        for (let i = 0; i < this.tableOptions.data.length; i++) {
          if (this.multipleSelection.indexOf(this.tableOptions.data[i].id) >= 0) {
            this.$refs.table.callByName('toggleRowSelection', this.tableOptions.data[i], true)
          }
        }
      },
      getPlayStatus(status) {
        return status ? '播放中' : '暂停'
      },
      volumeTrigger() {
        if (this.tableRowsSelect.length > 0) {
          api.music.volumeMusic({
            musicList: this.tableRowsSelect,
            value: this.volume
          }).then(() => {
            this.$message({
              message: '调节成功!',
              type: 'success'
            })
            this.multipleSelection = this.tableRowsSelect
            this.getData(this.query).then(() => {
              this.setSelectRow()
            })
          })
        } else {
          this.$message({
            message: '请先选择要播放的设备!',
            type: 'warning'
          })
        }
      }
    },
    mounted() {
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.getData(vm.query)
      })
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .input-wrapper
    .label
      font-size: 14px
      margin: 0 5px
</style>

