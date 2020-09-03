import { Module } from 'vuex';
import { AnyObject } from '@/types';
import router from '@/router';

interface ViewConfig {
  name: string;
  path?: string;
  url?: string;
  isRoute?: boolean;
}

const routerModule: Module<AnyObject, AnyObject> = {
  namespaced: true,

  state: {
    title: '',
    current: {},
    recent: [],
    suggestion: [],
    unsaved: [],
    pinned: [],
    frames: [],
  },

  getters: {
    recentList({ recent, current }) {
      return recent.filter((menu: ViewConfig) => menu.path !== current?.path);
    },
  },

  mutations: {
    pin(state, view: ViewConfig) {
      state.pinned.push(view);
    },
    unpin(state, view: ViewConfig) {
      state.pinned = state.pinned.filter((v: ViewConfig) => v !== view);
    },
    updateRecent(state, view: ViewConfig) {
      const oldIdx = state.recent.findIndex((v: ViewConfig) => v.path === view.path);
      if (oldIdx >= 0) {
        state.recent.splice(oldIdx, 1);
      }
      state.recent.unshift(view);
    },
    setCurrent(state, view: ViewConfig) {
      state.current = view;
      const currentPath = router.currentRoute.path;
      const isRoute = view.isRoute || (router as AnyObject).match(view.path).name !== 'NotFoundView';
      if (!isRoute) {
        if (currentPath !== '/classic') {
          router.push('/classic');
        }
        if (!state.frames.find((f: ViewConfig) => f.url === view.url)) {
          state.frames.push(view);
        }
      } else if (view.url && view.url !== currentPath) {
        router.push(view.url);
      }
    },
    modified(state, view: ViewConfig) {
      if (!state.unsaved.includes(view)) {
        state.unsaved.push(view);
      }
    },
    saved(state, view: ViewConfig) {
      if (state.unsaved.includes(view)) {
        state.unsaved = state.unsaved.filter((v: ViewConfig) => v !== view);
      }
    },
    updateHistory(state, { title, path }) {
      window.history.pushState({}, title, path);
      state.title = title;
      document.title = title;
    },
  },

  actions: {
    active({ commit }, view: ViewConfig) {
      commit('setCurrent', view);
      commit('updateRecent', view);
      // commit('updateHistory', {
      //   title: view.name,
      //   path: view.path,
      // });
    },
    touch({ commit }, view: ViewConfig) {
      commit('updateRecent', view);
      commit('modified', view);
    },
    firstRoute({ state, dispatch }) {
      if (state.current?.path) {
        dispatch('menus/navigate', state.current.path, { root: true });
      } else if (router.currentRoute.fullPath !== '/') {
        router.push('/');
      }
    },
  },
};

export default routerModule;
