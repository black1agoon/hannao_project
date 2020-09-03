<template>
  <eui-layout :regions="REGIONS">
    <main-toolbar
        slot="north"
        :buttons="helper.getMainFilterButtons(buttons)"
        @click="onBtnClick">
      <div class="input-wrapper">
        <span class="label">车辆编号:</span>
        <eui-input
            class="select"
            v-model="query.vehicleNo">
        </eui-input>
        <span class="label">运输单类别:</span>
        <eui-input
            class="input"
            type="select"
            :options="searchOptions.type"
            v-model="query.type">
        </eui-input>
        <span class="label">运输单状态:</span>
        <eui-input
            class="input"
            type="select"
            :options="searchOptions.state"
            v-model="query.state">
        </eui-input>
        <el-button class="search"
                   type="primary"
                   size="mini"
                   @click="search">
          搜索
        </el-button>
        <el-button class="search"
                   size="mini"
                   @click="reset">
          重置
        </el-button>
      </div>
    </main-toolbar>
    <eui-table
        slot="center"
        ref="table"
        :highlight-current-row="false"
        :options="tableOptions">
      <template slot="prev">
        <el-table-column label="运输单ID" align="center" prop="id" minWidth="200">
        </el-table-column>
        <el-table-column label="创建时间" align="center" prop="createTime" minWidth="150">
        </el-table-column>
        <el-table-column label="类别" align="center" prop="typeName" minWidth="100">
        </el-table-column>
        <el-table-column label="执行的车辆编号" align="center" prop="vehicleNo" minWidth="100">
        </el-table-column>
        <el-table-column label="状态" align="center" minWidth="100">
          <template slot-scope="scope">
            <span :class="{success: scope.row.state === 2, failed: scope.row.state === 3}">{{scope.row.stateName}}</span>
          </template>
        </el-table-column>
      </template>
      <el-table-column label="备注" align="center" minWidth="200">
        <template slot-scope="scope">
          <el-tooltip popper-class="tooltip" :content="scope.row.comment"
                      placement="bottom-start" effect="light">
            <span>{{scope.row.comment}}</span>
          </el-tooltip>
        </template>
      </el-table-column>
    </eui-table>
    <eui-table
        slot="south"
        ref="subtable"
        :highlight-current-row="false"
        :options="subTableOptions">
      <el-table-column label="操作" align="center" minWidth="100" fixed="right">
        <template slot-scope="scope">
          <el-button
          size="mini"
          type="text"
          @click="onBtnClick('openDetail', scope.row)">
          <i class="btn-icon fa fa-file-text-o"></i>查看详情
          </el-button>
        </template>
      </el-table-column>
    </eui-table>
    <transport-detail-window ref="detailWindow">
    </transport-detail-window>
  </eui-layout>
</template>

<script>
  import api from '@/api'
  import {TRANSPORT} from './transport.config'
  import helper from '@/app/app.helpers'
  import EuiLayout from '@/components/common/layout/EuiLayout'
  import EuiTable from '@/components/common/form/EuiTable'
  import MainToolbar from '@/components/common/tools/MainToolbar'
  import TransportDetailWindow from './window/TransportDetailWindow'
  import EuiInput from '@/components/common/form/EuiInput'
  export default {
    name: 'transport-list-controller',
    _meta: {
      path: '/transportlist/controller',
      title: '运输单管理'
    },
    components: {
      EuiLayout,
      EuiTable,
      MainToolbar,
      TransportDetailWindow,
      EuiInput
    },
    data() {
      return {
        helper,
        REGIONS: TRANSPORT.REGIONS,
        buttons: helper.getMainButtons(),
        query: {
          page: 1,
          pageSize: 10,
          state: null,
          type: null,
          vehicleNo: null
        },
        subQuery: {
          page: 1,
          pageSize: 10,
          transportListId: null
        },
        tableOptions: {
          data: [],
          total: 0,
          columns: [
            {prop: 'destination', label: '目标站点', minWidth: 100},
            {prop: 'goodsIdName', label: '物料名称', minWidth: 100},
            {prop: 'caller', label: '呼叫点', minWidth: 150},
            {prop: 'origin', label: '出发点', minWidth: 100},
            {prop: 'priority', label: '优先级', minWidth: 100},
            {prop: 'cantProcessName', label: '是否不能执行', minWidth: 100},
            // {prop: 'comment', label: '备注', minWidth: 200}
          ],
          rowClassName: ({row, rowIndex}) => {
          },
          rowClick: (row, event, column) => {
            this.subQuery.transportListId = row.id
            this.getSubData()
          },
          reload: (name, val) => {
            this.query.page = name === 'page' ? val : this.query.page
            this.query.pageSize = name === 'pageSize' ? val : this.query.pageSize
            this.getData()
          }
        },
        subTableOptions: {
          data: [],
          total: 0,
          columns: [
            {prop: 'id', label: '运输单明细编号', minWidth: 150},
            {prop: 'categoryName', label: '类别名称', minWidth: 150},
            {prop: 'targetId', label: '目标站点', minWidth: 100},
            {prop: 'executingVehicleId', label: '实际执行车辆', minWidth: 100},
            {prop: 'createTime', label: '创建时间', minWidth: 150},
            {prop: 'finishTime', label: '完成时间', minWidth: 150},
            {prop: 'statusName', label: '执行状态', minWidth: 100},
            {prop: 'intendedVehicleId', label: '意向车辆编号', minWidth: 100}
          ],
          rowClassName: ({row, rowIndex}) => {
          },
          rowClick: (row, event, column) => {
            // this.formdata = {...row}
          },
          reload: (name, val) => {
            this.subQuery.page = name === 'page' ? val : this.subQuery.page
            this.subQuery.pageSize = name === 'pageSize' ? val : this.subQuery.pageSize
            this.getSubData()
          }
        },
        searchOptions: {
          state: [
            {
              label: '未执行',
              value: '0'
            }, {
              label: '执行中',
              value: '1'
            }, {
              label: '执行完成',
              value: '2'
            }, {
              label: '执行失败',
              value: '3'
            }
          ],
          type: [
            {
              label: '充电',
              value: 'Charge'
            }, {
              label: '叫满料',
              value: 'CM'
            }, {
              label: '叫空车',
              value: 'CC'
            }, {
              label: '还空车',
              value: 'RC'
            }, {
              label: '收空料',
              value: 'RM'
            }, {
              label: '直接呼叫',
              value: 'GG'
            }
          ]
        }
      }
    },
    methods: {
      onBtnClick(btnKey, row) {
        let btnHandlers = {
          openDetail: (row) => {
            this.$refs.detailWindow.open(row.id)
          }
        }
        if (btnHandlers[btnKey]) {
          btnHandlers[btnKey].call(this, row)
        }
      },
      getData() {
        api.transport.paged(this.query).then(data => {
          this.tableOptions.data = data.records
          this.tableOptions.total = data.total
        })
      },
      getSubData() {
        api.transport.orderPaged(this.subQuery).then(data => {
          this.subTableOptions.data = data.records
          this.subTableOptions.total = data.total
        })
      },
      search() {
        this.getData()
      },
      reset() {
        this.query.page = 1
        this.query.vehicleNo = null
        this.query.state = null
        this.query.type = null
        this.getData()
      }
    },
    mounted() {
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.getData()
      })
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.success
  color: #07B74A
  font-weight: bold
.failed
  color: #F25643
  font-weight: bold

.input-wrapper
  line-height: 40px
  .label
    font-size: 14px
    margin: 0 5px
  .select, .input
    width: 200px !important
  .search
    margin-left: 20px
</style>

