<template>
  <div class="layout-wrapper">
    <div v-if="defaultRegions.north" class="north" :style="getStyle(defaultRegions.north)">
      <slot name="north"></slot>
    </div>
    <div class="middle">
      <div v-if="defaultRegions.west" class="west" :style="getStyle(defaultRegions.west)">
        <slot name="west"></slot>
      </div>
      <div v-if="defaultRegions.center" class="center" :style="getStyle(defaultRegions.center)">
        <slot name="center"></slot>
      </div>
      <div v-if="defaultRegions.east" class="east" :style="getStyle(defaultRegions.east)">
        <slot name="east"></slot>
      </div>
    </div>
    <div v-if="defaultRegions.south" class="south" :style="getStyle(defaultRegions.south)">
      <slot name="south"></slot>
    </div>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'eui-layout',
    props: {
      regions: {
        type: Object,
        default: () => ({})
      }
    },
    computed: {
      defaultRegions() {
        return Object.assign({}, this.regions)
      }
    },
    data() {
      return {
      }
    },
    methods: {
      getStyle(region) {
        if (region) {
          let style = region.hasOwnProperty('style') ? region.style : {}
          if (style.width) {  // 如果存在宽
            return {
              // flex: `0 0 ${style.width}`,
              flex: `0 0 ${style.width}px`,
              border: !style.border && 'none'
            }
          } else if (style.height) {  // 如果存在高
            return {
              // flex: `0 0 ${style.height}`,
              flex: `0 0 ${style.height}px`,
              border: !style.border && 'none'
            }
          } else if (style.flex) {  // 如果存在flex值
            return {
              flex: style.flex,
              border: !style.border && 'none',
              padding: (style.padding ? style.padding : 0) + 'px'
            }
          } else {
            return style.hasOwnProperty('border') ? {
              border: !style.border && 'none'
            } : {}
          }
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .layout-wrapper
    width: 100%
    height: 100%
    display: flex
    flex-direction: column
    .north
      width: 100%
      flex: 0 0 40px
      border-bottom: 1px solid #ebf1f6
    .middle
      width: 100%
      flex: 1
      display: flex
      overflow: hidden
      .west
        flex: 0 0 250px
        overflow: auto
        border-right: 1px solid #ebf1f6
      .center
        flex: 1
        overflow: auto
        position: relative
      .east
        flex: 0 0 250px
    .south
      width: 100%
      flex: 0 0 50px
</style>
