import { createApi } from '@/api/common';
import { createFormData } from '@/utils/request';
import { AnyObject } from '@/types';
import basic from '@/api/modules/basic';

const dropdown = createApi('', (request) => ({
  roles: () => request('/api/Dropdown/Roles'),
  getRoles: () => request('/api/Dropdown/GetRoleList'),
  operators: (q: string) => request('/api/Dropdown/GetOperatorList', { data: createFormData({ q }) })
    .then((data: AnyObject[]) => data.map((op: AnyObject) => ({ label: op.realName, value: op.id }))),
  allSizes: (q: string) => basic.size.getSizeInfo(q)
    .then((sizeList: AnyObject[]) => sizeList.map((item: AnyObject) => ({
      value: item.details,
      label: item.allSize,
      type: item.type,
    }))),
  step: (q: string) => basic.step.combo(q).then((stepList: AnyObject[]) => stepList.map((step: AnyObject) => ({
    value: step.id,
    label: step.text,
  }))),
  department: () => request('/api/Dropdown/GetDepartmentTree', { method: 'post' }),
  house: () => request('/api/StoreHouse/GetStoreHouseCombo'),
  opearInfo: () => request('/api/Dropdown/OpearInfo', { method: 'post' }),
  customer: () => request('/api/Customer/GetCustomerCombo'),
}));

export default {
  dropdown,
};