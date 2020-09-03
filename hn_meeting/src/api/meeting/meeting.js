import {request} from '../common'
import config from '@/config'
const prev = config.prev
export default {
  meeting: {
    uploadFile(file) {
      let data = new FormData()
      data.append('file', file.file)
      return request('post', prev + '/meeting/upload', data)
    },
    getDeptree(agencyId) {
      return request('get', prev + '/admin/tree', {agencyId})
    },
    getDepEmp(query) {
      return request('get', prev + '/admin/getDepEmp', query)
    }
  },
  meetingCalendar: {
    add(info) {
      return request('post', prev + '/agencyMeeting/add', info)
    },
    cancel(id) {
      return request('get', prev + '/agencyMeeting/cancel', {id})
    },
    update(info) {
      return request('post', prev + '/agencyMeeting/update', info)
    },
    finishMeeting(id) {
      return request('get', prev + '/agencyMeeting/finishMeeting', {id})
    },
    getMyMeeting(query) {
      return request('post', prev + '/agencyMeeting/getMyMeeting', query)
    },
    getMonthMeeting(query) {
      return request('post', prev + '/agencyMeeting/getMonthMeeting', query)
    },
    getDayMeeting(query) {
      return request('post', prev + '/agencyMeeting/getDayMeeting', query)
    },
    getDetail(id) {
      return request('get', prev + '/agencyMeeting/getMeetingDetail', {id})
    },
    getNextMeeting() {
      return request('get', prev + '/agencyMeeting/getUserNextMeeting')
    },
    getAttendDetail(id) {
      return request('get', prev + '/agencyMeeting/getAttendDetail', {id})
    },
    getYearMeeting(query) {
      return request('post', prev + '/agencyMeeting/getYearMeeting', query)
    }
  },
  meetingRoom: {
    add(info) {
      return request('post', prev + '/meetingRoom/add', info)
    },
    update(info) {
      return request('post', prev + '/meetingRoom/update', info)
    },
    delete(id) {
      return request('get', prev + '/meetingRoom/del', {id})
    },
    get(id) {
      return request('get', prev + '/meetingRoom/getInfoById', {id})
    },
    paged(query) {
      return request('post', prev + '/meetingRoom/pageInfo', query)
    }
  },
  meetingPeriod: {
    add(info) {
      return request('post', prev + '/periodMeeting/addUpdate', info)
    },
    update(info) {
      return request('post', prev + '/periodMeeting/addUpdate', info)
    },
    cancel(id) {
      return request('post', prev + '/periodMeeting/cancel', {id}, {})
    },
    paged(query) {
      return request('post', prev + '/periodMeeting/pageInfo', query)
    },
    get(id) {
      return request('get', prev + '/periodMeeting/getInfoById', {id})
    }
  },
  meetingAdmin: {
    add(info) {
      return request('post', prev + '/admin/add', info)
    },
    cancel(id) {
      return request('get', prev + '/admin/cancel', {id})
    },
    update(info) {
      return request('post', prev + '/admin/update', info)
    },
    finishMeeting(id) {
      return request('get', prev + '/admin/finishMeeting', {id})
    },
    getEmpMeeting(query) {
      return request('post', prev + '/admin/getEmpMeeting', query)
    },
    getMonthMeeting(query) {
      return request('post', prev + '/admin/getMonthMeeting', query)
    },
    getDayMeeting(query) {
      return request('post', prev + '/admin/getDayMeeting', query)
    },
    getDetail(id) {
      return request('get', prev + '/admin/getMeetingDetail', {id})
    },
    getNextMeeting() {
      return request('get', prev + '/admin/getNextMeeting')
    },
    getAttendDetail(id) {
      return request('get', prev + '/admin/getAttendDetail', {id})
    },
    getYearMeeting(query) {
      return request('post', prev + '/admin/getYearMeeting', query)
    }
  },
  home: {
    getMeetingNum(date) {
      return request('get', prev + '/agencyMeeting/getMeetingNumber', {date})
    },
    getMeetingList(query) {
      return request('get', prev + '/agencyMeeting/getMeetingList', query)
    }
  }
}

