import * as appViews from '@/app/index.ts'
import { AnyObject } from '@/types';
import { camel2kebab } from '@/utils/string';

export const appRoutes = [
  ...Object.entries(appViews).flatMap(([moduleName, appModule]) => {
    return Object.entries(appModule)
      .map(([viewName, view]) => {
        const viewPath = (view as AnyObject)._meta?.path || camel2kebab([moduleName, viewName.replace('View', '')].join('/'))
        return {
          name: viewName,
          path: viewPath,
          component: view,
        }
      })
  }),
]
