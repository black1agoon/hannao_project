import { createApi } from '@/api/common';
import { AnyObject } from '@/types';

export default {
  storeIn: createApi('/api/StoIn/', (r) => ({
    getBarcode: (params: AnyObject) => r('GetBarCodeInfoByCode', { params }),
    add: (data: AnyObject) => r('AddStonIn', { data }),
    getPage: (params: AnyObject) => r('GetStoInPage', { params }),
    getDetail: (params: AnyObject) => r('GetStoInDetails', { params }),
  })),
  storeOut: createApi('/api/StoOut/', (r) => ({
    add: (data: AnyObject) => r('AddStoOut', { data: data }),
    getPage: (params: AnyObject) => r('GetStoOutPage', { params }),
    getDetail: (params: AnyObject) => r('GetStoOutDetails', { params }),
    close: (data: AnyObject) => r('close', { data }),
  })),
  inventory: createApi('/api/Inventory/', (r) => ({
    getPage: (params: AnyObject) => r('GetInventoryPage', { params }),
    getDetail: (params: AnyObject) => r('GetInventoryDetails', { params }),
    loss: (data: AnyObject) => r('InventoryLoss', { data }),
  })),
};
