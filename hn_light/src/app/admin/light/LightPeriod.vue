<template>
  <eui-layout :regions="REGIONS">
    <main-toolbar
        slot="north"
        :buttons="helper.getMainFilterButtons(buttons)"
        @click="onBtnClick">
      <div class="input-wrap">
        <div class="item">
          <div class="label">周期类型:</div>
          <eui-input type="select"
                     :options="northOptions.type"
                     v-model="northValue.type"
                     @change="typeChange">
          </eui-input>
        </div>
        <div class="item">
          <div class="label">指定时间:</div>
          <custom-time-input
              ref="timeinput"
              class="input"
              :period-type-id="northValue.type"
              v-model="northValue.time">
          </custom-time-input>
        </div>
      </div>
    </main-toolbar>
    <div slot="center" class="light-wrapper">
      <light-select
          class="light"
          v-model="lightList[index]"
          v-for="(light, index) in lightList"
          @deleteLight="deleteLight"
          @singleTrigger="singleTrigger"
          :key="index">
      </light-select>
    </div>
    <light-select-window
        @reload="reload"
        ref="window">
    </light-select-window>
  </eui-layout>
</template>

<script>
  import api from '@/api'
  import {PERIOD} from './light.config'
  import helper from '@/app/app.helpers'
  import EuiLayout from '@/components/common/layout/EuiLayout'
  import MainToolbar from '@/components/common/tools/MainToolbar'
  import EuiInput from '@/components/common/form/EuiInput'
  import CustomTimeInput from './components/period/CustomTimeInput'
  import CustomDayInput from './components/period/CustomDayInput'
  import LightSelect from './components/period/LightSelect'
  import LightSelectWindow from './window/LightSelectWindow'
  export default {
    name: 'light-period',
    _meta: {
      path: '/light/period',
      title: '路灯周期'
    },
    components: {
      EuiLayout,
      MainToolbar,
      EuiInput,
      CustomTimeInput,
      CustomDayInput,
      LightSelect,
      LightSelectWindow
    },
    data() {
      return {
        helper,
        REGIONS: PERIOD.REGIONS,
        buttons: helper.getMainButtons(),
        query: {
          page: 1,
          pageSize: 999,
          groupId: '',
          name: null,
          periodStatus: 1
        },
        northOptions: {
          type: []
        },
        northValue: {
          type: null
        },
        lightList: []
      }
    },
    methods: {
      onBtnClick(btnKey, row) {
        let btnHandlers = {
          btnAdd: () => {
            this.$refs.window.open()
          },
          btnBatchDelete: () => {
            let checked = this.lightList.filter(light => light.allCheck === 1)
            if (checked.length > 0) {
              this.$confirm(`是否批量删除路灯周期？`, '提示', {
                iconClass: 'fa fa-question-circle'
              }).then(() => {
                api.light.setPeriodStatus({
                  idList: checked.map(light => light.id),
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
            } else {
              this.$message({
                message: '请先选择要删除周期的路灯!',
                type: 'warning'
              })
            }
          }
        }
        if (btnHandlers[btnKey]) {
          btnHandlers[btnKey].call(this, row)
        }
      },
      getLightData(query) {
        api.light.paged(query).then(data => {
          if (data.records && data.records.length > 0) {
            this.lightList = data.records
          }
        })
      },
      // getPeriodWeekList(type) {
      //   api.lightPeriodWeek.getList(type).then(data => {
      //     this.northValue.week = data.map(wk => wk.week)
      //   })
      // },
      // weekChange() {
      //   api.lightPeriodWeek.select({
      //     type: 2,
      //     idList: this.northValue.week
      //   }).then(() => {
      //     this.$message({
      //       message: '设置成功!',
      //       type: 'success'
      //     })
      //     this.getPeriodWeekList(2)
      //   })
      // },
      deleteLight(light) {
        this.$confirm(`是否删除路灯 ${light.name} 的周期？`, '提示', {
          iconClass: 'fa fa-question-circle'
        }).then(() => {
          api.light.setPeriodStatus({
            idList: [light.id],
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
      reload() {
        this.getLightData(this.query)
      },
      singleTrigger(id) {
        let light = this.lightList.find(light => light.id === id)
        api.light.update(light).then(() => {
          this.$message({
            message: '设置成功!',
            type: 'success'
          })
        })
      },
      getPeriodType() {
        api.periodType.all().then(data => {
          if (data) {
            this.northOptions.type = data.map(d => ({
              label: d.name,
              value: d.id
            }))
            let selected = data.find(d => d.state === 1)
            this.northValue.type = selected ? selected.id : null
          }
        })
      },
      typeChange() {
        api.periodType.setUse(this.northValue.type).then(() => {
          this.$refs.timeinput.getPeriodTimeData(this.northValue.type)
        })
      }
    },
    mounted() {
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.getLightData(vm.query)
        vm.getPeriodType()
        // vm.getPeriodWeekList(2)
      })
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.input-wrap
  display: flex
  line-height: 40px
  font-size: 14px
  .item
    display: flex
    .label
      width: 100px
      margin-left: 30px
      display: inline-block
    .input
      width: 100%

.light-wrapper
  /*width: 100%*/
  height: 100%
  display: flex
  padding: 0 20px
  flex-wrap: wrap
  align-content: flex-start
</style>

