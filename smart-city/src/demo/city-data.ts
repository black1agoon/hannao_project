import Colors from '../config/colors';
import { MarkPoint, StatusData } from '@/types/interfaces';

const videoUrls: string[] = [
  // 'https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8',
  // 'https://video-dev.github.io/streams/pts_shift/master.m3u8',
  // 'https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s-fmp4/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8',
  // 'https://playertest.longtailvideo.com/adaptive/artbeats/manifest.m3u8',
];

export { default as cameraShot } from '../assets/img/city-camera.png';

const cityStatus = {
  title: '智慧数据',
  type: 'SimpleList',
  data: [
    { name: '全市人口', value: 68.28, unit: '万人', delta: 5 },
    { name: 'GDP', value: 102.37, unit: '', delta: 15 },
    { name: '企业数量', value: 8721, unit: '', delta: 7 },
    { name: '规上企业', value: 568, unit: '', delta: 10 },
  ],
};

const trafficStatus = {
  title: '智慧交通',
  type: 'BlockList',
  data: [
    [
      { name: '事故车辆', content: '浙FA3333 / 浙F823V1' },
      { name: '事故地点', content: 'XXX路XX号附近' },
      { name: '进度', content: '未受理', color: Colors.red },
      { name: 'type', content: 'accident', list: false },
      { name: 'position', content: [121.005027, 30.698006], list: false },
    ],
    [
      { name: '嫌疑车辆', content: '浙FU923G' },
      { name: '位置', content: 'XXX路XX号附近' },
      { name: '异常问题', content: '车辆结合部位及边角外部的车漆颜色与车辆颜色不一致' },
      { name: '进度', content: '正在受理', color: Colors.orange },
      { name: 'type', content: 'suspicion', list: false },
      { name: 'position', content: [121.018452, 30.698082], list: false },
    ],
    [
      { name: '事故车辆', content: '浙AB0001 / 浙F2000W' },
      { name: '事故地点', content: 'XXX路XX号附近' },
      { name: '进度', content: '已受理', color: Colors.green },
      { name: 'type', content: 'accident', list: false },
      { name: 'position', content: [121.016192, 30.694886], list: false },
    ],
  ],
};

const cameraStatus = {
  title: '智慧监控',
  type: 'CameraBox',
  data: null,
};

const patrolStatus = {
  title: '全民巡检',
  type: 'BlockList',
  data: [
    [
      { name: '报工单号', content: 'T45511' },
      { name: '报工人', content: '王小龙' },
      { name: '报工地址', content: 'XXX路xx号' },
      { name: '报工事项', content: '机器坏了' },
      { name: '报工时间', content: '2019/04/23 14:20' },
      { name: '是否解决', content: '否', color: Colors.red },
      { name: 'position', content: [121.00719, 30.704232], list: false },
    ],
    [
      { name: '报工单号', content: 'T45513' },
      { name: '报工人', content: '张瑞' },
      { name: '报工地址', content: 'XXX路xx号' },
      { name: '报工事项', content: '空调坏了' },
      { name: '报工时间', content: '2019/04/23 15:03' },
      { name: '是否解决', content: '否', color: Colors.red },
      { name: 'position', content: [121.01144, 30.693396], list: false },
    ],
  ],
};

const energyStatus = {
  title: '智慧能耗',
  type: 'TableList',
  data: {
    fields: [
      { name: 'company', label: '客户单位' },
      { name: 'status', label: '异常情况', color: true },
    ],
    rows: [
      { company: '江龙仕达纺织科技有限公司', status: '用电异常', color: Colors.lightOrange },
      { company: '舟山良海粮油有限公司', status: '用电异常', color: Colors.lightOrange },
      { company: '江袜之源云科技有限公司', status: '用电正常', color: Colors.green },
      { company: '浙江汉脑数码科技有限公司', status: '用电正常', color: Colors.green, id: 'HN121' },
      { company: '江悦心环境科技有限公司', status: '用电正常', color: Colors.green },
    ],
  },
};

const markPointsData = {
  water: [
    [121.014986, 30.692162, 16],
    [121.018005, 30.69323, 16],
    [121.01066, 30.697547, 33],
    [121.008112, 30.700416, 90],
  ],

  electricity: [
    [121.011346, 30.702587, 88],
    [121.015525, 30.702136, 50],
    [121.016572, 30.705671, 16],
    [121.020772, 30.705258, 16],
    [121.021268, 30.701332, 33],
    [121.023698, 30.702434, 16],
  ],

  gas: [
    [121.018812, 30.699509, 0],
    [121.022393, 30.699335, 16],
    [121.01985, 30.70126, 88],
    [121.020858, 30.703361, 33],
  ],

  park: [
    [121.020938, 30.698888, 90],
    [121.024575, 30.708542, 33],
    [121.032016, 30.69889, 50],
  ],

  wc: [
    [121.004832, 30.703996, 33],
    [121.011723, 30.698984, 90],
    [121.011864, 30.70537, 33],
    [121.02375, 30.700579, 90],
    [121.022997, 30.7074, 33],
  ],
};

const markPoints: MarkPoint[] = Object.keys(markPointsData).flatMap((k) => {
  return (markPointsData as any)[k].map((kp: number[]) => {
    return {
      position: kp.slice(0, 2),
      type: k,
      content: kp[2] + '%',
      color: kp[2] > 80 ? Colors.red : Colors.aqua,
    };
  });
});

const trafficStatusWindows: MarkPoint[] = trafficStatus.data.map((item) => {
  const pos = item.find((line) => line.name === 'position');
  const typeLine = item.find((line) => line.name === 'type');
  return {
    position: pos ? (pos.content as number[]) : [],
    type: typeLine ? (typeLine.content as string) : undefined,
    content: item,
    color: Colors.aqua,
  };
}).filter((item) => item.position && item.type);

const patrolStatusWindows: MarkPoint[] = patrolStatus.data.map((item) => {
  const pos = item.find((line) => line.name === 'position');
  return {
    position: pos ? (pos.content as number[]) : [],
    type: 'report',
    content: item,
    color: Colors.green,
  };
}).filter((item) => item.position);

export default class CityData {
  public static statusBlocks: StatusData[] = [
    cityStatus,
    trafficStatus,
    cameraStatus,
    patrolStatus,
    energyStatus,
  ];
  public static markPoints = markPoints;
  public static markWindows = patrolStatusWindows.concat(trafficStatusWindows);
  public static videoUrls = videoUrls;
}
