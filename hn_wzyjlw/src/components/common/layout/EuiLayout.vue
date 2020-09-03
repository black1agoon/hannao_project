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
    <div ref="splitline" v-if="defaultRegions.south && defaultRegions.center" class="splitline"></div>
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
    },
    data() {
      return {
        defaultRegions: Object.assign({}, this.regions)
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
              border: style.border ? `${style.border}px` : 'none'
            }
          } else if (style.height) {  // 如果存在高
            return {
              // flex: `0 0 ${style.height}`,
              flex: `0 0 ${style.height}px`,
              border: style.border ? `${style.border}px` : 'none'
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
    },
    mounted() {
      let splitline = document.getElementsByClassName('splitline')[0]
      let south = document.getElementsByClassName('south')[0]
      if (splitline) {
        splitline.onmousedown = (event) => {
          let _event = event || window.event
          let chaY = _event.clientY  // 点击的点到窗口顶部距离
          let bHeight = south.offsetHeight  // south的高度
          document.onmousemove = (event) => {
            let _event = event || window.event
            if (_event.clientY > 200 && bHeight > (_event.clientY - chaY) + 50) {  // 移动点 距离顶部的高度>200 或者 south的高度 高于50 则能移动
              splitline.style.top = _event.clientY - chaY + 'px' // 分隔条 实时的高度位置
              splitline.style.backgroundColor = '#1890ff'  // 分隔条颜色移动时改变
            }
          }
          document.onmouseup = (event) => {
            if (document.onmousemove) {
              let _event = event || window.event
              if (_event.clientY <= 300) {
                south.style.flex = `0 0 ${bHeight - (200 - chaY)}px`
              } else if (bHeight <= (_event.clientY - chaY) + 50) {
                south.style.flex = `0 0 50px`
              } else {
                south.style.flex = `0 0 ${bHeight - (_event.clientY - chaY)}px`
              }
              splitline.style.top = 0
              splitline.style.backgroundColor = '#ebf1f6'
              document.onmousemove = null
            }
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
      line-height: 40px
      border-bottom: 1px solid #ebf1f6
      box-sizing: border-box
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
        overflow: hidden
        position: relative
      .east
        flex: 0 0 250px
    .south
      width: 100%
      flex: 0 0 50px
      position: relative
      overflow: auto
    .splitline
      width: 100%
      height: 3px
      background: #ebf1f6
      position: relative
      z-index: 100
      cursor: pointer
</style>
