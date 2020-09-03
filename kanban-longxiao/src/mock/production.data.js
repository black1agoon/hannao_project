import { last15Days } from './common.data'

const today = new Date()
const oneDay = 24 * 60 * 60 * 1000

const orderData = Array(6).fill(0)
  .map(() => [+Math.random().toFixed(1) * 300000 + 10000, Math.random(), Math.random()])
  .map(([n, r, d]) => ({
    code: '4377899',
    customer: '浙江汉脑',
    product: '医用防护口罩',
    total: n.toFixed(),
    finished: (n * r).toFixed(),
    hod: new Date(today.getTime() + d * 100 * oneDay)
      .toISOString().replace(/\d{4}-/, '').replace(/T.*/, ''),
    status: d < 0.3,
  }))

export const getOrders = () => ({
  status: {
    pending: 15,
    producing: 6,
    overdue: 1,
  },
  orders: orderData,
})

export const getInventoryHistory = () => last15Days.map((date) => ({
  date,
  totalNumber: (Math.random() * 1000).toFixed(),
}))

export const getInventoryWeight = () => [
  { name: '原材料一', weight: 22.1 },
  { name: '原材料二', weight: 6 },
  { name: '原材料三', weight: 26 },
  { name: '原材料四', weight: 5 },
  { name: '原材料五', weight: 2 },
  { name: '原材料六', weight: 4 },
]
