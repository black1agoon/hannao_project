<template>
  <eui-window ref="window"
              :options="windowOptions">
    <el-form class="form clearfix" ref="form" :model="formdata" label-width="100px"
             style="padding: 20px">
      <el-col :sm="item.sm || 8" v-for="(item, index) in forminfo" :key="index">
        <el-form-item :label="item.name">
          <div class="value" v-if="item.value !== 'pictures'">{{formdata[item.value]}}</div>
          <img v-else class="image" :src="helper.getImgUrl(formdata[item.value])"/>
        </el-form-item>
      </el-col>
    </el-form>
    <div slot="btns">
      <el-button size="small" @click="cancel">关闭</el-button>
    </div>
  </eui-window>
</template>

<script>
  import EuiWindow from '@/components/common/form/EuiWindow'
  import helper from '@/app/app.helpers'
  const DETAIL_INFO = [
    {
      name: '资产编码:',
      value: 'assetCode'
    }, {
      name: '资产名称:',
      value: 'assetName'
    }, {
      name: '资产类别:',
      value: 'typename'
    }, {
      name: '入库时间:',
      value: 'addTimeStr'
    }, {
      name: '型号:',
      value: 'model'
    }, {
      name: '计量单位:',
      value: 'unit'
    }, {
      name: '来源:',
      value: 'assetSourceName'
    }, {
      name: '渠道:',
      value: 'place'
    }, {
      name: '金额:',
      value: 'amount'
    }, {
      name: '品牌:',
      value: 'brand'
    }, {
      name: '购入时间:',
      value: 'buyTimeStr'
    }, {
      name: '使用期限:',
      value: 'usetime'
    }, {
      name: 'SN号:',
      value: 'snnumber'
    }, {
      name: '保修起始:',
      value: 'warrantyStartStr'
    }, {
      name: '过保时间:',
      value: 'warrantyEndStr'
    }, {
      name: '备注:',
      value: 'remark',
      sm: 16
    }, {
      name: '图片:',
      value: 'pictures',
      sm: 8
    }
  ]
  export default {
    name: 'asset-detail-window',
    components: {
      EuiWindow
    },
    data() {
      return {
        helper,
        formdata: {},
        forminfo: DETAIL_INFO,
        windowOptions: {
          title: '资产信息',
          width: '70%',
          height: '600px'
        }
      }
    },
    methods: {
      open(data) {
        this.formdata = {...data}
        Object.keys(this.formdata).forEach(key => {
          this.formdata[key] = this.formdata[key] ? this.formdata[key] : '--'
        })
        this.$refs.window.open()
      },
      cancel() {
        this.$refs.window.cancel()
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.value
  line-height: 32px
  margin-left: 10px
.image
  margin-left: 10px
  width: 150px
  height: 70px
</style>