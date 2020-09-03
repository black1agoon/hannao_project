import Vue from 'vue'

const AppConfig = new Vue({
  data: {
    basePath: '',
    apiPath: 'admin/api',
    uploadsPath: 'admin/storage/uploads',
    // token: 'account-c4de83a3d63ab03470e057db4a8c2a',
    token: 'account-7ce32838a0fba5a9adea328cc8a904',
    supportsCsrf: '$2y$10$2OLt7BsA3fjEAfWuwOtZQO09BMdtO5MCKdsWtENRKsK27VzJkrjJK',
    memberSite: 'https://www.jianzb.cn'
  },
  methods: {
    uploads: function (filePath) {
      return [this.basePath, this.uploadsPath].join('/') + filePath
    },
    api: function (type, name, options) {
      var optionArr = []
      if (options) {
        for (var key in options) {
          if (options.hasOwnProperty(key)) {
            optionArr.push(key + '=' + options[key])
          }
        }
      }
      if (type === 'forms') {
        return [this.basePath, this.apiPath, type, 'submit', name].join('/')
      } else {
        var optionStr = '?token=' + this.token
        if (optionArr.length > 0) {
          optionStr = '&' + optionArr.join('&')
        }
        return [this.basePath, this.apiPath, type, 'get', name].join('/') + optionStr
      }
    }
  }
})

export default AppConfig

