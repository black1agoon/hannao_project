import { MarkPoint } from '@/types/interfaces';
import Colors from '@/config/colors';
import SimplePoint from '@/templates/simple-point';
import ReportWindow from '@/templates/report-window';

interface MarkerConfig {
  name: string;
  title: string;
  icon: string;
  marker?: string;
}

const markers: MarkerConfig[] = [
  { name: 'water', title: '水', icon: '5' },
  { name: 'gas', title: '气', icon: '6' },
  { name: 'electricity', title: '电', icon: '7' },
  { name: 'park', title: '停车场', icon: '8', marker: '3' },
  { name: 'wc', title: '厕所', icon: '9', marker: '2' },
  { name: 'suspicion', title: '嫌疑车辆', icon: '10' },
  { name: 'accident', title: '事故车辆', icon: '11' },
  { name: 'report', title: '报工位置', icon: '12', marker: '4' },
];

export const mapIcons = {
  water: require('../views/city/img/5.png'),
  gas: require('../views/city/img/6.png'),
  electricity: require('../views/city/img/7.png'),
  park: require('../views/city/img/3.png'),
  wc: require('../views/city/img/2.png'),
  suspicion: require('../views/city/img/10.png'),
  accident: require('../views/city/img/11.png'),
  report: require('../views/city/img/4.png'),
};

export const borderImages = {
  left: {
    [Colors.aqua]: require('../views/city/img/18.png'),
    [Colors.green]: require('../views/city/img/19.png'),
  },
  right: {
    [Colors.aqua]: require('../views/city/img/17.png'),
    [Colors.green]: require('../views/city/img/20.png'),
  },
};

export const getInfoSimple = (markPoint: MarkPoint): string => {
  return new SimplePoint(markPoint).toString();
};

export const getInfoWindow = ({ content, color, type }: MarkPoint): string => {
  return new ReportWindow({ content, color, type }).toString();
};

export default class Markers {
  public static markers = markers;

  public static getMarker(point: MarkPoint): any {
    return {
      ...markers.find((mk: MarkerConfig) => mk.name === point.type),
      position: point.position,
      content: typeof point.content === 'string' ? getInfoSimple(point) : getInfoWindow(point),
    };
  }
}
