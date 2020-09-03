import LocalStore from '@/helpers/LocalStore';
import { TableSetting } from '@/types/TableSetting';
import { AnyObject } from '@/types';

const localStore = new LocalStore();

export const saveTableSettings = function(tableId: string, settings: TableSetting) {
  localStore.save('table::' + tableId, settings);
};

export const loadTableSettings = function(tableId: string) {
  return localStore.get('table::' + tableId) || {};
};

export const saveTableColumns = function(tableId: string, tableColumns: AnyObject[], selection: AnyObject[]) {
  const selectedFields = Object.assign({}, ...selection.map((col) => ({ [col.name]: 1 })));
  const settings = Object.assign({},
    ...tableColumns.filter(col => !selectedFields[col.name]).map(col => ({ [col.name]: 0 })));
  saveTableSettings(tableId, settings);
  return tableColumns.filter(col => selectedFields[col.name]);
};

export const loadTableColumns = function(tableId: string, tableColumns: AnyObject[]) {
  const settings = loadTableSettings(tableId) || {};
  return tableColumns.filter(
    (col) =>
      !Object.prototype.hasOwnProperty.call(settings, col.name) ||
      (typeof settings[col.name] === 'number' && settings[col.name]) ||
      settings[col.name]?.width,
  );
};
