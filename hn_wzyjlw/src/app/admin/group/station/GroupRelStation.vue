<template>
  <div>
    <eui-table
      class="eui-table"
      ref="table"
      :options="tableOptions"
      @reloadTable="tableOptions.reload">
      <el-table-column label="操作" width="100" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button
            v-for="(btn, index) in buttons"
            size="mini"
            type="text"
            :key="index"
            @click="onBtnClick(btn.btnKey, scope.row)">
            <i :class="['btn-icon fa', btn.logo]"></i>{{btn.memo}}
          </el-button>
        </template>
      </el-table-column>
    </eui-table>
  </div>
</template>

<script>
  import api from '@/api'
  import helper from '@/app/app.helpers'
  import EuiTable from '@/components/common/form/EuiTable'
  import EuiInput from '@/components/common/form/EuiInput'

  export default {
    name: 'group-rel-station',
    components: {
      EuiTable,
      EuiInput
    },
    props: {
      buttons: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        helper,
        formdata: {},
        query: {
          groupId: null,
          page: 1,
          pageSize: 10
        },
        tableOptions: {
          data: [],
          total: 0,
          columns: [
            {prop: 'stationName', label: '机台名称', width: 150},
            {prop: 'stationCode', label: '机台编码', width: 150},
            {prop: 'workshopName', label: '所属车间', width: 150},
            {prop: 'stationTypeName', label: '机台类型', width: 150},
            {prop: 'modelNameName', label: '模型名称', width: 150},
            {prop: 'barCode', label: '条形码', minWidth: 150}
          ],
          rowClick: (row, event, column) => {
            this.formdata = {...row}
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
      getData(query) {
        api.groupRelStation.paged(query).then(data => {
          this.tableOptions.data = data.records
          this.tableOptions.total = data.total
        })
      },
      onBtnClick(btnKey, arg) {
        let btnHandlers = {
          btnRelStationDelete: (arg) => {
            this.formdata = {...arg}
            this.$confirm(`取消关联机台: ${this.formdata.stationCode}？`, '提示', {
              iconClass: 'fa fa-question-circle'
            }).then(() => {
              api.groupRelStation.delete(this.formdata.id).then(() => {
                this.$message({
                  message: '删除成功!',
                  type: 'success'
                })
                this.getData(this.query)
              })
            }).catch(() => {
            })
          }
        }
        if (btnHandlers[btnKey]) {
          btnHandlers[btnKey].call(this, arg)
        }
      },
      cancel() {
        this.$refs.window.cancel()
      },
      reload(groupId) {
        this.query.groupId = groupId
        this.getData(this.query)
      }
    },
    mounted() {
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .eui-table
    height: 100%
    position absolute
</style>
