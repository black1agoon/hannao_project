import Vue from 'vue'
import Router from 'vue-router'

import HomePage from '@/components/HomePage'
import NewsPage from '@/components/NewsPage'
import ArticlePage from '@/components/ArticlePage'

import CompanyPage from '@/components/CompanyPage'
import BusinessPage from '@/components/BusinessPage'
import BrandPage from '@/components/BrandPage'

import AboutPage from '@/components/AboutPage'
import DownloadsPage from '@/components/DownloadsPage'
import ServicePage from '@/components/ServicePage'
import EtagPage from '@/components/EtagPage'
import DevicesPage from '@/components/DevicesPage'

import SolutionPage from '@/components/SolutionPage'

import PolicyPage from '@/components/PolicyPage'
import CooperationPage from '@/components/CooperationPage'

import ContactPage from '@/components/ContactPage'

// Mobile
import MobileServicePage from '@/components/mobile/ServicePage'
import CompanyIntroductionPage from '@/components/CompanyIntroductionPage'
import AboutJzbPage from '@/components/AboutJzbPage'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomePage
    },
    {
      path: '/news/:type',
      name: 'News',
      component: NewsPage
    },
    {
      path: '/news/:type/:id',
      name: 'Article',
      component: ArticlePage
    },
    {
      path: '/company',
      name: 'Company',
      component: CompanyPage
    },
    {
      path: '/company/introduction',
      name: 'Company-introduction',
      component: CompanyIntroductionPage
    },
    {
      path: '/business',
      name: 'Business',
      component: BusinessPage
    },
    {
      path: '/brand',
      name: 'Brand',
      component: BrandPage
    },
    {
      path: '/about',
      name: 'About',
      component: AboutPage
    },
    {
      path: '/about/jzb',
      name: 'about-jzb',
      component: AboutJzbPage
    },
    {
      path: '/downloads',
      name: 'Downloads',
      component: DownloadsPage
    },
    {
      path: '/service',
      name: 'Service',
      component: ServicePage
    },
    {
      path: '/m/service',
      name: 'MobileService',
      component: MobileServicePage
    },
    {
      path: '/etag',
      name: 'Etag',
      component: EtagPage
    },
    {
      path: '/devices',
      name: 'Devices',
      component: DevicesPage
    },
    {
      path: '/solution',
      name: 'Solution',
      component: SolutionPage
    },
    {
      path: '/solution/:name',
      name: 'SolutionArticle',
      component: ArticlePage
    },
    {
      path: '/cooperation',
      name: 'Cooperation',
      component: CooperationPage
    },
    {
      path: '/policy',
      name: 'Policy',
      component: PolicyPage
    },
    {
      path: '/contact',
      name: 'Contact',
      component: ContactPage
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (to.hash) {
      return {
        selector: to.hash
      }
    } else {
      return savedPosition || { x: 0, y: 0 }
    }
  }
})
