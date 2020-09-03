import { AnyObject } from '@/types';

/**
 * Map tree nodes
 * @param data
 * @param callback
 * @param childrenProp
 */
export function treeMap(data: AnyObject[], callback: Function, childrenProp = 'children'): AnyObject[] {
  return data.map((item) => {
    const newItem = callback(item);
    if (newItem[childrenProp] || newItem.children) {
      newItem[childrenProp] = treeMap(newItem[childrenProp] || newItem.children, callback, childrenProp);
    }
    return newItem;
  });
}

/**
 * Filter tree nodes
 * @param data
 * @param callback
 * @param childrenProp
 */
export function treeFilter(data: AnyObject[], callback: Function, childrenProp = 'children'): AnyObject[] {
  return data.filter(item => callback(item)).map((item) => {
    if (item[childrenProp]) {
      item[childrenProp] = treeFilter(item[childrenProp], callback, childrenProp);
    }
    return item;
  });
}

/**
 * Find a node in tree
 * @param data
 * @param callback
 * @param childrenProp
 */
export function treeFind(data: AnyObject[], callback: Function, childrenProp = 'children'): AnyObject | null {
  const found = data.find(item => callback(item));
  if (found) {
    return found;
  } else {
    const nextList = data.filter(item => item[childrenProp]).flatMap(item => item[childrenProp]);
    if (nextList.length) {
      return treeFind(nextList, callback, childrenProp);
    } else {
      return null;
    }
  }
}

/**
 * Find the path of indices in tree for a node
 * @param treeData
 * @param callback
 * @param childrenProp
 * @param path
 * @returns {number[]}
 */
export function treeFindPathIndex(treeData: AnyObject[], callback: Function, childrenProp = 'children', path: number[] = []): number[] {
  for (const idx in treeData) {
    const node = treeData[idx];
    if (callback(node)) {
      return [...path, idx] as number[];
    } else if (node && node[childrenProp]) {
      const foundPath = treeFindPathIndex(node[childrenProp], callback, childrenProp, [...path, idx] as number[]);
      if (foundPath && foundPath.length) {
        return foundPath;
      }
    }
  }
  return [];
}

/**
 * Find the path of nodes in tree for a node
 * @param treeData
 * @param callback
 * @param childrenProp
 * @param path
 * @returns {AnyObject[]}
 */
export function treeFindPath(treeData: AnyObject[], callback: Function, childrenProp = 'children', path: AnyObject[] = []): AnyObject[] {
  for (const node of treeData) {
    if (callback(node)) {
      return [...path, node];
    } else if (node && node[childrenProp]) {
      const foundPath = treeFindPath(node[childrenProp], callback, childrenProp, [...path, node]);
      if (foundPath) {
        return foundPath;
      }
    }
  }
  return [];
}

/**
 * Flat all tree nodes
 * @param treeData
 * @param childrenProp
 * @returns {AnyObject[]}
 */
export function treeFlat(treeData: AnyObject[], childrenProp = 'children'): AnyObject[] {
  return treeData.length
    ? [
      treeData,
      treeFlat(treeData.filter(node => node[childrenProp]).flatMap(node => node[childrenProp]), childrenProp),
    ].flat()
    : treeData;
}

/**
 * Flat map all tree nodes
 * @param treeData
 * @param callback
 * @param childrenProp
 * @returns {Array<T>}
 */
export function treeFlatMap<S extends AnyObject, T>(treeData: Array<S>, callback: (node: S) => Array<T>, childrenProp: string | number = 'children'): Array<T> {
  return treeData.length
    ? [
      treeData.map(callback),
      treeFlatMap(
        treeData.filter(node => node[childrenProp]).flatMap(node => node[childrenProp]),
        callback,
        childrenProp,
      ),
    ].flat()
    : treeData.map(callback);
}

/**
 * Filter, Map & Flat tree nodes
 * @param treeData
 * @param filterCallback
 * @param mapCallback
 * @param childrenProp
 * @param deep
 * @returns {Array<T>}
 */
export function treeFlatFilterMap<S extends AnyObject, T>(treeData: Array<S>, filterCallback: (node: S) => S, mapCallback: (node: S) => T, deep = true, childrenProp = 'children'): Array<T> {
  const filteredTreeData = treeData.filter(filterCallback);
  const parentList = deep ? treeData : filteredTreeData;
  return parentList.length
    ? [
      filteredTreeData.map(mapCallback),
      treeFlatFilterMap(
        parentList.filter(node => node[childrenProp]).flatMap(node => node[childrenProp]),
        filterCallback,
        mapCallback,
        deep,
        childrenProp,
      ),
    ].flat()
    : filteredTreeData.map(mapCallback);
}


export default class Tree<S extends AnyObject> {
  private readonly data: Array<S>;
  private readonly childrenProp: string;

  constructor(data: Array<S> = [], childrenProp = 'children') {
    this.data = data;
    this.childrenProp = childrenProp;
  }

  public toArray() {
    return this.data;
  }

  public map(callback: Function, childrenProp?: string) {
    childrenProp = childrenProp || this.childrenProp;
    return new Tree(treeMap(this.data, callback, childrenProp), childrenProp);
  }

  public filter(callback: Function, childrenProp?: string) {
    childrenProp = childrenProp || this.childrenProp;
    return new Tree(treeFilter(this.data, callback, childrenProp), childrenProp);
  }

  public find(callback: Function, childrenProp?: string): AnyObject | null {
    return treeFind(this.data, callback, childrenProp || this.childrenProp);
  }

  findPathIndex(callback: Function, childrenProp?: string) {
    return treeFindPathIndex(this.data, callback, childrenProp || this.childrenProp);
  }

  findPath(callback: Function, childrenProp?: string) {
    return treeFindPath(this.data, callback, childrenProp || this.childrenProp);
  }

  flat(childrenProp?: string) {
    return treeFlat(this.data, childrenProp || this.childrenProp);
  }

  flatMap<T>(callback: (node: S) => Array<T>, childrenProp?: string) {
    return treeFlatMap(this.data, callback, childrenProp || this.childrenProp);
  }

  flatFilterMap<T>(filterCallback: (node: S) => S, mapCallback: (node: S) => T, deep: boolean, childrenProp?: string) {
    return treeFlatFilterMap(this.data, filterCallback, mapCallback, deep, childrenProp || this.childrenProp);
  }
}
