const systemData = {
  labs: [
    { name: '实验室一', temp: 24, humidity: 67 },
    { name: '实验室二', temp: 24, humidity: 67 },
    { name: '实验室三', temp: 24, humidity: 67 },
    { name: '实验室四', temp: 24, humidity: 67 },
    { name: '实验室五', temp: 24, humidity: 67 },
  ],
  warehouses: [
    { name: '原料间', state: 1, msg: '运行中' },
    { name: '原料暂存间', state: 3, msg: '出库异常' },
    { name: '成品暂存间', state: 2, msg: '正在入库' },
    { name: '成品间', state: 2, msg: '正在出库' },
  ],
  health: {
    tested: 168,
    irregular: 0,
  },
  disinfection: {
    start: '00:00',
    end: '00:20',
    count: 37,
    etd: { h: 0, m: 0, s: 0 },
  },
}

export const getSysStatus = () => systemData
