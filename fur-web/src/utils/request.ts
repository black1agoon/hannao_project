// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import * as qs from 'querystring';
import { object2FormData } from '@/utils/form-data';
import { AnyObject } from '@/types';

/**
 * Create FormData from object
 * @param obj
 * @param stringify
 * @returns {string|FormData}
 */
export const createFormData = function(obj: AnyObject, stringify = false) {
  if (stringify) {
    return qs.stringify(obj);
  }
  return object2FormData(obj);
};

/**
 * Download file data
 * @param blob
 * @param filename
 * @returns {Promise<*>}
 */
export const downloadBlob = function(blob: Blob, filename: string) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = function({ target }) {
      const a = document.createElement('a');
      a.download = filename || (new Date().getTime() + '.txt');
      (a as HTMLAnchorElement).href = target?.result as string;
      document.body.append(a);
      a.click();
      a.remove();
      resolve();
    };
    reader.onerror = function(err) {
      reject(err);
    };
  });
};
