export interface DeviceStatus {
  name: string;
  uptime: number;
  dailyOutput: number;
  currentTask: string;
  customer: string;
  task: number;
  finished: number;
  due: string; // '04-09 12:35'
  state: number; // 0, 1
}
