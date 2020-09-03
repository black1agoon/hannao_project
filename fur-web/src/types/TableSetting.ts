export interface ColumnSetting {
  width?: number;
  index?: number;
}

export interface TableSetting {
  $sort?: string;
  $order?: string;

  [key: string]: ColumnSetting | number | string | undefined;
}
