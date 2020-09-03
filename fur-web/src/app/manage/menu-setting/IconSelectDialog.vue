<template>
  <el-dialog :title="$t('app.system.pages.menuSetting.selectPicture')"
             :visible.sync="dialogVisible" width="600px">
    <el-tabs v-model="activeName" v-loading="loading">
      <el-tab-pane v-for="(tab, idx) in imageList" :key="idx"
                   :label="tab.name" :name="tab.name">
        <div class="icon-grid">
          <div class="icon-item" v-for="(icon, iIdx) in tab.images" :key="iIdx"
               :title="icon.title">
            <img :src="icon.src" :alt="icon.title" @click="selectIcon(icon)">
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
    <input ref="manualInput" type="file" hidden accept="image/*" @change="handleFile">
    <span slot="footer" class="dialog-footer">
      <el-button type="success" icon="el-icon-upload" @click="manualUpload">
        {{ $t('app.system.pages.menuSetting.manualUpload') }}
      </el-button>
      <el-button type="primary" @click="close">{{ $t('app.system.close') }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import { api } from '@/api'

  export default {
    name: 'IconSelectDialog',
    data () {
      return {
        dialogVisible: false,
        imageList: [],
        activeName: '',
        loading: false,
      }
    },
    computed: {},
    methods: {
      manualUpload () {
        this.$refs.manualInput.click()
      },
      handleFile ({ target }) {
        const file = target.files[0]
        if (!file.type.startsWith('image/')) {
          return this.$message('Type invalid')
        }
        const reader = new FileReader()
        reader.onload = (e) => {
          this.$emit('select', { src: e.target.result })
          this.close()
        }
        reader.readAsDataURL(file)
      },
      selectIcon (icon) {
        this.$emit('select', icon)
        this.close()
      },
      open () {
        this.dialogVisible = true
        this.loading = true
        api.menu.getImages().then((data) => {
          this.imageList = data
          this.activeName = data[data.length - 1].name
          this.loading = false
        })
      },
      close () {
        this.dialogVisible = false
      },
    },
  }
</script>

<style scoped lang="scss">
  ::v-deep .el-dialog .el-dialog__body {
    padding-top: 0;
    padding-bottom: 20px;
    height: 400px;

    .el-tabs__content {
      height: 320px;
      overflow: auto;
    }
  }

  .icon-grid {
    display: flex;
    flex-wrap: wrap;
    height: 100%;

    .icon-item {
      flex: 0 0 50px;
      height: 50px;
      padding: 3px;

      img {
        object-fit: contain;
        width: 100%;
        height: 100%;
        cursor: pointer;

        &:hover {
          box-shadow: 0 0 1px 1px lightgray;
        }
      }
    }
  }
</style>
