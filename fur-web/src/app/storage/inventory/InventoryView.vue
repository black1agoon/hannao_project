<template>
  <div class="main">
    <div style="height: 55%;overflow: hidden">
      <div>
        <div class="topBar">
          <span style="margin-top: 3px;white-space: nowrap">条码:</span>
          <el-input size="small" style="margin-left: 10px;width: 180px" v-model="barCode" clearable></el-input>
          <span style="margin-top: 3px;white-space: nowrap;margin-left: 10px">款号:</span>
          <el-input size="small" style="margin-left: 10px;width: 180px" v-model="styleCode" clearable></el-input>
          <span style="margin-top: 3px;white-space: nowrap;margin-left: 10px">品名:</span>
          <el-input size="small" style="margin-left: 10px;width: 180px" v-model="styleName" clearable></el-input>
          <span style="margin-top: 3px;white-space: nowrap;margin-left: 10px">颜色:</span>
          <el-input size="small" style="margin-left: 10px;width: 180px" v-model="color" clearable></el-input>
          <span style="margin-top: 3px;white-space: nowrap;margin-left: 10px">尺码:</span>
          <el-input size="small" style="margin-left: 10px;width: 180px" v-model="sizeStyle" clearable></el-input>
          <span style="margin-top: 3px;white-space: nowrap;margin-left: 10px">仓库:</span>
          <el-select style="width: 180px;margin-left: 10px" size="small" v-model="storeHouse" clearable>
            <el-option
                v-for="item in storeHouseList"
                :key="item.id"
                :label="item.text"
                :value="item.text">
            </el-option>
          </el-select>
          <el-button size="small" type="primary" style="margin-left: 30px" @click="searchTab">查询</el-button>
          <el-button size="small" type="primary" style="margin-left: 10px" @click="clearSearch">重置</el-button>
          <el-button size="small" type="primary" style="margin-left: 10px" @click="download">导出</el-button>
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
            prop="styleCode"
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
        <el-table-column
            prop="number"
            label="库存数"
            align="center">
        </el-table-column>
        <el-table-column
            prop="storeName"
            label="所属仓库"
            align="center">
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
      <el-tab-pane label="库存明细" name="first">
        <el-button type="primary" size="small" style="margin-left: 10px" @click="loss">人工盘亏</el-button>
        <el-table
            v-loading="buttonLioading"
            :data="tableData2"
            :height="tableHeight"
            highlight-current-row
            @current-change="handleCurrent"
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
              prop="createTime"
              label="最近更新"
              align="center"
              :formatter="formatterTime"
          >
          </el-table-column>
          <el-table-column
              prop="createUserName"
              label="操作员"
              align="center">
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <la-export-dialog ref="exportDialog"></la-export-dialog>
  </div>
</template>

<script>
  import LaExportDialog from '@/components/base/LaExportDialog'
  import { api } from '@/api'

  export default {
    name: 'InventoryView',
    components: { LaExportDialog },
    data () {
      return {
        storeHouse: '',
        barCode: '',
        styleName: '',
        styleCode: '',
        color: '',
        sizeStyle: '',
        storeHouseList: [],
        tableData: [],
        tableData2: [],
        activeName: 'first',
        tableHeight: window.innerHeight - 40 - 41 - window.innerHeight * 0.55 - 32,
        tableHeight2: window.innerHeight - 60 - 41 - window.innerHeight * 0.45 - 32,
        size: 20,
        current: 1,
        total: 0,
        tabLoading: false,
        storeGuid: '',
        infoId: '',
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
        this.storeHouse = ''
        this.barCode = ''
        this.styleName = ''
        this.styleCode = ''
        this.color = ''
        this.sizeStyle = ''
      },
      searchTab () {
        this.tabLoading = true
        api.inventory.getPage({
          BarCode: this.barCode,
          StyleName: this.styleName,
          ColorName: this.color,
          StyleCode: this.styleCode,
          StoreName: this.storeHouse,
          SizeName: this.sizeStyle,
          page: this.current,
          rows: this.size,
        }).then(res => {
          this.total = res.total
          this.tableData = res.rows
          this.tableData2 = []
          this.tabLoading = false
        })
      },
      getTable () {
        this.tabLoading = true
        api.inventory.getPage({
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
          this.storeGuid = val.storeGuid
          this.buttonLioading = true
          api.inventory.getDetail({
            ColorID: val.colorID,
            StyleID: val.styleID,
            StoreGuid: val.storeGuid,
            SizeID: val.sizeID,
          }).then(res => {
            this.tableData2 = res
            this.buttonLioading = false
          })
        }

      },
      handleCurrent (val) {
        if (val) {
          this.infoId = val.id
        }
      },
      formatterTime (row) {
        return row.createTime.slice(0, 10)
      },
      loss () {
        if (this.infoId !== '') {
          api.inventory.loss({
            id: this.infoId,
            storeGuid: this.storeGuid,
          }).then(() => {
            this.$message.success('亏盘成功')
            this.infoId = ''
          })
        } else {
          this.$message.error('请选择一条明细')
        }
      },
      download () {
        this.$refs.exportDialog.open({
          title: '导出文件',
          url: '/api/Inventory/ExportInventoryPage',
          columns: [
            { name: 'styleCode', label: '款号' },
            { name: 'styleName', label: '品名' },
            { name: 'colorName', label: '颜色' },
            { name: 'sizeName', label: '尺码' },
            { name: 'number', label: '库存数' },
            { name: 'storeName', label: '所属仓库' },
          ],
          params: {
            BarCode: this.barCode,
            StyleName: this.styleName,
            ColorName: this.color,
            StyleCode: this.styleCode,
            StoreName: this.storeHouse,
            SizeName: this.sizeStyle,
          },
        })
      },
    },
    created () {
      this.getCustomer()
      this.getTable()
    },
    mounted () {
      this.tableHeight = window.innerHeight - 50 - 41 - window.innerHeight * 0.55 - 32
      this.tableHeight2 = window.innerHeight - 60 - 41 - window.innerHeight * 0.45 - 32
      window.onresize = () => {
        return (() => {
          this.tableHeight = window.innerHeight - 50 - 41 - window.innerHeight * 0.55 - 32
          this.tableHeight2 = window.innerHeight - 60 - 41 - window.innerHeight * 0.45 - 32
        })()
      }
    },
  }
</script>

<style scoped>
  .main {
    width: 100%;
    height: 100%;
    min-width: 1250px;
  }

  .topBar {
    display: flex;
    margin-left: 20px;
    margin-top: 30px;
  }

  .main >>> .el-range-separator {
    padding: 0;
  }
</style>
