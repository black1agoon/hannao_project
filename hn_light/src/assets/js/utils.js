import config from '@/config'

export default {
  getImageSrc(url) {
    return config.serverURI + url
  },
  scroll2Pos(el, _this) {
    _this.$nextTick(() => {
      window.scrollTo(0, el.offsetTop)
    })
  }
}