import { gcdOfArray } from '@/utils/math'
import { actionIntervals } from '@/config/fetching.config'
import { timerConfig } from '@/config'

const actions = Object.entries(actionIntervals).map(([action, time]) => {
  return typeof time === 'object' ? {
    action,
    time: time.interval || timerConfig.fetching,
    params: time.params,
  } : {
    action,
    time,
  }
})

const update = function (dispatch, currentTime) {
  actions.forEach(({ action, time, params }) => {
    if (!(currentTime % time)) {
      dispatch(action, params)
    }
  })
}

export const start = function (dispatch) {
  const minInterval = gcdOfArray(actions.map(a => a.time).sort())
  let count = 0
  update(dispatch, 0)
  window.setInterval(() => {
    count++
    update(dispatch, count * minInterval)
  }, minInterval * 1000)
}
