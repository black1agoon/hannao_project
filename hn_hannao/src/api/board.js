import {request} from './common'
import config from '@/config'
const prev = '/service'
const prev2 = '/pac'
const prev3 = '/data-service'
export default {
  idsResolveController: {
    getIdentifierDistrict() { // 标识解析分布排序
      return request('get', config.serverURI + prev + '/idsResolve/identifierDistrict')
    },
    industrialResolveMonth() {
      return request('get', config.serverURI + prev + '/idsResolve/industrialResolveMonth')
    },
    resolveTotalAndCount() {
      return request('get', config.serverURI + prev + '/idsResolve/resolveTotalAndCount')
    }
  },
  idsResolveOverview: {
    getCompanyList() {  // 获取企业列表
      return request('get', config.serverURI + prev + '/idsResolveOverview/idsServiceCompanyList')
    },
    getAllData() { // 获取看板总数据
      return request('get', config.serverURI + prev + '/idsResolveOverview/idsalldataOverview')
    }
  },
  idsProductManagement: {
    getCompanyRank() {
      return request('post', config.jzbURI + prev2 + '/idsResolve/db1', {
        page: 1,
        pageSize: 999
      })
    },
    getOutsideData() {
      return request('get', config.jzbURI + prev2 + '/idsResolve/db0')
    },
    getProCharts() {
      return request('get', config.jzbURI + prev2 + '/idsResolve/db2')
    }
  },
  idsProductManageController: {
    getIdsProductManage() {
      return request('post', config.serverURI + prev + '/idsResolveProductManage/idsProductManage')
    }
  },
  idsResolveEdgeEquipment: {
    getEdgeEquipmentOverview() {
      return request('post', config.serverURI + prev + '/idsResolveOverview/edgeEquipmentOverview')
    }
  },
  mainview: {
    activeCodeMonth() {
      return request('get', config.idsURI + prev3 + '/manage/board/activeCodeMonth')
    },
    deviceStatus() {
      return request('get', config.idsURI + prev3 + '/manage/board/deviceStatus')
    },
    employeeCount() {
      return request('get', config.idsURI + prev3 + '/manage/board/employeeCount')
    },
    enterpriseDetail() {
      return request('get', config.idsURI + prev3 + '/manage/board/enterpriseDetail')
    },
    total() {
      return request('get', config.idsURI + prev3 + '/manage/board/total')
    },
    enterpriseDetailMX() {
      return request('post', config.idsURI + prev3 + '/manage/board/enterpriseDetailMX')
    },
    registerAndUse() {
      return request('post', config.idsURI + prev3 + '/manage/board/registerAndUse')
    },
    useDevice() {
      return request('post', config.idsURI + prev3 + '/manage/board/useDevice')
    },
    productTypeList() {
      return request('post', config.idsURI + prev3 + '/manage/board/productTypeList')
    },
    cardCompanyOrder() {
      return request('post', config.idsURI + prev3 + '/manage/board/cardCompanyOrder')
    },
    cardDayUsedStatics() {
      return request('post', config.idsURI + prev3 + '/manage/board/cardDayUsedStatics')
    },
    cardTotal() {
      return request('post', config.idsURI + prev3 + '/manage/board/cardTotal')
    },
    cardType() {
      return request('post', config.idsURI + prev3 + '/manage/board/cardType')
    },
  }
}