<template>
  <div class="main">

    <div class="left">
      <div class="tree-btn">
        <i class="el-icon-plus" @click="addDepartment"></i>
        <i class="el-icon-edit" @click="editDep"></i>
        <i class="el-icon-delete" @click="delDep"></i>
      </div>

      <div style="height: calc(100% - 42px)">
        <el-scrollbar style="height: 100%">
          <el-tree :data="department" :props="defaultProps" :default-expand-all="true" :highlight-current="true"
                   @node-click="handleNodeClick" :expand-on-click-node="false"></el-tree>
        </el-scrollbar>
      </div>

    </div>

    <div class="table">
      <div class="tableBtn">
        <div style="display: flex">
          <el-input placeholder="员工工号/姓名" v-model="search" class="input-with-select" size="small" clearable @keyup.native.enter="doSearch">
            <el-button slot="append" icon="el-icon-search" @click="doSearch"></el-button>
          </el-input>
          <div style=" margin:10px 0 0 20px;">
            <el-button type="primary" size="small" icon="el-icon-plus" @click="add">添加</el-button>
            <el-button type="primary" size="small" icon="el-icon-edit" @click="edit">编辑</el-button>
            <el-button type="primary" size="small" icon="el-icon-delete" @click="del">删除</el-button>
            <el-button type="primary" size="small" icon="el-icon-download" @click="download">导出</el-button>
          </div>
        </div>
      </div>
      <el-table
          v-loading="tableLoading"
          :data="tableData"
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
            prop="userNo"
            label="员工工号"
            width="180"
            align="center">
        </el-table-column>
        <el-table-column
            prop="realName"
            label="姓名"
            width="180"
            align="center">
        </el-table-column>
        <el-table-column
            prop="departmentName"
            label="部门"
            align="center">
        </el-table-column>
        <el-table-column
            prop="roleName"
            label="岗位"
            align="center">
        </el-table-column>
        <el-table-column
            prop="phoneNumber"
            label="联系方式"
            align="center">
        </el-table-column>
        <el-table-column
            prop="statusName"
            label="状态"
            align="center">
        </el-table-column>
        <el-table-column
            prop="realID"
            label="身份证号"
            align="center">
        </el-table-column>
        <el-table-column
            prop="entryDate"
            label="入职时间"
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
          :total="total">
      </el-pagination>
    </div>
    <el-dialog :title="this.title" :visible.sync="dialogFormVisible" width="800px" label-position="right"
               @close="closeDialog">
      <el-form :model="form" :rules="rules" ref="operatorForm">
        <el-row>
          <el-col :span="12">
            <el-form-item label="员工工号" :label-width="formLabelWidth" prop="userId">
              <el-input v-model="form.userId" autocomplete="off" style="width: 217px" size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
              <el-input v-model="form.name" autocomplete="off" style="width: 217px" size="small"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="部门" :label-width="formLabelWidth" prop="department">
              <el-cascader
                  placeholder="请选择部门"
                  :props="{
                children: 'children',
                value: 'id',
                label:'text',
                checkStrictly:true,
                expandTrigger: 'hover'
                }"
                  v-model="form.department"
                  :options="department"
                  :show-all-levels="false"
                  style="width: 217px"
                  size="small"
              >
              </el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系方式" :label-width="formLabelWidth" prop="phone">
              <el-input v-model="form.phone" autocomplete="off" style="width: 217px" size="small"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="状态" :label-width="formLabelWidth" prop="status">
              <el-select v-model="form.status" placeholder="请选择员工状态" style="width: 217px" size="small">
                <el-option label="在职" value="00031001"></el-option>
                <el-option label="离职" value="00031002"></el-option>
                <el-option label="退休" value="00031003"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="身份证号" :label-width="formLabelWidth" prop="realId">
              <el-input v-model="form.realId" autocomplete="off" style="width: 217px" size="small"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="入职时间" :label-width="formLabelWidth">
              <el-date-picker
                  size="small"
                  v-model="form.inTime"
                  type="date"
                  placeholder="选择日期"
                  value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="岗位" :label-width="formLabelWidth" prop="role">
              <div v-for="(item,index) in this.form.roleGuids" :key="item.roleGuid" style="display: flex">
                <el-select v-model="item.roleGuid" placeholder="请选择岗位" style="margin-bottom: 20px;width: 217px" size="small">
                  <el-option v-for="item in role" :key="item.id" :label="item.title" :value="item.id"></el-option>
                </el-select>
                <div style="margin-left: 50px">
                  是否为主岗位:
                  <el-switch
                      @change="changeMainRole($emit,index)"
                      size="small"
                      v-model="item.isMainRole">
                  </el-switch>
                  <el-button type="primary" style="margin-left: 10px" v-if="index===form.roleGuids.length-1"
                             size="small" @click="addRole(index)">增加
                  </el-button>
                  <el-button type="danger" style="margin-left: 10px" v-if="form.roleGuids.length>1" size="small"
                             @click="delRole(index)">移除
                  </el-button>
                </div>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog" size="small">取 消</el-button>
        <el-button type="primary" @click="save" size="small">保 存</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="this.depTitle" :visible.sync="dialogDepartmentVisible" width="450px" label-position="right">
      <el-form :model="depForm" ref="depForm" :rules="depRule">
        <el-form-item label="上级部门" :label-width="formLabelWidth">
          <el-cascader
              :props="{
                children: 'children',
                value: 'id',
                label:'text',
                checkStrictly:true,
                expandTrigger: 'hover'
                }"
              v-model="depForm.parent"
              :options="department"
              :show-all-levels="false"
              disabled
              style="width: 217px"
              size="small"
          >
          </el-cascader>
        </el-form-item>
        <el-form-item label="部门名称" :label-width="formLabelWidth" prop="title">
          <el-input v-model="depForm.title" style="width: 217px" size="small"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogDepartmentVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="saveDep" size="small">保 存</el-button>
      </div>
    </el-dialog>
    <la-export-dialog ref="exportDialog"></la-export-dialog>
  </div>
</template>

<script>
  import LaExportDialog from '@/components/base/LaExportDialog'
  import { api } from '@/api'

  export default {
    name: 'OperatorView',
    components: { LaExportDialog },
    data () {
      const validateRole = (rule, value, callback) => {
        if (this.form.roleGuids.some(res => {
          return res.roleGuid === ''
        })) {
          callback(new Error('请选择岗位'))
        } else {
          callback()
        }
      }
      const validatePhone = (rule, value, callback) => {
        const phoneRegex = /^1[34578]\d{9}$/
        if (!phoneRegex.test(value) && value) {
          callback(new Error('手机号码格式不正确！'))
        } else {
          callback()
        }
      }
      const checkIdCard = (rule, value, callback) => {
        const regEn = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0-2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0-2]\d)|3[0-1])\d{3}([0-9]|X)$/
        if (!regEn.test(value) && value) {
          callback(new Error('请输入正确身份证'))
        } else {
          callback()
        }
      }
      return {
        value1: true,
        department: [],
        role: [],
        defaultProps: {
          children: 'children',
          label: 'text',
        },
        selectId: '',
        selectName: '',
        editId: '',
        search: '',
        tableData: [],
        tableLoading: false,
        form: {
          userId: '',
          name: '',
          department: [],
          role: '',
          phone: '',
          status: '',
          realId: '',
          inTime: '',
          roleGuids: [{ roleGuid: '' }],
        },
        depForm: {
          parent: [],
          title: '',
        },
        formLabelWidth: '120px',
        dialogFormVisible: false,
        title: '',
        query: {
          query: '',
          departmentGuid: '',
          page: 1,
          rows: 20,
        },
        rules: {
          userId: [
            { required: true, message: '请输入员工工号', trigger: 'blur' },
          ],
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
          ],
          department: [
            { required: true, message: '请选择部门', trigger: 'change' },
          ],
          status: [
            { required: true, message: '请选择状态', trigger: 'change' },
          ],
          role: [
            { required: true, validator: validateRole, trigger: 'change' },
          ],
          phone: [
            { validator: validatePhone, trigger: 'blur' },
          ],
          realId: [
            { validator: checkIdCard, trigger: 'blur' },
          ],
        },
        depRule: {
          title: [
            { required: true, message: '请输入岗位名称', trigger: 'blur' },
          ],
        },
        total: 0,
        size: 20,
        current: 1,
        dialogDepartmentVisible: false,
        depTitle: '',
        isEdit: false,
      }
    },
    methods: {
      getDepartment () {
        api.dropdown.department().then(res => {
          this.department = res
          this.getTypeList(this.department)
        })
      },
      getTypeList (commodityType) {
        commodityType.forEach(items => {
          if (items.children.length > 0) {
            this.getTypeList(items.children)
          } else {
            items.children = undefined
          }
        })
      },
      handleNodeClick (data) {
        this.tableLoading = true
        this.selectId = data.id
        this.selectName = data.text
        this.current = 1
        this.size = 20
        api.operator.getPage({
          DepartmentGuid: this.selectId,
          page: this.current,
          rows: this.size,
        }).then(res => {
          this.tableData = res.rows
          this.tableData.forEach(res => {
            if (res.entryDate !== null) {
              res.entryDate = res.entryDate.substring(0, 10)
            }
          })
          this.tableLoading = false
        })
      },
      getTable () {
        this.tableLoading = true
        api.operator.getPage({
          page: this.current,
          rows: this.size,
        }).then(res => {
          this.total = res.total
          this.tableData = res.rows
          this.tableData.forEach(res => {
            if (res.entryDate !== null) {
              res.entryDate = res.entryDate.substring(0, 10)
            }
          })
          this.tableLoading = false
        })
      },
      add () {
        this.editId = ''
          this.form = {
            userId: '',
            name: '',
            department: [],
            role: '',
            phone: '',
            status: '',
            realId: '',
            inTime: '',
            roleGuids: [{ roleGuid: '' }],
          }
          this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs.operatorForm.clearValidate()
        })
        this.title = '添加'
      },
      edit () {
        if (this.editId) {
          const p1 = api.operator.getRole({
            guid: this.editId,
          }).then(res => {
            this.form.roleGuids = res.rows
            this.form.roleGuids.forEach(res => {
              this.$set(res, 'isMainRole', false)
            })
          })
          let editInfo = []
          editInfo = this.tableData.filter(res => {
            return res.id === this.editId
          })
          this.form.userId = editInfo[0].userNo
          this.form.department = this.changeDetSelect(editInfo[0].departmentId, this.department)
          this.form.name = editInfo[0].realName
          this.form.role = editInfo[0].roleId
          this.form.phone = editInfo[0].phoneNumber
          this.form.status = editInfo[0].status
          this.form.realId = editInfo[0].realID
          this.form.inTime = editInfo[0].entryDate
          p1.then(() => {
            this.form.roleGuids[this.form.roleGuids.findIndex(res => {
              return res.roleGuid === this.form.role
            })].isMainRole = true
          })
          this.dialogFormVisible = true
          this.title = '编辑'
        } else {
          this.$message.error('请先选择一个员工')
        }
      },
      del () {
        if (this.editId) {
          this.$confirm('此操作将永久删除该员工, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          }).then(() => {
            api.operator.del({
              guid: this.editId,
            }).then(() => {
              this.getTable()
              this.$message({
                type: 'success',
                message: '删除成功!',
              })
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
      doSearch () {
        this.tableLoading = true
        api.operator.getPage({
          query: this.search,
          page: this.current,
          rows: this.size,
        }).then(res => {
          this.tableData = res.rows
          this.tableData.forEach(res => {
            if (res.entryDate !== null) {
              res.entryDate = res.entryDate.substring(0, 10)
            }
          })
          this.tableLoading = false
        })
      },
      getRole () {
        api.dropdown.getRoles().then(res => {
          this.role = res.rows
        })
      },
      handleCurrentChange (val) {
        if (val) {
          this.editId = val.id
        }
      },
      isRepeat (arr) {
        const hash = {}
        for (let i = 0; i < arr.length; i += 1) {
          if (hash[arr[i]]) {
            return true
          }
          // 不存在该元素，则赋值为true，可以赋任意值，相应的修改if判断条件即可
          hash[arr[i]] = true
        }
        return false
      },
      save () {
        this.$refs['operatorForm'].validate((valid) => {
          if (valid) {
            if (this.form.roleGuids.some(res => {
              return res.isMainRole === true
            })) {
              const obj = {}
              if (this.editId) {
                obj.id = this.editId
              }
              obj.UserNo = this.form.userId
              obj.UserName = this.form.name
              obj.RealName = this.form.name
              obj.DepartmentId = this.form.department[this.form.department.length - 1]
              const index = this.form.roleGuids.findIndex(res => {
                return res.isMainRole === true
              })
              this.form.role = this.form.roleGuids[index].roleGuid
              obj.RoleId = this.form.role
              obj.roleGuids = []
              this.form.roleGuids.forEach(res => {
                obj.roleGuids.push(res.roleGuid)
              })
              obj.PhoneNumber = this.form.phone === null ? '' : this.form.phone
              obj.Status = this.form.status
              obj.RealID = this.form.realId === null ? '' : this.form.realId
              obj.EntryDate = this.form.inTime === null ? '' : this.form.inTime
              if (!this.isRepeat(obj.roleGuids)){
                api.operator.save(obj).then((res) => {
                  if (res.success) {
                    this.$message.success('保存成功')
                    this.getTable()
                    this.dialogFormVisible = false
                    this.$refs.operatorForm.clearValidate()
                  } else {
                    this.$message({
                      type: 'error',
                      message: res.msg,
                    })
                  }
                })
              }else {
                this.$message.error('请勿选择相同的岗位')
              }
            } else {
              this.$message.error('请选择一个主岗位')
            }
          } else {
            return false
          }
        })
      },
      closeDialog () {
        this.dialogFormVisible = false
        this.$nextTick(() => {
          this.$refs.operatorForm.clearValidate()
        })
      },
      changeDetSelect (key, treeData) {
        const arr = [] // 在递归时操作的数组
        let returnArr = [] // 存放结果的数组
        let depth = 0 // 定义全局层级
// 定义递归函数
        function childrenEach (childrenData, depthN) {
          for (let j = 0; j < childrenData.length; j++) {
            depth = depthN // 将执行的层级赋值 到 全局层级
            arr[depthN] = (childrenData[j].id)
            if (childrenData[j].id === key) {
              returnArr = arr.slice(0, depthN + 1) //将目前匹配的数组，截断并保存到结果数组，
              break
            } else {
              if (childrenData[j].children) {
                depth++
                childrenEach(childrenData[j].children, depth)
              }
            }
          }
          return returnArr
        }

        return childrenEach(treeData, depth)
      },
      download () {
        this.$refs.exportDialog.open({
          title: '导出文件',
          url: '/api/Operator/ExportExcel',
          columns: [
            { name: 'userNo', label: '员工工号' },
            { name: 'realName', label: '姓名' },
            { name: 'departmentName', label: '部门' },
            { name: 'roleName', label: '岗位' },
            { name: 'phoneNumber', label: '联系方式' },
            { name: 'statusName', label: '状态' },
            { name: 'realID', label: '身份证' },
            { name: 'entryDate', label: '入职时间' },
          ],
          params: {
            queryAdv1: '',
            query: this.search,
            departmentGuid: this.query.departmentGuid,
          },
        })
      },
      addRole () {
        this.form.roleGuids.push({ roleGuid: '' })
      },
      delRole (index) {
        this.form.roleGuids.splice(index, 1)
      },
      changeMainRole (val, index) {
        if (val) {
          this.form.roleGuids.forEach(res => {
            res.isMainRole = false
          })
          this.form.roleGuids[index].isMainRole = true
        }
      },
      handleSizeChange (val) {
        this.size = val
        this.getTable()
      },
      currentChange (val) {
        this.current = val
        this.getTable()
      },
      addDepartment () {
        if (this.selectId) {
          this.depForm = {
            parent: [],
            title: '',
          }
          this.depTitle = '添加'
          this.dialogDepartmentVisible = true
          this.$nextTick(() => {
            this.$refs.depForm.clearValidate()
          })
          this.depForm.parent = this.changeDetSelect(this.selectId, this.department)
          if (this.depForm.parent.length > 2) {
            this.depForm.parent.pop()
          }
        } else {
          this.$message.error('请先选择')
        }
      },
      saveDep () {
        this.$refs['depForm'].validate((valid) => {
          if (valid) {
            let parentGuid
            if (this.depForm.parent.length === 1) {
              parentGuid = this.depForm.parent[0]
            } else if (this.depForm.parent.length === 2) {
              parentGuid = this.depForm.parent[1]
            } else {
              parentGuid = this.depForm.parent[this.depForm.parent.length]
            }
            if (this.isEdit) {
              api.role.saveDepartment({
                department: {
                  id: this.selectId,
                  parentGuid: parentGuid,
                  title: this.depForm.title,
                },
              }).then((res) => {
                if (res.success) {
                  this.$message.success('修改成功')
                  this.getDepartment()
                  this.dialogDepartmentVisible = false
                  this.isEdit = false
                } else {
                  this.$message({
                    type: 'error',
                    message: res.msg,
                  })
                }
              })
            } else {
              api.role.saveDepartment({
                department: {
                  parentGuid: parentGuid,
                  title: this.depForm.title,
                },
              }).then((res) => {
                if (res.success) {
                  this.$message.success('添加成功')
                  this.getDepartment()
                  this.dialogDepartmentVisible = false
                  this.isEdit = false
                } else {
                  this.$message({
                    type: 'error',
                    message: res.data.msg,
                  })
                }
              })
            }
          }
        })
      },
      editDep () {
        if (this.selectId) {
          this.depTitle = '编辑'
          this.isEdit = true
          this.dialogDepartmentVisible = true
          this.$nextTick(() => {
            this.$refs.depForm.clearValidate()
          })
          this.depForm.parent = this.changeDetSelect(this.selectId, this.department)
          if (this.depForm.parent.length > 1) {
            this.depForm.parent.pop()
          }
          this.depForm.title = this.selectName
        } else {
          this.$message.error('请先选择')
        }
      },
      delDep () {
        if (this.selectId) {
          this.$confirm('此操作将永久删除该岗位, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          }).then(() => {
            api.role.delDep({ guid: this.selectId }).then((res) => {
              if (res.success) {
                this.getDepartment()
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
          this.$message.error('请先选择需要删除的岗位')
        }
      },
    },
    created () {
      this.getDepartment()
      this.getTable()
      this.getRole()
    },
  }
</script>

<style scoped lang="scss">
  .main {
    display: flex;
    height: 100%;
    text-align: left;
  }

  ::v-deep .el-tree {
    width: 100%;
    height: calc(100% - 42px);
    overflow: hidden;
  }


  ::v-deep .el-scrollbar__wrap {
    overflow-x: hidden;
  }

  .left {
    width: 15%;
    border-right: 1px solid #e6e6e6;
    min-width: 200px;
  }

  .tree-btn {
    display: flex;
    justify-content: space-between;
    text-align: center;
    height: 42px;
    padding: 10px 10px 0 10px;
    border-bottom: 1px solid #e6e6e6;
  }

  .tree-btn i:hover {
    color: #F5A623;
    cursor: pointer;
  }

  .table {
    width: 85%;
    min-width: 671px;
  }

  .input-with-select {
    margin: 10px 0 0 10px;
    width: 250px;
  }

  .mainTable {
    width: calc(100% - 10px);
    margin-left: 10px;
  }
</style>