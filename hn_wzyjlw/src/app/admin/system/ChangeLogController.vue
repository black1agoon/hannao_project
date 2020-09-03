<template>
  <div>
    <div class="version">
      <div class="title">v.0.1.2</div>
      <div class="content">
        <p>1.修复bug</p>
        <p>2.添加功能 订单管理->明细->分配列表(查看分配的机台、运行情况等信息)</p>
      </div>
    </div>
    <div class="version">
      <div class="title">v.0.1.3</div>
      <div class="content">
        <p>1.修复bug</p>
        <p>2.添加功能 用户管理->上传头像</p>
      </div>
    </div>
    <div class="version">
      <div class="title">v.0.1.4</div>
      <div class="content">
        <p>1.修复bug</p>
        <p>2.添加功能</p>
        <p class="title2">a.机台记录-> 搜索 ->添加了 按订单编号、状态的搜索。</p>
        <p class="title2">b.机台异常记录-> 搜索 ->添加了 按订单编号的搜索。</p>
      </div>
    </div>
    <div class="version">
      <div class="title">v.0.1.5</div>
      <div class="content">
        <p>1.修复bug</p>
      </div>
    </div>
    <!--<vue-markdown>{{msg}}</vue-markdown>-->
  </div>
</template>

<script>
  // import VueMarkdown from 'vue-markdown'
  // import README from '../../../test/readme.md'

  export default {
    name: 'change-log',
    _meta: {
      path: '/change/log',
      title: '更新日志'
    },
    components: {
      // VueMarkdown
    },
    data() {
      return {
        // msg: README
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .title
    font-size: 20px
    padding: 10px

  .content
    p
      font-size: 14px
      color: #7e8c8d
      padding: 5px 10px
    .title2
      margin-left: 30px
</style>
<style>
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>
