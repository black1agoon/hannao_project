/**
 * Flat object to array
 * @param obj
 * @param parentKey
 * @returns {KeyValue[]}
 */
import { KeyValue } from '@/types/KeyValue';
import { AnyObject } from '@/types';

export const flatObject = function(obj: AnyObject, parentKey = ''): KeyValue[] {
  return Object.entries(obj).flatMap(([k, v]) => {
    k = parentKey ? `${parentKey}[${k}]` : k;
    if (Array.isArray(v)) {
      if ((typeof v.find(vn => vn)) === 'object') {
        return flatObject(v, k);
      }
      return v.map(vn => ({ key: k + '[]', value: vn }));
    } else if (v && typeof v === 'object' && !(v instanceof File)) {
      return flatObject(v, k);
    }
    return { key: k, value: v };
  });
};

/**
 * Convert object to FormData
 * @param obj
 * @param nullable
 * @returns {FormData}
 */
export const object2FormData = function(obj: AnyObject, nullable = false) {
  const formData = new FormData();
  flatObject(obj).map(({ key, value }) => {
    if (!nullable && value === null) {
      formData.append(key, '');
    } else {
      formData.append(key, value);
    }
  });
  return formData;
};
