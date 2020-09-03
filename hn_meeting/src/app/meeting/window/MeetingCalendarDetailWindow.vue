<template>
  <eui-window ref="window"
              :options="windowOptions">
    <el-tabs v-model="activeName">
      <el-tab-pane label="会议信息" name="first">
        <el-form class="form clearfix" ref="form" label-width="90px">
          <template v-for="(block, index) in forminfo">
            <div class="title" :key="index">
              <i class="icon fa fa-bars"></i><span>{{block.title}}</span>
            </div>
            <el-col v-for="(item) in block.form" :sm="20"  :key="item.value">
              <el-form-item :label="item.name" :prop="item.value">
                <div v-if="item.value==='fileNames'" class="files">
                  <div class="filename"
                       v-for="(filename, i) in fileNames"
                       :key="i">
                    <a target="_blank" :href="getFileHref(i)">{{filename}}</a>
                  </div>
                </div>
                <div v-else class="value">{{formdata[item.value]}}</div>
              </el-form-item>
            </el-col>
          </template>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="参会情况" name="second">
        <div class="detail">
          应到人数: <span>{{num.shouldArrive}}</span>人&nbsp;&nbsp;实到人数: <span>{{num.attendNum}}</span>人&nbsp;&nbsp;<span class="legend"></span>缺勤人数: <span>{{num.absentNum}}</span>人
        </div>
        <eui-table
            class="table"
            ref="table"
            :showIndex="false"
            :showSelection="false"
            :highlight-current-row="false"
            :showPagination="false"
            :options="tableOptions">
        </eui-table>
      </el-tab-pane>
    </el-tabs>
    <div slot="btns">
      <el-button size="mini" @click="cancel">关闭</el-button>
    </div>
  </eui-window>
</template>

<script>
  // import api from '@/api'
  import EuiWindow from '@/components/common/form/EuiWindow'
  import EuiTable from '@/components/common/form/EuiTable'
  import config from '@/config'
  const DETAIL_INFO =  [
      {
        title: '基本信息',
        form: [{
          name: '会议类型:',
          value: 'typeValue'
        }, {
          name: '会议名称:',
          value: 'theme'
        }, {
          name: '发起人:',
          value: 'promoterName'
        }, {
          name: '会议室:',
          value: 'roomName'
        }, {
          name: '会议内容:',
          value: 'content'
        }]
      }, {
        title: '会议时间',
        form: [{
          name: '开始时间:',
          value: 'orderStartTime'
        }, {
          name: '结束时间:',
          value: 'orderEndTime'
        }, {
          name: '实际开始时间:',
          value: 'realStartTime'
        }, {
          name: '实际结束时间:',
          value: 'realEndTime'
        }, {
          name: '提醒方式:',
          value: 'remindValue'
        }]
      }, {
        title: '参会者',
        form: [{
          name: '参会人员:',
          value: 'attendeeNames'
        }, {
          name: '参会客户:',
          value: 'customer'
        }]
      }, {
        title: '其他信息',
        form: [{
          name: '相关附件:',
          value: 'fileNames'
        }]
      }]
  export default {
    name: 'meeting-calendar-detail-window',
    components: {
      EuiWindow,
      EuiTable
    },
    props: {
      api: Function
    },
    computed: {
      defaultformOptions() {
        return Object.assign({}, this.formOptions)
      },
      fileNames() {
        return this.formdata.fileNames ? this.formdata.fileNames.split(',') : []
      }
    },
    data() {
      return {
        serverURI: config.serverURI,
        forminfo: DETAIL_INFO,
        formdata: {},
        windowOptions: {
          title: '会议详情',
          width: '800px'
        },
        activeName: 'first',
        tableOptions: {
          data: [],
          total: 0,
          columns: [
            {prop: 'name', label: '姓名'},
            {prop: 'signedTime', label: '到达时间'}
          ],
          rowClassName: ({row, rowIndex}) => {
            return row.status === 0 ? 'warning-row' : ''
          }
        },
        num: {
          shouldArrive: 0,
          attendNum: 0,
          absentNum: 0
        }
      }
    },
    methods: {
      open(row) {
        this.activeName = 'first'
        this.formdata = row
        this.$refs.window.open()
        this.getAttendDetail(row.id).then(() => {
          this.$refs.window.open()
        })
      },
      cancel() {
        this.$refs.window.cancel()
      },
      getAttendDetail(id) {
        return this.api(id).then(data => {
          if (data) {
            this.num.shouldArrive = data.shouldArrive
            this.num.attendNum = data.attendNum
            this.num.absentNum = data.absentNum
            this.tableOptions.data = data.attendList.map(at => {
              at.status = 1
              return at
            }).concat(data.absentList.map(ab => {
              ab.status = 0
              return ab
            }))
          } else {
            this.tableOptions.data = []
          }
        })
      },
      getFileHref(index) {
        let filepathList = this.formdata.files.split(',')
        return this.serverURI + filepathList[index]
      }
    },
    watch: {
    },
    mounted() {
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.el-tabs
  width: 100%
  height: 600px
  /deep/ .el-tabs__header
    margin: 0 !important
    .el-tabs__nav-scroll
      padding: 0 20px
  /deep/ .el-tabs__content
    height: calc(100% - 40px)
    overflow-y: auto
    .form
      width: 100%
      box-sizing: border-box
      padding: 10px 20px
      .title
        float: left
        width: 100%
        height: 30px
        line-height: 30px
        border-bottom: 1px solid #eee
        margin-bottom: 10px
        i
          color: #b8b8b8
          margin-right: 10px
      .value
        line-height: 28px
        margin-left: 10px
      .files
        display: flex
        flex-wrap: wrap
        line-height: 28px
        margin-left: 10px
        .filename
          white-space: nowrap
          margin-right: 10px
          i
            margin-left: 5px
            cursor: pointer
            &:hover
              opacity: .8
          a
            text-decoration: underline
    .detail
      padding-left: 20px
      height: 40px
      line-height: 40px
      span
        color: red
      .legend
        display: inline-block
        vertical-align: text-bottom
        width: 30px
        height: 16px
        background: oldlace
        border-radius: 4px
        margin-right: 5px
/deep/ .el-table--enable-row-hover .el-table__body tr:hover>td
  background-color: inherit
/deep/ .el-table
  .warning-row
    background: oldlace
</style>
