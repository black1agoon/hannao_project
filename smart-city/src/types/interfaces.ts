export interface MarkPoint {
  position?: number[];
  type?: string;
  content?: string | object;
  color?: string;
}

export interface StatusData {
  title: string;
  type: string;
  data: any;
}
