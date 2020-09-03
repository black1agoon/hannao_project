import Vue from 'vue'
import axios from 'axios'

import AppConfig from '@/app.config'

const AppService = new Vue({
  data: {
    newsTypes: ['movement', 'report', 'event', 'focus'],
    // Cache
    collections: {
      products: [],
      solutions: [],
      news: []
    }
  },
  methods: {

    collection: function (name, options) {
      return axios.post(AppConfig.api('collections', name), options)
        .then(function (resp) {
          if (resp && resp.data) {
            this.collections[name] = resp.data['entries']
            return resp.data
          }
        }.bind(this))
    },

    news: function (newsType, options) {
      if (this.newsTypes.indexOf(newsType) < 0) {
        return Promise.resolve({entries: []})
      }

      options = options || {}

      if (!options['filter']) {
        options['filter'] = {}
      }
      if (!options.filter.hasOwnProperty('published')) {
        options.filter['published'] = true
      }
      options.filter[newsType] = true

      if (!options['sort']) {
        options['sort'] = { custom_date: -1 }
      }

      return this.collection('news', options)
    },

    article: function (id, atype, name) {
      atype = atype || 'news'
      var post = null
      if ((id || name) && this.collections[atype]) {
        for (var i = 0; i < this.collections[atype].length; i++) {
          if (this.collections[atype][i]['_id'] === id ||
              this.collections[atype][i]['name'] === name) {
            post = this.collections[atype][i]
          }
        }
      }
      if (!post && (id || name)) {
        var data = { filter: { published: true } }
        if (id) {
          data.filter['_id'] = id
        }
        if (name) {
          data.filter['name'] = name
        }
        return axios.post(AppConfig.api('collections', atype), data)
          .then(function (resp) {
            if (resp && resp.data && resp.data['entries'] &&
                resp.data['entries'].length > 0) {
              this.collections[atype].push(resp.data['entries'][0])
              return resp.data['entries'][0]
            }
            return null
          }.bind(this))
      }
      return Promise.resolve(post)
    },

    phoneNumber: function (num) {
      var regs = [/^(([+0]\d{2,3}-)?(0\d{2,3})-)?(\d{7,8})(-(\d{3,}))?$/,
        /^1(3|4|5|7|8)\d{9}$/,
        /^0\d{10,11}$/]
      for (var i = 0; i < regs.length; i++) {
        if (regs[i].test(num)) {
          return true
        }
      }
      return false
    },
    date: function (fmt, seconds) {
      if (typeof seconds === 'string' && seconds.indexOf('-') >= 0) {
        var ns = seconds.split('-')
        return fmt.replace('Y', ns[0] || 2017)
          .replace('m', ns[1] || 1)
          .replace('d', ns[2] || 1)
      }
      var d = new Date(seconds * 1000)
      return fmt.replace('Y', d.getFullYear())
        .replace('m', d.getMonth() + 1)
        .replace('d', d.getDate())
    }
  }
})

export default AppService
