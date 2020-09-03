import { AnyObject } from '@/types';
import PermissionEntry from '@/types/PermissionEntry';
import MenuItem from '@/types/MenuItem';
import FeatureEntry from '@/types/FeatureEntry';
import Tree, { treeFind } from '@/utils/tree';

const platformMapper = function() {
  return function(menuItem: PermissionEntry): MenuItem {
    return {
      id: menuItem.id,
      name: menuItem.name,
      type: menuItem.resourceType,
      url: menuItem.url,
      icon: menuItem.logo,
      seq: menuItem.seq,
      children: menuItem.childUserPermission,
      isRoute: true,
    };
  };
};

const erpMapper = function(baseUrl: string) {
  return function(menuItem: FeatureEntry): MenuItem {
    return {
      id: menuItem.id,
      name: menuItem.text,
      type: (menuItem.children.length && !menuItem.attributes.url) ? '0' : menuItem.attributes.url ? '1' : '-1',
      url: menuItem.attributes.url ? (baseUrl + menuItem.attributes.url) : undefined,
      dom: menuItem.attributes.dom,
      icon: menuItem.attributes.picUrl,
      path: menuItem.attributes.url ? menuItem.attributes.url : undefined,
      seq: -1,
      children: menuItem.children,
      isRoute: false,
    };
  };
};

const erpFilter = function(menuItem: FeatureEntry): boolean {
  if (menuItem.checked) {
    return true;
  } else if (menuItem.children.length) {
    return Boolean(treeFind(menuItem.children, function(subMenuItem: FeatureEntry) {
      return subMenuItem.checked;
    }));
  }
  return false;
};

export default class MenuAdapter {
  menuTree: Tree<AnyObject>;

  constructor(rawMenus: AnyObject[]) {
    this.menuTree = new Tree(rawMenus);
  }

  toMenuList(baseUrl: string) {
    return this.menuTree.find((item: AnyObject) => item)?.text ?
      this.menuTree.filter(erpFilter).map(erpMapper(baseUrl), 'subMenus').toArray() :
      this.menuTree.map(platformMapper(), 'subMenus').toArray();
  }
}
