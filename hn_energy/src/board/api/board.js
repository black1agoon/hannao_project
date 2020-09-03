import { request, system } from '@/board/api/common'
const prev = system.board
export default {
  board: {
    electric: {
      getThreeWeek() {
        return request('post', prev + '/electric/getThreeWeek', {})
      },
      allYear() {
        return request('post', prev + '/electric/allYear', {})
      },
      getDay() {
        return request('post', prev + '/electric/getDay', {})
      },
      getFloor(query) {
        return request('post', prev + '/electric/getFloor', query)
      },
      getTableTypeData(query) {
        return request('post', prev + '/electric/getTypeData', query)
      },
      getOneFloor(query) {
        return request('post', prev + '/electric/getOneFloor', query)
      }
    },
    water: {
      nearlyThreeDays() {
        return request('post', prev + '/water/nearlyThreeDays', {})
      },
      nearlyTwoYears() {
        return request('post', prev + '/water/nearlyTwoYears', {})
      },
      todayUsed() {
        return request('post', prev + '/water/todayUsed', {})
      },
      getFloor(query) {
        return request('post', prev + '/water/getFloor', query)
      },
      getTableTypeData(query) {
        return request('post', prev + '/water/getTypeData', query)
      }
    }
  }
}
