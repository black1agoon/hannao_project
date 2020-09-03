<template>
  <eui-layout :regions="REGIONS">
    <main-toolbar
        slot="north"
        :buttons="helper.getMainFilterButtons(buttons)"
        @click="onBtnClick">
      <div class="input-wrapper">
        <span class="label">分组:</span>
        <eui-input
            class="select"
            type="select"
            @change="groupIdChange"
            v-model="query.groupId"
            :options="inputOptions.groupId">
        </eui-input>
        <span class="label">选择:</span>
        <eui-input
            class="select"
            type="select"
            @change="inputSelectChange"
            v-model="inputValue.select"
            :options="inputOptions.select">
        </eui-input>
        <span class="label">亮度:</span>
        <set-intensity v-model="inputValue.intensity"
                       @trigger="trigger">
        </set-intensity>
        <div class="switch">
          <div class="switch-box">
            <div class="item" @click="openLight">开</div>
            <div class="item" @click="closeLight">关</div>
          </div>
        </div>
      </div>
    </main-toolbar>
   <div slot="center" class="light-wrapper">
      <light-setting
          @singleTrigger="singleTrigger"
          @deleteLight="deleteLight"
          class="light"
          v-model="lightList[index]"
          v-for="(light, index) in lightList"
          :key="index">
      </light-setting>
   </div>
    <light-window ref="window"
                  @reload="reload"
                  :input-options="windowFormOptions">
    </light-window>
  </eui-layout>
</template>

<script>
  import api from '@/api'
  import TabPane from '@/components/views/TabPane'
  import helper from '@/app/app.helpers'
  import MainToolbar from '@/components/common/tools/MainToolbar'
  import EuiLayout from '@/components/common/layout/EuiLayout'
  import {LIGHT} from './light.config'
  import LightSetting from './components/LightSetting'
  import LightWindow from './window/LightWindow'
  import EuiInput from '@/components/common/form/EuiInput'
  import SetIntensity from './components/SetIntensity'
  export default {
    name: 'light-controller',
    _meta: {
      path: 'light/listener',
      title: '实时监控'
    },
    mixins: [TabPane],
    components: {
      MainToolbar,
      EuiLayout,
      LightSetting,
      LightWindow,
      EuiInput,
      SetIntensity
    },
    data() {
      return {
        helper,
        REGIONS: LIGHT.REGIONS,
        buttons: helper.getMainButtons(),
        lightList: [],
        query: {
          page: 1,
          pageSize: 999,
          groupId: '',
          name: null
        },
        inputValue: {
          select: null,
          intensity: 0
        },
        inputOptions: JSON.parse(JSON.stringify(LIGHT.inputOptions)),
        windowFormOptions: {}
      }
    },
    methods: {
      onBtnClick(btnKey, row) {
        let btnHandlers = {
          btnAdd: () => {
            this.$refs.window.open()
          }
        }
        if (btnHandlers[btnKey]) {
          btnHandlers[btnKey].call(this, row)
        }
      },
      getLightData(query) {
        api.light.paged(query).then(data => {
          if (data.records && data.records.length > 0) {
            this.lightList = data.records.map(light => {
              light.bigCheck = 0
              light.smallCheck = 0
              light.allCheck = 0
              return light
            })
          } else {
            this.lightList = []
          }
        })
      },
      groupIdChange() {
        this.reload()
      },
      inputSelectChange(val) {
        if (val === 1) {
          this.lightList.forEach(light => {
            light.bigCheck = 1
            light.smallCheck = 1
            light.allCheck = 1
          })
        } else if (val === 2) {
          this.lightList.forEach(light => {
            light.bigCheck = 0
            light.smallCheck = 0
            light.allCheck = 0
          })
        } else if (val === 3) {
          this.lightList.forEach(light => {
            light.bigCheck = 1
            light.smallCheck = 0
            light.allCheck = 0
          })
        } else if (val === 4) {
          this.lightList.forEach(light => {
            light.bigCheck = 0
            light.smallCheck = 1
            light.allCheck = 0
          })
        }
      },
      openLight() {
        this.$confirm(`是否开启选中路灯？`, '提示', {
          iconClass: 'fa fa-question-circle'
        }).then(() => {
          let list = this.lightList.filter(light => light.bigCheck || light.smallCheck || light.allCheck).map(light => {
            if (light.bigCheck) {
              light.bigStatus = '1'
            }
            if (light.smallCheck) {
              light.smallStatus = '1'
            }
            return light
          })
          if (list.length > 0) {
            this.setLightParams(list)
          }
        })
      },
      closeLight() {
        this.$confirm(`是否关闭选中路灯？`, '提示', {
          iconClass: 'fa fa-question-circle'
        }).then(() => {
          let list = this.lightList.filter(light => light.bigCheck || light.smallCheck || light.allCheck).map(light => {
            if (light.bigCheck) {
              light.bigStatus = '0'
            }
            if (light.smallCheck) {
              light.smallStatus = '0'
            }
            return light
          })
          if (list.length > 0) {
            this.setLightParams(list)
          }
        })
      },
      trigger() {
        let list = this.lightList.filter(light => light.bigCheck || light.smallCheck || light.allCheck).map(light => {
          if (light.bigCheck) {
            light.bigIntensity = this.inputValue.intensity
          }
          if (light.smallCheck) {
            light.smallIntensity = this.inputValue.intensity
          }
          return light
        })
        if (list.length > 0) {
          this.setLightParams(list)
        }
      },
      singleTrigger(id) {
        let list = this.lightList.filter(light => light.id === id)
        this.setLightParams(list)
      },
      deleteLight(light) {
        this.$confirm(`是否删除路灯:${light.name}？`, '提示', {
          iconClass: 'fa fa-question-circle'
        }).then(() => {
          api.light.delete({
            idList: [light.id]
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
      setLightParams(list) {
        api.light.control(list).then(() => {
          this.$message({
            message: '设置成功!',
            type: 'success'
          })
          this.reload()
        }).catch(() => {
          this.reload()
        })
      },
      getGroupData() {
        api.lightGroup.paged({
          page: 1,
          pageSize: 999
        }).then(data => {
          if (data.records && data.records.length > 0) {
            this.inputOptions.groupId = JSON.parse(JSON.stringify(LIGHT.inputOptions.groupId)).concat(data.records.map(group => ({
              label: group.name,
              value: group.id
            })))
            this.windowFormOptions = {
              groupId: data.records.map(group => ({
                label: group.name,
                value: group.id
              }))
            }
          }
        })
      }
    },
    mounted() {
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.getLightData(vm.query)
        vm.getGroupData()
      })
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.light-wrapper
  /*width: 100%*/
  height: 100%
  display: flex
  padding: 0 20px
  flex-wrap: wrap
  align-content: flex-start
.input-wrapper
  .label
    font-size: 14px
    margin: 0 5px
  .select
    width: 150px
.switch
  display: inline-block
  margin-left: 10px
  .switch-box
    width: 60px
    height: 25px
    display: flex
    justify-content: space-between
    .item
      width: 25px
      height: 25px
      text-align: center
      line-height: 25px
      background: #fff
      color: #000
      border: 1px solid #d4d7da
      cursor: pointer
      font-size: 14px
</style>

