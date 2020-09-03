import store from '../../store'
export default {
  postMsg: options => {
    if (store.state.isNew) {
      window.ReactNativeWebView.postMessage(JSON.stringify(options))
    } else {
      window.postMessage(JSON.stringify(options))
    }
  }
}
