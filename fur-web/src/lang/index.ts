import config from '@/config';

import enAppLocale from '@/lang/en.json';
import zhCNAppLocale from '@/lang/zh-CN.json';

import enElLocale from 'element-ui/lib/locale/lang/en';
import zhCNElLocale from 'element-ui/lib/locale/lang/zh-CN';
import { AnyObject } from '@/types';

const allLocales = new Map<string, object>([
  ['en', { ...enElLocale, ...enAppLocale }],
  ['zh-CN', { ...zhCNElLocale, ...zhCNAppLocale }],
]);

export const messages = Object.assign({}, ...config.languages.map((locale: string) => {
  return {
    [locale]: allLocales.get(locale),
  };
}));

export const languages = Object.assign({}, ...config.languages.map((locale: string) => {
  return {
    [locale]: (allLocales.get(locale) as AnyObject).lang || locale,
  };
}));
