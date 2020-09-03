import Vue from 'vue'
import Router from 'vue-router'
import HomePage from './components/HomePage'
import ResolutionEcommerce from './components/page/ResolutionEcommerce'
import ResolutionTraceability from './components/page/ResolutionTraceability'
import ResolutionIntelligent from './components/page/ResolutionIntelligent'
import CooperationPage from './components/page/CooperationPage'
import CompanyPage from './components/page/CompanyPage'
import CompanyMore from './components/page/CompanyMore'
import CompanyInfo from './components/page/CompanyInfo'
import CompanyNews from './components/page/CompanyNews'
import CompanyNewsDetail from './components/page/CompanyNewsDetail'
import HelpPage from './components/page/HelpPage'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: function (to, from, savedPosition) {
    return savedPosition || {x: 0, y: 0}
  },
  routes: [
    {
      path: '/',
      name: 'homepage',
      component: HomePage
    }, {
      path: '/resolution/ecommerce',
      name: 'resolutionecommerce',
      component: ResolutionEcommerce
    }, {
      path: '/resolution/traceability',  // 解决方案-防伪溯源
      name: 'resolutiontraceability',
      component: ResolutionTraceability
    }, {
      path: '/resolution/intelligent',  // 解决方案-防伪溯源
      name: 'resolutionintelligent',
      component: ResolutionIntelligent
    }, {
      path: '/cooperation',  // 渠道合作
      name: 'cooperationpage',
      component: CooperationPage
    }, {
      path: '/company',  // 公司信息
      name: 'companypage',
      component: CompanyPage
    }, {
      path: '/company/more',  // 了解更多
      name: 'companymore',
      component: CompanyMore
    }, {
      path: '/company/info',  // 公司详情
      name: 'companyinfo',
      component: CompanyInfo
    }, {
      path: '/company/news',  // 公司新闻
      name: 'companynews',
      component: CompanyNews
    }, {
      path: '/company/news/detail/:id',  // 新闻详情
      name: 'companydetail',
      component: CompanyNewsDetail
    }, {
      path: '/help/:tab',      // 帮助支持
      name: 'help',
      component: HelpPage
    }
  ]
})
