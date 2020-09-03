import enAppLocale from '@/lang/en.json'
import zhCNAppLocale from '@/lang/zh-CN.json'
import { flatObject } from '@/utils/form-data'
import { downloadAsExcel } from '@/utils/excel'

export const downloadTranslationList = function () {
  const transList = Object.assign({}, ...flatObject(zhCNAppLocale).map(({ key, value }) => ({
    [key]: { key: key.replace(/\[/g, '.').replace(/]/g, ''), zhCN: value },
  })))

  flatObject(enAppLocale).forEach(({ key, value }) => {
    if (transList[key]) {
      transList[key].en = value
    } else {
      transList[key] = { key: key.replace(/\[/g, '.').replace(/]/g, ''), en: value }
    }
  })

  return downloadAsExcel(Object.values(transList), 'translation', ['zhCN', 'en', 'key'])
}
