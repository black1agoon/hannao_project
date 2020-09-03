<template>
  <ul class="star-wrapper">
    <li :class="[star, {cur: !disabled}]"
        v-for="(star, index) in itemClasses"
        @mouseenter="mouseenter(index)"
        @mouseleave="mouseleave"
        @click="starClick(index)"
        :key="index">
    </li>
  </ul>
</template>

<script>
  const LENGTH = 5
  const CLS_ON = 'star_on'
  const CLS_HALF = 'star_half'
  const CLS_OFF = 'star_off'
  export default {
    name: 'star-rate',
    props: {
      value: {
        type: Number,
        default: 0
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      itemClasses() {
        let result = []
        let score = Math.floor(this.score * 2) / 2
        let hasDecimal = score % 1 !== 0
        let integer = Math.floor(score)
        for (let i = 0; i < integer; i++) {
          result.push(CLS_ON)
        }
        if (hasDecimal) {
          result.push(CLS_HALF)
        }
        while (result.length < LENGTH) {
          result.push(CLS_OFF)
        }
        return result
      }
    },
    data() {
      return {
        score: this.value
      }
    },
    methods: {
      mouseenter(index) {
        if (this.disabled) {
          return
        }
        this.score = index + 1
      },
      mouseleave() {
        if (this.disabled) {
          return
        }
        this.score = this.value
      },
      starClick(index) {
        if (this.disabled) {
          return
        }
        this.$emit('input', index + 1)
      }
    },
    watch: {
      'value'() {
        this.score = this.value
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.star-wrapper
  width: 110px
  height: 18px
  line-height: 18px
  li
    display: inline-block
    background-size: 18px 17px
    background-repeat: no-repeat
    width: 18px
    height: 17px
    padding-right: 3px
    transition: all .2s
    &.cur
      cursor: pointer
      &:hover
        transform: scale(1.1)
    &.star_off
      background-image: url("../../assets/img/star/star_off.png")
    &.star_on
      background-image: url("../../assets/img/star/star_on.png")
    &.star_half
      background-image: url("../../assets/img/star/star_half.png")

</style>