<template>
  <el-dialog title="编辑尺码" v-loading="loading" :visible.sync="visible" width="540px"
             :before-close="handleDialogClose" @close="$emit('close')">
    <el-form inline>
      <el-form-item label="类型" size="small" label-width="96px">
        <el-input v-if="formData" disabled v-model="formData.type"></el-input>
      </el-form-item>
    </el-form>
    <el-form v-for="(size) in sizeList" :key="size.id" :model="size" inline label-width="96px">
      <el-form-item label="尺码" prop="size" size="small">
        <el-input v-model="size.size"></el-input>
      </el-form-item>
      <el-form-item size="small" class="btn-item">
        <el-button size="small" type="primary" @click="save(size)">保存</el-button>
        <el-button size="small" type="danger" @click="remove(size)">删除</el-button>
      </el-form-item>
    </el-form>
    <el-form inline label-width="96px">
      <el-form-item label="新尺码" prop="size" size="small">
        <el-input v-model="sizeNew" placeholder="请输入新尺码"></el-input>
      </el-form-item>
      <el-form-item size="small" class="btn-item">
        <el-button size="small" type="success" @click="addNew">添加</el-button>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close" size="small">{{ $t('common.close') }}</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { api } from '@/api'
import { sizeEditFormFields } from '@/app/basic/size/size.config'
import { translates } from '@/lang/i18n'

export default {
  name: 'SizeEditDialog',

  data () {
    return {
      visible: false,
      loading: false,
      formData: null,
      sizeList: [],
      sizeNew: '',
      sizeEditFormFields,
    }
  },

  methods: {
    open (formData) {
      this.formData = formData
      this.visible = true
      this.loading = true
      this.getDetails()
    },
    close () {
      this.visible = false
    },
    handleDialogClose (done) {
      this.$confirm(translates('common.confirmClose')).then(done || this.close).catch(() => {
        // pass
      })
    },
    getDetails () {
      return api.size.getAll(this.formData.type).then(data => {
        this.sizeList = data || []
      }).finally(() => {
        this.loading = false
      })
    },
    addNew () {
      this.save({
        type: this.formData.type,
        size: this.sizeNew,
      }).then(() => {
        this.getDetails().then(() => {
          this.sizeNew = ''
        })
      })
    },
    save (size) {
      return api.size.update(size)
    },
    remove (size) {
      return api.size.delete(size.id).then(() => {
        const idx = this.sizeList.findIndex(s => s === size)
        this.sizeList.splice(idx, 1)
      })
    },
  },
}
</script>

<style scoped>
.btn-item {
  margin-left: 24px;
}
</style>