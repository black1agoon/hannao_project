<template>
  <svg :width="width" :height="width" :viewbox="`0 0 ${width} ${width}`">
    <circle :cx="width/2" :cy="width/2" :r="radius" stroke-width="10" stroke="#31343A" fill="none"></circle>
    <circle ref="circle" :cx="width/2" :cy="width/2" :r="radius" stroke-width="10" :stroke="color" fill="none"
            :transform="`matrix(0, -1, 1, 0, 0, ${width})`"
            :stroke-dasharray="`0 ${2 * radius * Math.PI}`"
            stroke-dashoffset="0"
            stroke-linecap="round">
    </circle>
  </svg>
</template>

<script>
  export default {
    name: 'cyclic-progress',
    props: {
      width: {
        type: Number,
        default: 100
      },
      radius: {
        type: Number,
        default: 44
      },
      percent: {
        type: Number,
        default: 50
      },
      color: {
        type: String,
        default: '#02A9FA'
      }
    },
    data() {
      return {
      }
    },
    computed: {
    },
    methods: {
    },
    mounted() {
    },
    watch: {
      percent: {
        handler: function () {
          this.$nextTick(() => {
            let circle = this.$refs.circle
            let perimeter = circle.getTotalLength() // 圆环的周长
            circle.setAttribute('stroke-dasharray', perimeter * parseInt(this.percent) / 100 + ' ' + perimeter * (1 - parseInt(this.percent) / 100))
          })
        },
        immediate: true
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
circle
  transition: stroke-dasharray 800ms
</style>