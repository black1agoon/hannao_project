<template>
  <eui-layout :regions="REGIONS">
    <main-toolbar
      slot="north"
      :buttons="helper.getMainFilterButtons(buttons)"
      @click="onBtnClick">
    </main-toolbar>
    <eui-table
      class="center-wrap"
      slot="center"
      ref="table"
      :highlight-current-row="false"
      :options="tableOptions">
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
          <el-button
            size="mini"
            type="text"
            @click="onBtnClick('btnSinglePage', scope.row)">
            <i class="btn-icon fa fa-file-text-o"></i>兑换记录
          </el-button>
        </template>
      </el-table-column>
    </eui-table>
    <mss-credit-goods-window
      ref="window"
      @reload="tableOptions.reload">
    </mss-credit-goods-window>
    <mss-credit-goods-list-window ref="allPage">
    </mss-credit-goods-list-window>
  </eui-layout>
</template>

<script>
  import api from '@/api'
  import {GOODS} from './mssuser.config'
  import helper from '@/app/app.helpers'
  import EuiLayout from '@/components/common/layout/EuiLayout'
  import EuiTable from '@/components/common/form/EuiTable'
  import MainToolbar from '@/components/common/tools/MainToolbar'
  import MssCreditGoodsWindow from './window/MssCreditGoodsWindow'
  import MssCreditGoodsListWindow from './window/MssCreditGoodsListWindow'
  export default {
    name: 'mss-credit-goods-controller',
    _meta: {
      path: '/mss/creditgoods',
      title: '积分礼品'
    },
    components: {
      EuiLayout,
      EuiTable,
      MainToolbar,
      MssCreditGoodsWindow,
      MssCreditGoodsListWindow
    },
    data() {
      return {
        helper,
        REGIONS: GOODS.REGIONS,
        buttons: helper.getMainButtons(),
        query: {
          page: 1,
          pageSize: 10
        },
        tableOptions: {
          data: [],
          total: 0,
          columns: [
            {prop: 'name', label: '名称', minWidth: 150},
            {prop: 'icon', label: '图标', width: 100, type: 'picture'},
            {prop: 'credit', label: '需要的积分', minWidth: 100},
            {prop: 'seq', label: '排序', minWidth: 100, sortable: true}
            // {prop: 'content', label: '详情', minWidth: 150}
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
          btnAdd: () => {
            // this.$refs.window.open()
            this.$router.push({
              path: '/mss/creditgoods/form',
              query: {
                id: null
              }
            })
          },
          btnEdit: (row) => {
            // this.$refs.window.open(row)
            this.$router.push({
              path: '/mss/creditgoods/form',
              query: {
                id: row.id
              }
            })
          },
          btnDelete: (row) => {
            this.$confirm(`是否删除:${row.name}？`, '提示', {
              iconClass: 'fa fa-question-circle'
            }).then(() => {
              api.mssCreditGoods.delete(row.id).then(() => {
                this.$message({
                  message: '删除成功!',
                  type: 'success'
                })
                this.getData(this.query)
              })
            }).catch(() => {
            })
          },
          btnAllPage: () => {
            this.$refs.allPage.open()
          },
          btnSinglePage: (row) => {
            this.$refs.allPage.open(row.id)
          }
        }
        if (btnHandlers[btnKey]) {
          btnHandlers[btnKey].call(this, row)
        }
      },
      getData(query) {
        api.mssCreditGoods.paged(query).then(data => {
          this.tableOptions.data = data.records
          this.tableOptions.total = data.total
        })
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

</style>

