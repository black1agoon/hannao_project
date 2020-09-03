import axios from 'axios';
import modules from '@/config/modules';
import { LoginModel, UserModel } from '@/types';
import AppModule from '@/types/AppModule';

const AuthService = {
  authList: modules as AppModule[],
  register(module: AppModule) {
    if (!this.authList.find(m => m.baseUrl === module.baseUrl)) {
      this.authList.push(module);
    }
  },
  loadErpMenus(module: AppModule) { // TODO move to store
    return axios.post(module.baseUrl + '/api/Operator/GetPersonalMenu', null, { withCredentials: true })
      .then((resp) => resp.data.data);
  },
  login(user: LoginModel): Promise<UserModel[]> {
    if (!this.authList.length) {
      return Promise.reject('no-module');
    }
    return Promise.all(this.authList.map((module: AppModule) => {
      if (module.authType === 'erp') {
        const formData = new FormData();
        formData.append('credential', user.username);
        formData.append('password', user.password);
        return axios.post(`${module.baseUrl}/Home/CheckLogin`, formData, { withCredentials: true })
          .then(async (resp) => {
            return {
              userName: user.username,
              userId: user.username,
              token: resp.data.data,
              baseUrl: module.baseUrl,
              permissionList: await this.loadErpMenus(module),
            };
          });
      } else {
        return axios.post(`${module.baseUrl}/public/login`, user)
          .then((resp) => {
            return {
              userName: user.username,
              userId: user.username,
              ...resp.data.data,
              baseUrl: module.baseUrl,
            };
          });
      }
    }));
  },
};

export default AuthService;
