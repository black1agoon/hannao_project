<template>
  <div class="main">
    <div style="height: 55%;overflow: hidden">
      <div>
        <el-button icon="el-icon-back" @click="back" size="small">返回</el-button>
        <div class="topBar">
          <div style="margin-top: 10px;margin-left: 10px">
            <span style="margin-top: 3px;white-space: nowrap">制单时间:</span>
            <el-date-picker
                size="small"
                v-model="time"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                style="margin-left: 10px;min-width: 255px"
                value-format="yyyy-MM-dd"
                clearable
            >
            </el-date-picker>
          </div>
          <div style="margin-top: 10px;margin-left: 10px">
            <span style="margin-top: 3px;white-space: nowrap;">入库单号:</span>
            <el-input size="small" style="margin-left: 10px;width: 200px" v-model="code" clearable></el-input>
          </div>
          <div style="margin-top: 10px;margin-left: 10px">
            <span style="margin-top: 3px;white-space: nowrap">订单号:</span>
            <el-input size="small" style="margin-left: 10px;width: 200px" v-model="proPlanBillCode"
                      clearable></el-input>
          </div>
          <div style="margin-top: 10px;margin-left: 10px">
            <span style="margin-top: 3px;white-space: nowrap">仓库名称:</span>
            <el-select style="width: 200px;margin-left: 10px" size="small" v-model="storeHouse" clearable>
              <el-option
                  v-for="item in storeHouseList"
                  :key="item.id"
                  :label="item.text"
                  :value="item.text">
              </el-option>
            </el-select>
          </div>
          <div style="margin-top: 10px;margin-left: 10px">
            <el-button size="small" type="primary" @click="searchTab">查询</el-button>
            <el-button size="small" type="primary" style="margin-left: 10px" @click="clearSearch">重置</el-button>
          </div>
        </div>
      </div>
      <el-table
          v-loading="tabLoading"
          :data="tableData"
          highlight-current-row
          :height="tableHeight2"
          @current-change="handleCurrentChange"
          style="width: 100%;margin-top: 10px">
        <el-table-column
            type="index"
            width="50"
            label="序号"
            align="center"
        >
        </el-table-column>
        <el-table-column
            prop="code"
            label="入库单号"
            align="center">
        </el-table-column>
        <el-table-column
            prop="typeName"
            label="入库类型"
            align="center">
        </el-table-column>
        <el-table-column
            prop="number"
            label="数量"
            align="center">
        </el-table-column>
        <el-table-column
            prop="proPlanBillCode"
            label="订单号"
            align="center">
        </el-table-column>
        <el-table-column
            prop="storeHouseName"
            label="入库仓库"
            align="center">
        </el-table-column>
        <el-table-column
            prop="createUserName"
            label="制单人"
            align="center">
        </el-table-column>
        <el-table-column
            prop="createTime"
            label="制单时间"
            align="center"
            :formatter="formatterTime">
        </el-table-column>

      </el-table>
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="currentChange"
          :page-sizes="[10,20, 30, 40, 50]"
          :page-size="this.size"
          :current-page="this.current"
          layout="sizes, prev, pager, next, jumper"
          background
          :total="10">
      </el-pagination>
    </div>
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="入库明细" name="first">
        <el-table
            v-loading="buttonLioading"
            :data="tableData2"
            :height="tableHeight"
            style="width: 100%;">
          <el-table-column
              type="index"
              width="50"
              label="序号"
              align="center"
          >
          </el-table-column>
          <el-table-column
              prop="barCode"
              label="条码"
              align="center">
          </el-table-column>
          <el-table-column
              prop="styleName"
              label="款号"
              align="center">
          </el-table-column>
          <el-table-column
              prop="styleName"
              label="品名"
              align="center">
          </el-table-column>
          <el-table-column
              prop="colorName"
              label="颜色"
              align="center">
          </el-table-column>
          <el-table-column
              prop="sizeName"
              label="尺码"
              align="center">
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import { api } from '@/api'

  export default {
    name: 'MoreInfo',
    data () {
      return {
        time: '',
        status: '',
        storeHouse: '',
        storeHouseList: [],
        code: '',
        proPlanBillCode: '',
        tableData: [],
        tableData2: [],
        activeName: 'first',
        tableHeight: window.innerHeight - 40 - 41 - window.innerHeight * 0.55,
        tableHeight2: window.innerHeight - 94 - 41 - window.innerHeight * 0.45 - 32,
        size: 20,
        current: 1,
        total: 0,
        tabLoading: false,
        buttonLioading: false,
      }
    },
    methods: {
      back () {
        this.$emit('back', true)
      },
      getCustomer () {
        api.dropdown.house().then(res => {
          this.storeHouseList = res
        })
      },
      clearSearch () {
        this.time = []
        this.status = ''
        this.storeHouse = ''
        this.code = ''
        this.proPlanBillCode = ''
      },
      searchTab () {
        this.tabLoading = true
        api.storeIn.getPage({
          startTime: this.time[0],
          endTime: this.time[1],
          code: this.code,
          proPlanBillCode: this.proPlanBillCode,
          StoreHouseName: this.storeHouse,
          page: this.current,
          rows: this.size,
        }).then(res => {
          this.total = res.total
          this.tableData = res.rows
          this.tabLoading = false
        })
      },
      getTable () {
        this.tabLoading = true
        api.storeIn.getPage({
          page: this.current,
          rows: this.size,
        }).then(res => {
          this.total = res.total
          this.tableData = res.rows
          this.tabLoading = false
        })
      },
      handleSizeChange (val) {
        this.size = val
        this.getTable()
      },
      currentChange (val) {
        this.current = val
        this.getTable()
      },
      handleCurrentChange (val) {
        if (val) {
          this.buttonLioading = true
          api.storeIn.getDetail({
            StoInId: val.id,
          }).then(res => {
            this.tableData2 = res
            this.buttonLioading = false
          })
        }
      },
      formatterTime (row, column) {
        return row.createTime.slice(0, 10)
      },
    },
    created () {
      this.getCustomer()
      this.getTable()
    },
    mounted () {
      this.tableHeight = window.innerHeight - 50 - 41 - window.innerHeight * 0.55
      this.tableHeight2 = window.innerHeight - 94 - 41 - window.innerHeight * 0.45 - 32
      window.onresize = () => {
        return (() => {
          this.tableHeight = window.innerHeight - 50 - 41 - window.innerHeight * 0.55
          this.tableHeight2 = window.innerHeight - 94 - 41 - window.innerHeight * 0.45 - 32
        })()
      }
    },
  }
</script>

<style scoped>
  .main {
    width: 100%;
    height: 100%;
    min-width: 1400px;
  }

  .topBar {
    display: flex;
    margin-left: 20px;
    margin-top: 20px;
    flex-flow: row wrap;
  }

  .main >>> .el-range-separator {
    padding: 0;
  }
</style>