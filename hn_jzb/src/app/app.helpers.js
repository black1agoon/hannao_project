import store from '@/store'
import config from '@/config'
export default {
  getMenuChildKey() {
    if (store.state.systype === 'company') {
      return 'childCompanyPermission'
    } else {
      return 'childUserPermission'
    }
  },
  getMainButtons(config) {
    let path = store.state.route.path
    let menus = store.state.menus
    let buttons = []
    if (menus) {
      let cup = this.getMenuChildKey()
      let findButtons = menus => {
        menus.find(menu => {
          if (menu.resourceType === '0') {
            // menu is a folder
            return findButtons(menu[cup])
          } else {
            // menu is a page
            if (menu.url === path && menu[cup]) {
              buttons = menu[cup].sort((b1, b2) => b1.seq - b2.seq).filter(n => {
                return n.resourceType !== '3'
              })
              return true
            }
          }
          return false
        })
      }
      findButtons(menus)
    }
    return buttons
  },
  getMainFilterButtons(buttons, filter = []) {
    let _filter = ['btnEdit', 'btnDelete'].concat(filter)
    return buttons.filter(btn => {
      return !_filter.includes(btn.btnKey)
    })
  },
  getTableButtons(buttons, includes = []) {
    let _includes = ['btnEdit', 'btnDelete'].concat(includes)
    return buttons.filter(btn => {
      return _includes.includes(btn.btnKey)
    })
  },
  getPidName(treedata, pid) {
    let itemlist = []
    let traverse = list => {
      list.forEach(i => {
        itemlist.push(i)
        i.children && traverse(i.children)
      })
    }
    traverse(treedata)
    let node = itemlist.find(item => {
      return item.id === pid
    })
    return node ? node.label : '根部门'
  },
  getCheckedList(data, key) {
    let itemlist = []
    let traverse = list => {
      list.forEach(i => {
        let con1 = i.resourceType === '2' || (i.resourceType === '3' && i[key] && i[key].length === 0)  // 该节点是 按钮 或者 (权限 权限下面没内容)
        let con2 = i.resourceType === '1' && (i[key].length === 0)   // 该节点是页面, 并且页面下没有挂在任何权限
        if (i.selected === '1' && (con1 || con2)) {
          itemlist.push(i.id)
        }
        i[key] && i[key].length > 0 && traverse(i[key])
      })
    }
    traverse(data)
    return itemlist
  },
  getTreeData: (treedata, childProp, prop) => {
    let sortNodes = nodes => nodes.sort((a, b) => a.seq - b.seq)
    let setName = node => {
      let hasChildren = node[childProp] && node[childProp].length > 0
      return {
        id: node.id,
        label: node[prop],
        icon: hasChildren ? 'fa-folder' : 'fa-gear',
        resourceType: node.resourceType,
        children: hasChildren ? sortNodes(node[childProp]).map(setName) : undefined
      }
    }
    return sortNodes(treedata).map(setName)
    // let setName = nodes => {  // 方法二
    //   return nodes.map(node => {
    //     let hasChildren = node[childProp] && node[childProp].length > 0
    //     return {
    //       id: node.id,
    //       label: node.name,
    //       icon: hasChildren ? 'fa-folder' : 'fa-gear',
    //       children: hasChildren ? setName(sortNodes(node[childProp])) : undefined
    //     }
    //   })
    // }
    // return setName(sortNodes(treedata))
  },
  getCascaderData: (treedata, childProp, filter = null) => {
    let sortNodes = nodes => nodes.sort((a, b) => a.seq - b.seq)
    let setName = node => {
      let hasChildren = node[childProp] && node[childProp].length > 0 && (!filter || filter._filter(node))
      return {
        value: node.id,
        label: node.name,
        children: hasChildren ? sortNodes(node[childProp]).map(setName) : undefined
      }
    }
    return sortNodes(treedata).map(setName)
  },
  getImgUrl: (url) => {
    return url ? config.serverURI + url : ''
  },
  getFlieList: (list) => {
    if (list && Array.isArray(list) && list.length > 0) {
      return list.map(l => ({
        name: l.split('/')[l.split('/').length - 1],
        url: config.serverURI + l
      }))
    } else {
      return []
    }
  },
  formatBirthday: (birthday) => {
    return birthday ? birthday.substring(0, 10) : ''
  }
}
