<template>
  <eui-window ref="window"
              :options="windowOptions">
    <el-form class="form clearfix" ref="form" :model="formdata" label-width="110px" :rules="rules" style="padding: 20px">
      <el-col :sm="item.sm || 8" v-for="(item, index) in forminfo" :key="index">
        <el-form-item :label="item.name" :prop="item.value">
          <div class="input-item">
            <div class="explain">
              <el-tooltip popper-class="tooltip" v-show="item.explain" :content="item.explain"
                          placement="bottom-start" effect="light">
                <div class="el-icon-question"></div>
              </el-tooltip>
            </div>
            <div class="input">
              <eui-input
                  v-if="item.value !== 'checkPictures'"
                  v-model="formdata[item.value]"
                 :type="item.type"
                 :readonly="item.readonly"
                 :placeholder="item.placeholder"
                 :options="formOptions[item.value]"
                 :autosize="item.autosize"
                 :disabled="item.disabled"
                 :unit="item.unit">
              </eui-input>
              <div class="image-wrapper" v-else>
                <div class="piclist">
                  <div class="pic-wrapper" v-for="(pic, index) in getPictures" :key="index">
                    <div class="pic">
                      <img :src="helper.getImgUrl(pic)" @click="showBigpic(helper.getImgUrl(pic))">
                      <span class="el-icon-close delete" @click="deletePic(index)"></span>
                    </div>
                  </div>
                  <el-upload
                      ref="upload"
                      :multiple="true"
                      class="avatar-uploader"
                      action=""
                      :show-file-list="false"
                      :http-request="uploadFile">
                    <i class="el-icon-plus"></i>
                  </el-upload>
                </div>
              </div>
            </div>
          </div>
        </el-form-item>
      </el-col>
    </el-form>
    <eui-table
        class="table"
        ref="table"
        :showIndex="false"
        :showSelection="false"
        :showPagination="false"
        :highlight-current-row="false"
        :options="tableOptions">
    </eui-table>
    <pic-looking-mask
        ref="piclook"
        :src="showPicUrl">
    </pic-looking-mask>
    <div slot="btns">
      <el-button type="primary" size="small" @click="sure">确定</el-button>
      <el-button size="small" @click="cancel">关闭</el-button>
    </div>
  </eui-window>
</template>

<script>
  import EuiWindow from '@/components/common/form/EuiWindow'
  import EuiInput from '@/components/common/form/EuiInput'
  import EuiTable from '@/components/common/form/EuiTable'
  import {DOCHECK} from '../../asset.config'
  import api from '@/api'
  import helper from '@/app/app.helpers'
  import PicLookingMask from '@/app/tools/PicLookingMask'
  export default {
    name: 'asset-check-do-step2-window',
    props: {
    },
    components: {
      EuiTable,
      EuiInput,
      EuiWindow,
      PicLookingMask
    },
    computed: {
      getPictures() {
        return this.formdata.checkPictures ? this.formdata.checkPictures.split(',') : []
      }
    },
    data() {
      return {
        helper,
        user: this.$store.state.user,
        forminfo: DOCHECK.FORM_INFO,
        formdata: {...DOCHECK.FORM_DATA},
        formOptions: Object.assign(DOCHECK.FORM_OPTIONS),
        rules: DOCHECK.RULES,
        windowOptions: {
          title: '执行盘点任务',
          width: '1000px'
        },
        tableOptions: {
          data: [],
          total: 0,
          columns: [
            {prop: 'assetStatusName', label: '资产状态'},
            {prop: 'assetCode', label: '资产编码'},
            {prop: 'assetName', label: '资产名称'},
            {prop: 'typename', label: '资产类别'},
            {prop: 'addTimeStr', label: '入库时间'},
            {prop: 'departmentName', label: '使用部门'},
            {prop: 'username', label: '使用人'}
          ],
          handleSelectionChange: val => {
            this.tableRowsSelect = val.map(v => v.assetId)
          }
        },
        tableRowsSelect: [],
        dtoList: [],
        showPicUrl: null
      }
    },
    methods: {
      open(list) {
        this.formdata.checkUser = this.$store.state.user.id
        this.formdata.checkUserName = this.$store.state.user.name
        this.tableOptions.data = list.map(l => l.agencyAssetDto)
        this.dtoList = list
        this.$refs.window.open()
        this.$nextTick(() => {
          this.$refs.form.resetFields()
        })
      },
      sure() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.dtoList.forEach(dto => {
              dto.checkResult = this.formdata.checkResult
              dto.checkUser = this.formdata.checkUser
              dto.remark = this.formdata.remark
              dto.checkPictures = this.formdata.checkPictures
            })
            // console.log(this.dtoList)
            api.assetCheck.doCheck(this.dtoList).then(() => {
              this.$message({
                message: '盘点成功!',
                type: 'success'
              })
              this.$emit('cancel')
              this.$refs.window.cancel()
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      cancel() {
        this.$refs.window.cancel()
      },
      deletePic(index) {
        console.log(index)
        this.$confirm(`是否删除该图？`, '提示', {
          iconClass: 'fa fa-question-circle'
        }).then(() => {
          let piclist = this.formdata.checkPictures ? this.formdata.checkPictures.split(',') : []
          piclist.splice(index, 1)
          this.formdata.checkPictures = piclist.join(',')
        }).catch(() => {
        })
      },
      showBigpic(url) {
        this.showPicUrl = url
        this.$refs.piclook.show()
      },
      uploadFile(params) {
        let isJpg = params.file.type === 'image/jpeg'
        let isPng = params.file.type === 'image/png'
        if (isJpg || isPng) {
          api.assetController.uploadPic(params.file).then(data => {
            let piclist = this.formdata.checkPictures ? this.formdata.checkPictures.split(',') : []
            this.formdata.checkPictures = piclist.concat(data.path).join(',')
          })
        } else {
          this.$message.error('上传图片只能是 JPG或者PNG 格式!')
        }
      }
    },
    watch: {
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .explain
    flex: none !important
  .input
    span
      margin-left: 10px
      line-height: 32px

  .asset-choose
    width: 100%
    .button
      margin: 0 10px 10px
    .chosenum
      font-size: 12px
      font-weight: bold
      margin-right: 10px
      display: inline-block
      float: right
      line-height: 28px

  .table
    min-height: 300px
    /deep/ .el-table
      .cell
        line-height: 30px !important


  .image-wrapper
    height: 120px
    overflow-y: auto
    .piclist
      display: flex
      flex-wrap: wrap
      width: 800px
      .pic-wrapper
        width: 100px
        margin: 5px
        text-align: center
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
            width: 100px
            height: 100px
            opacity: 0.8
            transition: all 0.5s
          .delete
            position: absolute
            top: -5px
            right: -5px
            width: 20px
            height: 20px
            line-height: 20px
            display: block
            font-size: 16px
            color: #fff
            transition: all 0.5s
            cursor: pointer
            opacity: 0
            border-radius: 50%
            background: rgba(38, 38, 38, 0.5)
            text-align: center

      .avatar-uploader
        width: 100px
        height: 100px
        border: 1px dashed #d9d9d9
        border-radius: 5px
        margin: 5px
        &:hover
          border: 1px dashed #409eff
    /deep/ .el-upload
      width: 100px
      height: 100px
      line-height: 100px
</style>