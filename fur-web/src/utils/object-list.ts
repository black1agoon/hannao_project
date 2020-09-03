import { AnyObject } from '@/types';

type KeyOrKeys = string | string[]

/**
 * Convert single key to key list, or set default key 'id'
 * @param keyOrKeys
 * @returns {string[]}
 */
function mkKeys(keyOrKeys: KeyOrKeys) {
  return typeof keyOrKeys === 'string' ? [keyOrKeys] : (Array.isArray(keyOrKeys) && keyOrKeys.length) ? keyOrKeys : ['id'];
}

/**
 * Group list items by item property
 * @param items
 * @param keyOrKeys
 * @param sort
 * @returns {*}
 */
export function groupByProperty(items: AnyObject[], keyOrKeys: KeyOrKeys, sort = true) {
  if (!Array.isArray(items)) {
    return [];
  }
  const keys = mkKeys(keyOrKeys);
  return Object.entries(items.reduce((result, item) => {
    const v = keys.map(key => (typeof item[key] !== 'string' && isNaN(item[key])) ? '' : item[key]).join(',');
    if (result[v]) {
      result[v].push(item);
    } else {
      result[v] = [item];
    }
    return result;
  }, {})).sort((a, b) => sort ? a[0] > b[0] ? 1 : -1 : 0);
}

/**
 * Unique list by item property
 * @param items
 * @param keyOrKeys
 * @param valueKey
 * @returns {*}
 */
export function uniqueByProperty(items: AnyObject[], keyOrKeys: KeyOrKeys, valueKey: string) {
  const keys = mkKeys(keyOrKeys);
  return (items || []).filter((item, idx) => items.findIndex(item0 => !keys.find(key => item0[key] !== item[key])) === idx)
    .map(item => valueKey ? item[valueKey] : item);
}

/**
 * Find same item by property
 * @param items
 * @param testItem
 * @param keyOrKeys
 * @returns {*}
 */
export function findByProperty(items: AnyObject[], testItem: AnyObject, keyOrKeys: KeyOrKeys) {
  const keys = mkKeys(keyOrKeys);
  return (items || []).find(item => !keys.find(k => item[k] !== testItem[k]));
}

/**
 * Filter same item by property
 * @param items
 * @param testItem
 * @param keyOrKeys
 * @returns {*}
 */
export function filterByProperty(items: AnyObject[], testItem: AnyObject, keyOrKeys: KeyOrKeys) {
  const keys = mkKeys(keyOrKeys);
  return (items || []).filter(item => !keys.find(k => item[k] !== testItem[k]));
}

/**
 * Index items by property
 * @param items
 * @param key
 * @param valueKey
 */
export function indexByProperty(items: AnyObject[], key: string, valueKey = '') {
  return Object.fromEntries(items.map(item => ([[item[key]], valueKey ? item[valueKey] : item])));
}

export function sortByProperty(items: AnyObject[], keyOrKeys: KeyOrKeys, valueGetter: Function | null = null) {
  const keys = mkKeys(keyOrKeys);
  if (typeof valueGetter === 'function') {
    return items.sort((a, b) => keys.reduce((r, k) => r || (valueGetter(a, k) < valueGetter(b, k) ? -1 : valueGetter(a, k) === valueGetter(b, k) ? 0 : 1), 0));
  } else {
    return items.sort((a, b) => keys.reduce((r, k) => r || (a[k] < b[k] ? -1 : a[k] === b[k] ? 0 : 1), 0));
  }
}

const ObjectList = class {
  result: AnyObject[] = [];

  constructor(items: AnyObject[]) {
    this.result = items;
    return new Proxy(this, {
      get(target: any, p: number) {
        return target[p] || target.result[p];
      },
    });
  }

  group(keyOrKeys: KeyOrKeys, sort = true) {
    this.result = groupByProperty(this.result, keyOrKeys, sort);
    return this;
  }

  unique(keyOrKeys: KeyOrKeys, valueKey: string) {
    this.result = uniqueByProperty(this.result, keyOrKeys, valueKey);
    return this;
  }

  filter(testItem: AnyObject, keyOrKeys: KeyOrKeys) {
    this.result = filterByProperty(this.result, testItem, keyOrKeys);
    return this;
  }

  sort(keyOrKeys: KeyOrKeys, valueGetter: Function | null = null) {
    this.result = sortByProperty(this.result, keyOrKeys, valueGetter);
    return this;
  }

  find(testItem: AnyObject, keyOrKeys: KeyOrKeys) {
    return findByProperty(this.result, testItem, keyOrKeys);
  }

  index(key: string, valueKey = '') {
    return indexByProperty(this.result, key, valueKey);
  }
};

export default ObjectList;
