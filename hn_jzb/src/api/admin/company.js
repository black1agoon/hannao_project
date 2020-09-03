import {request, userSYS} from '../common'
const prev = userSYS.pac
export default {
  companyIndustry: {
    addCompanyIndustry(info) {
      return request('post', prev + '/companyIndustry/add', info)
    },
    updateCompanyIndustry(info) {
      return request('post', prev + '/companyIndustry/update', info)
    },
    deleteCompanyIndustry(id) {
      return request('get', prev + '/companyIndustry/del', {id})
    },
    getCompanyIndustry(id) {
      return request('get', prev + '/companyIndustry/get', {id})
    },
    getCompanyIndustryPaged(query) {
      return request('post', prev + '/companyIndustry/paged', query)
    }
  },
  companyPermission: {
    addCompanyPermission(info) {
      return request('post', prev + '/companyPermission4Base/add', info)
    },
    updateCompanyPermission(info) {
      return request('post', prev + '/companyPermission4Base/update', info)
    },
    deleteCompanyPermission(id) {
      return request('get', prev + '/companyPermission4Base/del', {id})
    },
    getCompanyPermission(id) {
      return request('get', prev + '/companyPermission4Base/get', {id})
    },
    getCompanyAllPermissionTree() {
      return request('get', prev + '/companyPermission4Base/newpermission')
    },
    getCompanyPermissionTree(query) {
      return request('post', prev + '/companyPermission4Base/permissionTree', query)
    },
    setCompanyPermission(info) {
      return request('post', prev + '/companyPermission4Base/setCompanyPermission', info)
    },
    setCompanySysDefault(id) {
      return request('get', prev + '/companyPermission4Base/sysDefault', {id})
    }
  },
  companyGrade: {
    addCompanyGrade(info) {
      return request('post', prev + '/companyGrade4Base/add', info)
    },
    updateCompanyGrade(info) {
      return request('post', prev + '/companyGrade4Base/update', info)
    },
    deleteCompanyGrade(id) {
      return request('get', prev + '/companyGrade4Base/del', {id})
    },
    getCompanyGrade(id) {
      return request('get', prev + '/companyGrade4Base/get', {id})
    },
    getCompanyGradeEnablePaged(query) {
      return request('post', prev + '/companyGrade4Base/enablePaged', query)
    },
    getCompanyGradePaged(query) {
      return request('post', prev + '/companyGrade4Base/paged', query)
    },
    changeCompanyGradeStatusSwitch(params) {
      return request('get', prev + '/companyGrade4Base/statusSwitch', params)
    },
    setCompanyGradePermission(params) {
      return request('post', prev + '/companyGrade4Base/setGradePermission', params)
    },
    getCompanyGradePermissionTree(query) {
      return request('post', prev + '/companyGrade4Base/gradePermissionTree', query)
    }
  },
  company: {
    addCompany(info) {
      return request('post', prev + '/company4Base/add', info)
    },
    updateCompany(info) {
      return request('post', prev + '/company4Base/update', info)
    },
    deleteCompany(id) {
      return request('get', prev + '/company4Base/del', {id})
    },
    getCompany(id) {
      return request('get', prev + '/company4Base/get', {id})
    },
    getCompanyPaged(query) {
      return request('post', prev + '/company4Base/paged', query)
    },
    getCompanyPassedPaged(query) {
      return request('post', prev + '/company4Base/passedPaged', query)
    },
    getCompanyDetail(id) {
      return request('get', prev + '/company4Base/detail', {id})
    },
    getCompanyCooApplyGet(id) {
      return request('get', prev + '/companyCooApply4Base/get', {id})
    },
    getCompanyCoopAudit(data) {
      return request('post', prev + '/companyCooApply4Base/review', data)
    }
  }
}
