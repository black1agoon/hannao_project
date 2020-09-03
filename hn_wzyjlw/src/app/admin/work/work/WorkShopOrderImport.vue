<template>
  <div>
    <eui-window ref="window"
                :options="windowOptions">
      <el-form v-loading="loading" class="clearfix" ref="form" :model="formdata" label-width="110px" :rules="rules"
               style="padding: 20px;display: block">
        <el-col :sm="24" v-for="(item, index) in FORM_INFO" :key="index">
          <el-form-item :label="item.name" :prop="item.value">
            <template v-if="item.value === 'file'" style="display: flex">
              <el-input
                style="width: calc(100% - 150px)"
                v-model="formdata[item.value]"
                :readonly="true"
                size="small">
              </el-input>
              <el-upload
                class="btn-upload"
                ref="upload"
                action=""
                :show-file-list="false"
                :auto-upload="false"
                :http-request="uploadFile"
                :on-change="handleChange"
                :before-upload="beforeUpload">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
              </el-upload>
              <span class="temp" @click="getTemplate">获取模板</span>
            </template>
            <div v-else-if="item.value === 'pictures'">
              <div class="piclist">
                <div class="pic-wrapper" v-for="(pic, index) in formdata.pictures" :key="index">
                  <div class="pic">
                    <img :src="helper.getImgUrl(pic)" @click="showBigpic(helper.getImgUrl(pic))">
                    <!--<img :src="pic" @click="showBigpic(pic)">-->
                    <span class="el-icon-close delete" @click="formFunctions('pictures','deletePic', index)"></span>
                  </div>
                </div>
              </div>
              <el-button size="small" type="primary" @click="formFunctions('pictures', 'multiUpload')">批量上传</el-button>
            </div>
            <eui-input v-else v-model="formdata[item.value]"
                       :type="item.type"
                       :readonly="item.readonly"
                       :suffixIcon="item.suffixIcon"
                       :options="formOptions[item.value]"
                       :autosize="item.autosize"
                       @suffixClick="formFunctions(item.value, 'suffixClick')">
            </eui-input>
          </el-form-item>
        </el-col>
      </el-form>
      <div slot="btns">
        <el-button type="primary" size="small" @click="sure">导入</el-button>
        <el-button size="small" @click="cancel">关闭</el-button>
      </div>
    </eui-window>
    <work-shop-chose-window ref="workshop">
    </work-shop-chose-window>
    <pic-looking-mask
      ref="piclook"
      :src="showPicUrl">
    </pic-looking-mask>
    <multi-pic-upload ref="multipic">
    </multi-pic-upload>
  </div>
</template>

<script>
  import api from '@/api'
  import config from '@/config'
  import helper from '@/app/app.helpers'
  import EuiWindow from '@/components/common/form/EuiWindow'
  import EuiInput from '@/components/common/form/EuiInput'
  import WorkShopChoseWindow from '@/app/admin/common/WorkShopChoseWindow'
  import MultiPicUpload from '@/app/admin/tools/MultiPicUpload'

  const FORM_INFO = [{
    name: '模板文件',
    value: 'file'
  }, {
    name: '所属车间',
    value: 'workshopName',
    readonly: true,
    suffixIcon: 'fa fa-search'
  }, {
    name: '是否缝头',
    value: 'isSameExit',
    type: 'ratio'
  }, {
    name: '开始时间',
    value: 'startDate',
    type: 'date'
  }, {
    name: '交货日期',
    value: 'deliveryDate',
    type: 'date'
  }, {
    name: '关联图片',
    value: 'pictures'
  }]
  const FORM_DATA = {
    file: null,
    workshopId: null,
    workshopName: null,
    orderNumber: null,
    articleNumber: null,
    startDate: null,
    planDate: null,
    isSameExit: 0,
    deliveryDate: null,
    pictures: []
  }
  export default {
    name: 'work-shop-order-import',
    components: {
      EuiWindow,
      EuiInput,
      WorkShopChoseWindow,
      MultiPicUpload
    },
    data() {
      return {
        helper,
        loading: false,
        showPicUrl: null,
        serverURI: config.serverURI,
        FORM_INFO,
        formdata: {...FORM_DATA},
        formOptions: {
          isSameExit: [{
            label: '缝头',
            value: 0
          }, {
            label: '不缝头',
            value: 1
          }]
        },
        rules: {
          file: [{
            required: true, message: '请选取模板文件', trigger: 'change'
          }]
        },
        windowOptions: {
          title: '导入模板',
          width: '480px'
        }
      }
    },
    methods: {
      open() {
        this.formdata = {...FORM_DATA}
        this.$refs.window.open()
      },
      uploadFile(params) {
        this.loading = true
        let data = new FormData()
        data.append('file', params.file)
        data.append('workshopId', this.formdata.workshopId)
        data.append('articleNumber', this.formdata.articleNumber)
        data.append('orderNumber', this.formdata.orderNumber)
        data.append('planDate', this.formdata.planDate)
        data.append('startDate', this.formdata.startDate)
        data.append('deliveryDate', this.formdata.deliveryDate)
        data.append('pictures', this.formdata.pictures)
        data.append('isSameExit', this.formdata.isSameExit)
        api.workshopOrder.importTemplate(data).then((data) => {
          this.loading = false
          this.$message({
            message: '产品信息导入成功!',
            type: 'success'
          })
          this.$refs.window.cancel()
          this.$parent.$emit('reload')
        }).catch(() => {
          this.loading = false
        })
      },
      sure() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.$refs.upload[0].submit()
          }
        })
      },
      cancel() {
        this.$refs.window.cancel()
      },
      handleChange(file, fileList) {
        this.formdata.file = file.name
      },
      beforeUpload(file) {
        return file.name === this.formdata.file
      },
      formFunctions(val, method, ...args) {
        let funs = {
          workshopName: {
            suffixClick: () => {
              this.$refs.workshop.open('form')
            }
          },
          pictures: {
            multiUpload: () => {
              this.$refs.multipic.open()
            },
            deletePic: (...args) => {
              this.$confirm(`是否删除该图？`, '提示', {
                iconClass: 'fa fa-question-circle'
              }).then(() => {
                this.formdata.pictures.splice(args[0], 1)
              }).catch(() => {
              })
            }
          }
        }
        funs[val][method].call(this, ...args)
      },
      getTemplate() {
        window.open(this.serverURI + api.workshopOrder.getTemplate())
      },
      showBigpic(url) {
        this.showPicUrl = url
        this.$refs.piclook.show()
      }
    },
    created() {
      this.$on('workshop', (node, from) => {
        if (from === 'form') {
          this.formdata.workshopName = node.name
          this.formdata.workshopId = node.id
        }
      })
      this.$on('uploadlists', lists => {
        this.formdata.pictures = this.formdata.pictures.concat(lists)
      })
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .btn-upload
    width: 80px
    display: inline-block

  .temp
    cursor: pointer
    text-decoration: underline
    color: #606266

  .piclist
    display: flex
    flex-wrap: wrap
    width: 900px
    .pic-wrapper
      width: 50px
      text-align: center
      margin: 10px 10px 10px 0
      position: relative
      .el-input
        width: 150px
        margin-top: 10px
      .pic
        &:hover
          img, .delete
            opacity: 1
        img
          display: block
          border: 1px solid #e4e7ed
          box-sizing: border-box
          padding: 2px
          width: 50px
          height: 50px
          opacity: 0.8
          transition: all 0.5s
        .delete
          position: absolute
          top: -5px
          right: -5px
          width: 20px
          height: 20px
          display: block
          font-size: 20px
          color: #fff
          transition: all 0.5s
          cursor: pointer
          opacity: 0
          border-radius: 50%
          background: rgba(38, 38, 38, 0.5)
          text-align: right
          vertical-align: top

  .is-success
    .el-input__inner
      border: 1px solid #dcdfe6 !important

  .el-form-item.is-success
    .el-textarea__inner
      border: 1px solid #dcdfe6 !important
</style>
