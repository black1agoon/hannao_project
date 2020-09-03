<template>
  <eui-layout :regions="REGIONS">
    <main-toolbar
        slot="north"
        :buttons="helper.getMainFilterButtons(buttons, tableButtons)"
        @click="onBtnClick">
    </main-toolbar>
    <eui-table
        class="center-wrap"
        slot="center"
        ref="table"
        :highlight-current-row="false"
        :options="tableOptions"
        @reloadTable="tableOptions.reload">
      <!--<el-table-column label="上上月" align="center">-->
        <!--<template slot-scope="scope">-->
          <!--<div class="month">月份:{{scope.row.month1}}月</div>-->
          <!--<div class="value">度数:{{scope.row.month1Value}}</div>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column label="上月" align="center">-->
        <!--<template slot-scope="scope">-->
          <!--<div class="month">月份:{{scope.row.month2}}月</div>-->
          <!--<div class="value">度数:{{scope.row.month2Value}}</div>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column label="去年上月" align="center">-->
        <!--<template slot-scope="scope">-->
          <!--<div class="month">月份:{{scope.row.month3}}月</div>-->
          <!--<div class="value">度数:{{scope.row.month3Value}}</div>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column label="上月同比" align="center">
        <template slot-scope="scope">
          <div class="wrap">
            <div class="month">{{scope.row.month1}}月</div>
            <div class="value">{{scope.row.month1Value}}</div>
          </div>
          <div class="wrap">
            <div class="month">{{scope.row.month2}}月</div>
            <div class="value">{{scope.row.month2Value}}</div>
          </div>
          <div class="wrap">
            <div class="month">同比</div>
            <div class="value">{{getPercent(scope.row.yearOnYear)}}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="上月环比" align="center">
        <template slot-scope="scope">
          <div class="wrap">
            <div class="month">{{scope.row.month1}}月</div>
            <div class="value">{{scope.row.month1Value}}</div>
          </div>
          <div class="wrap">
            <div class="month">{{scope.row.month2}}月</div>
            <div class="value">{{scope.row.month2Value}}</div>
          </div>
          <div class="wrap">
            <div class="month">环比</div>
            <div class="value">{{getPercent(scope.row.yearOnYear)}}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" minWidth="200" fixed="right">
        <template slot-scope="scope">
          <el-button
              v-for="(btn, index) in helper.getTableButtons(buttons, tableButtons)"
              size="mini"
              type="text"
              :key="index"
              @click="onBtnClick(btn.btnKey, scope.row)">
            <i :class="['btn-icon fa', btn.logo]"></i>{{btn.name}}
          </el-button>
        </template>
      </el-table-column>
    </eui-table>
    <electric-month-window ref="month">
    </electric-month-window>
    <electric-year-window ref="year">
    </electric-year-window>
  </eui-layout>
</template>

<script>
  import api from '@/api'
  import {GROUP} from './light.config'
  import helper from '@/app/app.helpers'
  import EuiLayout from '@/components/common/layout/EuiLayout'
  import EuiTable from '@/components/common/form/EuiTable'
  import MainToolbar from '@/components/common/tools/MainToolbar'
  import ElectricMonthWindow from './window/ElectricMonthWindow'
  import ElectricYearWindow from './window/ElectricYearWindow'
  export default {
    name: 'electric-controller',
    _meta: {
      path: '/electric/controller',
      title: '能耗监测'
    },
    components: {
      EuiLayout,
      EuiTable,
      MainToolbar,
      ElectricMonthWindow,
      ElectricYearWindow
    },
    data() {
      return {
        helper,
        REGIONS: GROUP.REGIONS,
        buttons: helper.getMainButtons(),
        tableButtons: ['btnMonthEvery', 'btnYearEvery'],
        query: {
          page: 1,
          pageSize: 10,
          name: null,
          projection: null,
          agencyId: this.$store.state.agencyId
        },
        tableOptions: {
          data: [],
          total: 0,
          columns: [
            {prop: 'equipmentName', label: '电表名称'},
            {prop: 'lastYear', label: '去年(kW‧h)'},
            {prop: 'year', label: '今年(kW‧h)'},
            {prop: 'month', label: '本月用电量(kW‧h)'}
          ],
          rowClassName: ({row, rowIndex}) => {
          },
          rowClick: (row, event, column) => {
            // this.formdata = {...row}
          },
          reload: (name, val) => {
            this.query.page = name === 'page' ? val : this.query.page
            this.query.pageSize = name === 'pageSize' ? val : this.query.pageSize
            this.getData(this.query)
          }
        }
      }
    },
    methods: {
      onBtnClick(btnKey, row) {
        let btnHandlers = {
          btnMonthEvery: (row) => {
            this.$refs.month.open(row.equipmentId)
          },
          btnYearEvery: (row) => {
            this.$refs.year.open(row.equipmentId)
          },
        }
        if (btnHandlers[btnKey]) {
          btnHandlers[btnKey].call(this, row)
        }
      },
      getData(query) {
        api.electric.paged(query).then(data => {
          this.tableOptions.data = data.records
          this.tableOptions.total = data.total
        })
      },
      getPercent(val) {
        return (val * 100) + '%'
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
.wrap
  display: inline-block
  padding: 0 5px
  border-right: 1px solid #eee
  text-align: center
  &:last-child
    border: none
</style>

