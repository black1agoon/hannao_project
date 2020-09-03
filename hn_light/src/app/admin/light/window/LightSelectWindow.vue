<template>
  <eui-window ref="window"
              :options="windowOptions">
    <div class="search-wrapper">
      <span class="label">分组:</span>
      <eui-input
          class="input"
          type="select"
          @change="groupIdChange"
          v-model="query.groupId"
          :options="groupIdOptions">
      </eui-input>
    </div>
    <div class="light-wrapper">
      <light-select
          :delete-able="false"
          class="light"
          v-model="lightList[index]"
          v-for="(light, index) in lightList"
          :key="index">
      </light-select>
    </div>
    <div slot="btns">
      <el-button type="primary" size="mini" @click="sure">确定</el-button>
      <el-button size="mini" @click="cancel">关闭</el-button>
    </div>
  </eui-window>
</template>

<script>
  import EuiWindow from '@/components/common/form/EuiWindow'
  import EuiInput from '@/components/common/form/EuiInput'
  import LightSelect from '../components/period/LightSelect'
  import api from '@/api'
  export default {
    name: 'light-select-window',
    components: {
      EuiWindow,
      EuiInput,
      LightSelect
    },
    computed: {
    },
    data() {
      return {
        windowOptions: {
          title: '新增周期路灯',
          width: '80%'
        },
        query: {
          page: 1,
          pageSize: 999,
          groupId: '',
          name: null,
          periodStatus: 0
        },
        groupIdOptions: [{
          label: '全部',
          value: ''
        }],
        lightList: []
      }
    },
    methods: {
      open() {
        this.getLightData().then(() => {
          this.$refs.window.open()
        })
      },
      sure() {
        api.light.setPeriodStatus({
          periodStatus: 1,
          idList: this.lightList.filter(light => light.allCheck === 1).map(light => light.id)
        }).then(() => {
          this.$message({
            message: '新增路灯周期成功!',
            type: 'success'
          })
          this.$emit('reload')
          this.cancel()
        })
      },
      cancel() {
        this.$refs.window.cancel()
      },
      getGroupData() {
        api.lightGroup.paged({
          page: 1,
          pageSize: 999
        }).then(data => {
          if (data.records && data.records.length > 0) {
            this.groupIdOptions = this.groupIdOptions.concat(data.records.map(group => ({
              label: group.name,
              value: group.id
            })))
          }
        })
      },
      getLightData() {
        return api.light.paged(this.query).then(data => {
          if (data.records && data.records.length > 0) {
            this.lightList = data.records.map(record => {
              record.allCheck = 0
              return record
            })
          } else {
            this.lightList = []
          }
        })
      },
      groupIdChange() {
        this.getLightData()
      }
    },
    mounted() {
      this.getGroupData()
    },
    watch: {
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.search-wrapper
  height: 40px
  line-height: 40px
  font-size: 13px
  border-bottom: 1px solid #eee
  .label
    margin: 0 20px
  .input
    display: inline-block
    width: 150px

.light-wrapper
  height: 500px
  overflow-y: auto
  display: flex
  padding: 0 10px
  flex-wrap: wrap
  align-content: flex-start
</style>