import Vue from 'vue';
import VueI18n from 'vue-i18n';
import store from '@/store';
import { messages } from '@/lang/index';

Vue.use(VueI18n);
const i18n = new VueI18n({
  locale: store.state.settings.lang,
  fallbackLocale: 'zh-CN',
  messages,
});

const translate = (key: string, value?: VueI18n.Values) => i18n.t(key, value);
const translates = function(key: string, value?: VueI18n.Values): string {
  return i18n.t(key, value) as string;
};

export { i18n, translate, translates };
