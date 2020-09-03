const deviceStatusData = [
  {
    name: '一号机',
    uptime: 2573,
    dailyOutput: 3687,
    currentTask: '4377899',
    customer: '浙江汉脑',
    task: 300000,
    finished: 3795,
    due: '04-09 12:35',
    state: 0,
  },
  {
    name: '二号机',
    uptime: 2573,
    dailyOutput: 1937,
    currentTask: '4377899',
    customer: '浙江汉脑',
    task: 300000,
    finished: 62381,
    due: '04-10 23:52',
    state: 1,
  },
]

const deviceOutputData = [
  {
    name: '一号机',
    data: Array(new Date().getDate()).fill(0).map(() => (Math.random() * 1000).toFixed()),
    quality: 0.868,
  },
  {
    name: '二号机',
    data: Array(new Date().getDate()).fill(0).map(() => (Math.random() * 1000).toFixed()),
    quality: 0.860,
  },
]

export const getDeviceStatus = () => deviceStatusData

export const getDeviceOutput = () => deviceOutputData
