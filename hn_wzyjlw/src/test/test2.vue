<template>
  <div>
    <div class="time">
      <time-line>
      </time-line>
    </div>
  </div>
</template>
<script>
  // import api from '@/api'
  import TimeLine from '@/components/common/tools/TimeLine'
  export default {
    name: 'test2',
    _meta: {
      path: 'test2',
      title: '测试test22'
    },
    components: {
      TimeLine
    },
    computed: {
    },
    data() {
      return {
      }
    },
    methods: {
    },
    created() {
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.time
  width: 900px
  height: 20px

</style>
