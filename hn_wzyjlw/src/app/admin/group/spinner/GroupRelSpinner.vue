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
    name: 'group-rel-spinner',
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
            {prop: 'jobNumber', label: '工号', width: 100},
            {prop: 'name', label: '真实姓名', width: 100},
            {prop: 'workshopName', label: '所属车间', width: 100},
            {prop: 'sexName', label: '性别', width: 100},
            {prop: 'phone', label: '电话', width: 200},
            {prop: 'createTime', label: '创建时间', width: 200},
            {prop: 'memo', label: '备注', minWidth: 200}
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
        api.groupRelSpinner.paged(query).then(data => {
          this.tableOptions.data = data.records
          this.tableOptions.total = data.total
        })
      },
      onBtnClick(btnKey, arg) {
        let btnHandlers = {
          btnRelSpinnerDelete: (arg) => {
            this.formdata = {...arg}
            this.$confirm(`取消关联 工号:${this.formdata.jobNumber}？`, '提示', {
              iconClass: 'fa fa-question-circle'
            }).then(() => {
              api.groupRelSpinner.delete(this.formdata.id).then(() => {
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
