import Home from '@/pages/Home'
import OutSideWebSite from '@/components/views/OutSideWebSite'
import test from '@/test'
import header from './header'
import admin from './admin'
import company from './company'
let extractRoutes = function (modules) {
  return ([...arguments]).reduce((routes, module) => {
      return routes.concat(Object.keys(module)
          .filter(k => module[k]._meta && module[k]._meta.path)
          .map(k => ({
            path: module[k]._meta.path,
            component: module[k],
            name: module[k].name,
            meta: module[k]._meta
          })))
    }, [])
}

export default [
  {
    path: '',
    component: Home,
    name: 'Home',
    meta: {
      title: '主页'
    }
  },
  {
    path: '/outside/website/:website',
    component: OutSideWebSite,
    name: 'out-side-web-site',
    meta: {
      title: ''
    }
  },
  ...extractRoutes(
    test,
    header,
    admin,
    company
  )
]
