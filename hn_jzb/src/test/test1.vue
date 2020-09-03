<template>
  <eui-editor :value="value"></eui-editor>
</template>

<script>
  import EuiEditor from '@/components/common/form/EuiEditor'
  export default {
    name: 'test1',
    _meta: {
      path: 'test1',
      title: 'test1'
    },
    components: {
      EuiEditor
    },
    data() {
      return {
        value: '我只是一个编辑器'
      }
    },
    methods: {
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>


