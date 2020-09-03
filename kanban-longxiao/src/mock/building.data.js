import { dayOfMonth, hourOfDay, lastMonth, thisMonth, today, yesterday } from './common.data'

function createLine (size, delta, start, base = 0) {
  base = Array.isArray(base) ? base : [base]
  base = base.length ? base : [0]
  const part = size / (base.length || 1)
  return Array(size).fill(0).map((_, i) => (Math.random() - (0.5 - base[Math.floor(i / part)])) * delta)
    .reduce((r, n, i) => [...r, +((r[i - 1] || start) + n).toFixed()], [])
    .map(n => n < 0 ? 0 : n)
}

const dailyWater = [
  ...createLine(24, 60, 100, [.1, .3, .4, -.1, 0, -.6]).map((v, i) => ({
    time: yesterday + ' ' + (i + 1),
    value: +v.toFixed(),
  })),
  ...createLine(hourOfDay() - 1, 40, 120, [.1, .5, -.2, .1, .2, -.5]).map((v, i) => ({
    time: today + ' ' + (i + 1),
    value: +v.toFixed(),
  })),
]

const monthWater1 = createLine(30, 12, 20).map((v, i) => ({ date: [lastMonth, i + 1].join('-'), flow: v }))
const monthWater2 = monthWater1.slice(0, dayOfMonth()).map(d => ({
  date: d.date.replace(lastMonth, thisMonth),
  flow: d.flow + +(Math.random() * Math.random() * 30).toFixed(),
}))

const dailyPower1 = [
  125, 237, 338, 227, 445, 583, 742, 797, 838, 601, 628, 504,
  589, 687, 599, 521, 543, 515, 409, 498, 394, 380, 253, 132,
]
const dailyPower2 = dailyPower1.slice(0, hourOfDay() - 1).map(n => n + +(Math.random() * 300 - 150).toFixed())
const dailyPower = [
  ...dailyPower1.map((v, i) => ({ value: v, time: yesterday + ' ' + (i + 1) })),
  ...dailyPower2.map((v, i) => ({ value: v, time: today + ' ' + (i + 1) })),
]

const monthPower = [
  ...createLine(30, 40, 200).map((v, i) => ({
    time: [lastMonth, (i + 1)].join('-'),
    value: +v.toFixed(),
  })),
  ...createLine(dayOfMonth(), 30, 200).map((v, i) => ({
    time: [thisMonth, (i + 1)].join('-'),
    value: +v.toFixed(),
  })),
]

export const getEnergy = () => [{
  water: {
    dailyFlow: 3.75,
    thisMonthAllFlow: 67.35,
    compareLastMonth: 2.6,
    lastMonthDailyFlow: monthWater1,
    thisMonthDailyFlow: monthWater2,
    hourNumberDetail: dailyWater,
  },
  energy: {
    data: {
      data: {
        dayNumber: 1321.3,
        monthNumber: 24713.6,
        monthRatio: -0.13,
        hourNumberDetail: dailyPower,
        dayNumberDetail: monthPower,
      },
    },
  },
}]
