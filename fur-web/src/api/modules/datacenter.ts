import { createApi } from '@/api/common';
import { AnyObject } from '@/types';

export default {
  dataCenter: createApi('/api/DataCenter', (r) => ({
    getPlanBillPage: (data: any) => r('SelectProPlanBill', { data }),
    getStepsDetail: (parGuid: string) => r('stepsDetail', { params: { parGuid } }),
    getSelectRecord: (data: any) => r('SelectRecordByBarCode', { data }),
    getStoreHouseSellOut: (data: any) => r('StoreHouseSellOut', { data }),
    getSelectStoreHouseDetail: (data: any) => r('SelectStoreHouseDetail', { data }),
    getStoInOut: (data: any) => r('StoInOut', { data }),
    getStoInDetailOut: (data: any) => r('StoInDetailOut', { data }),
    getOperatorListOut: (data: any) => r('OperatorListOut', { data }),
    getOperatorDetailOut: (data: any) => r('OperatorDetailOut', { data }),

    // getDetails: (styleId: string) => r('GetStyleDetails', { params: { styleId } }),
    // combo: (name: string) => r('GetStepCombo', { params: { name } }),
  })),
}