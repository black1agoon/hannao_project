import LocalStore from '@/helpers/LocalStore';
import config from '@/config';
import { AnyObject } from '@/types';
import { Module } from 'vuex';

interface SettingsState {
  lang: string;
  theme: string;
}

const localStore = new LocalStore();

const getUpdated = function(prop: string, configName = ''): string {
  const storedProp = localStore.get(prop);
  const configProp = (config as AnyObject)[configName || prop] || [];
  if (!configProp) {
    (config as AnyObject)[configName || prop] = configProp;
  }
  if (!configProp.length && storedProp) {
    configProp.push(storedProp);
  }
  if (!configProp.includes(storedProp)) {
    localStore.set(prop, configProp[0]);
    return configProp[0];
  }
  return storedProp;
};

const settingsModule: Module<SettingsState, AnyObject> = {
  namespaced: true,

  state: {
    lang: getUpdated('lang', 'languages') || 'en',
    theme: getUpdated('theme', 'themes') || 'default',
  },

  getters: {
    themeClass({ theme }) {
      return 'theme-' + theme;
    },
  },

  mutations: {
    setLang(state, locale: string) {
      state.lang = locale;
      localStore.set('lang', locale);
    },

    setTheme(state, theme: string) {
      state.theme = theme;
      localStore.set('theme', theme);
    },
  },

};

export default settingsModule;
