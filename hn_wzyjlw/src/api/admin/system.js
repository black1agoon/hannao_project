import {request, userSYS} from '../common'

const prev = userSYS.jlw
export default {
  public: {
    login(user) {
      return request('post', prev + '/public/login', user)
    },
    logout() {
      return request('post', prev + '/public/logout')
    },
    uploadAvatar(file) {
      let data = new FormData()
      data.append('file', file)
      // let headers = {'Content-Type': 'multipart/form-data'}
      return request('post', prev + '/upload/uploadAvatar', data)
    },
    uploadDoc(file) {
      let data = new FormData()
      data.append('file', file)
      // let headers = {'Content-Type': 'multipart/form-data'}
      return request('post', prev + '/upload/uploadDoc', data)
    },
    upload4CompanyPic(file, compressed = false) {
      let data = new FormData()
      data.append('file', file)
      // let headers = {'Content-Type': 'multipart/form-data'}
      let reqUrl = prev + '/upload4Company/uploadPic'
      if (compressed) {
        reqUrl += '?m=c&w=180&h=180'
      }
      return request('post', reqUrl, data)
    },
    uploadPic(file) {
      let data = new FormData()
      data.append('file', file)
      // let headers = {'Content-Type': 'multipart/form-data'}
      return request('post', prev + '/upload/uploadPic', data)
    },
    uploadVideo(file) {
      let data = new FormData()
      data.append('file', file)
      // let headers = {'Content-Type': 'multipart/form-data'}
      return request('post', prev + '/upload/uploadVideo', data)
    },
    getRegionProv() {
      return request('get', prev + '/region/prov')
    },
    getRegionCities(prov) {
      return request('get', prev + '/region/cities', {prov})
    },
    getRegionDistrict(city) {
      return request('get', prev + '/region/district', {city})
    },
    getRegionById(id) {
      return request('get', prev + '/region/getRegionById', {id})
    },
    updateCache() {
      return request('post', prev + '/public/updateCache')
    }
  },
  permission: {
    getAllPermissionTree() {
      return request('get', prev + '/permission/newpermission')
    },
    getPermission(id) {
      return request('post', prev + '/permission/get', {id})
    },
    addPermission(info) {
      return request('post', prev + '/permission/add', info)
    },
    updatePermission(info) {
      return request('post', prev + '/permission/update', info)
    },
    deletePermission(id) {
      return request('post', prev + '/permission/del', {id})
    },
    getPermissRoleTree(query) {   // 用于显示角色对应的树状权限列表,获取子系统下所有的权限
      return request('post', prev + '/permission/roletree', query)
    }
  },
  dictionary: {
    addAttrCode(info) {
      return request('post', prev + '/attrCode/add', info)
    },
    updateAttrCode(info) {
      return request('post', prev + '/attrCode/update', info)
    },
    deleteAttrCode(id) {
      return request('get', prev + '/attrCode/del', {id})
    },
    getAttrCodeById(id) {
      return request('get', prev + '/attrCode/get', {id})
    },
    getPaged(query) {
      return request('post', prev + '/attrCode/paged', query)
    },
    addAttrValue(info) {
      return request('post', prev + '/attrValue/add', info)
    },
    updateAttrValue(info) {
      return request('post', prev + '/attrValue/update', info)
    },
    deleteAttrValue(id) {
      return request('get', prev + '/attrValue/del', {id})
    },
    getAttrValueById(id) {
      return request('get', prev + '/attrValue/get', {id})
    },
    getValuePaged(query) {
      return request('post', prev + '/attrValue/getPagedByAttrCode', query)
    }
  },
  department: {
    getTree(query) {
      return request('get', prev + '/department/tree', query)
    },
    getDepartment(id) {
      return request('get', prev + '/department/get', {id})
    },
    addDepartment(info) {
      return request('post', prev + '/department/add', info)
    },
    updateDepartment(info) {
      return request('post', prev + '/department/update', info)
    },
    deleteDepartment(id) {
      return request('get', prev + '/department/del', {id})
    },
    getTreeNoOwn(info) {
      return request('post', prev + '/department/treeNoOwn', info)
    }
  },
  user: {
    getPaged(query) {
      return request('post', prev + '/user/paged', query)
    },
    addUser(info) {
      return request('post', prev + '/user/add', info)
    },
    updateUser(info) {
      return request('post', prev + '/user/update', info)
    },
    deleteUser(id) {
      return request('post', prev + '/user/del', {id})
    },
    getUser(id) {
      return request('post', prev + '/user/get', {id})
    },
    updateUserPwd(info) {
      return request('post', prev + '/user/updatePassword', info)
    },
    enableUser(info) {
      return request('post', prev + '/user/enable', info)
    },
    disableUser(info) {
      return request('post', prev + '/user/disable', info)
    },
    getNoUsedPaged(query) {
      return request('post', prev + '/user/pagedNoUsed', query)
    }
  },
  role: {
    getPaged(query) {
      return request('post', prev + '/role/paged', query)
    },
    addRole(info) {
      return request('post', prev + '/role/add', info)
    },
    updateRole(info) {
      return request('post', prev + '/role/update', info)
    },
    deleteRole(id) {
      return request('post', prev + '/role/del', {id})
    },
    getRole(id) {
      return request('post', prev + '/role/get', {id})
    },
    setRolePermission(query) {
      return request('post', prev + '/role/setRolePermission', query)
    },
    setUserRoles(info) {
      return request('post', prev + '/role/setUserRole', info)
    }
  },
  params: {
    add(info) {
      return request('post', prev + '/parameters/add', info)
    },
    update(info) {
      return request('post', prev + '/parameters/update', info)
    },
    delete(id) {
      return request('get', prev + '/parameters/del', {id})
    },
    get(id) {
      return request('get', prev + '/parameters/get', {id})
    },
    getAll() {
      return request('get', prev + '/parameters/get')
    },
    paged(query) {
      return request('post', prev + '/parameters/paged', query)
    }
  }
}
