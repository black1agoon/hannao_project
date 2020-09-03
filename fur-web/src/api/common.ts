import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Messenger } from '@/helpers/Messenger';
import store from '@/store';
import debounce from '@/utils/debounce';
import { translates } from '@/lang/i18n';
import { AnyObject } from '@/types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RequestFunction = (path: string, config?: AxiosRequestConfig, extractor?: boolean | ((resp: AxiosResponse) => any), moreConfig?: AnyObject) => Promise<any>

interface CreateApiExtraConfig {
  debounceList?: string[];
}

export const request: RequestFunction = function(url: string, config?: AxiosRequestConfig, extractor: boolean | Function = true) {
  if (config && config.data && !config.method) {
    config.method = 'post';
  }
  return axios(url, config).then((resp) => {
    if (resp.data.message) {
      const msgType = resp.data.success === true ? 'success' : resp.data.success === false ? 'error' : 'info';
      if (msgType === 'error') {
        Messenger[msgType](resp.data.message);
        return Promise.reject();
      }
    }
    if (typeof extractor === 'function') {
      return extractor(resp);
    } else if (!extractor) {
      return resp;
    } else if ({}.hasOwnProperty.call(resp.data, 'data')) {
      return resp.data.data;
    } else {
      return resp.data;
    }
  }).catch((err) => {
    if (err?.response?.status === 401) {
      store.dispatch('user/logout').then(() => {
        Messenger.warning(translates('app.request.pleaseLogin'));
      });
    } else if (err) {
      const msg = err?.response?.data?.message || translates('app.request.requestFailed');
      Messenger.warning(msg);
    }
    return Promise.reject(err);
  });
};

const debounceFns = ['add'];
const shouldDebounce = function(name: string, fn: Function, extraConfig?: CreateApiExtraConfig) {
  if (debounceFns.includes(name) || extraConfig?.debounceList?.includes(name)) {
    return debounce(fn, 500);
  } else {
    return fn;
  }
};

export function createApi<T>(basePath: string, takeActions: (request1: RequestFunction) => T, extraConfig?: CreateApiExtraConfig): T {
  const pathRequest: RequestFunction = (path, config?, extractor?) => {
    return request(path.startsWith('/') ? path : [basePath, path].join('/'), config, extractor);
  };
  const re = takeActions(pathRequest);
  return Object.assign({}, ...Object.entries(re).map(([name, fn]) => ({ [name]: shouldDebounce(name, fn, extraConfig) })));
}
