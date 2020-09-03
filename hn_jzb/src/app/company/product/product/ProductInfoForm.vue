<template>
  <div class="form-wrapper">
    <div class="step-wrapper">
      <el-steps :active="active" align-center>
        <el-step title="填写产品详情" icon="el-icon-edit" @click.native="setActiveStep(0)">
        </el-step>
        <el-step title="编辑产品属性" icon="el-icon-upload" @click.native="setActiveStep(1)">
        </el-step>
        <el-step title="上传产品图片" icon="el-icon-picture" @click.native="setActiveStep(2)">
        </el-step>
      </el-steps>
    </div>
    <div v-show="active === 0">
      <div class="form-box">
        <eui-tips>
          <ul>
            <li>标识"<em>*</em>"的选项为必填项，其余为选填项</li>
            <li>产品基本信息，请谨慎填写信息</li>
          </ul>
        </eui-tips>
        <el-form class="form2 clearfix" ref="form1" :model="formdata" label-width="130px" :rules="RULES.rules1">
          <el-col :sm="24" v-for="(item, index) in FORM_INFO.form1" :key="index">
            <el-form-item :label="item.name" :prop="item.value">
              <!--<vue-editor style="width: 95%" v-if="item.value === 'memo'" v-model="formdata.memo"-->
                          <!--useCustomImageHandler-->
                          <!--@imageAdded="(...args) => {formFunctions('memo', 'handleImageAdded', ...args)}">-->
              <!--</vue-editor>-->
              <eui-editor v-if="item.value === 'memo'"
                          :upload-pic="uploadPic"
                          :upload-video="uploadVideo"
                          v-model="formdata.memo"
                          style="width: 95%">
              </eui-editor>
              <eui-input v-else v-model="formdata[item.value]"
                         :type="item.type"
                         :unit="item.unit"
                         :readonly="item.readonly"
                         :suffixIcon="item.suffixIcon"
                         :options="formOptions[item.value]"
                         :autosize="item.autosize"
                         :appendicon="item.appendicon"
                         @suffixClick="formFunctions(item.value, 'suffixClick')">
              </eui-input>
              <span v-if="item.notic" class="notic">{{item.notic}}</span>
            </el-form-item>
          </el-col>
        </el-form>
      </div>
    </div>
    <div v-show="active === 1">
      <div class="form-box">
        <el-form class="form2 clearfix" ref="form2" :model="formdata" label-width="130px" :rules="RULES.rules2">
          <el-col :sm="24" v-for="(item, index) in FORM_INFO.form2" :key="index">
            <el-form-item :label="item.name" :prop="item.value">
              <eui-input v-model="formdata[item.value]"
                         :type="item.type"
                         :readonly="item.readonly"
                         :suffixIcon="item.suffixIcon"
                         :options="formOptions[item.value]"
                         :autosize="item.autosize"
                         @input="(val) => {formFunctions(item.value, 'handleChange', val)}">
              </eui-input>
              <span v-if="item.notic" class="notic">{{item.notic}}</span>
            </el-form-item>
          </el-col>

          <el-col :sm="24" v-for="item in attrform.forminfo" :key="item.value">
            <el-form-item :label="item.name">
              <eui-input v-model="attrform.formdata[item.value].attrValue"
                         :type="item.type"
                         :clearable="true"
                         :options="attrform.formoptions[item.value]"
                         @input="(val) => {formFunctions('attrChange', 'handleChange')}">
              </eui-input>
              <span class="seq">排序</span>
              <eui-input style="width: 100px"
                         v-model="attrform.formdata[item.value].seq"
                         @input="(val) => {formFunctions('attrChange', 'handleChange')}">
              </eui-input>
            </el-form-item>
          </el-col>
        </el-form>
      </div>
    </div>
    <div v-show="active === 2">
      <div class="form-box">
        <el-form class="form2 clearfix" ref="form3" :model="formdata" label-width="150px" :rules="RULES.rules3">
          <el-col :sm="24" v-for="(item, index) in FORM_INFO.form3" :key="index">
            <el-form-item :label="item.name" :prop="item.value">
              <template v-if="item.value === 'videoUrl'">
                <div v-if="formdata.videoPic" class="video-player">
                  <img class="video-pic" :src="helper.getImgUrl(formdata.videoPic)">
                  <span class="player fa fa-play-circle-o" @click="formOptions.videoUrl.openVideo"></span>
                  <span class="el-icon-close delete" @click="formFunctions('videoUrl','deleteVideo')"></span>
                </div>
                <el-upload
                  class="btn-upload"
                  ref="upload"
                  action=""
                  :show-file-list="false"
                  :before-upload="formOptions.videoUrl.beforeUpload"
                  :http-request="formOptions.videoUrl.uploadVideo">
                  <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                </el-upload>
              </template>
              <el-upload
                v-else-if="item.value === 'thumb'"
                class="avatar-uploader"
                action=""
                :show-file-list="false"
                :http-request="formOptions.thumb.uploadFile">
                <img v-if="helper.getImgUrl(formdata.thumb)" :src="helper.getImgUrl(formdata.thumb)" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <div v-else-if="item.value === 'reports'">
                <div class="piclist">
                  <div class="pic-wrapper" v-for="(pic, index) in formdata.reports" :key="index">
                    <div class="pic">
                      <img :src="helper.getImgUrl(pic)">
                      <span class="el-icon-close delete" @click="formFunctions('reports','deletePic', index)"></span>
                    </div>
                  </div>
                </div>
                <el-button size="small" type="primary" @click="formFunctions('reports', 'multiUpload')">批量上传</el-button>
              </div>
              <div v-else-if="item.value === 'banner'">
                <div class="piclist">
                  <div class="pic-wrapper" v-for="(pic, index) in formdata.banner" :key="index">
                    <div class="pic">
                      <img :src="helper.getImgUrl(pic.url)" @click="formFunctions('banner','setMainPic', index)">
                      <span class="el-icon-close delete" @click="formFunctions('banner','deletePic', index)"></span>
                      <span v-show="pic.main === 1" class="main-pic">主</span>
                    </div>
                    <el-input v-model="pic.seq" type="number" placeholder="排序"></el-input>
                  </div>
                </div>
                <el-button size="small" type="primary" @click="formFunctions('banner', 'multiUpload')">批量上传</el-button>
                <el-button v-show="formdata.banner.length > 0" size="small" type="primary"
                           @click="formFunctions('banner', 'picsSort')">整理排序
                </el-button>
              </div>
              <span v-if="item.notic" class="notic">{{item.notic}}</span>
            </el-form-item>
          </el-col>
        </el-form>
      </div>
    </div>
    <div class="form-btns">
      <div class="btns-wrapper">
        <div class="wrap">
          <el-button type="default" v-if="active === 1 || active === 2" @click="prev">上一步</el-button>
          <el-button type="primary" v-if="active === 0 || active === 1" @click="next">下一步</el-button>
          <el-button type="primary" v-if="active === 2" @click="submitForm">提交</el-button>
        </div>
      </div>
    </div>
    <multi-pic-upload ref="multiUpload">
    </multi-pic-upload>
    <product-brand-chose-window ref="brandWindow">
    </product-brand-chose-window>
    <video-show-mask
      ref="videoWindow"
      :src="formdata.videoUrl">
    </video-show-mask>
  </div>
</template>

<script>
  import api from '@/api'
  import {mapState} from 'vuex'
  import helper from '@/app/app.helpers'
  import TabPane from '@/components/views/TabPane'
  import EuiInput from '@/components/common/form/EuiInput'
  import EuiTips from '@/components/common/tools/EuiTips'
  import {PRODUCT} from '../product.config'
  import ProductBrandChoseWindow from '@/app/company/common/ProductBrandChoseWindow'
  import MultiPicUpload from './MultiPicUpload'
  import VideoShowMask from '@/app/header/VideoShowMask'
  import EuiEditor from '@/components/common/form/EuiEditor'
  export default {
    name: 'company-product-info-form',
    _meta: {
      path: '/company/product/infoform',
      title: ''
    },
    mixins: [TabPane],
    components: {
      EuiInput,
      EuiTips,
      ProductBrandChoseWindow,
      MultiPicUpload,
      VideoShowMask,
      EuiEditor
    },
    computed: {
      ...mapState([
        'tabs'
      ])
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.active = 0
        if (from.path === '/') {
          vm.$router.push('/')
          vm.$store.commit('REMOVE_TAB', vm.name)
        } else {
          if (!to.query.id && !vm.formdata.id || to.query.id === null) {
            to.meta.title = '产品新增'
          } else if (to.query.id && to.query.ac === 'copy') {
            to.meta.title = '同款复制'
          } else {
            to.meta.title = '产品编辑'
          }
          vm.$store.commit('UPDATE_TAB', {
            ...to,
            title: to.meta.title,
            keep: to.meta.keep || false
          })
          if (to.query.id && vm.formdata.id !== to.query.id && to.query.ac !== 'copy') {  // 传进来的id存在
            vm.getData(to.query.id).then(() => {
              vm.getProductInput()
            })
          } else if (to.query.id && to.query.ac === 'copy') {
            vm.getData(to.query.id).then(() => {
              vm.formdata.id = null
              vm.getProductInput()
            })
          } else if (vm.formdata.id && to.query.id !== null) { // query.id不存在, formdata.id存在, 且不是 新增
            vm.getProductInput()
          } else if (!vm.formdata.id && !to.query.id) {
            vm.getProductInput()
          } else {   // 没有传id，则认为是新增
            vm.formdata = {...PRODUCT.FORM_DATA}
            vm.getProductInput()
          }
          !vm.formdata.banner && (vm.formdata.banner = [])
          !vm.formdata.records && (vm.formdata.records = [])
        }
      })
    },
    data() {
      return {
        helper,
        active: 0,
        FORM_INFO: PRODUCT.FORM_INFO,
        RULES: PRODUCT.RULES,
        formdata: JSON.parse(JSON.stringify(PRODUCT.FORM_DATA)),
        formOptions: Object.assign({
          thumb: {
            uploadFile: (params) => {
              api.companyPublic.uploadPic(params.file, true).then(data => {
                this.formdata.thumb = data.path
              })
            }
          },
          videoUrl: {
            uploadVideo: (params) => {
              api.companyPublic.uploadVideo(params.file).then(data => {
                this.formdata.videoUrl = data.path
                this.formdata.videoPic = data.picPath
              })
            },
            beforeUpload: (file) => {
              const isMP4 = file.type === 'video/mp4'
              if (!isMP4) {
                this.$message.error('上传视频只能是 MP4 格式!')
              }
              return isMP4
            },
            openVideo: () => {
              this.$refs.videoWindow.show()
            }
          }
        }, PRODUCT.FORM_OPTIONS),
        attrform: {
          forminfo: [],
          formdata: {},
          formoptions: {}
        },
        uploadPic: api.companyPublic.uploadPic,
        uploadVideo: api.companyPublic.uploadVideo
      }
    },
    methods: {
      submitForm() {
        this.$refs.form3.validate((valid) => {
          if (valid) {
            if (!this.formdata.id) {
              api.companyProduct.addProduct(this.formdata).then(() => {
                this.$message({
                  message: '新增成功!',
                  type: 'success',
                  duration: 1000,
                  onClose: () => {
                    this.removeTab(this.$route.name)
                  }
                })
              })
            } else {
              api.companyProduct.updateProduct(this.formdata).then(() => {
                this.$message({
                  message: '编辑成功!',
                  type: 'success',
                  duration: 1000,
                  onClose: () => {
                    this.removeTab(this.$route.name)
                  }
                })
              })
            }
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      removeTab(targetName) {
        let tabs = this.tabs
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1]
            if (nextTab) {
              this.$router.push(this.tabs.find(t => { // 进入下一个tab
                return t.name === nextTab.name
              }).path)
            }
          }
        })
        this.$store.commit('REMOVE_TAB', targetName)
      },
      setActiveStep(index) {
        this.$refs['form' + Number(this.active + 1)].validate((valid) => { // 验证当前form, 因为第二页不需要验证。所以省略了很多逻辑
          if (valid) {
            this.active = index
          } else {
            this.$confirm(`请先将本页信息填写完整。`, '提示', {
              iconClass: 'el-icon-warning'
            }).then(() => {
            }).catch(() => {
            })
            return false
          }
        })
      },
      prev() {
        this.active--
        if (this.active < 0) this.active = 0
      },
      next() {
        this.$refs['form' + Number(this.active + 1)].validate((valid) => { // 验证当前form
          if (valid) {
            this.active++
            if (this.active > 2) this.active = 0
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      formFunctions(val, method, ...args) {
        let funs = {
          brandName: {
            suffixClick: () => {
              this.$refs.brandWindow.open('form')
            }
          },
          catId: {
            handleChange: (...args) => {
              // console.log(...args)
              this.formdata.productCategoryAttrValueDtoList = Object.keys(this.attrform.formdata).map(m => {
                if (this.attrform.formdata[m].attrValue !== null && this.attrform.formdata[m].attrValue !== '') {
                  return this.attrform.formdata[m]
                }
              }).filter(n => n !== undefined)
              this.getProductAttr(...args)
            }
          },
          attrChange: {
            handleChange: () => {
              this.formdata.productCategoryAttrValueDtoList = Object.keys(this.attrform.formdata).map(m => {
                if (this.attrform.formdata[m].attrValue !== null && this.attrform.formdata[m].attrValue !== '') {
                  return this.attrform.formdata[m]
                }
              }).filter(n => n !== undefined)
            }
          },
          banner: {
            multiUpload: () => {
              this.$refs.multiUpload.open('banner')
            },
            deletePic: (...args) => {
              this.$confirm(`是否删除该图？`, '提示', {
                iconClass: 'fa fa-question-circle'
              }).then(() => {
                this.formdata.banner.splice(args[0], 1)
              }).catch(() => {
              })
            },
            setMainPic: (...args) => {
              this.formdata.banner.find(m => {
                if (m.main === 1) {
                  m.main = 0
                  return true
                } else {
                  return false
                }
              })
              this.formdata.banner[args[0]].main = 1
            },
            picsSort: () => {
              this.formdata.banner = this.formdata.banner.sort((a, b) => {
                return a.seq - b.seq
              })
            }
          },
          reports: {
            multiUpload: () => {
              this.$refs.multiUpload.open('reports')
            },
            deletePic: (...args) => {
              this.$confirm(`是否删除该图？`, '提示', {
                iconClass: 'fa fa-question-circle'
              }).then(() => {
                this.formdata.reports.splice(args[0], 1)
              }).catch(() => {
              })
            }
          },
          videoUrl: {
            deleteVideo: () => {
              this.$confirm(`是否删除该视频？`, '提示', {
                iconClass: 'fa fa-question-circle'
              }).then(() => {
                this.formdata.videoUrl = null
                this.formdata.videoPic = null
              }).catch(() => {
              })
            }
          }
        }
        funs[val][method].call(this, ...args)
      },
      getProductInput() {
        api.companyProductCategory.getCategoryShowPaged({
          page: 1,
          pageSize: 999
        }).then(data => {
          this.formOptions.catId = data.records.map(d => ({
            label: d.name,
            value: d.id
          }))
          this.formdata.catId = this.formdata.catId ? this.formdata.catId : this.formOptions.catId[0].value
          this.getProductAttr(this.formdata.catId)
        })
      },
      getProductAttr(categoryId) {
        api.companyProductCategoryAttr.getAttrPaged({
          categoryId: categoryId,
          productId: this.formdata.id,
          page: 1,
          pageSize: 999
        }).then(data => {
          this.attrform.forminfo = []
          this.attrform.formoptions = {}
          this.attrform.formdata = {}
          if (data.records && data.records.length > 0) {
            data.records.forEach(d => {
              this.$set(this.attrform.formdata, d.id, {
                attrId: d.id,
                id: d.attrValueId,
                attrValue: d.attrValue,
                seq: d.attrValueSeq
              })
              if (d.type === 2 && d.options) {
                this.attrform.formoptions[d.id] = d.options.split(',').map(l => ({
                  label: l,
                  value: l
                }))
                this.attrform.forminfo.push({
                  name: d.name,
                  value: d.id,
                  type: 'select'
                })
              } else {
                this.attrform.forminfo.push({
                  name: d.name,
                  value: d.id
                })
              }
            })
          }
        })
      },
      getData(id) {
        return api.companyProduct.getProduct(id).then(data => {
          this.formdata = data
        })
      }
    },
    mounted() {
    },
    created() {
      this.$on('brandChose', (node) => {
        this.formdata.brandName = node.name
        this.formdata.brandId = node.id
      })
      this.$on('uploadlists', (lists, fromname) => {
        if (fromname === 'banner') {
          this.formdata.banner = this.formdata.banner.concat(lists.map((m, index) => {
            if (this.formdata.banner.some(b => b.main === 1)) {  // 第二次上传
              return {
                main: 0,
                seq: 1,
                url: m
              }
            } else if (this.formdata.banner.length === 0) { // 第一次上传
              if (index === 0) {
                return {
                  main: 1,
                  seq: 1,
                  url: m
                }
              } else {
                return {
                  main: 0,
                  seq: 1,
                  url: m
                }
              }
            }
          }))
        } else if (fromname === 'reports') {
          this.formdata.reports = lists
        }
      })
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .form-wrapper
    width: 100%
    height: 100%
    overflow-y: scroll

    .step-wrapper
      width: 50%
      margin: 30px auto
    .form-box
      padding: 30px 30px 0 30px
      background: #f0f2f5
      border-bottom: none
      .form2
        background: #fff
        border-bottom: none
        padding: 20px 0 20px 10%
        display: block
        .notic
          margin-left: 10px
          color: #909090
          font-size: 12px
          vertical-align: top
        .avatar
          width: 150px
          height: 150px
          display: block
        .btn-upload
          width: 80px
          display: inline-block
        .video-player
          width: 150px
          height: 150px
          border: 1px solid #e4e7ed
          position: relative
          &:hover
            .delete
              opacity: 1
          .video-pic
            width: 100%
            height: 100%
          .player
            display: block
            position: absolute
            top: 60px
            left: 60px
            font-size: 30px
            color: #66b1ff
            opacity: 1
            cursor: pointer
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
    .el-input, .el-cascader, .el-select, .el-textarea
      width: 400px
    .avatar-uploader-icon
      width: 150px
      height: 150px
      line-height: 150px
    .avatar-uploader
      display: inline-block
    .form-btns
      display: block
      clear: both
      padding: 0 30px 30px 30px
      background: #f0f2f5
      .btns-wrapper
        padding-bottom: 30px
        background: #fff
        .wrap
          margin: auto
          width: 400px
        button
          width: 150px
          margin-top: 12px
    .seq
      display: inline-block
      margin: 0 10px
    /deep/ .el-button + .el-button
      margin-left: 0
    .piclist
      display: flex
      flex-wrap: wrap
      width: 900px
      .pic-wrapper
        width: 150px
        text-align: center
        margin: 10px 20px 10px 0
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
            width: 150px
            height: 150px
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
          .main-pic
            position: absolute
            top: 3px
            left: 3px
            width: 25px
            height: 25px
            display: block
            font-size: 15px
            font-weight: bold
            text-align: left
            vertical-align: top
            color: #fff
            border-radius: 0 0 25px 0
            line-height: 15px
            background: red
</style>
