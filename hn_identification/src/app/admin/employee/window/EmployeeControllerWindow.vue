<template>
  <eui-window ref="window"
              :options="windowOptions">
    <el-form class="form" ref="form" :model="formdata" label-width="100px" :rules="rules" style="padding: 20px">
      <el-col :sm="item.sm || 8" v-for="(item, index) in forminfo" :key="index">
        <el-form-item :label="item.name" :prop="item.value">
          <div class="item">
            <div class="explain"></div>
            <div class="input">
              <div v-if="item.value === 'avatar'" style="width: 100%;padding-bottom: 100%">
                <el-upload
                    class="avatar-uploader"
                    action=""
                    :show-file-list="false"
                    :http-request="defaultformOptions.avatar.uploadFile"
                    :before-upload="defaultformOptions.avatar.beforeAvatarUpload">
                  <img v-if="helper.getImgUrl(formdata.avatar)" :src="helper.getImgUrl(formdata.avatar)"
                       class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </div>
              <area-box
                  v-else-if="item.value === 'areaNumber'"
                  v-model="formdata[item.value]">
              </area-box>
              <eui-input
                  v-else
                  v-model="formdata[item.value]"
                  :type="item.type"
                  :autosize="item.autosize"
                  :options="defaultformOptions[item.value]"
                  :placeholder="item.placeholder"
                  :unit="item.unit">
              </eui-input>
            </div>
          </div>
        </el-form-item>
      </el-col>
    </el-form>
    <div slot="btns">
      <el-button type="primary" size="mini" @click="sure">确定</el-button>
      <el-button size="mini" @click="cancel">关闭</el-button>
    </div>
  </eui-window>
</template>

<script>
  import EuiWindow from '@/components/common/form/EuiWindow'
  import EuiInput from '@/components/common/form/EuiInput'
  import {EMPLOYEE} from '../employee.config'
  import api from '@/api'
  import helper from '@/app/app.helpers'
  import AreaBox from '@/app/tools/AreaBox'
  export default {
    name: 'employee-controller-window',
    components: {
      EuiWindow,
      EuiInput,
      AreaBox
    },
    props: {},
    computed: {
      defaultformOptions() {
        return Object.assign({}, this.formOptions)
      }
    },
    data() {
      return {
        helper,
        forminfo: {...EMPLOYEE.FORM_INFO},
        formdata: {...EMPLOYEE.FORM_DATA},
        formOptions: Object.assign(EMPLOYEE.FORM_OPTIONS, {
          avatar: {
            uploadFile: (params) => {
              api.employee.upload(params.file).then(data => {
                this.formdata.avatar = data.path
              })
            },
            beforeAvatarUpload: (file) => {
              const isLt2M = file.size / 1024 / 1024 < 2
              if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!')
              }
              return isLt2M
            }
          },
          areaNumber: []
        }),
        rules: EMPLOYEE.RULES,
        windowOptions: {
          title: '编辑' + EMPLOYEE.WINDOW_NAME
        }
      }
    },
    methods: {
      open(row) {
        this.formdata = {...row}
        this.$refs.window.open()
      },
      sure() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            api.employee.update(this.formdata).then(() => {
              this.$message({
                message: '编辑成功!',
                type: 'success'
              })
              this.$emit('reload')
              this.cancel()
            })
          } else {
            return false
          }
        })
      },
      cancel() {
        this.$refs.window.cancel()
      }
      // areaChange(val) {
      //   if (val.length === 1) {
      //     api.public.getAreaCities(val[0]).then(cities => {
      //       this.formOptions.areaNumber.find(item => item.value === val[0]).children = Object.keys(cities).map(key => ({
      //         label: cities[key],
      //         value: key,
      //         children: []
      //       }))
      //     })
      //   } else if (val.length === 2) {
      //     api.public.getAreaDistrict(val[1]).then(districts => {
      //       this.formOptions.areaNumber.find(item => item.value === val[0]).children
      //         .find(item => item.value === val[1])
      //         .children = Object.keys(districts).map(key => ({
      //         label: districts[key],
      //         value: key,
      //         children: []
      //       }))
      //     })
      //   } else if (val.length === 3) {
      //     api.public.getAreaTown(val[2]).then(town => {
      //       this.formOptions.areaNumber.find(item => item.value === val[0]).children.find(item => item.value === val[1]).children.find(item => item.value === val[2])
      //         .children = Object.keys(town).map(key => ({
      //         label: town[key],
      //         value: key
      //       }))
      //     })
      //   }
      // },
      // getAreaList() {
      //   if (this.formdata.areaNumber) {
      //     api.public.getAreaById(this.formdata.areaNumber).then(data => {
      //       api.public.getAreaCities(data.prov).then(cities => {
      //         this.formOptions.region[findIndex(this.formOptions.region, data.prov)].children = cities.map(city => ({
      //           label: city,
      //           value: city,
      //           children: []
      //         }))
      //         api.public.getAreaDistrict(data.city).then(districts => {
      //           this.formOptions.region[findIndex(this.formOptions.region, data.prov)].children[findIndex(this.formOptions.region[findIndex(this.formOptions.region, data.prov)].children, data.city)].children = districts.map(district => ({
      //             label: district.district,
      //             value: district.id
      //           }))
      //           this.formdata.regionList = [data.prov, data.city, data.id]
      //           this.$forceUpdate()
      //         })
      //       })
      //     })
      //   }
      // }
    },
    watch: {}
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .avatar-uploader
    width: 100%
    height: 100%
    position: absolute
    /deep/ .el-upload
      width: 100%
      height: 100%
      .avatar-uploader-icon
        width: 100%
        height: 100%
        line-height: 0
      .el-icon-plus:before
        position: absolute
        top: 50%
        left: 50%
        transform: translateX(-50%) translateY(-50%)

  .avatar
    width: 100%
    height: 100%
</style>
