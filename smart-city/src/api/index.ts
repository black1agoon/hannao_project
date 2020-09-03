import axios from 'axios';

const year = new Date().getFullYear();

const request = axios.create({
  baseURL: '/api/',
});

request.interceptors.response.use((resp) => {
  return resp.data ? resp.data.data : null;
});

const autoLogin = () => {
  request.post('/user/login', {
    username: process.env.VUE_APP_ENERGY_USERNAME,
    password: process.env.VUE_APP_ENERGY_PASSWORD,
  });
};

autoLogin();

export default class API {
  public static fetchElectricDevices(enterpriseId: string) {
    return request.get('/enterpriseCount/deviceValue/' + enterpriseId);
  }

  public static fetchEnterpriseStatus(enterpriseId: string) {
    return request.post('/plan/page/', {
      enterpriseId,
      year,
      page: 0,
      pageSize: 20,
    }).then((data: any) => {
      return data.count ? data.pageData[0] : null;
    });
  }

  public static fetchEnterpriseCount(enterpriseId: string) {
    return request.get('enterpriseCount/' + enterpriseId);
  }

  public static getMonthElectric(enterpriseId: string, month?: number) {
    const nowMonth = month ? month - 1 : new Date().getMonth();
    return API.fetchEnterpriseStatus(enterpriseId).then((status: any) => {
      const monthValues = (status.realDetail as string).split(',').map((n) => +n.trim() || 0);
      return monthValues[nowMonth] || 0;
    });
  }
}
