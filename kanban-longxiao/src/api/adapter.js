import {
  getStockChartOptions,
  getDeviceOutputChartOptions,
  getDailyChartOptions,
  getMonthlyChartOptions,
} from '@/config/flow-chart.config'

const parseTimeValues = function (timeValues, type = 'date', xType = 'hour') {
  const series = {}
  timeValues.forEach(hd => {
    const date = hd.time.replace(/ .*/, '')
    const times = {
      date,
      month: date.replace(/-\d*$/, ''),
      hour: hd.time.replace(/.* 0?/, ''),
      day: date.replace(/^.*-/, ''),
    }
    // console.log('times', times)
    if (!series[times[type]]) {
      series[times[type]] = []
    }
    series[times[type]].push({ ...hd, ...times })
  })
  const days = Object.keys(series).sort()
  const [yesterday, today] = days.map(k => series[k]).map(d => d.map(v => [v[xType], v.value]))
  const monthDate = days.length ? days[days.length - 1].replace(/^\d+-/, '') : ''
  // console.log({
  //   monthDate,
  //   yesterday,
  //   today,
  //   lastMonth: yesterday,
  //   thisMonth: today,
  // })
  return {
    monthDate,
    yesterday,
    today,
    lastMonth: yesterday,
    thisMonth: today,
  }
}

const dayWaterChart = function (hourlyData = []) {
  const { monthDate, yesterday, today } = parseTimeValues(hourlyData)
  return getDailyChartOptions([{
      name: '昨日用水量',
      data: yesterday,
      color: '#9DBAFF',
    }, {
      name: '今日用水量',
      data: today,
      color: '#48F3FA',
    }],
    { config: { title: monthDate + '用水量分时统计' } },
    null,
    '吨',
  )
}

const dayPowerChart = function (hourlyData = []) {
  const { monthDate, yesterday, today } = parseTimeValues(hourlyData)
  return getDailyChartOptions([{
      name: '昨日用电量',
      data: yesterday,
      color: '#BEBEBE',
    }, {
      name: '今日用电量',
      data: today,
      color: '#FFF369',
    }],
    { config: { title: monthDate + '用电量分时统计' } },
    null,
    'kW·h',
  )
}

const accumulateDaily = function (dayList = [], valueField = 'value', dateField = 'date') {
  return dayList.reduce((r, d) => [...r, {
    date: d[dateField],
    value: (r[r.length - 1]?.value || 0) + d[valueField],
  }], []).map(d => [d.date.replace(/.*-/, ''), d.value])
}

const monthPowerChart = function (dailyData = []) {
  const { lastMonth, thisMonth } = parseTimeValues(dailyData, 'month', 'day')
  return getMonthlyChartOptions([{
    name: '每日用电量',
    data: thisMonth,
    color: '#9DBAFF',
    type: 'bar',
  }, {
    name: '本月累计用电量',
    data: accumulateDaily(thisMonth, 1, 0),
    color: '#FFF369',
  }, {
    name: '上月累计用电量',
    data: accumulateDaily(lastMonth, 1, 0),
    color: '#BEBEBE',
  }], {
    config: { title: '本月累计用电量统计' },
  }, dailyData.map(date => date.time.substring(8, 11)), 'kW·h')
}

const monthWaterChart = function (thisMonth = [], lastMonth = []) {
  return getMonthlyChartOptions([{
    name: '每日用水量',
    data: thisMonth.map(d => [d.date.replace(/.*-/, ''), d.flow]),
    color: '#9DBAFF',
    type: 'bar',
  }, {
    name: '本月累计用水量',
    data: accumulateDaily(thisMonth, 'flow'),
    color: '#48F3FA',
  }, {
    name: '上月累计用水量',
    data: accumulateDaily(lastMonth, 'flow'),
    color: '#9DBAFF',
  }], {
    config: { title: '本月累计用水量统计' },
  }, null, '吨')
}

const productInventoryChart = function (cargoList = []) {
  const colors = ['#48F3FA', '#FFF369']
  return getStockChartOptions(cargoList.map((cargo, idx) => ({
    name: cargo.name,
    data: cargo.data.map(m => [(m.date.match(/\d+(?=(T| |$))/g) || [])[0], m.totalNumber]),
    color: colors[idx % colors.length],
  })), { config: { title: '成品仓15天库存数量分布' } })
}

const deviceOutputChart = function (deviceOutputData) {
  return getDeviceOutputChartOptions(deviceOutputData.map((d, idx) => ({
    ...d,
    color: idx % 2 ? '#8FA4D5' : '#FFF369',
  })))
}

export const getChartOptions = function (type) {
  return {
    dayPower: dayPowerChart,
    dayWater: dayWaterChart,
    monthWater: monthWaterChart,
    monthPower: monthPowerChart,
    productInventory: productInventoryChart,
    deviceOutput: deviceOutputChart,
  }[type]
}
