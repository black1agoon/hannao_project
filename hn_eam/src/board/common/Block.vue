<template>
  <div class="block-wrap" :style="getStyle">
    <div class="title">{{title}}</div>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'block',
    props: {
      width: {
        type: Number,
        default: 0
      },
      height: {
        type: Number,
        default: 0
      },
      bgUrl: {
        type: String,
        default: ''
      },
      title: {
        type: String,
        default: ''
      }
    },
    computed: {
      getStyle() {
        return {
          width: this.width + 'px',
          height: this.height + 'px',
          backgroundSize: `${this.width}px ${this.height}px`,
          backgroundImage: `url('${this.bgUrl}')`
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.block-wrap
  .title
    padding-top: 5px
    margin-left: 50px
    height: 45px
    line-height: 45px
    color: #ffffff
    font-size: 24px
</style>