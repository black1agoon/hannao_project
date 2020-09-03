<template>
  <div class="main">
    <div class="table">
      <div class="tableBtn">
        <div style="display: flex">
          <el-input placeholder="岗位名称" v-model="search" class="input-with-select" size="small" clearable
                    @keyup.native.enter="doSearch">
            <el-button slot="append" icon="el-icon-search" @click="doSearch"></el-button>
          </el-input>
          <div style=" margin:10px 0 0 20px;">
            <el-button type="primary" size="small" icon="el-icon-plus" @click="add">添加</el-button>
            <el-button type="primary" size="small" icon="el-icon-edit" @click="edit">编辑</el-button>
            <el-button type="primary" size="small" icon="el-icon-delete" @click="del">删除</el-button>
            <el-button type="primary" size="small" icon="el-icon-lock" @click="saves">保存权限</el-button>
          </div>
        </div>
      </div>
      <el-table
          v-loading="tableLoading"
          :data="tableData.rows"
          class="mainTable"
          highlight-current-row
          @current-change="handleCurrentChange"
          height="calc(100% - 74px)"
      >
        <el-table-column
            type="index"
            label="序号"
            width="50"
            align="center">
        </el-table-column>
        <el-table-column
            prop="title"
            label="岗位名称"
            align="center">
        </el-table-column>
        <el-table-column
            prop="stepNames"
            label="对应工序"
            align="center">
        </el-table-column>
        <el-table-column
            prop="isSuperAdmin"
            label="是否为管理员"
            align="center"
            :formatter="formatter"
        >
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
          :total="total">
      </el-pagination>
    </div>
    <div class="right" v-loading="treeLoading">
      <el-scrollbar style="height:100%">
        <el-tree :data="jurisdiction" :props="defaultProps" :default-expand-all="true" :highlight-current="true"
                 show-checkbox ref="tree" node-key="id" :expand-on-click-node="false"
                 :default-checked-keys="defaultChecked">
        </el-tree>
      </el-scrollbar>
    </div>
    <el-dialog :title="title" :visible.sync="dialogFormVisible" width="450px" label-position="right"
               @close="closeDialog">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="岗位名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" style="width: 217px" size="small"></el-input>
        </el-form-item>
        <el-form-item label="是否为管理员" :label-width="formLabelWidth">
          <el-select v-model="form.isAdmin" placeholder="是否为管理员" style="width: 217px" size="small">
            <el-option label="是" :value="true"></el-option>
            <el-option label="否" :value="false"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="save" size="small">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { api } from '@/api'

  export default {
    name: 'RoleView',
    data () {
      return {
        jurisdiction: [],
        defaultProps: {
          children: 'children',
          label: 'text',
        },
        selectId: '',
        search: '',
        tableData: {},
        tableSelect: '',
        selectJurisdiction: [],
        defaultChecked: [],
        treeLoading: false,
        dialogFormVisible: false,
        form: {
          name: '',
          isAdmin: false,
        },
        formLabelWidth: '120px',
        title: '新增',
        rules: {
          name: [
            { required: true, message: '请输入岗位名称', trigger: 'blur' },
          ],
        },
        total: 0,
        size: 20,
        current: 1,
        tableLoading: false,
      }
    },
    methods: {
      getDepartment (guid) {
        this.treeLoading = true
        api.role.getTree({
          guid: guid,
        }).then(res => {
          this.jurisdiction = res
          this.defaultChecked = this.getTreeCheckedData(this.jurisdiction, 'id', 'children')
          this.treeLoading = false
        })
      },
      getRoles () {
        this.tableLoading = true
        return api.role.getPage({
          page: this.current,
          rows: this.size,
        }).then(res => {
          this.total = res.total
          this.tableData = res
          this.tableLoading = false
        })
      },
      saves () {
        const halfCheckedKeys = this.$refs['tree'].getHalfCheckedKeys()
        const checkedKeys = this.$refs['tree'].getCheckedKeys()

        if (halfCheckedKeys.length > 1) {
          halfCheckedKeys.forEach(res => {
            checkedKeys.push(res)
          })
        }
        const obj = {}
        obj.roleGuid = this.selectId
        obj.featureGuid = []
        checkedKeys.forEach(res => {
          obj.featureGuid.push(res)
        })
        if (this.selectId) {
          api.role.save(obj).then(() => {
            this.$message.success('保存成功')
          })
        } else {
          this.$message.error('请先选择岗位')
        }
      },
      formatter (row) {
        return row.isSuperAdmin ? '是' : '否'
      },
      handleCurrentChange (val) {
        this.selectId = val?.id
        if (this.selectId) {
          this.getDepartment(val.id)
        }
      },
      getTreeCheckedData (arr, name, children) {
        if (!arr) {
          return
        }
        if (!name) {
          name = 'id'
        }
        if (!children) {
          children = 'children'
        }
        const checkList = []
        const getChild = (arr) => {
          arr.map(v => {
            if (v[children] && v[children].length > 0) {
              getChild(v[children])
            } else {
              if (v.checked) {
                checkList.push(v[name])
              }
            }
          })
          return [...checkList]
        }
        return getChild(arr)
      },
      add () {
        this.form = {
          name: '',
          isAdmin: false,
        }
        this.selectId = ''
        this.title = '添加'
        this.dialogFormVisible = true
      },
      closeDialog () {
        this.dialogFormVisible = false
        this.$nextTick(() => {
          this.$refs.form.clearValidate()
        })
      },
      save () {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            if (this.selectId) {
              api.role.saveRole({
                role: {
                  id: this.selectId,
                  title: this.form.name,
                  isSuperAdmin: this.form.isAdmin,
                },
              }).then(() => {
                this.dialogFormVisible = false
                this.$refs.form.clearValidate()
                this.$message.success('修改成功')
                this.getRoles()
              })
            } else {
              api.role.saveRole({
                role: {
                  title: this.form.name,
                  isSuperAdmin: this.form.isAdmin,
                },
              }).then(() => {
                this.dialogFormVisible = false
                this.$message.success('添加成功')
                this.getRoles()
              })
            }
          }
        })
      },
      edit () {
        if (this.selectId) {
          let editInfo = []
          editInfo = this.tableData.rows.filter(res => {
            return res.id === this.selectId
          })
          this.form.name = editInfo[0].title
          this.form.isAdmin = editInfo[0].isSuperAdmin
          this.dialogFormVisible = true
          this.title = '编辑'
        } else {
          this.$message.error('请先选择一个岗位')
        }
      },
      doSearch () {
        this.tableLoading = true
        api.role.getPage({
          query: this.search,
          page: 1,
          rows: 20,
        }).then(res => {
          this.tableData = res
          this.tableLoading = false
        })
      },
      del () {
        if (this.selectId) {
          this.$confirm('此操作将永久删除该员工, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          }).then(() => {
            api.role.delRole({
              guid: this.selectId,
            }).then(res => {
              if (res.success) {
                this.getRoles()
                this.$message({
                  type: 'success',
                  message: '删除成功!',
                })
              } else {
                this.$message({
                  type: 'error',
                  message: res.message,
                })
              }
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除',
            })
          })
        } else {
          this.$message.error('请先选择需要删除的员工')
        }
      },
      handleSizeChange (val) {
        this.size = val
        this.getRoles()
      },
      currentChange (val) {
        this.current = val
        this.getRoles()
      },
    },
    created () {
      this.getRoles().then(() => {
        this.getDepartment(this.tableSelect)
      })
    },
  }
</script>

<style scoped lang="scss">
  ::v-deep .right .el-scrollbar__wrap {
    overflow-x: hidden !important;
  }

  .main {
    display: flex;
    height: 100%;
    text-align: left;
  }

  ::v-deep .el-tree {
    width: 100%;
    height: 100%;
  }

  .right {
    width: 20%;
    border-left: 1px solid #e6e6e6;
    min-width: 200px;
  }

  .table {
    width: 80%;
    min-width: 748px;
  }

  .input-with-select {
    margin: 10px 0 0 10px;
    width: 250px;
  }

  .mainTable {
    width: calc(100% - 10px);
    margin-left: 10px
  }
</style>
