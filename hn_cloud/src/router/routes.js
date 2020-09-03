import HomePage from '@/components/HomePage'
import Product from '@/components/product/Product'
import ProductDetail from '@/components/product/ProductDetail'
import SoftwareDetail from '@/components/product/SoftwareDetail'
import Apply from '@/components/common/Apply'
import Solution from '@/components/solution/Solution'
import FieldDetail from '@/components/solution/FieldDetail'
import Application from '@/components/application/Application'
import ApplicationDetail from '@/components/application/ApplicationDetail'
import Platform from '@/components/platform/Platform'
import PlatformDetail from '@/components/platform/PlatformDetail'
import Development from '@/components/development/Development'
import RecommendDetail from '@/components/development/RecommendDetail'
import About from '@/components/about/About'
import ServiceCenter from '@/components/servicecenter/ServiceCenter'
import Login from '@/components/Login'
import demand from '@/components/demand/demand'
// Routes
const routes = [
  {
    path: '/',
    component: HomePage
  },
  {
    name: 'product',
    path: '/product',
    component: Product
  }, {
    name: 'product-detail',
    path: '/product/detail',
    component: ProductDetail
  }, {
    name: 'software-detail',
    path: '/product/software/:catid/:id',
    component: SoftwareDetail
  }, {
    name: 'apply',
    path: '/apply',
    component: Apply
  }, {
    name: 'solution',
    path: '/solution',
    component: Solution
  }, {
    name: 'field-detail',
    path: '/solution/field/:catid/:id',
    component: FieldDetail
  }, {
    name: 'application',
    path: '/application',
    component: Application
  }, {
    name: 'application-detail',
    path: '/application/detail/:id',
    // path: '/application/detail/:catid/:id',
    component: ApplicationDetail
  }, {
    name: 'platform',
    path: '/platform/:catid',
    component: Platform
  }, {
    name: 'platform-detail',
    path: '/platform/detail/:catid/:id',
    component: PlatformDetail
  }, {
    name: 'development',
    path: '/development',
    component: Development
  }, {
    name: 'recommend-detail',
    path: '/development/recommend/detail/:catid/:id',
    component: RecommendDetail
  }, {
    name: 'about',
    path: '/about',
    component: About
  }, {
    name: 'demand',
    path: '/demand',
    component: demand
  }, {
    name: 'servicecenter',
    path: '/servicecenter',
    component: ServiceCenter
  }, {
    name: 'login',
    path: '/login',
    component: Login
  }, {
    path: '*',
    redirect: '/'
  }
]
export default routes
