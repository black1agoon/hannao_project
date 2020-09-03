interface DailyFlow {
  date: string;
  flow: number;
}

interface HourlyFlow {
  time: string;
  value: number;
}

interface DailyWater {
  compareLastMonth: number;
  dailyFlow: number;
  hourNumberDetail: HourlyFlow[];
  lastMonthAllFlow: number;
  lastMonthAverage: number;
  lastMonthDailyFlow: DailyFlow[];
  thisMonthAllFlow: number;
  thisMonthAverage: number;
  thisMonthDailyFlow: DailyFlow[];
}
