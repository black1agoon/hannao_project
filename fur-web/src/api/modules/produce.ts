import { createApi } from '@/api/common';
import { AnyObject } from '@/types';
import { createFormData, downloadBlob } from '@/utils/request';

const produce = {
  plan: createApi('/api/Produce', (request) => ({
    SelectProPlanBill(query: AnyObject) { // 生产任务单
      return request('SelectProPlanBill', { data: query });
    },
    SelectProSizeDetail(params: AnyObject) {  // 尺码明细
      return request('SelectProSizeDetail', { method: 'get', params });
    },
    SelectProBarCodeDetail(params: AnyObject) {  // 根据尺码id获取条码明细
      return request('SelectProBarCodeDetail', { method: 'get', params });
    },
    SelectBarCodeDetail(params: AnyObject) {  // 条码明细
      return request('SelectBarCodeDetail', { method: 'get', params });
    },
    GetProState() {  // 获取生产任务单状态
      return request('GetProState', { method: 'get' });
    },
    SelectBarCodeRecord(params: AnyObject) {  // 生产流水 记录
      return request('SelectBarCodeRecord', { method: 'get', params });
    },
    delProPlanBill(data: AnyObject) { // 批量删除
      return request('delProPlanBill', { data });
    },
    AddProPlanBill(data: AnyObject) { // 新增和编辑 任务单
      return request('AddProPlanBill', { data });
    },
    SelectOneProPlanBill(params: AnyObject) {  // 查询单个生产任务单
      return request('SelectOneProPlanBill', { method: 'get', params });
    },
    DownloadMapTemplateAsync() {  // 下载导入数据生产任务单模板
      return 'DownloadMapTemplateAsync';
    },
    DownloadMapTemplateAsync2() {  // 下载导入数据生产任务单模板
      return request('DownloadMapTemplateAsync', {
        method: 'get',
        responseType: 'blob',
      }).then((blob: Blob) => {
        downloadBlob(blob, '生产任务单模板.xlsx');
      });
    },
    XlsUpload(file: File) {  // 生产任务单导入
      return request('XlsUpload', { data: createFormData(file) });
    },
    SelectColorAndSizeByStyleIdAndColorId(data: AnyObject) {
      return request('SelectColorAndSizeByStyleIdAndColorId', { data });
    },
  })),

  select: createApi('/api/Produce', (request) => ({
    GetCustomerCombo() {  // 获取客户下拉
      return request('/api/Customer/GetCustomerCombo', { method: 'get' });
    },
    SelectStyle() {  // 选择款号
      return request('SelectStyle', { method: 'get' });
    },
    SelectColorAndSize(params: AnyObject) {  // 获取颜色和尺寸
      return request('SelectColorAndSize', { method: 'get', params });
    },
  })),

  report: createApi('/api/Produce', (request) => ({
    getReportUserName(params: AnyObject) { // 根据员工工号, 获取员工姓名
      return request('getReportUserName', { method: 'get', params });
    },
    AddProduceReport(data: AnyObject) { // 完成报工
      return request('AddProduceReport', { data });
    },
    GetProcessListGwj() { // 获取工序列表
      return request('/api/StationMachine/GetProcessList_gwj', { method: 'get' });
    },
    selectReportWorkStep(params: AnyObject) { // 根据条码 获取不良原因列表
      return request('selectReportWorkStep', { method: 'get', params });
    },
    GetInfoBysBarCode(data: AnyObject) {
      return request('GetInfoBysBarCode', { data });
    },
  })),

  transfer: createApi('/api/Produce', (request) => ({
    selectReportWork(query: AnyObject) { // 产量转移查询
      return request('selectReportWork', { data: query });
    },
    saveReportWorkChange(data: AnyObject) { // 保存产量转移
      return request('saveReportWorkChange', { data });
    },
    selectReceiveReportUserId(params: AnyObject) { // 确认转移 获取 接受者ID
      return request('selectReceiveReportUserId', { method: 'get', params });
    },
  })),

  outsource: createApi('/api/Produce', (request) => ({
    SelectOutsourcingManage(query: AnyObject) { // 查询委外管理
      return request('SelectOutsourcingManage', { data: query });
    },
    GetOutState() {
      return request('GetOutState', { method: 'get' });
    },
    GetWorkSpaceCombo() {
      return request('/api/WorkingSpace/GetWorkSpaceCombo', { method: 'get' });
    },
  })),

  outsourceAdd: createApi('/api/Produce', (request) => ({
    AddOutsourcing() {
      return request('AddOutsourcing', { method: 'get' });
    },
    saveOutsourcingInfo(data: AnyObject) { // 保存委外任务
      return request('saveOutsourcingInfo', { data });
    },
    OutsourcingBack(params: AnyObject) {  // 委外添加返回
      return request('OutsourcingBack', { method: 'get', params });
    },
    selectWorkingSpace(params: AnyObject) {  // 加工点 模糊搜索
      return request('selectWorkingSpace', { method: 'get', params });
    },
    AddWorkingOutDetail(data: AnyObject) { // 根据工序和条码，添加表格中的条码
      return request('AddWorkingOutDetail', { data });
    },
    selectWorkingSpaceDetail(params: AnyObject) {  // 根据加工点获取信息
      return request('selectWorkingSpaceDetail', { method: 'get', params });
    },
  })),

  outsourceReturn: createApi('/api/Produce', (request) => ({
    OutsourcingReceiveInfo(params: AnyObject) {  // 输入条码 确定
      return request('OutsourcingReceiveInfo', { method: 'get', params });
    },
    OutsourcingReceive(data: AnyObject) { // 保存委外任务
      return request('OutsourcingReceive', { data });
    },
  })),
};

export default { produce };