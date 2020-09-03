import {request} from '../common'
import config from '@/config'

const prev = config.prev
export default {
  activeCode: {
    paged(query) {
      return request('post', prev + '/manage/activeCode/paged', query)
    },
    subPaged(query) {
      return request('post', prev + '/manage/activeCodeActionLog/paged', query)
    }
  },
  activeCodeType: {
    add(info) {
      return request('post', prev + '/manage/activeCodeType/add', info)
    },
    update(info) {
      return request('post', prev + '/manage/activeCodeType/update', info)
    },
    delete(idList) {
      return request('get', prev + '/manage/activeCodeType/del', {idList: idList.toString()})
    },
    get(id) {
      return request('post', prev + '/manage/activeCodeType/get', {id})
    },
    groupTree(id) {
      return request('post', prev + '/manage/activeCodeType/groupTree', {id})
    },
    paged(query) {
      return request('post', prev + '/manage/activeCodeType/paged', query)
    }
  },
  activeCodeAction: {
    add(info) {
      return request('post', prev + '/manage/activeCodeAction/add', info)
    },
    update(info) {
      return request('post', prev + '/manage/activeCodeAction/update', info)
    },
    delete(idList) {
      return request('get', prev + '/manage/activeCodeAction/del', {idList: idList.toString()})
    },
    get(id) {
      return request('post', prev + '/manage/activeCodeAction/get', {id})
    },
    paged(query) {
      return request('post', prev + '/manage/activeCodeAction/paged', query)
    }
  }
}