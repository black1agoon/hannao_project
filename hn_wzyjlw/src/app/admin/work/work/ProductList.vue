<template>
  <div class="table-wrapper">
    <table class="table">
      <tr>
        <td class="first-cell"></td>
        <td class="title" v-for="(size, index) in productList.sizes"
            :key="index"
            @click="setEditColumn(index, size)">
          <el-input v-if="editColumnIndex === index" size="small" v-model="editValue"></el-input>
          <span v-else>{{size.value}}</span>
          <span v-if="editCell.row.index === null && editColumnIndex === null && editRowIndex === null" class="delete el-icon-remove-outline" @click.stop.prevent="deleteColumn(size)"></span>
        </td>
      </tr>
      <tr v-for="(name, index) in productList.names"
          :key="index">
        <td class="title" @click="setEditRow(index, name)">
          <el-input v-if="editRowIndex === index" size="small" v-model="editValue"></el-input>
          <span v-else>{{name.value}}</span>
          <span v-if="editCell.row.index === null && editColumnIndex === null && editRowIndex === null" class="delete el-icon-remove-outline" @click.stop.prevent="deleteRow(name)"></span>
        </td>
        <td class="value" v-for="(val, idx) in productList.values[index]"
            @click="setEditCell(val.value, name.id, productList.sizes[idx].id, index, idx)"
            :key="idx">
          <el-input v-if="isEditing(index, idx)" size="small" v-model="editValue"></el-input>
          <span v-else>{{val.value}}</span>
        </td>
      </tr>
    </table>
    <div class="column-add" v-if="workshopOrderId">
      <table class="">
        <tr>
          <td>
            <span v-if="editColumnIndex === null"
                  @click="addColumn"
                  class="icon-add el-icon-circle-plus-outline">
            </span>
            <template v-else>
              <el-button
                class="save"
                size="mini"
                type="success"
                @click="saveColumnEdit">
                保存
              </el-button>
              <el-button
                class="cancel"
                size="mini"
                type="info"
                @click="cancelColumnEdit">
                取消
              </el-button>
            </template>
          </td>
        </tr>
        <tr v-for="(i, index) in productList.names.length"
            :key="index">
          <td v-if="editCell.row.index === index">
            <el-button
              class="save"
              size="mini"
              type="success"
              @click="saveCellEdit">
              保存
            </el-button>
            <el-button
              class="cancel"
              size="mini"
              type="info"
              @click="cancelCellEdit">
              取消
            </el-button>
          </td>
          <td v-else></td>
        </tr>
      </table>
    </div>
    <div class="row-add" v-if="workshopOrderId">
      <span v-if="editRowIndex === null"
            @click="addRow"
            class="icon-add el-icon-circle-plus-outline">
      </span>
      <template v-else>
        <el-button
          class="save"
          size="mini"
          type="success"
          @click="saveRowEdit">
          保存
        </el-button>
        <el-button
          class="cancel"
          size="mini"
          type="info"
          @click="cancelRowEdit">
          取消
        </el-button>
      </template>
    </div>
  </div>
</template>

<script>
  import MainToolbar from '@/components/common/tools/MainToolbar'
  import helper from '@/app/app.helpers'
  import api from '@/api'

  const EDITCELL = {
    row: {
      index: null,
      id: null
    },
    column: {
      index: null,
      id: null
    }
  }
  export default {
    name: 'product-list',
    components: {
      MainToolbar
    },
    props: {
      buttons: {
        type: Array,
        default: () => []
      },
      dataList: {
        type: Object,
        default: () => ({})
      },
      workshopOrderId: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        helper,
        productList: {
          names: [],
          sizes: [],
          values: []
        },
        editValue: null,
        editId: null,
        editCell: JSON.parse(JSON.stringify(EDITCELL)),
        editColumnIndex: null,
        editRowIndex: null
      }
    },
    methods: {
      setEditCell(val, rid, cid, ridx, cidx) {
        if (this.editColumnIndex !== null || this.editRowIndex !== null || (this.editCell.row.index !== null && this.editCell.row.index !== ridx) || (this.editCell.column.index !== null && this.editCell.column.index !== cidx)) {
          this.$message.warning('请先保存当前编辑项')
          return false
        }
        this.editCell.row.index = ridx
        this.editCell.row.id = rid
        this.editCell.column.index = cidx
        this.editCell.column.id = cid
        this.editValue = val
      },
      setEditRow(ridx, row) {
        if (this.editValue !== null && this.editRowIndex !== ridx) {
          this.$message.warning('请先保存当前编辑项')
          return false
        }
        this.editRowIndex = ridx
        this.editValue = row.value
        this.editId = row.id
      },
      setEditColumn(cidx, column) {
        if (this.editValue !== null && this.editColumnIndex !== cidx) {
          this.$message.warning('请先保存当前编辑项')
          return false
        }
        this.editColumnIndex = cidx
        this.editValue = column.value
        this.editId = column.id
      },
      isEditing(ridx, cidx) {
        return this.editCell.row.index === ridx && this.editCell.column.index === cidx
      },
      saveCellEdit() {
        api.workshopOrderEndProduct.update({
          name: this.editCell.row.id,
          size: this.editCell.column.id,
          value: this.editValue,
          workshopOrderId: this.workshopOrderId
        }).then(() => {
          this.$message({
            message: '编辑成功!',
            type: 'success'
          })
          this.editCell = JSON.parse(JSON.stringify(EDITCELL))
          this.editValue = null
          this.$emit('reload')
        }).catch(() => {
          this.editCell = JSON.parse(JSON.stringify(EDITCELL))
          this.editValue = null
        })
      },
      cancelCellEdit() {
        this.editCell = JSON.parse(JSON.stringify(EDITCELL))
        this.editValue = null
      },
      saveColumnEdit() {
        if (this.editId) {
          api.workshopOrderEndProduct.updateSize({
            name: this.editValue,
            id: this.editId
          }).then(() => {
            this.$message({
              message: '编辑成功!',
              type: 'success'
            })
            this.editColumnIndex = null
            this.editValue = null
            this.editId = null
            this.$emit('reload')
          }).catch(() => {
            this.editColumnIndex = null
            this.editValue = null
            this.editId = null
          })
        } else {
          api.workshopOrderEndProduct.addSize({
            name: this.editValue,
            workshopOrderId: this.workshopOrderId
          }).then(() => {
            this.$message({
              message: '新增成功!',
              type: 'success'
            })
            this.editColumnIndex = null
            this.editValue = null
            this.editId = null
            this.$emit('reload')
          }).catch(() => {
            this.editColumnIndex = null
            this.editValue = null
            this.editId = null
          })
        }
      },
      cancelColumnEdit() {
        if (!this.editId) {
          this.productList.sizes.pop()
          this.productList.values.forEach(row => {
            row.pop()
          })
        }
        this.editColumnIndex = null
        this.editValue = null
        this.editId = null
      },
      saveRowEdit() {
        if (this.editId) {
          api.workshopOrderEndProduct.updateName({
            name: this.editValue,
            id: this.editId
          }).then(() => {
            this.$message({
              message: '编辑成功!',
              type: 'success'
            })
            this.editRowIndex = null
            this.editValue = null
            this.editId = null
            this.$emit('reload')
          }).catch(() => {
            this.editRowIndex = null
            this.editValue = null
            this.editId = null
          })
        } else {
          api.workshopOrderEndProduct.addName({
            name: this.editValue,
            workshopOrderId: this.workshopOrderId
          }).then(() => {
            this.$message({
              message: '新增成功!',
              type: 'success'
            })
            this.editRowIndex = null
            this.editValue = null
            this.editId = null
            this.$emit('reload')
          }).catch(() => {
            this.editRowIndex = null
            this.editValue = null
            this.editId = null
          })
        }
      },
      cancelRowEdit() {
        if (!this.editId) {
          this.productList.names.pop()
          this.productList.values.pop()
        }
        this.editValue = null
        this.editRowIndex = null
        this.editId = null
      },
      addColumn() {
        this.productList.sizes.push('')
        this.productList.values.forEach(row => {
          row.push('')
        })
        this.editColumnIndex = this.productList.sizes.length - 1
        this.editValue = ''
      },
      addRow() {
        this.productList.names.push('')
        this.productList.values[this.productList.values.length] = this.productList.sizes.map(s => '')
        this.editRowIndex = this.productList.names.length - 1
        this.editValue = ''
      },
      deleteColumn(size) {
        this.$confirm(`是否删除尺寸: ${size.value}(整列)？`, '提示', {
          iconClass: 'fa fa-question-circle'
        }).then(() => {
          api.workshopOrderEndProduct.deleteSize({
            sizeId: size.id,
            orderId: this.workshopOrderId
          }).then(() => {
            this.$message({
              message: '删除成功!',
              type: 'success'
            })
            this.$emit('reload')
          })
        })
      },
      deleteRow(name) {
        this.$confirm(`是否删除名称: ${name.value}(整行)？`, '提示', {
          iconClass: 'fa fa-question-circle'
        }).then(() => {
          api.workshopOrderEndProduct.deleteName({
            nameId: name.id,
            orderId: this.workshopOrderId
          }).then(() => {
            this.$message({
              message: '删除成功!',
              type: 'success'
            })
            this.$emit('reload')
          })
        })
      }
    },
    mounted() {
    },
    watch: {
      'dataList'() {
        this.productList = this.dataList
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .table-wrapper
    margin-left: 20px
    height: 100%
    overflow-y: auto
    .table
      float: left
      .first-cell
        background-image: url("../../../../assets/img/pdtable.png")
        background-size: 100px 38px
        background-repeat: no-repeat
      tr
        border-bottom: 1px solid #eee
        td
          width: 100px
          height: 38px
          line-height: 38px
          text-align: center
        .title
          position: relative
          &:hover
            .delete
              display: block
          span
            font-size: 12px
            font-weight: bold
          .delete
            position: absolute
            font-size: 15px
            color: #dd5145
            top: 0
            right: 0
            cursor: pointer
            display: none
        .value
          font-size: 12px
    .column-add
      float: left
      width: 100px
      height: 38px
      line-height: 38px
      text-align: center
      table
        width: 100px
        td
          width: 100px
          height: 40px
          line-height: 40px
          text-align: center
          span
            font-size: 20px
            cursor: pointer
            display: inline-block
          .save, .cancel
            padding: 6px 9px
          .cancel
            margin-left: 0
    .row-add
      clear: both
      width: 100px
      height: 40px
      line-height: 40px
      text-align: center
      span
        font-size: 20px
        cursor: pointer
        display: inline-block
      .save, .cancel
        padding: 6px 9px
      .cancel
        margin-left: 0
</style>
