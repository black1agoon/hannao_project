export default {
  SET_USER (state, user) {
    state.user = user
  },
  SET_RGUSER (state, user) {
    state.rgUser = user
  },
  SET_RGMSG (state, msg) {
    state.rgMsg = msg
  },
  SET_RGFORM (state, formdata) {
    state.rgFormdata = formdata
  },
  SET_CODE (state, code) {
    state.code = code
  },
  SET_TOKEN (state, token) {
    state.token = token
  },
  ADD_TAB (state, tab) {
    if (tab.fullPath === '/') {
      state.tabs.unshift(tab)
    } else {
      state.tabs.push(tab)
    }
  },
  ADD_TAB_IN (state, tabObj) {
    state.tabs.splice(tabObj.index, 0, tabObj.tab)
  },
  REMOVE_TAB (state, tabName) {
    let idx = state.tabs.findIndex(tab => tab.name === tabName)
    state.tabs.splice(idx, 1)
  },
  CLEAR_TAB (state) {
    state.tabs = []
  },
  TOGGLE_TAB_KEEP (state, obj) {
    state.tabs[obj.index].keep = obj.boolean
  },
  UPDATE_TAB(state, obj) {
    let idx = state.tabs.findIndex(tab => tab.name === obj.name)
    Object.assign(state.tabs[idx], obj)
  },
  UPDATE_TAB_TITLE (state, obj) {
    state.tabs[obj.index].title = obj.title
  },
  SET_MENUS (state, menus) {
    state.menus = menus
  },
  SET_SUBSYS (state, subsys) {
    state.subsys = subsys
  },
  SET_SYSTYPE(state, systype) {
    state.systype = systype
  },
  SET_DASHBOARDS(state, dashboards) {
    state.dashboards = dashboards
  },
  SET_SHOWDASH(state, dash) {
    state.showdash = dash
  }
}
