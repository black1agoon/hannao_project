<template>
  <div class="wrapper">
    <eui-input type="radio" :options="options" v-model="type">
    </eui-input>
    <el-button type="primary"
               class="button"
               size="mini"
               @click="setRate">确定
    </el-button>
  </div>
</template>

<script>
  import api from '@/api'
  import TabPane from '@/components/views/TabPane'
  import EuiInput from '@/components/common/form/EuiInput'
  export default {
    name: 'rate-controller',
    _meta: {
      path: '/agency/ratesetting',
      title: '折旧率设置'
    },
    mixins: [TabPane],
    components: {
      EuiInput
    },
    data() {
      return {
        options: [{
          label: '年限平均法',
          value: '1'
        }, {
          label: '工作量法',
          value: '2'
        }, {
          label: '双倍余额递减法',
          value: '3'
        }],
        type: null
      }
    },
    methods: {
      getRate() {
        api.rateSetting.getRate(this.type).then(data => {
          this.type = data
        })
      },
      setRate() {
        api.rateSetting.setRate(this.type).then(data => {
          this.$message({
            message: '设置成功',
            type: 'success'
          })
        })
      }
    },
    mounted() {
      this.getRate()
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

.wrapper
  position: absolute
  margin: auto
  left: 0
  right: 0
  top: 0
  bottom: 0
  width: 500px !important
  height: 300px !important
  text-align: center
  .button
    width: 100px
    margin:  30px auto
    display: block
</style>

