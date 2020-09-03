<template>
  <eui-window ref="window"
              :options="windowOptions">
    <el-form class="form" :model="formdata" ref="form" label-width="100px" :rules="rules" style="padding: 20px">
      <el-col :sm="24" v-for="(item, index) in forminfo" :key="index">
        <el-form-item :label="item.attrName" :prop="item.attrValue">
          <div class="item">
            <div class="explain"></div>
            <div class="input">
              <eui-input
                v-model="item.attrValue"
                :type="item.type"
                :options="formOptions[item.attrName]">
              </eui-input>
            </div>
            <span class="seq">排序</span>
            <div class="seq-input">
              <eui-input style="width: 100px"
                         v-model="item.seq">
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
  import api from '@/api'
  import helper from '@/app/app.helpers'

  export default {
    name: 'equipment-set-attr-window',
    components: {
      EuiWindow,
      EuiInput
    },
    props: {},
    computed: {},
    data() {
      return {
        helper,
        forminfo: [
        ],
        formdata: {},
        formOptions: {},
        rules: {},
        windowOptions: {
          title: '编辑属性',
          width: '500px'
        }
      }
    },
    methods: {
      open(data) {
        this.forminfo = data.equipmentCategoryAttrValueDtoList
        this.formdata.equipmentId = data.id
        this.formdata.categoryId = data.categoryId
        for (let arr of this.forminfo) {
          if (arr.seq === 0) {
            arr.seq = 10
          }
          if (arr.options) {
            arr.type = 'select'
            this.formOptions[arr.attrName] = arr.options.split('\n').map(l => ({
              label: l,
              value: l
            }))
          } else {
            this.formOptions[arr.attrName] = []
          }
        }
        this.$refs.window.open()
      },
      sure() {
        this.formdata.attrValueList = this.forminfo
        api.equipment.setAttrValue(this.formdata).then(() => {
          this.$message({
            message: '设置成功!',
            type: 'success'
          })
          this.cancel()
        })
      },
      cancel() {
        this.$refs.window.cancel()
      }
    },
    watch: {}
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.seq
  margin: 0 10px
.seq-input
  flex: 0 0 100px
</style>
