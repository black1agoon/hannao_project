import Colors from '@/config/colors';

// Energy Box

export const energyData = [
  { name: 'water', label: '水', value: 16, plan: 50, unit: 't' },
  { name: 'electricity', label: '电', value: 581, plan: 1450, unit: 'kwh' },
];

export const floorNames = ['一楼', '二楼', '三楼', '四楼', '五楼', '六楼'];

export const floorData = [
  { name: 'water', label: '水', data: [9, 16, 28, 4, 7, 36] },
  { name: 'electricity', label: '电', data: [20, 15, 30, 5, 5, 25] },
];

export const monthData = [
  { name: 'water', year: '2019', data: [60, 55, 57, 64] },
  { name: 'water', year: '2018', data: [45, 42, 61, 57, 41, 43, 48, 50, 52, 44, 45, 47] },
  { name: 'electricity', year: '2019', data: [1923, 1755, 2157, 2651] },
  {
    name: 'electricity',
    year: '2018',
    data: [1861, 1728, 1984, 1802, 1933, 2007, 2023, 2188, 2021, 1992, 1876, 2117],
  },
];

// Attendance Box

const irregular: any = {
  late: [2, 33, 51],
  off: [8],
  out: [17, 23],
  trip: [],
  absent: [],
  early: [],
  overtime: [4, 12, 13, 38],
};
export const attendanceData = Array(74).fill(0).map((n, i) => {
  const status = Object.keys(irregular).find((ik) => irregular[ik].includes(i)) || 'normal';
  return { name: '员工' + i + 1, icon: '', status };
});

// Patrol Box

const demoFrags = [
  ['楼道', '大厅', '仓库', '门卫室'],
  ['餐厅', '展厅', '楼道', '洗手间'],
  ['办公室', '楼道', '研发中心', '仓库', '洗手间'],
  [],
  [],
  ['办公室', '大厅', '研发中心', '会议室', '市场部', '财务部', '楼道', '茶水间', '洗手间'],
];

const floorRooms = demoFrags.map((floor, idx) => {
  return floor.map((room) => floorNames[idx] + '<br>' + room);
}).flat();

export const patrolData = floorRooms.map((name, idx) => (
  {
    name,
    warning: idx === 2 || idx === 9,
  }
));

// Building Layer

export const energyDataToday = [
  { name: 'water', label: '水', value: 5, unit: 't' },
  { name: 'electricity', label: '电', value: 120, unit: 'kwh' },
];

interface StatusField {
  name: string;
  content: string;
  color?: string;
}

interface EnergyPoint {
  type: 'water' | 'electricity';
  pos: [number, number]; // [top, left]
  value: string | number;
  color?: string;
  info: StatusField[];
  infoPos: [number, number]; // [bottom > 0, left]
}

const getDefaultInfo = (type: string, floor: string) => {
  return [
    { name: '种类', content: type || '水' },
    { name: '位置', content: floor || '一楼' },
    { name: '时间', content: '暂无' },
    { name: '出现问题', content: '暂无问题' },
    { name: '持续时间', content: '暂无' },
    { name: '是否解决', content: '无需解决', color: Colors.green },
  ];
};

export const energyPoints: EnergyPoint[] = [
  {
    type: 'electricity',
    pos: [290, 645],
    value: 25,
    info: getDefaultInfo('电', '六楼'),
    infoPos: [90, 60],
  },
  {
    type: 'electricity',
    pos: [385, 645],
    value: 5,
    info: getDefaultInfo('电', '五楼'),
    infoPos: [100, 100],
  },
  {
    type: 'electricity',
    pos: [483, 645],
    value: 5,
    info: getDefaultInfo('电', '四楼'),
    infoPos: [230, 70],
  },
  {
    type: 'electricity',
    pos: [580, 645],
    value: 30,
    color: Colors.red,
    info: [
      { name: '种类', content: '电' },
      { name: '位置', content: '三楼' },
      { name: '时间', content: '2019/08/17/17:30' },
      { name: '出现问题', content: '下班没关电源' },
      { name: '持续时间', content: '1小时' },
      { name: '是否解决', content: '是', color: Colors.red },
    ],
    infoPos: [140, 280],
  },
  {
    type: 'electricity',
    pos: [720, 670],
    value: 15,
    info: getDefaultInfo('电', '二楼'),
    infoPos: [70, 150],
  },
  {
    type: 'electricity',
    pos: [790, 670],
    value: 20,
    info: getDefaultInfo('电', '一楼'),
    infoPos: [90, 190],
  },
  {
    type: 'water',
    pos: [325, 415],
    value: 50,
    info: getDefaultInfo('水', '六楼'),
    infoPos: [20, -320],
  },
  {
    type: 'water',
    pos: [415, 415],
    value: 5,
    info: getDefaultInfo('水', '五楼'),
    infoPos: [70, -280],
  },
  {
    type: 'water',
    pos: [500, 415],
    value: 5,
    info: getDefaultInfo('水', '四楼'),
    infoPos: [120, -330],
  },
  {
    type: 'water',
    pos: [585, 415],
    value: 30,
    info: getDefaultInfo('水', '三楼'),
    infoPos: [20, -370],
  },
  {
    type: 'water',
    pos: [705, 390],
    value: 5,
    info: getDefaultInfo('水', '二楼'),
    infoPos: [100, -360],
  },
  {
    type: 'water',
    pos: [780, 390],
    value: 5,
    info: getDefaultInfo('水', '一楼'),
    infoPos: [40, -350],
  },
];

interface PatrolSpot {
  pos: [number, number];
  warning: number;
  size?: number;
}

export const patrolSpots: PatrolSpot[] = [
  { pos: [670, 130], warning: 0 },
  { pos: [730, 170], warning: 1 },
  { pos: [530, 180], warning: 0, size: 1.2 },
  { pos: [590, 247], warning: 0 },
  { pos: [680, 256], warning: 0, size: 1.5 },
  { pos: [750, 306], warning: 0 },
  { pos: [510, 330], warning: 0, size: 1.5 },
  { pos: [446, 252], warning: 0, size: 1.5 },
  { pos: [346, 372], warning: 0 },
  { pos: [300, 514], warning: 0, size: 1.2 },
  { pos: [590, 514], warning: 1, size: 1.2 },
  { pos: [370, 680], warning: 0, size: 1.2 },
  { pos: [490, 670], warning: 0 },
  { pos: [420, 940], warning: 0 },
  { pos: [440, 1010], warning: 0 },
  { pos: [570, 940], warning: 0 },
  { pos: [740, 810], warning: 0, size: 1.5 },
];
