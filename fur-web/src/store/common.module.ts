import { Module } from 'vuex';
import { AnyObject } from '@/types';

interface ColumnsConfig {
  name: string;
  columns: AnyObject[];
}

const commonModule: Module<AnyObject, AnyObject> = {
  namespaced: true,

  state: {
    columnsConfig: {} as ColumnsConfig,
  },

  mutations: {
    setColumnsConfig(state, config: ColumnsConfig) {
      state.columnsConfig = config;
    },
  },
};

export default commonModule;
