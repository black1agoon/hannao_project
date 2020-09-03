import XLSX from 'xlsx';
import { downloadBlob } from './request';
import { AnyObject } from '@/types';

/**
 * Download table rows as excel
 * @param rows
 * @param filename
 * @param header
 * @returns {Promise<*>}
 */
export const downloadAsExcel = function(rows: AnyObject[], filename = 'download', header: string[]) {
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(rows, { header });
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  const data = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' });
  return downloadBlob(new Blob([data], { type: 'application/octet-stream' }), filename + '.xlsx');
};
