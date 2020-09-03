import { Module } from 'vuex';
import { AnyObject } from '@/types';
import MenuItem from '@/types/MenuItem';
import MenuAdapter from '@/helpers/MenuAdapter';
import Tree from '@/utils/tree';
import router from '@/router';
import { api } from '@/api';

const findMenuPath = function (menuList: Array<MenuItem>, routePath: string) {
  return new Tree(menuList).findPathIndex((item: MenuItem) => item.path === routePath, 'subMenus')
}

const menusModule: Module<AnyObject, AnyObject> = {
  namespaced: true,

  state: {
    collapsed: false,
    menuList: [],
    activeMenu: '',
  },
  mutations: {
    updateMenuList(state, menuList) {
      state.menuList.splice(0, state.menuList.length, ...menuList.flat());
    },
    changeActiveMenu (state, activeMenu) {
      state.activeMenu = activeMenu
    },
  },
  getters: {
    menus({ menuList }) {
      return new Tree(menuList).filter((menu: MenuItem) => +menu.type < 3, 'subMenus').toArray();
    },
    features({ menuList }, _: AnyObject, rootState: AnyObject) {
      const path = rootState.router.current?.path || router.currentRoute.fullPath
      return new Tree(menuList).find((menu: MenuItem) => menu.path === path, 'subMenus')
        ?.subMenus?.map((menu: MenuItem) => ({
          id: menu.id,
          name: menu.name,
          dom: menu.dom?.replace(/^#/, '')?.replace(/-(\w)/g, (_: string, $1: string) => $1.toUpperCase()),
          url: menu.url,
        }));
    },
  },
  actions: {
    update({ commit }, rawMenus: AnyObject) {
      if (rawMenus) {
        const menuList = Object.entries(rawMenus).map(([baseUrl, menus]) => {
          return new MenuAdapter(menus).toMenuList(baseUrl);
        });
        commit('updateMenuList', menuList);
      } else {
        commit('updateMenuList', []);
      }
    },
    toggle({ state }) {
      state.collapsed = !state.collapsed;
    },
    navigate ({ state, commit, dispatch }, routePath) {
      routePath = routePath || router.currentRoute.fullPath
      const menuPath = findMenuPath(state.menuList, routePath)
      if ( menuPath.length) {
        const menuItem = menuPath.reduce((menus, idx, seq) =>
          (seq === menuPath.length - 1) ? menus[idx] : menus[idx]?.subMenus || [], state.menuList)
        dispatch('router/active', menuItem, { root: true })
        commit('changeActiveMenu', menuPath?.join() || '-1')
      } else {
        commit('changeActiveMenu', '-1')
      }
    },
    reload({ dispatch }, menus?: AnyObject) {
      return api.operator.getPersonalMenu()
        .then((menuList) => {
          if (menus) {
            menus[''] = menuList; // TODO default baseUrl
          }
          dispatch('update', menus);
          dispatch('navigate')
          return menuList;
        });
    },
  },
};

export default menusModule;
