interface HourlyDetail {
  time: string;
  value: number;
}

interface DailyEnergy {
  dayNumber: number;
  hourNumberDetail: HourlyDetail[];
  dayNumberDetail: HourlyDetail[];
  monthNumber: number;
  monthRatio: number;
}
