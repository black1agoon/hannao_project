<template>
  <div class="mask" v-show="maskShow">
    <ul class="wh-list">
      <li v-for="(line, index) in flowlineList"
          :tabIndex="index"
          :key="index"
          :class="{active: line.id === flowline.id}"
          @click="flowLineClick(line)">
          <span class="circle">
            <i v-show="line.id === flowline.id"></i>
          </span>{{line.equipmentName}}
      </li>
    </ul>
  </div>
</template>

<script>
  import api from '@/api'
  import {mapState} from 'vuex'
  export default {
    name: 'flow-lines',
    data() {
      return {
        flowlineList: [],
        maskShow: false,
        timer: null
      }
    },
    computed: {
      ...mapState('jlw', ['flowline'])
    },
    methods: {
      getFlowLines() {
        api.jlwKanBan.getAllMaskEquipmentInfo().then(data => {
          this.flowlineList = data && data.length > 0 ? data : []
        })
      },
      show() {
        this.maskShow = true
      },
      hide() {
        this.maskShow = false
      },
      flowLineClick(flowline) {
        console.log(flowline)
        this.$store.commit('jlw/SET_FLOWLINE', {
          id: flowline.id,
          name: flowline.equipmentName
        })
        window.localStorage.setItem('flowline', JSON.stringify({
          id: flowline.id,
          name: flowline.equipmentName
        }))
        this.hide()
        this.$emit('loaddata')
      },
      initMask() {
        if (!this.flowline.id) {
          this.show()
        } else {
          this.hide()
        }
      }
    },
    mounted() {
      this.initMask()
      this.getFlowLines()
      this.timer = setInterval(() => {
        this.getFlowLines()
      }, 5 * 60 * 1000)
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .mask
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    background: rgba(0, 0, 0, .8)
    z-index: 100
    .wh-list
      position: relative
      width: 300px
      top: 50%
      transform: translateY(-50%)
      margin: 0 auto
      color: #ffffff
      li
        cursor: pointer
        margin: 30px
        &.active
          color: #00FFFF
        .circle
          display: inline-block
          width: 16px
          height: 16px
          border: 1px solid #00FFFF
          border-radius: 50%
          vertical-align: bottom
          margin-right: 5px
          i
            display: inline-block
            width: 12px
            height: 12px
            margin: 1px
            background: #00FFFF
            border-radius: 50%
</style>