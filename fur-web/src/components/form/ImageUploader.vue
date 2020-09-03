<template>
  <el-upload ref="uploader" class="image-uploader"
             :action="action"
             :data="data"
             :file-list="fileList"
             :list-type="listType"
             :show-file-list="showFileList"
             :on-success="handleImageSuccess"
             :on-remove="handleImageRemove"
             :on-change="handleImageChange"
             :before-upload="beforeUpload">
    <img v-if="showSinglePreview" :src="value" class="image-preview" :style="imgStyles">
    <i v-else class="el-icon-plus uploader-icon" :style="iconStyles"></i>
  </el-upload>
</template>

<script>
export default {
  name: 'ImageUpload',

  props: {
    value: {},
    action: String,
    onSuccess: Function,
    onRemove: Function,
    beforeUpload: Function,
    size: {
      default: '128px',
    },
    data: {},
    fileList: {},
    listType: {
      default: 'text',
    },
  },

  computed: {
    imgStyles () {
      return {
        width: this.size,
        height: this.size,
      }
    },
    iconStyles () {
      return {
        ...this.imgStyles,
        lineHeight: this.size,
      }
    },
    showFileList () {
      return Boolean(this.listType === 'picture-card')
    },
    showSinglePreview () {
      return this.value && !this.showFileList
    },
  },

  methods: {
    handleImageChange (file, fileList) {
      if (typeof this.onChange === 'function') {
        this.onChange(file, fileList)
      }
    },
    async handleImageSuccess (resp, file, fileList) {
      if (typeof this.onSuccess === 'function') {
        const val = await this.onSuccess(resp, file, fileList)
        this.$emit('input', val)
      } else {
        this.$emit('input', resp)
      }
    },
    async handleImageRemove (file, fileList) {
      if (typeof this.onRemove === 'function') {
        const val = await this.onRemove(file, fileList)
        this.$emit('input', val)
      } else {
        this.$emit('input', null)
      }
    },
    clearFiles () {
      this.$refs.uploader.clearFiles()
    },
  },
}
</script>

<style scoped lang="scss">
.image-uploader ::v-deep .el-upload {
  border: 1px dashed #D9D9D9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  &:hover {
    border-color: #409EFF;
  }
}

.uploader-icon {
  font-size: 28px;
  color: #8c939d;
  text-align: center;
}

.image-preview {
  display: block;
}
</style>