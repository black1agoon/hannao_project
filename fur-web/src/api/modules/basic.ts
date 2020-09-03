import { Step } from '@/app/basic/step/step.config';
import { createApi } from '@/api/common';
import { AnyObject } from '@/types';
import { createFormData, downloadBlob } from '@/utils/request';

export default {
  // 款式
  style: createApi('/api/Style', (r) => ({
    add: (data: AnyObject) => r('AddStyle', { data }),
    update: (data: AnyObject) => r('UpdateStyle', { data }),
    delete: (styleId: string) => r('DeleteStyle', { data: { id: styleId } }),
    getPage: (params: AnyObject) => r('GetStylePage', { params }),
    getDetails: (styleId: string) => r('GetStyleDetails', { params: { styleId } }),
    importProcess: (file: File) => r('ImportStyleProcess', { data: createFormData({ file }) }),
    downloadTemplate: () => r('/importTemp/款式工艺模板.xlsx', { responseType: 'blob' }).then((blob: Blob) => {
      return downloadBlob(blob, '款式工艺模板.xlsx');
    }),
  })),

  // 款式分类
  styleSort: createApi('/api/StyleSort', (r) => ({
    add: (data: AnyObject) => r('AddStyleSort', { data }),
    update: (data: AnyObject) => r('UpdateStyleSort', { data }),
    delete: (styleSortId: string) => r('DeleteStyleSort', { data: { id: styleSortId } }),
    getTree: () => r('GetStyleSortTree'),
  })),

  // 工序
  step: createApi('/api/Step', (r) => ({
    add: (data: Step) => r('AddStep', { data }),
    update: (data: Step) => r('UpdateStep', { data }),
    delete: (stepId: string) => r('DeleteStep', { data: { id: stepId } }),
    getPage: (params: AnyObject) => r('GetStepPage', { params }),
    combo: (name: string) => r('GetStepCombo', { params: { name } }),
  })),

  // 尺码
  size: createApi('/api/Size', (r) => ({
    add: (data: AnyObject) => r('AddSize', { data }),
    update: (data: AnyObject) => r('UpdateSize', { data }),
    delete: (sizeId: string) => r('DeleteSize', { data: { id: sizeId } }),
    deleteType: (type: string) => r('DeleteSizeByType', { method: 'post', params: { type } }),
    getAll: (name?: string) => r('GetAllSize', { params: { name } }),
    getPage: (params: AnyObject) => r('GetSizePage', { params }),
    combo: (name: string) => r('GetSizeCombo', { params: { name } }),
    getSizeInfo: (name: string) => r('GetSizeInfo', { params: { name } }),
  })),

  // 仓库
  storeHouse: createApi('/api/StoreHouse', (r) => ({
    add: (data: AnyObject) => r('AddStoreHouse', { data }),
    update: (data: AnyObject) => r('UpdateStoreHouse', { data }),
    delete: (storeHouseId: string) => r('DeleteStoreHouse', { data: { id: storeHouseId } }),
    getPage: (params: AnyObject) => r('GetStoreHousePage', { params }),
    combo: (storeHouseName: string) => r('GetStoreHouseCombo', { params: { storeHouseName } }),
  })),

  // 加工点
  workSpace: createApi('/api/WorkingSpace', (r) => ({
    add: (data: AnyObject) => r('AddWorkSpace', { data }),
    update: (data: AnyObject) => r('UpdateWorkSpace', { data }),
    delete: (workSpaceId: string) => r('DeleteWorkSpace', { data: { id: workSpaceId } }),
    getPage: (params: AnyObject) => r('GetWorkSpacePage', { params }),
    combo: (workSpaceName: string) => r('GetWorkSpaceCombo', { params: { workSpaceName } }),
  })),

  // 客户
  customer: createApi('/api/Customer', (r) => ({
    add: (data: AnyObject) => r('AddCustomer', { data }),
    update: (data: AnyObject) => r('UpdateCustomer', { data }),
    delete: (customerId: string) => r('DeleteCustomer', { data: { id: customerId } }),
    getPage: (params: AnyObject) => r('GetCustomerPage', { params }),
    combo: (customerName: string) => r('GetCustomerCombo', { params: { customerName } }),
  })),
};
