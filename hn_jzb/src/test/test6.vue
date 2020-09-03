<template>
  <el-form ref="form" :model="form" :inline="true" label-width="80px" class="content-wrapper">
    <!--<el-row :gutter="20">-->
    <el-col :sm="8">
      <el-form-item label="活动名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
    </el-col>

    <el-col :sm="8">
      <el-form-item label="活动名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
    </el-col>
    <!--<el-form-item>-->
      <!--<el-button type="primary" @click="onSubmit">立即创建</el-button>-->
      <!--<el-button>取消</el-button>-->
    <!--</el-form-item>-->
  </el-form>
</template>

<script>
  import TabPane from '@/components/views/TabPane'

  export default {
    name: 'test6',
    _meta: {
      path: 'test6',
      title: '测试666'
    },
    mixins: [TabPane],
    data() {
      return {
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!')
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.content-wrapper
  padding: 20px
</style>
