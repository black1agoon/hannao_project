<template>
  <div style="padding-top: 5px;padding-left: 10px;width: 100%;height: 100%;min-width:1373px">
    <div v-if="moreInfo===false">
      <div style="display: flex">
        <h2 style="white-space: nowrap">出库信息</h2>
        <div style="margin-left: 70%;margin-top: 30px">
          <el-button size="small" @click="goInfo">查看所有出库单据</el-button>
        </div>
      </div>
      <div class="topBar">
        <span style="margin-top: 10px;white-space: nowrap;color: red;margin-right: 3px">*</span>
        <span style="margin-top: 3px;white-space: nowrap">所属仓库:</span>
        <el-select style="width: 200px;margin-left: 10px" size="small" v-model="lockHouse" :disabled="disable">
          <el-option
              v-for="item in house"
              :key="item.id"
              :label="item.text"
              :value="item.id">
          </el-option>
        </el-select>
        <el-button size="small" type="primary" style="margin-left: 20px" @click="clock">锁定</el-button>
        <el-button size="small" type="primary" style="margin-left: 20px" @click="unclock">解锁</el-button>
        <div style="margin-top: 3px;margin-left: 50px;white-space: nowrap;display: flex">
          <div style="margin-top: 8px;white-space: nowrap;color: red;margin-right: 3px">*</div>
          出库类型:
        </div>
        <el-select style="width: 200px;margin-left: 10px" size="small" v-model="inType">
          <el-option label="销售出库" value="1"></el-option>
          <el-option label="调拨出库" value="2"></el-option>
        </el-select>
        <span style="margin-top: 10px;white-space: nowrap;color: red;margin-right: 3px;margin-left: 50px"></span>
        <span style="margin-top: 3px;white-space: nowrap;display: flex" v-if="this.inType==='1'">员工:</span>
        <span style="margin-top: 3px;white-space: nowrap;display: flex" v-else-if="this.inType==='2'">客户:</span>
        <span style="margin-top: 3px;white-space: nowrap;display: flex" v-else>员工/客户:</span>
        <el-select style="width: 200px;margin-left: 10px" size="small" v-model="customer" filterable
                   @change="changeCustomer"
                   v-if="this.inType==='1'">
          <el-option
              v-for="item in customerList"
              :key="item.id"
              :label="item.realName"
              :value="item.id">
          </el-option>
        </el-select>
        <el-select style="width: 200px;margin-left: 10px" size="small" v-model="customer" filterable
                   v-else-if="this.inType==='2'">
          <el-option
              v-for="item in customerList2"
              :key="item.id"
              :label="item.text"
              :value="item.id">
          </el-option>
        </el-select>
        <el-select style="width: 200px;margin-left: 10px;min-width: 155px" size="small" v-model="customer" filterable
                   v-else disabled placeholder="请先选择出库类型"></el-select>
        <span style="margin-top: 3px;white-space: nowrap;margin-left: 50px;">联系方式:</span>
        <el-input style="width: 200px;margin-left: 10px;min-width: 131px" size="small" v-model="phone"
                  clearable></el-input>
        <span style="margin-top: 3px;margin-left: 50px;white-space: nowrap">合计:</span>
        <el-input style="width: 100px;margin-left: 10px;min-width: 61px" readonly size="small" v-model="sum"></el-input>
      </div>
      <div>
        <h2 style="white-space: nowrap">出库明细</h2>
        <div style="margin-left: 30px">
          <span style="margin-top: 3px;white-space: nowrap">条码:</span>
          <el-input style="width: 200px;margin-left: 10px" size="small" v-model="barcode" clearable></el-input>
          <el-button type="primary" style="margin-left: 15px" size="small" @click="add">增加</el-button>
          <el-button type="danger" style="margin-left: 15px" size="small" @click="del">删除</el-button>
        </div>
        <el-table
            :data="tableData"
            show-summary
            :summary-method="getSummaries"
            @selection-change="handleSelectionChange"
            style="width: 100%">
          <el-table-column
              type="selection"
              width="60">
          </el-table-column>
          <el-table-column
              type="index"
              width="50"
              label="序号"
              align="center">
          </el-table-column>
          <el-table-column
              prop="barCode"
              label="条码"
              align="center">
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
        </el-table>
        <div style="display: flex;justify-content: center;margin-top: 50px">
          <el-button type="primary" size="small" @click="storeOut">确认出库</el-button>
        </div>
      </div>
    </div>
    <more-info v-if="moreInfo===true" @back="back"></more-info>
  </div>
</template>

<script>
  import MoreInfo from '@/app/storage/store-out/MoreInfo'
  import { api } from '@/api'

  export default {
    name: 'StoreOutView',
    components: {
      MoreInfo,
    },
    data () {
      return {
        house: [],
        lockHouse: '',
        inType: '',
        sum: null,
        barcode: '',
        tableData: [],
        delItem: [],
        customerList: [],
        customerList2: [],
        customer: '',
        moreInfo: false,
        disable: true,
        phone: '',
      }
    },
    methods: {
      getHouseCombobox () {
        api.dropdown.house().then(res => {
          this.house = res
        })
      },
      getLockHouse () {
        api.operator.getLockHouse().then(res => {
          this.lockHouse = res.storeInHouseId
          this.disable = !(this.lockHouse === null || this.lockHouse === '');
        })
      },
      getSummaries (param) {
        const { columns } = param
        const sums = []
        columns.forEach((column, index) => {
          if (index === 1) {
            sums[index] = ''
          } else if (index === 6) {
            sums[index] = this.tableData.length
          } else if (index === 0) {
            sums[index] = '合计'
          }
        })
        return sums
      },
      getCustomer () {
        api.dropdown.opearInfo().then(res => {
          this.customerList = res.rows
        })
      },
      getCustomer2 () {
        api.dropdown.customer().then(res => {
          this.customerList2 = res
        })
      },
      handleSelectionChange (val) {
        this.delItem = val
      },
      add () {
        if (this.barcode === '') {
          this.$message.error('请输入条码')
        } else {
          api.storeIn.getBarcode({
            BarCode: this.barcode,
          }).then(res => {
            if (res === null) {
              this.$message.warning('该条码暂无信息')
              this.barcode = ''
            } else if (this.tableData.some(res => {
              return res.barCode === this.barcode
            })) {
              this.$message.error('请勿添加相同的条码')
              this.barcode = ''
            } else {
              this.tableData.push({
                barCode: res.barCode,
                styleCode: res.styleCode,
                styleName: res.styleName,
                colorName: res.colorName,
                sizeName: res.sizeName,
              })
              this.barcode = ''
            }
          })
        }
      },
      del () {
        this.delItem.forEach(res => {
          this.tableData.splice(this.tableData.findIndex(item => {
            return item.barCode === res.barCode
          }), 1)
        })
      },
      clock () {
        api.operator.lockHouse({
          storeHouseId: this.lockHouse,
          isStoIn: true,
        }).then(() => {
          this.$message.success('锁定成功')
          this.disable = true
        })
      },
      unclock () {
        this.disable = false
      },
      goInfo () {
        this.moreInfo = true
      },
      back () {
        this.moreInfo = false
      },
      storeOut () {
        const a = []
        if (this.lockHouse === '') {
          this.$message.error('请选择出库仓库')
        } else if (this.inType === '') {
          this.$message.error('请选择出库类型')
        } else if (this.tableData.length < 1) {
          this.$message.error('请输入条码')
        } else {
          this.tableData.forEach(res => {
            a.push({
              barCode: res.barCode,
            })
          })
          api.storeOut.add({
            stoOut: {
              contactsPhone: this.phone,
              storeGuid: this.lockHouse,
              type: this.inType,
              takeDeliveryUser: this.customer,
            },
            stoOutDetails: a,
          }).then(res => {
            if (res.success) {
              this.tableData = []
              this.$message.success('出库成功')
            } else {
              this.$message.error(res.message)
            }
          })
        }
      },
      changeCustomer (data) {
        this.phone = this.customerList.find(res => {
          return res.id === data
        }).phoneNumber
      },
    },
    created () {
      this.getHouseCombobox()
      this.getLockHouse()
      this.getCustomer()
      this.getCustomer2()
    },
    watch: {
      tableData () {
        this.sum = this.tableData.length
      },
    },
  }
</script>

<style scoped lang="scss">
  .topBar {
    display: flex;
    margin-left: 20px;
    margin-top: 10px;
  }
</style>
