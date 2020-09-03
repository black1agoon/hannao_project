import { createApi } from '@/api/common';
import { AnyObject } from '@/types';
import { createFormData } from '@/utils/request';

export default {
  operator: createApi('/api/Operator', (r) => ({
    getPage: (params: AnyObject) => r('GetOperatorListByPage', { params }),
    getRole: (params: AnyObject) => r('GetOperatorRoleList', {
      params, method: 'post',
    }),
    del: (params: AnyObject) => r('DelOperator', {
      params, method: 'post',
    }),
    save: (data: AnyObject) => r('CreatOrUpdate', { data }),
    getPersonalMenu: () => r('GetPersonalMenu', { method: 'post' }),
    getLockHouse:(params: AnyObject) => r('GetLockStoreHouse', { params }),
    lockHouse:(data: AnyObject) => r('LockStoreHouse', { data }),
  })),

  role: createApi('/api/RoleFeature', (r) => ({
    saveDepartment: (data: AnyObject) => r('SaveDepartment', { data }),
    delDep: (params: AnyObject) => r('DeleteDepartment', { params, method: 'post' }),
    getTree: (params: AnyObject) => r('GetRoleFeatureTree', { params }),
    getPage: (data: AnyObject) => r('GetPagedRoles', { data }),
    save: (data: AnyObject) => r('SaveRoleFeature', { data }),
    saveRole: (data: AnyObject) => r('SaveRole', { data }),
    delRole: (params: AnyObject) => r('DeleteRole', { params, method: 'post' }),
  })),

  menu: createApi('/api/Menu', (r) => ({
    getAllTree: () => r('GetAllTree', { method: 'post' }),
    getFeatureListByMenuGuid: (guid: string) => r('GetFeatureListByMenuGuid', { params: { guid } }),
    save: (menu: AnyObject) => r('SaveMenu', { data: createFormData(menu) }),
    delete: (menu: AnyObject) => r('Delete', { data: createFormData(menu) }),
    order: (data: AnyObject) => r('Order', { data: createFormData(data) }),
    hiddenMenus: (data: AnyObject) => r('HiddenMenus', { data: createFormData(data) }),
    saveFeature: (feature: AnyObject) => r('SaveFeature', { data: createFormData(feature) }),
    getImages: () => r('GetImages')
  }))
};