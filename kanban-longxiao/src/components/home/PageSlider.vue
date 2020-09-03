<template>
  <div style="width: 100%; height: 100%; position: relative; overflow: hidden;">
    <transition enter-active-class="animated slideInRight" leave-active-class="animated slideOutLeft">
      <div v-if="show" :key="page" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;">
        <slot></slot>
      </div>
    </transition>
    <div class="switch">
      <div v-for="(_, idx) in totalPage" :key="idx"
           class="switch-idc" :class="{ active: page === idx }"
           @click="changePage(idx)">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'PageSlider',
    props: {
      totalPage: {
        default: 1,
      },
      page: {
        default: 0,
      },
      duration: {
        default: 3000,
      },
    },
    data () {
      return {
        show: true,
        intervalId: 0,
      }
    },
    methods: {
      slide () {
        this.show = false
        window.setTimeout(() => {
          this.show = true
        }, 0)
      },
      start () {
        if (this.intervalId) {
          this.stop()
        }
        this.intervalId = window.setInterval(() => {
          this.slide()
          this.$emit('update:page', (this.page + 1) % this.totalPage)
        }, this.duration)
      },
      stop () {
        if (this.intervalId) {
          window.clearInterval(this.intervalId)
          this.intervalId = 0
        }
      },
      changePage (page) {
        this.slide()
        this.$emit('update:page', page)
      },
    },
    destroyed () {
      this.stop()
    },
    mounted () {
      this.start()
    },
  }
</script>

<style scoped lang="scss">
  .switch {
    position: absolute;
    bottom: 10px;
    left: 0;
    right: 0;
    margin: 0 auto;
    height: 2px;
    display: flex;
    justify-content: center;

    .switch-idc {
      width: 16px;
      height: 8px;
      border-top: 2px #0E477B solid;
      margin: 0 2px;
      cursor: pointer;

      &:hover {
        border-top: 2px #48F3FA solid;
        background: linear-gradient(#48F3FA77, #48F3FA22 40%, #48F3FA00);
      }

      &.active {
        border-top: 2px #48F3FA solid;
      }
    }
  }
</style>
