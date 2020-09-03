<template>
  <eui-window ref="window"
              :options="windowOptions">
    <el-form class="form" ref="form" :model="formdata" label-width="70px" :rules="rules" style="padding: 20px">
      <el-col :sm="24" v-for="(item, index) in forminfo" :key="index">
        <el-form-item :label="item.name" :prop="item.value">
          <div class="item">
            <div class="explain"></div>
            <div class="input">
              <div v-if="item.value === 'name'" class="">{{formdata[item.value]}}</div>
              <eui-input
                  v-else
                  v-model="formdata[item.value]"
                  :type="item.type"
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
  import {SETNUM} from '../floor.config'
  import api from '@/api'
  import helper from '@/app/app.helpers'
  export default {
    name: 'set-table-num-window',
    components: {
      EuiWindow,
      EuiInput
    },
    props: {
    },
    computed: {
    },
    data() {
      return {
        helper,
        forminfo: {...SETNUM.FORM_INFO},
        formdata: {...SETNUM.FORM_DATA},
        rules: SETNUM.RULES,
        windowOptions: {
          title: '修改序号',
          width: '300px'
        }
      }
    },
    methods: {
      open(row, floorNumber) {
        this.formdata = {...row}
        this.formdata.tableId = row.id
        this.formdata.floorNumber = floorNumber
        this.$refs.window.open()
      },
      sure() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            api.floorNumber.setNumber(this.formdata).then(() => {
              this.$message({
                message: '修改成功!',
                type: 'success'
              })
              this.$emit('subReload')
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
    },
    watch: {
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .avatar-uploader, .avatar, .avatar-uploader-icon
    width: 200px
    height: 150px
  .avatar-uploader-icon
    line-height: 150px
</style>
