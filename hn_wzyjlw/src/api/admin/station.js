import {request, download, userSYS} from '../common'
const prev = userSYS.jlw
export default {
  stationType: {
    add(info) {
      return request('post', prev + '/equipmentType/add', info)
    },
    update(info) {
      return request('post', prev + '/equipmentType/update', info)
    },
    delete(id) {
      return request('get', prev + '/equipmentType/del', {id})
    },
    get(id) {
      return request('get', prev + '/equipmentType/get', {id})
    },
    paged(query) {
      return request('post', prev + '/equipmentType/paged', query)
    },
    getDefault() {
      return request('get', prev + '/equipmentType/getDefault')
    },
    setDefault(id) {
      return request('get', prev + '/equipmentType/setDefault', {id})
    }
  },
  station: {
    add(info) {
      return request('post', prev + '/station/add', info)
    },
    update(info) {
      return request('post', prev + '/station/update', info)
    },
    delete(id) {
      return request('get', prev + '/station/del', {id})
    },
    get(id) {
      return request('get', prev + '/station/get', {id})
    },
    paged(query) {
      return request('post', prev + '/station/paged', query)
    }
  },
  stationValue: {
    add(info) {
      return request('post', prev + '/equipmentValue/add', info)
    },
    update(info) {
      return request('post', prev + '/equipmentValue/update', info)
    },
    delete(id) {
      return request('get', prev + '/equipmentValue/del', {id})
    },
    get(id) {
      return request('get', prev + '/equipmentValue/get', {id})
    },
    paged(query) {
      return request('post', prev + '/equipmentValue/paged', query)
    },
    getChoose(stationId) {
      return request('get', prev + '/equipmentValue/choose', {stationId})
    },
    setChange(info) {
      return request('post', prev + '/equipmentValue/change', info)
    }
  },
  stationRecord: {
    add(info) {
      return request('post', prev + '/stationRecord/add', info)
    },
    update(info) {
      return request('post', prev + '/stationRecord/update', info)
    },
    delete(id) {
      return request('get', prev + '/stationRecord/del', {id})
    },
    get(id) {
      return request('get', prev + '/stationRecord/get', {id})
    },
    paged(query) {
      return request('post', prev + '/stationRecord/paged', query)
    }
  },
  stationErrRecord: {
    add(info) {
      return request('post', prev + '/stationRecordError/add', info)
    },
    update(info) {
      return request('post', prev + '/stationRecordError/update', info)
    },
    delete(id) {
      return request('get', prev + '/stationRecordError/del', {id})
    },
    get(id) {
      return request('get', prev + '/stationRecordError/get', {id})
    },
    paged(query) {
      return request('post', prev + '/stationRecordError/paged', query)
    },
    errorDetail(info) {
      return request('post', prev + '/stationRecordError/errorDetail', info)
    }
  },
  stationReport: {
    exportReport(query) {
      return download('post', prev + '/spinnerReport/export', query, null, 'arraybuffer')
    },
    paged(query) {
      return request('post', prev + '/spinnerReport/paged', query)
    }
  }
}

