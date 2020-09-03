<template>
  <eui-layout :regions="REGIONS">
    <main-toolbar
      slot="north"
      :buttons="helper.getMainFilterButtons(buttons)"
      @click="onBtnClick">
      <div class="input-wrapper">
        <span class="label">栏目:</span>
        <eui-input
          class="select"
          type="select"
          @change="newsCategoryIdChange"
          v-model="query.newsCategoryId"
          :options="inputOptions.newsCategoryId">
        </eui-input>
      </div>
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
        </template>
      </el-table-column>
    </eui-table>
  </eui-layout>
</template>

<script>
  import api from '@/api'
  import {NEWS} from './consultation.config'
  import helper from '@/app/app.helpers'
  import EuiLayout from '@/components/common/layout/EuiLayout'
  import EuiTable from '@/components/common/form/EuiTable'
  import MainToolbar from '@/components/common/tools/MainToolbar'
  import EuiInput from '@/components/common/form/EuiInput'

  export default {
    name: 'consultation-news',
    _meta: {
      path: '/consultation/news',
      title: '咨询中心'
    },
    components: {
      EuiLayout,
      EuiTable,
      MainToolbar,
      EuiInput
    },
    data() {
      return {
        helper,
        REGIONS: NEWS.REGIONS,
        buttons: helper.getMainButtons(),
        query: {
          newsCategoryId: '',
          page: 1,
          pageSize: 10
        },
        tableOptions: {
          data: [],
          total: 0,
          columns: [
            {prop: 'title', label: '新闻标题', minWidth: 150},
            {prop: 'thumb', label: '缩略图', width: 100, type: 'picture'},
            {prop: 'categoryIdName', label: '所属分类', width: 100},
            {prop: 'statusName', label: '状态', minWidth: 100},
            {prop: 'seq', label: '排序', minWidth: 100, sortable: true}
          ],
          rowClassName: ({row, rowIndex}) => {
          },
          rowClick: (row, event, column) => {
            // this.formdata = {...row}
          },
          reload: (name, val) => {
            this.query.page = name === 'page' ? val : this.query.page
            this.query.pageSize = name === 'pageSize' ? val : this.query.pageSize
            this.getData()
          }
        },
        inputOptions: {
          newsCategoryId: [
            {
              label: '全部',
              value: ''
            }
          ]
        }
      }
    },
    methods: {
      onBtnClick(btnKey, row) {
        let btnHandlers = {
          btnAdd: () => {
            // this.$refs.window.open()
            this.$router.push({
              path: '/consultation/news/form',
              query: {
                id: null
              }
            })
          },
          btnEdit: (row) => {
            // this.$refs.window.open(row)
            this.$router.push({
              path: '/consultation/news/form',
              query: {
                id: row.id
              }
            })
          },
          btnDelete: (row) => {
            this.$confirm(`是否删除:${row.title}？`, '提示', {
              iconClass: 'fa fa-question-circle'
            }).then(() => {
              api.consultationNews.delete([row.id]).then(() => {
                this.$message({
                  message: '删除成功!',
                  type: 'success'
                })
                this.getData()
              })
            }).catch(() => {
            })
          }
        }
        if (btnHandlers[btnKey]) {
          btnHandlers[btnKey].call(this, row)
        }
      },
      getData() {
        api.consultationNews.paged(this.query).then(data => {
          this.tableOptions.data = data.records
          this.tableOptions.total = data.total
        })
      },
      getInputData() {
        api.consultation.paged({
          page: 1,
          pageSize: 999
        }).then(data => {
          if (data && data.records) {
            this.inputOptions.newsCategoryId = this.inputOptions.newsCategoryId.concat(data.records.map(r => ({
              label: r.name,
              value: r.id
            })))
          }
        })
      },
      newsCategoryIdChange() {
        this.getData()
      }
    },
    mounted() {
      this.getInputData()
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.getData()
      })
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .input-wrapper
    .label
      font-size: 14px
      margin: 0 5px
    .select
      width: 150px
</style>

