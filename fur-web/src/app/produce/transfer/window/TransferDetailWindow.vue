<template>
  <eui-window ref="window"
              :options="windowOptions">
    <div class="window-container">
      <el-form class="form" :model="formdata" label-width="120px">
        <template v-for="items in forminfo">
          <div class="title" v-if="items.title" :key="items.title">
            {{items.title}}
          </div>
          <el-col :sm="12" v-for="item in items.items" :key="item.name">
            <el-form-item :label="item.name" :prop="item.value">
              {{formdata[item.value]}}
            </el-form-item>
          </el-col>
        </template>
      </el-form>
    </div>
    <div slot="btns">
      <el-button type="primary" size="mini" @click="sure">确定</el-button>
      <el-button size="mini" @click="cancel">关闭</el-button>
    </div>
  </eui-window>
</template>

<script>
  import EuiWindow from '@/app/produce/components/form/EuiWindow'
  import { api } from '@/api'
  export default {
    name: 'bad-reason-window',
    components: {
      EuiWindow
    },
    props: {
      //
    },
    data() {
      return {
        windowOptions: {
          title: '产量转移确认',
          width: '800px'
        },
        formdata: {},
        forminfo: [
          {
            items: [
              { name: '条码:', value: 'barCode' },
              { name: '款号:', value: 'styleCode' },
              { name: '颜色:', value: 'colorName' },
              { name: '尺码:', value: 'size' },
              { name: '转移工序:', value: 'processName' }
            ]
          }, {
            title: '转移前:',
            items: [
              { name: '报工人姓名:', value: 'reportUserName'},
              { name: '报工人工号:', value: 'reportUserCode'}
            ]
          }, {
            title: '转移后:',
            items: [
              { name: '接收人姓名:', value: 'receiveReportUserName'},
              { name: '接收人工号:', value: 'receiveReportUserCode'}
            ]
          }
        ]
      }
    },
    methods: {
      open(formdata) {
        this.formdata = formdata
        this.$refs.window.open()
      },
      sure() {
        this.$confirm(`是否确定转移？`, '提示', {
          iconClass: 'fa fa-question-circle'
        }).then(() => {
          api.produce.transfer.saveReportWorkChange(this.formdata).then(() => {
            this.$message({
              message: '转移成功!',
              type: 'success'
            })
            this.$emit('reload')
            this.cancel()
          })
        }).catch(() => {
          this.cancel()
        })
      },
      cancel() {
        this.$refs.window.cancel()
      }
    }
  }
</script>

<style lang="sass" scoped>
  ::v-deep
    .el-dialog__body
      height: 500px
    .window-container
      height: 100%
      padding: 20px 50px
      .title
        font-weight: bold
        font-size: 16px
        clear: both
</style>