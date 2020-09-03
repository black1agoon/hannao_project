import Vue from 'vue'
import {setNumberByThree} from '../../assets/js/utils'
export default Vue.extend({
  props: {
    list: {
      type: Array,
      default: () => []
    },
    lastestNumLength: {
      type: Number,
      default: 9999
    }
  },
  filters: {
    setNumByThree(num) {
      return setNumberByThree(num)
    }
  },
  computed: {
    rowClasses() {
      return {
        'kira-slide-in-up': this.isSliding,
      }
    },
    rowCount() {
      return this.list.length
    },
    viewList() {
      let _list = this.list.slice(-this.lastestNumLength)
      // console.log(_list)
      if (_list.length <= this.listLength) {
        // return this.list.concat(Array.from({length: this.listLength - this.list.length}, () => ({})))
        return _list
      } else if (_list.length > this.listLength) {
        return _list.concat(_list).slice(this.currentRow)
      } else {
        return []
      }
    }
  },
  data() {
    return {
      isSliding: false,
      slidingId: 0,
      currentRow: 0
    }
  },
  methods: {
    onSlidingEnd() {
      this.isSliding = false
    },
    startSliding() {
      if (!this.slidingId) {
        this.slidingId = window.setInterval(() => {
          this.currentRow = (this.currentRow + 1) % this.rowCount
          this.isSliding = true
        }, this.delayTime * 1000)
      }
    },
    stopSliding() {
      if (this.slidingId) {
        window.clearInterval(this.slidingId)
        this.slidingId = null
      }
    },
    mouseenter() {
      this.stopSliding()
    },
    mouseleave() {
      if (this.list.length > this.listLength) {
        this.startSliding()
      }
    }
  },
  mounted() {
  },
  watch: {
    list: {
      immediate: true,
      handler: function(val) {
        if (val.length > this.listLength) {
          this.currentRow = this.rowCount - 1
          this.startSliding()
        }
      }
    }
  },
  destroyed() {
    this.stopSliding()
  }
})

