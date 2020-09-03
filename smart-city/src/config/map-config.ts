import echarts from 'echarts/lib/echarts';

const mapConfig: AMap.Map.Options = {
  zoom: 17,
  zooms: [14, 18],
  center: [121.024, 30.696],
  pitch: 60,
  rotation: 20,
  viewMode: '3D',
  // layers: [ // seems not supported by echarts amap plugin
  //   new AMap.TileLayer(),
  //   new AMap.Buildings({
  //     zooms: [15, 18],
  //     zIndex: 10,
  //   }),
  // ],
  mapStyle: 'amap://styles/0635bcbf2ff974eebe7d60ca23616023',
};

export default mapConfig;

export const buildingsLayerConfig = {
  zooms: [14, 18] as [number, number],
  zIndex: 10,
};

export const trafficLayerConfig = {
  interval: 60,
  opacity: 0.3,
};

export const mkSeries = (data: any) => [
  // {
  //   type: 'lines',
  //   coordinateSystem: 'amap',
  //   polyline: true,
  //   data,
  //   silent: true,
  //   lineStyle: {
  //     normal: {
  //       width: 3,
  //     },
  //   },
  //   progressiveThreshold: 500,
  //   progressive: 200,
  // },
  {
    type: 'lines',
    coordinateSystem: 'amap',
    polyline: true,
    data,
    lineStyle: {
      normal: {
        width: 0,
      },
    },
    effect: {
      constantSpeed: 400,
      show: true,
      trailLength: 0.8,
      symbol: 'roundRect',
      symbolSize: [1, 10],
      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        { offset: 0, color: 'orange' },
        { offset: 0.5, color: '#ffff00' },
        { offset: 1, color: '#00ffff' },
      ]),
    },
    zlevel: 1,
  },
];
