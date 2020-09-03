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
        :options="tableOptions"
        @reloadTable="tableOptions.reload">
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
        </template>
      </el-table-column>
    </eui-table>
    <upload-file
        ref="uploadfile"
        :upload-api="uploadApi"
        title="上传曲目"
        @reload="reload">
    </upload-file>
  </eui-layout>
</template>

<script>
  import api from '@/api'
  import {SONG} from './light.config'
  import helper from '@/app/app.helpers'
  import EuiLayout from '@/components/common/layout/EuiLayout'
  import EuiTable from '@/components/common/form/EuiTable'
  import MainToolbar from '@/components/common/tools/MainToolbar'
  import UploadFile from '@/app/tools/UploadFile'
  export default {
    name: 'songbook-controller',
    _meta: {
      path: '/songbook/controller',
      title: '曲目管理'
    },
    components: {
      EuiLayout,
      EuiTable,
      MainToolbar,
      UploadFile
    },
    data() {
      return {
        helper,
        REGIONS: SONG.REGIONS,
        buttons: helper.getMainButtons(),
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
            {prop: 'name', label: '曲目名称'},
            {prop: 'address', label: '地址'},
            {prop: 'createTime', label: '创建时间'}
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
        },
        uploadApi: api.songbook.add
      }
    },
    methods: {
      onBtnClick(btnKey, row) {
        let btnHandlers = {
          btnAdd: () => {
            this.$refs.uploadfile.open()
          },
          btnDelete: (row) => {
            this.$confirm(`是否删除:${row.name}？`, '提示', {
              iconClass: 'fa fa-question-circle'
            }).then(() => {
              api.songbook.delete({
                idList: [row.id]
              }).then(() => {
                this.$message({
                  message: '删除成功!',
                  type: 'success'
                })
                this.reload()
              })
            }).catch(() => {
            })
          }
        }
        if (btnHandlers[btnKey]) {
          btnHandlers[btnKey].call(this, row)
        }
      },
      getData(query) {
        api.songbook.paged(query).then(data => {
          this.tableOptions.data = data.records
          this.tableOptions.total = data.total
        })
      },
      reload() {
        this.getData(this.query)
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

