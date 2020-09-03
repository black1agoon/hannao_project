export default {
  scroll2Pos(el, _this) {
    _this.$nextTick(() => {
      window.scrollTo(0, el.offsetTop)
    })
  }
}