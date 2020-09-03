import {request, usersys} from '../common'

const prev = usersys.sl
export default {
  light: {
    add(info) {
      return request('post', prev + '/admin/light/add', info)
    },
    delete(info) {
      return request('post', prev + '/admin/light/del', info)
    },
    update(info) {
      return request('post', prev + '/admin/light/update', info)
    },
    paged(query) {
      return request('post', prev + '/admin/light/paged', query)
    },
    control(list) {
      return request('post', prev + '/admin/light/control', list)
    },
    setPeriodStatus(info) {
      return request('post', prev + '/admin/light/periodStatus', info)
    }
  },
  lightGroup: {
    add(info) {
      return request('post', prev + '/admin/lightGroup/add', info)
    },
    update(info) {
      return request('post', prev + '/admin/lightGroup/update', info)
    },
    delete(id) {
      return request('get', prev + '/admin/lightGroup/del', {id})
    },
    paged(query) {
      return request('post', prev + '/admin/lightGroup/paged', query)
    }
  },
  lightPeriodTime: {
    add(info) {
      return request('post', prev + '/admin/periodTime/add', info)
    },
    update(info) {
      return request('post', prev + '/admin/periodTime/update', info)
    },
    delete(idList) {
      return request('post', prev + '/admin/periodTime/del', {idList})
    },
    paged(query) {
      return request('post', prev + '/admin/periodTime/paged', query)
    }
  },
  lightPeriodDay: {
    add(info) {
      return request('post', prev + '/admin/periodDay/add', info)
    },
    update(info) {
      return request('post', prev + '/admin/periodDay/update', info)
    },
    delete(idList) {
      return request('post', prev + '/admin/periodDay/del', {idList})
    },
    paged(query) {
      return request('post', prev + '/admin/periodDay/paged', query)
    }
  },
  lightPeriodWeek: {
    getList(type) {
      return request('get', prev + '/admin/periodWeek/list', {type})
    },
    select(info) {
      return request('post', prev + '/admin/periodWeek/select', info)
    }
  },
  electric: {
    paged(query) {
      return request('post', prev + '/admin/electric/pagedEquipment', query)
    },
    monthEvery(query) {
      return request('post', prev + '/admin/electric/monthEvery', query)
    },
    yearEvery(query) {
      return request('post', prev + '/admin/electric/yearEvery', query)
    }
  },
  periodType: {
    add(info) {
      return request('post', prev + '/admin/periodType/add', info)
    },
    delete(idList) {
      return request('post', prev + '/admin/periodType/del', {idList})
    },
    all() {
      return request('get', prev + '/admin/periodType/all')
    },
    setUse(id) {
      return request('post', prev + '/admin/periodType/setUse', {id}, {})
    }
  },
  periodTimeDetail: {
    add(info) {
      return request('post', prev + '/admin/periodTimeDetail/add', info)
    },
    update(info) {
      return request('post', prev + '/admin/periodTimeDetail/update', info)
    },
    delete(idList) {
      return request('post', prev + '/admin/periodTimeDetail/del', {idList})
    },
    paged(query) {
      return request('post', prev + '/admin/periodTimeDetail/paged', query)
    }
  }
}