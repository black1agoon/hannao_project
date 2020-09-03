import DashView from '@/pages/Dash.vue'
import LoginView from '@/pages/Login.vue'
import CompanyLogin from '@/pages/CompanyLogin'
import NotFoundView from '@/pages/404.vue'
import TabsView from '@/components/views/TabsView.vue'
import AppRoutes from '@/app/app.routes'
import RegisterView from '@/app/company/register/RegisterView'
// Routes
const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: {
      tab: false
    }
  }, {
    path: '/company/login',
    name: 'company-login',
    component: CompanyLogin,
    meta: {
      tab: false
    }
  }, {
    path: '/company/register',
    name: 'register-view',
    component: RegisterView,
    meta: {
      tab: false
    }
  }, {
    path: '/',
    component: DashView,
    children: [
      {
        path: '',
        component: TabsView,
        children: AppRoutes   // 如果是/ 就打开首页homeview
      }
    ]
  }, {
    // not found handler
    path: '*',
    component: NotFoundView,
    meta: {
      tab: false
    }
  }
]
export default routes
