import { Module } from 'vuex';
import AuthService from '@/api/AuthService';
import { AnyObject, LoginModel, UserModel } from '@/types';
import LocalStore from '@/helpers/LocalStore';
import router from '@/router';
import { clearCookie } from '@/utils/cookie';

interface UserState {
  name: string;
  displayName?: string;
  users: AnyObject;
}

const localStore = new LocalStore();

const userModule: Module<UserState, AnyObject> = {
  namespaced: true,
  state: {
    name: '',
    displayName: '',
    users: {},
  },

  mutations: {
    updateUser(state, user) {
      state.name = user.name;
      state.displayName = user.name;
    },
    updateUsers(state, users) {
      state.users = users;
    },
  },

  actions: {
    login({ dispatch, commit }, userToLogin: LoginModel) {
      return AuthService.login(userToLogin).then((userModels: UserModel[]) => {
        const userName = userModels.find(u => u.userName)?.userName || userToLogin.username;
        const user = { name: userName, displayName: userName };
        commit('updateUser', user);
        const users = Object.fromEntries(userModels.map(um => [um.baseUrl, { ...um, permissionList: null }]));
        commit('updateUsers', users);
        const menus = Object.fromEntries(userModels.map(um => [um.baseUrl, um.permissionList]));
        dispatch('menus/update', menus, { root: true });
        localStore.saveState({ users, user, menus });
        dispatch('router/firstRoute', null, { root: true })
        return user;
      });
    },

    logout({ commit, dispatch }) {
      const [user, users, menus] = [{ name: '', displayName: '' }, {}, {}];
      commit('updateUser', user);
      commit('updateUsers', users);
      dispatch('menus/update', menus, { root: true });
      localStore.saveState({ users, user, menus });
      clearCookie()
      if (router.currentRoute.fullPath !== '/login') {
        router.push('/login');
      }
    },

    load({ commit, dispatch }) {
      const { user, menus, users } = localStore.loadState();
      commit('updateUser', user);
      commit('updateUsers', users);
      dispatch('menus/reload', menus, { root: true });
    },
  },
};

export default userModule;
